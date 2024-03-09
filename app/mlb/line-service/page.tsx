"use client";

import React from "react";

function MlbLineService() {
  return (
    <div>
      <section className="p-3 border-b-2 border-border bg-muted flex justify-center w-full">
        <p className="text-lg">Line Service - MLB</p>
      </section>

      <div className="p-2 pagew mx-auto">
        <p className="text-xs">
          EV Analytics is currently in a beta phase. We welcome all feedback you have on our products, particularly in
          terms of usability. Our aim is to create products perfectly tailored to our users&apos; needs. Please email us
          at feedback@evanalytics.com or DM us on Twitter @EV_Analytics. Thank you for your support.
        </p>

        <div className="flex items-center flex-wrap gap-8 my-5">
          <div className="flex items-center gap-2">
            <p className="text-sm">Search:</p>
            <input
              type="text"
              placeholder="Enter text to search..."
              className="w-full max-w-[200px] h-[30px] border-border border-[2px] px-2 text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <p className="text-sm">Type:</p>
            <select name="" id="" className="border-border border-2"></select>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-sm">Category:</p>
            <select name="" id="" className="border-border border-2"></select>
          </div>

          <button className="text-sm bg-muted p-1 px-2">Sites</button>

          <div className="flex items-center gap-2">
            <p className="text-sm">Zoom grid:</p>
            <div className="flex items-center gap-2">
              <button className="border-border border-2 px-2 bg-muted">+</button>
              <button className="border-border border-2 px-2 bg-muted">-</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MlbLineService;
