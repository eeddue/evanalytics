"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader } from "lucide-react";
import moment from "moment";

const options = ["Game", "1st Half", "2nd Half", "1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"];
const tableHeaders = ["Time", "Team", "Spread", "Totals", "Moneyline", "Win Prob.", ""];

function CbbOdds() {
  const { data: events, status } = useQuery({
    queryKey: ["ncaabEvents"],
    queryFn: () =>
      axios
        .get(
          `https://api.the-odds-api.com/v4/sports/basketball_ncaab/odds?regions=us&markets=h2h,spreads,totals&oddsFormat=american&apiKey=${process.env.NEXT_PUBLIC_ODDS_API_KEY}`
        )
        .then(({ data }) => data.filter((ev: any) => ev.bookmakers[0]?.markets?.length > 2))
        .catch(() => []),
  });

  const isLoading = status === "pending";

  return (
    <div className="">
      <section className="p-3 border-b-2 border-border bg-muted flex justify-center w-full">
        <p className="text-lg">College Basketball Odds and Live Movement</p>
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
          <Loader size={40} className="animate-spin self-center mt-20 mx-auto" />
        ) : (
          <Table className="overflow-x-scroll">
            <TableHeader>
              <TableRow>
                {tableHeaders.map((head) => (
                  <TableHead key={head} className="text-center font-bold text-nowrap">
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
                events.map((event: any) => (
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

export default CbbOdds;