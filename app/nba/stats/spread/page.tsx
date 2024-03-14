"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";

const topTableTopOtions = ["Spread", "Total", "Moneyline"];
const bootomTableTopOtions = [
  "1H - Spread",
  "1H - Total",
  "1H - Moneyline",
  "1Q - Spread",
  "1Q - Total",
  "2Q - Spread",
  "2Q - Total",
  "3Q - Spread",
  "3Q - Total",
  "4Q - Spread",
  "4Q - Total",
  "Team Total",
];
const seasons = ["2023-2024", "2022-2023", "2021-2022"];
const seasonTypes = ["Season", "Regular", "Playoffs"];
const games = ["ALL", "Last 10", "Last 5", "Last 3"];
const sides = ["BOTH", "Home", "Away"];
const tableHeaders = ["Season", "Season Type", "Team", "Win", "Loss", "Push", "Units", "ROI"];

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

function NbaStatsSpread() {
  const [selectedSn, setSelectedSn] = useState("2023-2024");
  const [selectedSnType, setSelectedSnType] = useState("Season");
  const [selectedGame, setSelectedGame] = useState("ALL");
  const [selectedSide, setSelectedSide] = useState("BOTH");

  const { data: events, status } = useQuery({
    queryKey: ["nbaSpread", selectedSn],
    queryFn: () =>
      axios
        .get(
          `https://api.sportsdata.io/v3/nba/scores/json/TeamSeasonStats/${
            selectedSn.split("-")[0]
          }?key=b84b94e7e7084ec48dbef86df6dd82f1`
        )
        .then(({ data }) => data)
        .catch(() => []),
  });

  const isLoading = status === "pending";

  return (
    <div className="pagew mx-auto p-5 space-y-4">
      <h1 className="text-2xl text-primary">NBA Betting Stats - Against The Spread (ATS) - Spread</h1>
      <p className="">NBA Spread betting stats by season, team and home/away splits</p>
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

          <div className="border-border border-[1px] mt-4">
            <div className="text-white">
              <div className="bg-primary px-2 py-1 text-sm">GAME PROPS</div>
            </div>

            <div className="flex flex-col p-2 gap-1.5">
              {bootomTableTopOtions.map((opt) => (
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
                className={cn("text-xs bg-muted px-3 py-[1px]", selectedSnType === seasonTp && "bg-primary text-white")}
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
            <Loader size={40} className="animate-spin self-center mt-20" />
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
                      <TableCell className="text-xs">{selectedSnType}</TableCell>
                      <TableCell className="text-xs">{event.Name}</TableCell>
                      <TableCell className="text-xs">{event.Wins}</TableCell>
                      <TableCell className="text-xs">{event.Losses}</TableCell>
                      <TableCell className="text-xs">{event.Losses}</TableCell>
                      <TableCell className="text-xs">{event.Season}</TableCell>
                      <TableCell className="text-xs">{event.Season}</TableCell>
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
  );
}

export default NbaStatsSpread;
