import React from "react";

const players = ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5", "Player 6", "Player 7", "Player 8"];
const options = ["Shots on goal", "Totals"];

function PlayerPropCalculator() {
  return (
    <div className="pagew mx-auto">
      <section className="mx-auto w-full max-w-[550px] m-3 mt-5">
        <div className="bg-primary p-3 text-white text-center">
          <p className="text-lg font-bold">Player Prop Calculator</p>
          <p className="text-sm">Choose a Player & Prop to Calculate Win% and Expected Value</p>
          <p className="text-xs">* this demo is using sample data only</p>
        </div>

        <div className="flex p-2.5 bg-black gap-5 px-10 py-5">
          <select className="h-[40px] flex-1 px-2.5 rounded-lg">
            {players.map((player, index) => (
              <option key={index} className="">
                {player}
              </option>
            ))}
          </select>
          <select className="h-[40px] flex-1 px-2.5 rounded-lg">
            {options.map((option, index) => (
              <option key={index} className="">
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="border-border border-2 rounded-b-lg">
          <div className="border-b-border border-b-2 py-3 flex flex-col">
            <div className="flex self-center items-center gap-4">
              <p className="text-primary text-2xl">Line : 2.5</p>
              <button className="bg-primary w-[20px] h-[20px] rounded-sm text-white text-lg flex items-center justify-center">
                +
              </button>
              <button className="bg-primary w-[20px] h-[20px] rounded-sm text-white text-lg flex items-center justify-center">
                -
              </button>
            </div>
          </div>

          <div className="p-5 px-10 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="underline text-xl">Over</p>
              <p className="underline text-xl">Under</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex self-center items-center gap-2">
                <p className="text-primary text-2xl">-100</p>
                <button className="bg-primary w-[20px] h-[20px] rounded-sm text-white text-lg flex items-center justify-center">
                  +
                </button>
                <button className="bg-primary w-[20px] h-[20px] rounded-sm text-white text-lg flex items-center justify-center">
                  -
                </button>
              </div>

              <p className="text-xl">Juice</p>

              <div className="flex self-center items-center gap-2">
                <button className="bg-primary w-[20px] h-[20px] rounded-sm text-white text-lg flex items-center justify-center">
                  +
                </button>
                <button className="bg-primary w-[20px] h-[20px] rounded-sm text-white text-lg flex items-center justify-center">
                  -
                </button>
                <p className="text-primary text-2xl">-130</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-xl text-primary">47.81</p>
              <p className="text-xl">Win %</p>
              <p className="text-xl text-primary">52.19</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-xl text-primary">-4.37</p>
              <p className="text-xl">Expected value</p>
              <p className="text-xl text-primary">-9.97</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PlayerPropCalculator;
