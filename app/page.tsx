"use client";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ListItems = [
  {
    title: "SmartBet Insights",
    desc: "Gain a competitive edge with advanced analytics. Real-time odds and historical stats for smarter betting decisions.",
    img: "/images/betting-models.png",
    href: "/products/betting-models",
  },
  {
    title: "OddsMaster Pro",
    desc: "Elevate your game with real-time odds tracking.Uncover value opportunities and ride the waves of profitability.",
    img: "/images/realtime-odds.png",
    href: "/products/writenow",
  },
  {
    title: "StatEdge Lite",
    desc: "Elevate your game with real-time odds tracking.Uncover value opportunities and ride the waves of profitability.",
    img: "/images/betting-stats.png",
    href: "/products/writenow",
  },
];

export default function Home() {
  const router = useRouter();
  const { user, signInWithGoogle } = useAppContext();

  const onClick = () => {
    if (!user) return signInWithGoogle();
    return router.push("/nba/odds");
  };

  return (
    <main className="">
      <div className="h-[90vh] w-full bg-red-400 relative text-center">
        <Image src="/images/background.jpeg" layout="fill" className="w-full h-full object-cover absolute" alt="" />

        <div className="absolute w-full h-full flex flex-col space-y-6 items-center justify-center text-white bg-gradient-to-r from-[#000] to-[#00000099] p-2.5">
          <p className="text-4xl">Bet smart. Win big.</p>
          <p className="text-3xl text-primary">Bet with confidence. Win with pride.</p>

          <Button onClick={onClick} className="rounded-full bg-primary hover:bg-primary w-[200px] h-[50px]">
            Start winning
          </Button>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pagew mx-auto gap-10 py-20 px-2.5">
        {ListItems.map((item) => {
          return (
            <div className="flex flex-col items-center text-center space-y-5" key={item.title}>
              <Image src={item.img} width={110} height={110} alt="" />
              <h1 className="bold text-2xl">{item.title}</h1>
              <p className="text-sm">{item.desc}</p>
              <Link href={item.href}>
                <Button className="bg-primary hover:bg-primary rounded-full">Learn more</Button>
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
}
