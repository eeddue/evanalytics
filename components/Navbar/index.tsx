import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SignInButton from "./SignInButton";

const NavItems = [
  {
    name: "NFL",
    href: "/nfl",
    links: [
      { link: "/nfl/odds", title: "Line History" },
      { link: "/nfl/fantasy/weekly-qb-rankings", title: "Weekly Rankings" },
    ],
  },
  {
    name: "MLB",
    href: "/mlb",
    links: [
      { link: "/mlb/odds", title: "Line History" },
      { link: "/mlb/stats/run-line", title: "Against the spread (ATS)" },
    ],
  },
  {
    name: "NBA",
    href: "/nba",
    links: [
      { link: "/nba/odds", title: "Line History" },
      { link: "/nba/stats/spread", title: "Game Odds" },
    ],
  },
  {
    name: "NCAAB",
    href: "/ncaab",
    links: [
      { link: "/ncaab/odds", title: "Line History" },
      { link: "/ncaab/stats/spread", title: "Game Odds" },
    ],
  },
  {
    name: "NCAAF",
    href: "/ncaaf",
    links: [
      { link: "/ncaaf/odds", title: "Line History" },
      { link: "/ncaaf/stats/spread", title: "Game Odds" },
    ],
  },
];

const RightNavItems = [
  {
    name: "Tools",
    href: "/tools",
    links: [
      { link: "/tools/player-prop-calculator", title: "Player Prop Calculator" },
      { link: "/tools/odds-calculator", title: "Odds Calculator" },
    ],
  },
];

function Navbar() {
  return (
    <nav className="w-full border-border border-b-2 bg-white top-0 sticky flex justify-center z-50">
      <header className="flex justify-between items-center pagew p-3">
        <div className="flex space-x-7 items-center">
          <Link href="/">
            <img src="/images/icon.png" className="w-[40px] md:w-[50px] h-[40px] md:h-[50px] object-cover" alt="logo" />
          </Link>

          <ul className="md:flex gap-5 hidden">
            {NavItems.map((item) => (
              <HoverCard key={item.href}>
                <HoverCardTrigger className="cursor-pointer hover:text-primary hover:font-bold">
                  {item.name}
                </HoverCardTrigger>
                <HoverCardContent className="flex flex-col p-2 gap-3">
                  {item.links.map((link) => (
                    <Link key={link.link} href={link.link} className="text-sm hover:font-bold hover:text-primary">
                      {link.title}
                    </Link>
                  ))}
                </HoverCardContent>
              </HoverCard>
            ))}
          </ul>
        </div>

        <div className="flex space-x-5 text-sm items-center">
          <ul className="md:flex gap-5 hidden">
            {RightNavItems.map((item) => (
              <HoverCard key={item.href}>
                <HoverCardTrigger className="cursor-pointer hover:text-primary hover:font-bold">
                  {item.name}
                </HoverCardTrigger>
                <HoverCardContent className="flex flex-col p-2 gap-3 bg-white">
                  {item.links.map((link) => (
                    <Link key={link.link} href={link.link} className="text-sm hover:font-bold hover:text-primary">
                      {link.title}
                    </Link>
                  ))}
                </HoverCardContent>
              </HoverCard>
            ))}
          </ul>
          <SignInButton />

          <Sheet>
            <SheetTrigger className="md:hidden">
              <MenuIcon />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4 overflow-y-scroll">
              <SheetHeader className="border-b border-border pb-2">
                <SheetTitle className="text-primary">Shades Of Shape</SheetTitle>
                <SheetDescription>Bet with confidence. Win with pride.</SheetDescription>
              </SheetHeader>
              {[...NavItems, ...RightNavItems].map((item, i) => (
                <Accordion key={item.href} type="single" collapsible>
                  <AccordionItem value={i.toString()}>
                    <AccordionTrigger className="hover:text-primary">{item.name}</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2 ml-4">
                      {item.links.map((link, index) => (
                        <SheetClose asChild key={index}>
                          <Link href={link.link} className="text-sm hover:font-bold hover:text-primary">
                            {link.title}
                          </Link>
                        </SheetClose>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </nav>
  );
}

export default Navbar;
