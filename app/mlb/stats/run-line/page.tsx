"use client";

import axios from "axios";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const sides = ["BOTH", "Home", "Away"];
const seasons = ["2023", "2022", "2021"];
const games = ["Season", "Last 5", "Last 3"];
const topTableTopOtions = ["Run the line", "Total", "Moneyline"];
const seasonTypes = ["Season", "Spring Training", "Regular", "Playoffs"];
const tableHeaders = ["Season", "Team", "Win", "Loss", "Home", "Away", "Streak"];

type EventProps = {
  team: string;
  losses: string;
  wins: string;
  streak: string;
  home: number;
  away: string;
  season: string;
};

function MlbStarsRunline() {
  const [selectedSn, setSelectedSn] = useState("2023");
  const [selectedGame, setSelectedGame] = useState("Season");
  const [selectedSide, setSelectedSide] = useState("BOTH");
  const [selectedSnType, setSelectedSnType] = useState("Season");

  const { data: events, status } = useQuery({
    queryKey: ["ncaabSpread", selectedSn],
    queryFn: () =>
      axios
        .get(`/api/mlb/stats/run-line`)
        .then(({ data }) => data?.events)
        .catch(() => []),
  });

  const isLoading = status === "pending";

  return (
    <div className="pagew mx-auto">
      <div className="pagew mx-auto p-3 space-y-4">
        <h1 className="text-2xl text-primary">MLB Betting Stats - Against The Spread (ATS) - Run Line</h1>
        <p className="">
          Explore historical betting results to identify betting trends and profitability. Records are for the consensus
          odd and closing line.
        </p>

        <p className="text-xs">
          Shades of shape is currently in a beta phase. We welcome all feedback you have on our products, particularly
          in terms of usability. Our aim is to create products perfectly tailored to our users&apos; needs.
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

            {/* Season types */}
            <div className="flex items-center gap-2">
              <p className="text-xs">Season Type:</p>
              {seasonTypes.map((seasonTp) => (
                <button
                  onClick={() => setSelectedSnType(seasonTp)}
                  key={seasonTp}
                  className={cn(
                    "text-xs bg-muted px-3 py-[1px]",
                    selectedSnType === seasonTp && "bg-primary text-white"
                  )}
                >
                  {seasonTp}
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
                      <TableHead key={head} className={cn("font-bold text-white text-sm", i !== 1 && "text-center")}>
                        {head}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.length ? (
                    events.map((event: EventProps, index: number) => (
                      <TableRow className={cn(index % 2 === 0 && "bg-muted")} key={index}>
                        <TableCell className="text-center text-xs">{selectedSn}</TableCell>
                        <TableCell className="text-xs">{event.team}</TableCell>
                        <TableCell className="text-xs text-center">{event.wins}</TableCell>
                        <TableCell className="text-xs text-center">{event.losses}</TableCell>
                        <TableCell className="text-xs text-center">{event.home}</TableCell>
                        <TableCell className="text-xs text-center">{event.away}</TableCell>
                        <TableCell className="text-xs text-center">{event.streak}</TableCell>
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

export default MlbStarsRunline;
