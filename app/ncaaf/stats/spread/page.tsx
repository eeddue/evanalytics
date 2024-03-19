"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

const topTableTopOtions = ["Spread", "Total", "Moneyline"];
const seasons = ["2023", "2022", "2021"];
const games = ["Season", "Last 5", "Last 3"];
const sides = ["BOTH", "Home", "Away"];
const tableHeaders = ["Season", "Team", "Win", "Loss", "Push"];

type EventProps = {
  Season: string;
  SeasonType: string;
  Team: string;
  Name: string;
  Wins: number;
  Losses: number;
  Push: number;
  Units: number;
  Roi: number;
};

function CfbStatsSpread() {
  const [selectedSn, setSelectedSn] = useState("2023");
  const [selectedGame, setSelectedGame] = useState("Season");
  const [selectedSide, setSelectedSide] = useState("BOTH");

  const { data: events, status } = useQuery({
    queryKey: ["ncaafSpread", selectedSn],
    queryFn: () =>
      axios
        .get(
          `https://api.sportsdata.io/v3/ncaaf/scores/json/TeamSeasonStats/${
            selectedSn.split("-")[0]
          }?key=b84b94e7e7084ec48dbef86df6dd82f1`
        )
        .then(({ data }) => data)
        .catch(() => []),
  });

  const isLoading = status === "pending";

  return (
    <div className="pagew mx-auto">
      <div className="pagew mx-auto p-5 space-y-4">
        <h1 className="text-2xl text-primary">NCAAF Betting Stats - Against The Spread (ATS) - Spread</h1>
        <p className="">
          Explore historical betting results to identify betting trends and profitability. Records are for the consensus
          odd and closing line.
        </p>

        <section className="grid grid-cols-1 lg:grid-cols-6 gap-5">
          <div className="col-span-1 w-full">
            <div className="border-border border-[1px] rounded-l-2xl overflow-hidden">
              <div className="text-white">
                <div className="bg-primary px-2 py-1 text-sm">GAME ODDS</div>
              </div>

              <div className="flex flex-col p-2 gap-1.5">
                {topTableTopOtions.map((opt) => (
                  <button className="text-start text-primary text-sm" key={opt}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-3">
            {/* Input search */}
            <div className="flex items-center gap-3">
              <p className="text-sm">Search:</p>
              <input type="text" className="w-full max-w-[300px] h-[35px] border-border border-[2px] px-2" />
            </div>

            {/* Seasons */}
            <div className="flex items-center gap-2">
              <p className="text-xs">Season:</p>
              {seasons.map((season) => (
                <button
                  onClick={() => setSelectedSn(season)}
                  key={season}
                  className={cn("text-xs bg-muted px-3 py-[1px]", selectedSn === season && "bg-primary text-white")}
                >
                  {season}
                </button>
              ))}
            </div>

            {/* Games and sides */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <p className="text-xs">Games:</p>
                {games.map((game) => (
                  <button
                    onClick={() => setSelectedGame(game)}
                    key={game}
                    className={cn("text-xs bg-muted px-3 py-[1px]", selectedGame === game && "bg-primary text-white")}
                  >
                    {game}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 lg:ml-10">
                <p className="text-xs">Side:</p>
                {sides.map((side) => (
                  <button
                    onClick={() => setSelectedSide(side)}
                    key={side}
                    className={cn("text-xs bg-muted px-3 py-[1px]", selectedSide === side && "bg-primary text-white")}
                  >
                    {side}
                  </button>
                ))}
              </div>
            </div>

            {/* Teams list */}
            {isLoading ? (
              <Loader size={30} className="animate-spin self-center mt-20" />
            ) : (
              <Table className="overflow-x-scroll border-border border-[1px] mt-5">
                <TableHeader className="bg-primary">
                  <TableRow className="hover:bg-primary">
                    {tableHeaders.map((head, i) => (
                      <TableHead key={head} className="font-bold text-white text-sm">
                        {head}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.length ? (
                    events.map((event: EventProps, index: number) => (
                      <TableRow className={cn(index % 2 === 0 && "bg-muted")} key={event.Team}>
                        <TableCell className="!p-0 text-center text-xs">{event.Season}</TableCell>
                        <TableCell className="text-xs">{event.Name}</TableCell>
                        <TableCell className="text-xs">{event.Wins}</TableCell>
                        <TableCell className="text-xs">{event.Losses}</TableCell>
                        <TableCell className="text-xs">{event.Losses}</TableCell>
                        {/* <TableCell className="text-xs">{event.Season}</TableCell>
                      <TableCell className="text-xs">{event.Season}</TableCell> */}
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
        </section>
      </div>
    </div>
  );
}

export default CfbStatsSpread;
