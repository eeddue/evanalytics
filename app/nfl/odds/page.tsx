"use client";

import axios from "axios";
import React from "react";
import moment from "moment";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const tableHeaders = ["Time", "Team", "Spread", "Totals", "Moneyline", "Win Prob"];
const options = ["Game", "1st Half", "1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"];

function NflOdds() {
  const { data: events, status } = useQuery({
    queryKey: ["nflOdds"],
    queryFn: () => axios.get("/api/nfl/odds").then(({ data }) => data.events),
  });

  const isLoading = status === "pending";

  return (
    <div>
      <section className="p-3 border-b-2 border-border bg-muted flex justify-center w-full">
        <p className="text-lg">NFL Odds and Live Movement</p>
      </section>

      <div className="pagew mx-auto py-10">
        <div className="flex gap-4 px-2.5 overflow-x-scroll">
          {options.map((option) => (
            <button className="text-xs text-nowrap" key={option}>
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
                events.map((event: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="text-xs text-center text-nowrap">{event.time}</TableCell>
                    <TableCell>
                      <p className="text-nowrap">{event.home_team}</p>
                      <p className="text-nowrap">{event.away_team}</p>
                    </TableCell>
                    <TableCell className="text-xs text-center">
                      <p className="text-nowrap">
                        {event.spreads.home.spread} {event.spreads.home.odds}
                      </p>
                      <p className="text-nowrap">
                        {event.spreads.away.spread} {event.spreads.away.odds}
                      </p>
                    </TableCell>
                    <TableCell className="text-xs text-center">
                      <p className="text-nowrap">
                        {event.totals.over.points} {event.totals.over.odds}
                      </p>
                      <p className="text-nowrap">
                        {event.totals.under.points} {event.totals.under.odds}
                      </p>
                    </TableCell>
                    <TableCell className="text-xs text-center">
                      <p className="text-nowrap">{event.money_line.home}</p>
                      <p className="text-nowrap">{event.money_line.away}</p>
                    </TableCell>
                    <TableCell className="text-xs text-center">
                      <p className="text-nowrap">{event.win_probability.home}</p>
                      <p className="text-nowrap">{event.win_probability.away}</p>
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

export default NflOdds;
