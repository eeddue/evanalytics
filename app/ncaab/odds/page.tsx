"use client";

import axios from "axios";
import { Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { calculateWinProbility, cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import moment from "moment";

const tableHeaders = ["Time", "Team", "Spread", "Totals", "Moneyline", "Win Prob"];
const options = [
  { title: "Game", value: "full_game" },
  { title: "1st Half", value: "first_half" },
  { title: "2nd Half", value: "second_half" },
];

type MatchProps = {
  home_team: string;
  away_team: string;
  kickoff: string;
  odds: {
    spreads: {
      home_team: { odds: string; spread: string };
      away_team: { odds: string; spread: string };
    };
    totals: {
      home_team: { odds: string; points: number | string };
      away_team: { odds: string; points: number | string };
    };
    moneyline: {
      home_team: { odds: string };
      away_team: { odds: string };
    };
  };
};

function CbbOdds() {
  const [selectedOption, setSelectedOption] = useState("full_game");
  const [matches, setMatches] = useState<MatchProps[]>([]);

  const { data, status } = useQuery({
    queryKey: ["ncaab-events"],
    queryFn: () => axios.get(`/api/ncaab/odds`).then(({ data }) => data.events),
  });

  useEffect(() => {
    if (data !== undefined && data.length) {
      const allEvents = data.map((event: any) => {
        return {
          ...event,
          odds: {
            spreads: event.odds.spreads[selectedOption],
            totals: event.odds.totals[selectedOption],
            moneyline: event.odds.moneyline[selectedOption],
          },
        };
      });
      setMatches(allEvents);
    }
  }, [data, selectedOption]);

  const isLoading = status === "pending";

  return (
    <div className="">
      <section className="p-3 border-b-2 border-border bg-muted flex justify-center w-full">
        <p className="text-lg">College Basketball Odds and Live Movement</p>
      </section>

      <div className="pagew mx-auto py-10">
        <div className="flex gap-4 px-2.5">
          {options.map((option) => (
            <button
              className={cn("text-xs one-line", selectedOption === option.value && "text-primary")}
              onClick={() => setSelectedOption(option.value)}
              key={option.value}
              disabled={isLoading}
            >
              {option.title}
            </button>
          ))}
        </div>

        {/* Table */}
        {/* Data table */}
        {isLoading ? (
          <Loader size={30} className="animate-spin self-center mt-20 mx-auto" />
        ) : (
          <Table className="overflow-x-scroll">
            <TableHeader>
              <TableRow className="no-scroll">
                {tableHeaders.map((head, index) => (
                  <TableHead key={head} className={cn("font-bold one-line", index !== 1 && "text-center")}>
                    {head}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="p-0 hover:bg-primary text-white w-full bg-primary font-bold">
                <TableCell colSpan={7} className="font-bold text-[16px] p-1 pl-5 text-nowrap">
                  {moment(new Date()).format("llll").toString().slice(0, 17)}
                </TableCell>
              </TableRow>

              {matches.length ? (
                matches.map((match: MatchProps, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="text-xs text-center one-line">{match.kickoff}</TableCell>
                    <TableCell>
                      <p className="one-line">{match.home_team}</p>
                      <p className="one-line">{match.away_team}</p>
                    </TableCell>
                    <TableCell className="text-xs text-center">
                      <p className="one-line">
                        {match.odds.spreads.home_team.spread} {match.odds.spreads.home_team.odds}
                      </p>
                      <p className="one-line">
                        {match.odds.spreads.away_team.spread} {match.odds.spreads.away_team.odds}
                      </p>
                    </TableCell>
                    <TableCell className="text-xs text-center">
                      <p className="one-line">
                        {match.odds.totals.home_team.points !== "-" && "o"}
                        {match.odds.totals.home_team.points} {match.odds.totals.away_team.odds}
                      </p>
                      <p className="one-line">
                        {match.odds.totals.home_team.points !== "-" && "u"}
                        {match.odds.totals.away_team.points} {match.odds.totals.away_team.odds}
                      </p>
                    </TableCell>
                    <TableCell className="text-xs text-center">
                      <p className="one-line">{match.odds.moneyline.home_team.odds}</p>
                      <p className="one-line">{match.odds.moneyline.away_team.odds}</p>
                    </TableCell>
                    <TableCell className="text-xs text-center">
                      <p className="one-line">
                        {
                          calculateWinProbility(
                            match.odds.moneyline.home_team.odds,
                            match.odds.moneyline.away_team.odds
                          ).home
                        }
                      </p>
                      <p className="one-line">
                        {
                          calculateWinProbility(
                            match.odds.moneyline.home_team.odds,
                            match.odds.moneyline.away_team.odds
                          ).away
                        }
                      </p>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="text-center">
                  <TableCell colSpan={6}>There are no events for today</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default CbbOdds;
