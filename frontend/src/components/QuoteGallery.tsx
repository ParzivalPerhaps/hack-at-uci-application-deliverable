import { useEffect, useState } from "react";
import QuoteDisplay from "./QuoteDisplay";
import SpinnerIcon from "./icons/SpinnerIcon";
import { loadQuotes } from "../lib/api";

interface QuoteGalleryProps {
  folded: boolean;
  quotes: {
    name: string;
    message: string;
    time: Date;
  }[];
  loadingQuotes: boolean;
  activeTimeRange: number;
  timeRangeOptions: any[];
  updateActiveTimeRange: (i: number) => void;
}

export default function QuoteGallery({
  folded,
  quotes,
  loadingQuotes,
  activeTimeRange,
  updateActiveTimeRange,
  timeRangeOptions,
}: QuoteGalleryProps) {
  return (
    <div
      className={`overflow-hidden max-w-full ${!folded ? "max-h-0" : "max-h-fit"} transition-max-height duration-100`}
    >
      <div className="flex flex-wrap gap-4 mb-5">
        {timeRangeOptions.map((r, i) => (
          <div
            key={"time-range-" + i}
            onClick={() => {
              updateActiveTimeRange(i);
            }}
            className={`border-1 pl-3 cursor-pointer pr-3 rounded-[5px] hover:bg-[#111111]/1 ${i === activeTimeRange ? "border-[#111111]/90" : "border-[#111111]/30"}`}
          >
            <p
              className={`${i === activeTimeRange ? "text-[#111111]/90" : "text-[#111111]/70"}`}
            >
              {r.title}
            </p>
          </div>
        ))}
      </div>
      {loadingQuotes && <SpinnerIcon className="size-10 animate-spin" />}
      {!loadingQuotes && (
        <div className="min-[950px]:max-h-135 w-full overflow-y-auto overflow-x-hidden pr-5">
          {quotes.reverse().map((q, i) => {
            return <QuoteDisplay key={"quote-display-" + i} quote={q} />;
          })}
        </div>
      )}
    </div>
  );
}
