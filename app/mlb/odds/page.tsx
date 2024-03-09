"use client";

import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const options = ["Game", "1st Half", "2nd Half"];
const tableHeaders = ["Time", "Team", "Spread", "Totals", "Moneyline", "Win Prob.", ""];

const getNtlEvents = async () => {
  const url = `https://api.the-odds-api.com/v4/sports/baseball_mlb/odds?regions=us&markets=h2h,spreads,totals&oddsFormat=american&apiKey=${process.env.NEXT_PUBLIC_ODDS_API_KEY}`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
};

function MlbOdds() {
  const { data: events } = useQuery({ queryKey: ["nfl"], queryFn: getNtlEvents });

  console.log(events);

  return (
    <div>
      <section className="p-3 border-b-2 border-border bg-muted flex justify-center w-full">
        <p className="text-lg">MLB Odds and Live Movement</p>
      </section>

      <div className="pagew mx-auto py-10">
        <div className="flex gap-4">
          {options.map((option) => (
            <button className="text-xs" key={option}>
              {option}
            </button>
          ))}
        </div>

        {/* Table */}
        {/* Data table */}
        <Table className="overflow-x-scroll">
          <TableHeader>
            <TableRow>
              {tableHeaders.map((head) => (
                <TableHead key={head} className="text-center font-bold">
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="p-0 hover:bg-primary text-white w-full bg-primary font-bold">
              <TableCell colSpan={7} className="text-lg font-bold p-1">
                Sunday, February 11, 2024
              </TableCell>
            </TableRow>

            {/* {events?.length ? events.map((event) => <></>) : <p>There were no events found</p>} */}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default MlbOdds;
