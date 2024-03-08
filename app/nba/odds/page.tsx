"use client";

import React, { Fragment } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import moment from "moment";

const options = ["Game", "1st Half", "2nd Half", "1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"];
const tableHeaders = ["Time", "Team", "Spread", "Totals", "Moneyline", "Win Prob.", ""];

const getNtlEvents = async () => {
  const url = `https://api.the-odds-api.com/v4/sports/basketball_nba/odds?regions=us&markets=h2h,spreads,totals&oddsFormat=american&apiKey=${process.env.NEXT_PUBLIC_ODDS_API_KEY}`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return [];
  }
};

function NbaOdds() {
  const { data: events } = useQuery({ queryKey: ["nfl"], queryFn: getNtlEvents });

  const groupedEvents = () => {
    if (Boolean(events)) {
      let groups: any = [];
      events.map((event: any) => {
        const foundGroup = groups.find((group: any) => group.playDay === moment(event.commence_time).format("LL"));
        if (foundGroup) {
          foundGroup.events.push(event);
        } else {
          groups.push({
            playDay: moment(event.commence_time).format("LL"),
            events: [event],
          });
        }
      });

      return groups;
    }
    return [];
  };

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
              {tableHeaders.map((head, i) => (
                <TableHead key={head} className={cn("text-black font-bold", i !== 1 && "text-center")}>
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {groupedEvents().map((group: any) => (
              <Fragment key={group.playDay}>
                <TableRow className="p-0 hover:bg-[#003556] text-white w-full bg-[#003556] font-bold">
                  <TableCell colSpan={7} className="font-bold text-[16px] p-1 pl-5">
                    {moment(group.playDay).format("llll").toString().slice(0, 17)}
                  </TableCell>
                </TableRow>

                {group.events.length &&
                  group.events.map((event: any) => (
                    <TableRow key={event.id}>
                      <TableCell className="text-center">
                        {moment(new Date(event.commence_time)).format("LT")}
                      </TableCell>
                      <TableCell>
                        <p>{event.home_team}</p>
                        <p>{event.away_team}</p>
                      </TableCell>
                      <TableCell className="text-center">
                        <p>{event.bookmakers[0].markets[1].outcomes[0].price}</p>
                        <p>{event.bookmakers[0].markets[1].outcomes[1].price}</p>
                      </TableCell>
                      <TableCell className="text-center">
                        <p>o{event.bookmakers[0].markets[2].outcomes[0].point}</p>
                        <p>u{event.bookmakers[0].markets[2].outcomes[1].point}</p>
                      </TableCell>
                      <TableCell className="text-center">
                        <p>{event.bookmakers[0].markets[0].outcomes[0].price}</p>
                        <p>{event.bookmakers[0].markets[0].outcomes[1].price}</p>
                      </TableCell>
                    </TableRow>
                  ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default NbaOdds;
