"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

function CfbOdds() {
  const { data: events } = useQuery({
    queryKey: ["cfbEvents"],
    queryFn: () => {
      return [];
    },
  });

  return (
    <div className="pagew mx-auto">
      <section className="p-3 border-b-2 border-border bg-muted flex justify-center w-full">
        <p className="text-lg">College Football Odds and Live Movement</p>
      </section>
    </div>
  );
}

export default CfbOdds;
