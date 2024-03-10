import Link from "next/link";
import React from "react";

const SECTIONS = [
  {
    title: "",
    links: [
      { title: "Terms & conditions", href: "/terms-and-conditions" },
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
    title: "CBB",
    links: [
      { title: "Line History", href: "/cbb/stats/spread" },
      { title: "Game Odds", href: "/cbb/odds" },
    ],
  },
  {
    title: "CFB",
    links: [
      { title: "Line History", href: "/cfb/stats/spread" },
      { title: "Game Odds", href: "/cfb/odds" },
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
      { title: "Betting Models", href: "/products/betting-models" },
      { title: "Writenow", href: "/products/writenow" },
    ],
  },
];

function Footer() {
  return (
    <footer className="w-full bg-[#222] top-0 stickyflex p-10 text-gray-400">
      <section className="grid grid-cols-7 gap-2.5">
        <div className="col-span">
          <img src="/images/logo.png" className="mx-auto md:m-0 object-contain w-[150px] h-[150px]" alt="" />
        </div>

        <div className="grid col-span-6 grid-cols-6 gap-2.5">
          {SECTIONS.map((section) => {
            return (
              <div className="flex flex-col col-span-1" key={section.title}>
                <p className="text-bold text-white">{section.title}</p>
                {section.links.map((link) => (
                  <Link className="text-sm mt-4 hover:text-primary" href={link.href} key={link.href}>
                    {link.title}
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </section>
    </footer>
  );
}

export default Footer;
