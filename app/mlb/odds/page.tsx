"use client";

import axios from "axios";
import { calculateWinProbility, cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import React, { Fragment, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import moment from "moment";

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
      home_team: { odds: string; inning: number | string };
      away_team: { odds: string; inning: number | string };
    };
    moneyline: {
      home_team: { odds: string };
      away_team: { odds: string };
    };
  };
};

const options = [
  { title: "Game", value: "full_game" },
  { title: "5th inning", value: "fifth_inning" },
];
const tableHeaders = ["Time", "Team", "Spread", "Totals", "Moneyline", "Win Prob"];

function MlbOdds() {
  const [selectedOption, setSelectedOption] = useState("full_game");
  const [matches, setMatches] = useState<MatchProps[]>([]);

  const { data, status } = useQuery({
    queryKey: ["mlb_events"],
    queryFn: () => axios.get(`/api/mlb/odds`).then(({ data }) => data.events ?? []),
  });

  useEffect(() => {
    if (data !== undefined && data.length) {
      const allEvents = data.map((event: any) => ({
        ...event,
        odds: {
          spreads: event.odds.spreads[selectedOption],
          totals: event.odds.totals[selectedOption],
          moneyline: event.odds.moneyline[selectedOption],
        },
      }));
      setMatches(allEvents);
    }
  }, [data, selectedOption]);

  const isLoading = status === "pending";

  return (
    <div>
      <section className="p-3 border-b-2 border-border bg-muted flex justify-center w-full">
        <p className="text-lg">MLB Odds and Live Movement</p>
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
              <TableRow>
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
                matches.map((event: MatchProps, id: number) => (
                  <TableRow key={id}>
                    <TableCell className="text-xs text-center one-line">{event.kickoff}</TableCell>
                    <TableCell>
                      <p className="one-line">{event.home_team}</p>
                      <p className="one-line">{event.away_team}</p>
                    </TableCell>
                    <TableCell className="text-xs text-center">
                      <p className="one-line">
                        {event.odds.spreads.home_team.spread} {event.odds.spreads.home_team.odds}
                      </p>
                      <p className="one-line">
                        {event.odds.spreads.away_team.spread} {event.odds.spreads.away_team.odds}
                      </p>
                    </TableCell>
                    <TableCell className="text-xs text-center">
                      <p className="one-line">
                        {event.odds.totals.home_team.inning !== "-" && "o"} {event.odds.totals.home_team.inning}{" "}
                        {event.odds.totals.home_team.odds}
                      </p>
                      <p className="one-line">
                        {event.odds.totals.away_team.inning !== "-" && "u"} {event.odds.totals.away_team.inning}{" "}
                        {event.odds.totals.away_team.odds}
                      </p>
                    </TableCell>
                    <TableCell className="text-xs text-center">
                      <p className="one-line">{event.odds.moneyline.home_team.odds}</p>
                      <p className="one-line">{event.odds.moneyline.away_team.odds}</p>
                    </TableCell>
                    <TableCell className="text-xs text-center">
                      <p className="one-line">
                        {
                          calculateWinProbility(
                            event.odds.moneyline.home_team.odds,
                            event.odds.moneyline.away_team.odds
                          ).home
                        }
                      </p>
                      <p className="one-line">
                        {
                          calculateWinProbility(
                            event.odds.moneyline.home_team.odds,
                            event.odds.moneyline.away_team.odds
                          ).away
                        }
                      </p>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="text-center">
                  <TableCell colSpan={6}>No MLB events today</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default MlbOdds;
