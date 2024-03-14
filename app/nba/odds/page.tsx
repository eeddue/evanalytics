"use client";

import React, { Fragment } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import moment from "moment";
import { Loader } from "lucide-react";

const options = ["Game", "1st Half", "2nd Half", "1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"];
const tableHeaders = ["Time", "Team", "Spread", "Totals", "Moneyline", "Win Prob.", ""];

function NbaOdds() {
  const { data: events, status } = useQuery({
    queryKey: ["nbaEvents"],
    queryFn: () =>
      axios
        .get(
          `https://api.the-odds-api.com/v4/sports/basketball_nba/odds?regions=us&markets=h2h,spreads,totals&oddsFormat=american&apiKey=${process.env.NEXT_PUBLIC_ODDS_API_KEY}`
        )
        .then(({ data }) => data)
        .catch(() => []),
  });

  const isLoading = status === "pending";

  const groupedEvents = () => {
    if (events.length) {
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

  return (
    <div>
      <section className="p-3 border-b-2 border-border bg-muted flex justify-center w-full">
        <p className="text-lg">NBA Odds and Live Movement</p>
      </section>

      <div className="pagew mx-auto py-10">
        <div className="flex gap-4 overflow-x-scroll px-2.5">
          {options.map((option) => (
            <button className="text-xs text-nowrap" key={option}>
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
                {tableHeaders.map((head, i) => (
                  <TableHead key={head} className={cn("text-black font-bold text-nowrap", i !== 1 && "text-center")}>
                    {head}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupedEvents().map((group: any) => (
                <Fragment key={group.playDay}>
                  <TableRow className="p-0 hover:bg-primary text-white w-full bg-primary font-bold">
                    <TableCell colSpan={7} className="font-bold text-[16px] p-1 pl-5 text-nowrap">
                      {moment(group.playDay).format("llll").toString().slice(0, 17)}
                    </TableCell>
                  </TableRow>

                  {group.events.length ? (
                    group.events.map((event: any) => (
                      <TableRow key={event.id}>
                        <TableCell className="text-xs text-center text-nowrap">
                          {moment(new Date(event.commence_time)).format("LT")}
                        </TableCell>
                        <TableCell>
                          <p className="text-nowrap">{event.home_team}</p>
                          <p className="text-nowrap">{event.away_team}</p>
                        </TableCell>
                        <TableCell className="text-xs text-center">
                          <p>{event.bookmakers[0].markets[1].outcomes[0].price}</p>
                          <p>{event.bookmakers[0].markets[1].outcomes[1].price}</p>
                        </TableCell>
                        <TableCell className="text-xs text-center">
                          <p>o{event.bookmakers[0].markets[2].outcomes[0].point}</p>
                          <p>u{event.bookmakers[0].markets[2].outcomes[1].point}</p>
                        </TableCell>
                        <TableCell className="text-xs text-center">
                          <p>{event.bookmakers[0].markets[0].outcomes[0].price}</p>
                          <p>{event.bookmakers[0].markets[0].outcomes[1].price}</p>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="text-center">
                      <TableCell colSpan={6}>There were no events found</TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default NbaOdds;
