import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const NavItems = [
  { name: "NFL", href: "/nfl" },
  { name: "MLB", href: "/mlb" },
  { name: "NBA", href: "/nba" },
  { name: "CBB", href: "/cbb" },
  { name: "CFB", href: "/cfb" },
];

function Navbar() {
  return (
    <nav className="w-full bg-black top-0 sticky text-white flex justify-center z-50">
      <header className="flex justify-between items-center pagew p-3">
        <div className="flex space-x-7 items-center">
          <Image src="/images/logo.webp" width={100} height={100} alt="logo" />

          <ul className="md:flex gap-5 hidden">
            {NavItems.map((item) => (
              <Link href="/" key={item.href}>
                {item.name}
              </Link>
            ))}
          </ul>
        </div>

        <div className="flex space-x-5 text-sm">
          <Link href="/">Products</Link>
          <Link href="/">Tools</Link>
          <button>Login</button>

          <Sheet>
            <SheetTrigger className="md:hidden">
              <MenuIcon />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4">
              {[...NavItems, { href: "/products", name: "Products" }, { href: "/tools", name: "Tools" }].map((item) => (
                <p key={item.href}>{item.name}</p>
              ))}
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </nav>
  );
}

export default Navbar;
