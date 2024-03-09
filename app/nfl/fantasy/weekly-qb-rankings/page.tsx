"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const posistions = ["ALL", "RB", "QB", "TE", "WR", "DEF", "FB"];
const teams = ["ALL", "SF", "KC"];
const games = ["ALL", "null"];

const tableHeaders = [
  "CURRENT WEEK",
  "OVERALL RANK",
  "POSITION RANK",
  "NAME",
  "POSITION",
  "TEAM",
  "OPPONENT",
  "MATCHUP",
  "HFA",
  "IMPLIED TEAM TOTAL",
  "PLAYERS EXPECTED VALUE",
];

function NflWeeklyRanking() {
  const [selectedPos, setSelectedPos] = useState("ALL");
  const [selectedTeam, setSelectedTeam] = useState("ALL");
  const [selectedGame, setSelectedGame] = useState("ALL");

  return (
    <div className="pagew mx-auto p-5 space-y-4">
      <h1 className="text-2xl text-pprimary">Weekly Fantasy Rankings</h1>
      <p className="text-xs">
        EV Analytics is currently in a beta phase. We welcome all feedback you have on our products, particularly in
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
            className={cn("text-xs bg-muted px-3", selectedPos === pos && "bg-pprimary text-white")}
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
            className={cn("text-xs bg-muted px-3", selectedTeam === team && "bg-pprimary text-white")}
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
            className={cn("text-xs bg-muted px-3", selectedGame === game && "bg-pprimary text-white")}
          >
            {game}
          </button>
        ))}
      </div>

      {/* Data table */}
      <Table className="overflow-x-scroll">
        <TableHeader className="bg-pprimary">
          <TableRow>
            {tableHeaders.map((head) => (
              <TableHead key={head} className="text-xs text-center text-white">
                {head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
}

export default NflWeeklyRanking;
