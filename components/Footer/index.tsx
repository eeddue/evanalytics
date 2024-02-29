import React from "react";

const SECTIONS = [
  {
    title: "NFL",
    links: [
      { title: "Real-Time Odds", href: "/nfl/odds" },
      { title: "Betting Models", href: "/nfl/models/players" },
      { title: "Betting Stats", href: "/nfl/stats/spread" },
      { title: "Winning Insights", href: "/nfl/writenow/player-props" },
      { title: "Fantasy", href: "/nfl/fantasy/weekly-qb-rankings" },
    ],
  },
  {
    title: "MLB",
    links: [
      { title: "Real-Time Odds", href: "/mlb/odds" },
      { title: "Betting Models", href: "/mlb/models/players" },
      { title: "Betting Stats", href: "/mlb/stats/spread" },
      { title: "Leaderboards", href: "/mlb/leaderboard/projections-totals" },
      { title: "Reasearch Data", href: "/mlb/research/statscast-correlations" },
    ],
  },
  {
    title: "NBA",
    links: [
      { title: "Real-Time Odds", href: "/nba/odds" },
      { title: "Betting Models", href: "/nba/models/players" },
      { title: "Betting Stats", href: "/nba/stats/spread" },
    ],
  },
];

function Footer() {
  return (
    <footer className="w-full bg-black top-0 sticky text-white flex justify-center">
      <section className="grid grid-cols-9"></section>
    </footer>
  );
}

export default Footer;
