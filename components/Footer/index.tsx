import Image from "next/image";
import Link from "next/link";
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
  {
    title: "Tools",
    links: [
      { title: "Prayer Prop Calculator", href: "/tools/player-prop-calculator" },
      { title: "Odds Calculator", href: "/tools/odds-calculator" },
    ],
  },
  {
    title: "Products",
    links: [
      { title: "Write now", href: "/products/writenow" },
      { title: "Betting Models", href: "/products/betting-models" },
      { title: "Real Time Odds", href: "/products/real-time-odds" },
      { title: "Betting Stats", href: "/products/betting-stats" },
      { title: "Business Solutions", href: "/products/business-solutions" },
    ],
  },
];

function Footer() {
  return (
    <footer className="w-full bg-[#222] top-0 stickyflex p-10 text-gray-400">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        <div className="">
          <img src="/images/logo.png" className="object-contain w-[150px] h-[150px]" alt="" />

          <ul className="flex flex-col">
            <Link className="text-sm mt-4" href="/terms-and-conditions">
              Terms & conditions
            </Link>
            <Link className="text-sm mt-4" href="/privacy-policy">
              Privacy policy
            </Link>
            <Link className="text-sm mt-4" href="/carees">
              Careers
            </Link>
            <Link className="text-sm mt-4" href="/about-us">
              About us
            </Link>
            <Link className="text-sm mt-4" href="/Contact us">
              Contact us
            </Link>
          </ul>
        </div>

        {SECTIONS.map((section) => {
          return (
            <div className="flex flex-col col-span-1" key={section.title}>
              <p className="text-bold text-white">{section.title}</p>
              {section.links.map((link) => (
                <Link className="text-sm mt-4" href={link.href} key={link.href}>
                  {link.title}
                </Link>
              ))}
            </div>
          );
        })}
      </section>
    </footer>
  );
}

export default Footer;
