"use client";

import React, { Fragment } from "react";
import axios from "axios";
import moment from "moment";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const options = ["Game", "1st Half", "2nd Half"];
const tableHeaders = ["Time", "Team", "Spread", "Totals", "Moneyline", "Win Prob"];

function MlbOdds() {
  const { data: events, status } = useQuery({
    queryKey: ["mlbEvents"],
    queryFn: () => axios.get(`/api/mlb/odds`).then(({ data }) => data.sections),
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
              {events.length ? (
                events.map((section: any, index: number) => (
                  <Fragment key={index}>
                    <TableRow className="p-0 hover:bg-primary text-white w-full bg-primary font-bold">
                      <TableCell colSpan={7} className="text-lg font-bold p-1">
                        {section.date}
                      </TableCell>
                    </TableRow>
                    {section.events.map((event: any, id: number) => (
                      <TableRow key={id}>
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
                    ))}
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

export default MlbOdds;
