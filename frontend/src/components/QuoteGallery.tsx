import { act, useEffect, useState } from "react";
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
}

const timeRangeOptions = [
  {
    title: "This Week",
    maxAge: 6.048e8,
  },
  {
    title: "This Month",
    maxAge: 2.628e9,
  },
  {
    title: "This Year",
    maxAge: 3.154e10,
  },
  {
    title: "Last 4 Years",
    maxAge: 3.154e10 * 4,
  },
  {
    title: "All",
  },
];

export default function QuoteGallery({ folded }: QuoteGalleryProps) {
  const [activeTimeRange, setActiveTimeRange] = useState(4);
  const [loadingQuotes, setLoadingQuotes] = useState(true);
  const [quotes, setQuotes] = useState<
    {
      name: string;
      message: string;
      time: Date;
    }[]
  >([]);

  async function loadData(timeRangeIndex: number) {
    try {
      setLoadingQuotes(true);
      setQuotes(await loadQuotes(timeRangeOptions[timeRangeIndex].maxAge));
    } catch (error) {
    } finally {
      setLoadingQuotes(false);
    }
  }

  useEffect(() => {
    loadData(activeTimeRange);
  }, []);

  return (
    <div
      className={`overflow-hidden ${!folded ? "max-h-0" : "max-h-fit"} transition-max-height duration-100`}
    >
      <div className="flex gap-4 mb-5">
        {timeRangeOptions.map((r, i) => (
          <div
            onClick={() => {
              setActiveTimeRange(i);
              loadData(i);
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
      {!loadingQuotes &&
        quotes.reverse().map((q) => {
          return <QuoteDisplay quote={q} />;
        })}
    </div>
  );
}
