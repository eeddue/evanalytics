"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";

const posistions = ["ALL", "RB", "QB", "TE", "WR", "DEF", "FB"];
const teams = ["ALL", "SF", "KC"];
const games = ["ALL", "null"];

const tableHeaders = [
  "CURRENT WEEK",
  "OVERALL RANK",
  "NAME",
  "TEAM",
  "POSITION",
  "POSITION RANK",
  // "OPPONENT",
  // "MATCHUP",
  // "HFA",
  // "IMPLIED TEAM TOTAL",
  // "PLAYERS EXPECTED VALUE",
];

type PlayerPops = {
  position: string;
  name: string;
  team: string;
  position_rank: string;
};

function NflWeeklyRanking() {
  const [selectedPos, setSelectedPos] = useState("ALL");
  const [selectedTeam, setSelectedTeam] = useState("ALL");
  const [selectedGame, setSelectedGame] = useState("ALL");

  const { data: players, status } = useQuery({
    queryKey: ["nfl-fantasy"],
    queryFn: () => axios.get("/api/nfl-fantasy").then(({ data }) => data?.players),
  });

  const isLoading = status === "pending";

  return (
    <div className="pagew mx-auto p-5 space-y-4">
      <h1 className="text-2xl text-primary">Weekly Fantasy Rankings</h1>
      <p className="text-xs">
        Shades of shape is currently in a beta phase. We welcome all feedback you have on our products, particularly in
        terms of usability. Our aim is to create products perfectly tailored to our users&apos; needs. Please email us
        at feedback@evanalytics.com or DM us on Twitter @EV_Analytics. Thank you for your support.
      </p>

      <div className="flex items-center gap-3 py-4">
        <p>Search:</p>
        <input type="text" className="w-full max-w-[300px] h-[35px] border-border border-[2px] px-2" />
      </div>

      {/* Positions */}
      <div className="flex items-center gap-2">
        <p className="text-xs">POSITION::</p>
        {posistions.map((pos) => (
          <button
            onClick={() => setSelectedPos(pos)}
            key={pos}
            className={cn("text-xs bg-muted px-3", selectedPos === pos && "bg-primary text-white")}
          >
            {pos}
          </button>
        ))}
      </div>

      {/* Teams */}
      <div className="flex items-center gap-2">
        <p className="text-xs">TEAMS::</p>
        {teams.map((team) => (
          <button
            onClick={() => setSelectedTeam(team)}
            key={team}
            className={cn("text-xs bg-muted px-3", selectedTeam === team && "bg-primary text-white")}
          >
            {team}
          </button>
        ))}
      </div>

      {/* Games */}
      <div className="flex items-center gap-2">
        <p className="text-xs">GAMES::</p>
        {games.map((game) => (
          <button
            onClick={() => setSelectedGame(game)}
            key={game}
            className={cn("text-xs bg-muted px-3", selectedGame === game && "bg-primary text-white")}
          >
            {game}
          </button>
        ))}
      </div>

      {/* Data table */}

      {isLoading ? (
        <Loader size={30} className="animate-spin self-center mx-auto mt-20" />
      ) : (
        <Table className="overflow-x-scroll border-border border-[1px] mt-5">
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary">
              {tableHeaders.map((head) => (
                <TableHead key={head} className="text-xs text-center text-white">
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.length ? (
              players.map((player: PlayerPops, index: number) => (
                <TableRow className={cn(index % 2 === 0 && "bg-muted")} key={player.name}>
                  <TableCell className="text-xs text-center">22</TableCell>
                  <TableCell className="text-xs text-center">{index + 1}</TableCell>
                  <TableCell className="text-xs text-center">{player.name}</TableCell>
                  <TableCell className="text-xs text-center">{player.team}</TableCell>
                  <TableCell className="text-xs text-center">{player.position}</TableCell>
                  <TableCell className="text-xs text-center">{player.position_rank}</TableCell>
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
  );
}

export default NflWeeklyRanking;
