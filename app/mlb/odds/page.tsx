"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

const options = ["Game", "1st Half", "2nd Half"];
const tableHeaders = ["Time", "Team", "Spread", "Totals", "Moneyline",];

function MlbOdds() {
  const { data: events, status } = useQuery({
    queryKey: ["mlbEvents"],
    queryFn: () =>
      axios
        .get(
          `https://api.the-odds-api.com/v4/sports/baseball_mlb/odds?regions=us&markets=h2h,spreads,totals&oddsFormat=american&apiKey=${process.env.NEXT_PUBLIC_ODDS_API_KEY}`
        )
        .then(({ data }) => data)
        .catch(() => []),
  });

  const isLoading = status === "pending";

  return (
    <div>
      <section className="p-3 border-b-2 border-border bg-muted flex justify-center w-full">
        <p className="text-lg">MLB Odds and Live Movement</p>
      </section>

      <div className="pagew mx-auto py-10">
        <div className="flex gap-4 px-2.5">
          {options.map((option) => (
            <button className="text-xs" key={option}>
              {option}
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
                  <TableHead key={head} className={cn("font-bold text-nowrap", index !== 1 && "text-center")}>
                    {head}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="p-0 hover:bg-primary text-white w-full bg-primary font-bold">
                <TableCell colSpan={7} className="text-lg font-bold p-1">
                  {moment(new Date()).format("LL")}
                </TableCell>
              </TableRow>

              {events.length ? (
                events
                  .filter((e: any) => e.bookmakers[0].markets.length > 2)
                  .map((event: any) => (
                    <TableRow key={event.id}>
                      <TableCell className="text-xs text-center text-nowrap">
                        {moment(new Date(event.commence_time)).format("LT")}
                      </TableCell>
                      <TableCell>
                        <p className="text-nowrap">{event.home_team}</p>
                        <p className="text-nowrap">{event.away_team}</p>
                      </TableCell>
                      <TableCell className="text-xs text-center">
                        <p>{event.bookmakers[0].markets[1]?.outcomes[0].price}</p>
                        <p>{event.bookmakers[0].markets[1]?.outcomes[1].price}</p>
                      </TableCell>
                      <TableCell className="text-xs text-center">
                        <p>o{event.bookmakers[0].markets[2]?.outcomes[0].point}</p>
                        <p>u{event.bookmakers[0].markets[2]?.outcomes[1].point}</p>
                      </TableCell>
                      <TableCell className="text-xs text-center">
                        <p>{event.bookmakers[0].markets[0]?.outcomes[0].price}</p>
                        <p>{event.bookmakers[0].markets[0]?.outcomes[1].price}</p>
                      </TableCell>
                    </TableRow>
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

export default MlbOdds;
