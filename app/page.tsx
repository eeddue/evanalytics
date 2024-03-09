import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ListItems = [
  {
    title: "Betting Models",
    desc: "Achieve more profitable results by leveraging powerful analytics. Sophisticated betting models handicap the true value of a betting opportunity.",
    img: "/images/betting-models.png",
    href: "/products/betting-models",
  },
  {
    title: "Real-time odds",
    desc: "Shop game odds, team odds, and player prop odds. Identify inefficiencies in the markets and track line movement for deeper insight.",
    img: "/images/realtime-odds.png",
    href: "/products/real-time-odds",
  },
  {
    title: "Betting stats",
    desc: "Explore historical betting results to identify betting trends and profitability. Includes a full suite of ATS stats for a wide range of odds.",
    img: "/images/betting-stats.png",
    href: "/products/betting-stats",
  },
];

export default function Home() {
  return (
    <main className="">
      <div className="h-[90vh] w-full bg-red-400 relative text-center">
        <Image src="/images/background.jpeg" layout="fill" className="w-full h-full object-cover absolute" alt="" />

        <div className="absolute w-full h-full flex flex-col space-y-6 items-center justify-center text-white bg-gradient-to-r from-[#000] to-[#00000099] p-2.5">
          <p className="text-4xl">Bet smart. Win big.</p>
          <p className="text-3xl text-primary">Bet with confidence. Win with pride.</p>
          <Button className="rounded-full bg-primary hover:bg-primary w-[200px] h-[50px]">Start winning</Button>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pagew mx-auto gap-10 py-20 px-2.5">
        {ListItems.map((item) => {
          return (
            <div className="flex flex-col items-center text-center space-y-5" key={item.href}>
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

      <section className="p-2.5 flex flex-col items-center px-10">
        <h2 className="text-2xl text-primary">Our data is trusted by;</h2>
        <hr />

        <div className="relative mt-2.5">
          <img
            src="/images/trustees.webp"
            className="object-contain filter grayscale border-t border-t-black pt-2.5"
            alt=""
          />
        </div>
      </section>
    </main>
  );
}
