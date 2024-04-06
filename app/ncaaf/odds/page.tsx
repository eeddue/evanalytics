"use client";

import React, { Fragment } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const tableHeaders = ["Time", "Team", "Spread", "Totals", "Moneyline", "Win Prob"];
const options = ["Game", "1st Half", "2nd Half", "1st Quarter", "2nd Quarter", "3rd Quarter", " Quarter"];

function CfbOdds() {
  const { data: events, status } = useQuery({
    queryKey: ["ncaafEvents"],
    queryFn: () => axios.get(`/api/ncaaf/odds`).then(({ data }) => data.sections),
  });

  const isLoading = status === "pending";

  return (
    <div className="">
      <section className="p-3 border-b-2 border-border bg-muted flex justify-center w-full">
        <p className="text-lg">College Football Odds and Live Movement</p>
      </section>

      <div className="pagew mx-auto py-10">
        <div className="flex gap-4 px-2.5 overflow-scroll">
          {options.map((option) => (
            <button className="text-xs one-line" key={option}>
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
              <TableRow className="no-scroll">
                {tableHeaders.map((head, index) => (
                  <TableHead key={head} className={cn("font-bold one-line", index !== 1 && "text-center")}>
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
                        <TableCell className="text-xs text-center one-line">{event.time}</TableCell>
                        <TableCell>
                          <p className="one-line">{event.home_team}</p>
                          <p className="one-line">{event.away_team}</p>
                        </TableCell>
                        <TableCell className="text-xs text-center">
                          <p className="one-line">
                            {event.spreads.home.spread} {event.spreads.home.odds}
                          </p>
                          <p className="one-line">
                            {event.spreads.away.spread} {event.spreads.away.odds}
                          </p>
                        </TableCell>
                        <TableCell className="text-xs text-center">
                          <p className="one-line">
                            {event.totals.over.points} {event.totals.over.odds}
                          </p>
                          <p className="one-line">
                            {event.totals.under.points} {event.totals.under.odds}
                          </p>
                        </TableCell>
                        <TableCell className="text-xs text-center">
                          <p className="one-line">{event.money_line.home}</p>
                          <p className="one-line">{event.money_line.away}</p>
                        </TableCell>
                        <TableCell className="text-xs text-center">
                          <p className="one-line">{event.win_probability.home}</p>
                          <p className="one-line">{event.win_probability.away}</p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </Fragment>
                ))
              ) : (
                <TableRow className="text-center">
                  <TableCell colSpan={6}>No NCAAF events for today</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default CfbOdds;
