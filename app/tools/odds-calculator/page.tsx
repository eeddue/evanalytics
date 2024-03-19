"use client";

import React, { useState } from "react";

function OddsCalculator() {
  const [american, setAmerican] = useState<number | string>("");
  const [decimal, setDecimal] = useState<number | string>("");
  const [fractional, setFractional] = useState<number | string>("");
  const [probability, setProbability] = useState<number | string>("");

  const handleKeyDown = (event: any, type: string) => {};
  return (
    <div className="">
      <section className="p-3 border-b-2 border-border bg-muted flex justify-center w-full">
        <p className="text-lg">Odds calculator</p>
      </section>

      <section className="mx-auto w-full max-w-[550px] m-3 mt-5 rounded-xl border-border border-2 overflow-hidden">
        <div className="bg-primary p-3 text-white text-center">
          <p className="text-lg font-bold">Calculate Your Odds and Implied Probability</p>
          <p className="text-sm">Simply type in the field pertaining to you and hit enter!</p>
        </div>

        <div className="bg-muted flex flex-col items-center py-6 gap-2.5">
          <div className="grid grid-cols-2 gap-3 items-center">
            <p className="text-end">Moneyline / American</p>
            <input
              type="number"
              className="h-[40px] bg-white rounded-md"
              value={american}
              onChange={(e) => setAmerican(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "american")}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 items-center">
            <p className="text-end">Decimal / European</p>
            <input
              type="number"
              className="h-[40px] bg-white rounded-md"
              value={decimal}
              onChange={(e) => setDecimal(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "decimal")}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 items-center">
            <p className="text-end">Fractional / UK</p>
            <input
              type="number"
              className="h-[40px] bg-white rounded-md"
              value={fractional}
              onChange={(e) => setFractional(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "fractional")}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 items-center">
            <p className="text-end">Implied Probability</p>
            <input
              type="number"
              className="h-[40px] bg-white rounded-md"
              value={probability}
              onChange={(e) => setProbability(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "probability")}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default OddsCalculator;
