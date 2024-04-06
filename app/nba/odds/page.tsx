"use client";

import axios from "axios";
import moment from "moment";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const tableHeaders = ["Time", "Team", "Spread", "Totals", "Moneyline"];
const options = [
  { title: "Game", value: "full_game" },
  { title: "1st Half", value: "first_half" },
  { title: "2nd Half", value: "second_half" },
  { title: "1st Quarter", value: "first_quarter" },
  { title: "2nd Quarter", value: "second_quarter" },
  { title: "3rd Quarter", value: "third_quarter" },
  { title: "4th Quarter", value: "fourth_quarter" },
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

function NbaOdds() {
  const [selectedOption, setSelectedOption] = useState("full_game");
  const [matches, setMatches] = useState<MatchProps[]>([]);

  const { data, status } = useQuery({
    queryKey: ["nba-events"],
    queryFn: () =>
      axios
        .get("/api/nba/odds")
        .then(({ data }) => data?.events ?? [])
        .catch(() => []),
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
    <div>
      <section className="p-3 border-b-2 border-border bg-muted flex justify-center w-full">
        <p className="text-lg">NBA Odds and Live Movement</p>
      </section>

      <div className="pagew mx-auto py-10">
        <div className="flex gap-4 overflow-x-scroll px-2.5 no-scroll">
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
          <Table className="overflow-x-scroll no-scroll">
            <TableHeader>
              <TableRow>
                {tableHeaders.map((head, i) => (
                  <TableHead key={head} className={cn("text-black font-bold one-line", i !== 1 && "text-center")}>
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
                matches.map((match, index) => (
                  <Fragment key={index}>
                    <TableRow>
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
                          {match.odds.totals.home_team.points !== "-" && "o"} {match.odds.totals.home_team.points}{" "}
                          {match.odds.totals.home_team.odds}
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
                    </TableRow>
                  </Fragment>
                ))
              ) : (
                <TableRow className="text-center">
                  <TableCell colSpan={6}>There were no events found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default NbaOdds;
