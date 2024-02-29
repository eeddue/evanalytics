import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

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

          <ul className="flex gap-5">
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
        </div>
      </header>
    </nav>
  );
}

export default Navbar;
