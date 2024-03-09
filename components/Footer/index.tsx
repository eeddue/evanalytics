import Image from "next/image";
import Link from "next/link";
import React from "react";

const SECTIONS = [
  {
    title: "",
    links: [
      { title: "Weekly Rankings", href: "/terms-and-conditions" },
      { title: "Privacy policy", href: "/privacy-policy" },
      { title: "Careers", href: "/careers" },
      { title: "About Us", href: "/about-us" },
      { title: "Contact Us", href: "/contact-us" },
    ],
  },
  {
    title: "NFL",
    links: [
      { title: "Weekly Rankings", href: "/nfl/fantasy/weekly-qb-rankings" },
      { title: "Line history", href: "/nfl/odds" },
    ],
  },
  {
    title: "MLB",
    links: [
      { title: "Line History", href: "/mlb/odds" },
      { title: "Line Service", href: "/mlb/line-service" },
    ],
  },
  {
    title: "NBA",
    links: [
      { title: "Line History", href: "/nba/stats/spread" },
      { title: "Game Odds", href: "/nba/odds" },
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
      { title: "Real Time Odds", href: "/products/real-time-odds" },
      { title: "Betting Stats", href: "/products/betting-stats" },
    ],
  },
];

function Footer() {
  return (
    <footer className="w-full bg-[#222] top-0 stickyflex p-10 text-gray-400">
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-5">
        <img src="/images/logo.png" className="mx-auto md:m-0 object-contain w-[150px] h-[150px]" alt="" />

        {SECTIONS.map((section) => {
          return (
            <div className="flex flex-col" key={section.title}>
              <p className="text-bold text-white">{section.title}</p>
              {section.links.map((link) => (
                <Link className="text-sm mt-4 hover:text-primary" href={link.href} key={link.href}>
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
