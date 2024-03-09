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

const NavItems = [
  {
    name: "NFL",
    href: "/nfl",
    links: [
      { link: "/nfl/fantasy/weekly-qb-rankings", title: "Weekly Rankings" },
      { link: "/nfl/odds", title: "Line History" },
    ],
  },
  {
    name: "MLB",
    href: "/mlb",
    links: [
      { link: "/mlb/odds", title: "Line History" },
      { link: "/mlb/line-service", title: "Line Service" },
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
    name: "CBB",
    href: "/cbb",
    links: [
      { link: "/cbb/odds", title: "Line History" },
      { link: "/cbb/stats/spread", title: "Game Odds" },
    ],
  },
  {
    name: "CFB",
    href: "/cfb",
    links: [
      { link: "/cfb/odds", title: "Line History" },
      { link: "/cfb/stats/spread", title: "Game Odds" },
    ],
  },
];

const RightNavItems = [
  {
    name: "Products",
    href: "/products",
    links: [
      { link: "/products/writenow", title: "WriteNow" },
      { link: "/products/betting-models", title: "Betting Models" },
    ],
  },
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
          <button>Login</button>

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
                      {item.links.map((link) => (
                        <SheetClose asChild key={link.link}>
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
