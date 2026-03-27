import { useEffect, useState } from "react";
import quoteImage from "./assets/quotes.png";
import QuoteIcon from "./components/icons/ArrowIcon";
import ArrowIcon from "./components/icons/ArrowIcon";
import CreateQuoteMenu from "./components/CreateQuoteMenu";
import SectionHeader from "./components/SectionHeader";
import QuoteGallery from "./components/QuoteGallery";
import { loadQuotes } from "./lib/api";

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

function App() {
  const [creationMenuActive, setCreationMenuActive] = useState(true);
  const [quotesGalleryActive, setQuotesGalleryActive] = useState(true);

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
    <div className="p-10 pl-20 text-[#111111] w-10/12 max-w-full overflow-x-hidden">
      <img src={quoteImage} className="w-15 h-15" />
      <h1 className="text-6xl font-semibold max-[1000px]:text-5xl">
        Hack @ UCI Tech Deliverable
      </h1>
      <SectionHeader
        header="Submit a quote"
        folded={!creationMenuActive}
        onFoldedToggle={() => setCreationMenuActive(!creationMenuActive)}
      />
      <CreateQuoteMenu
        onQuoteAdded={(q) => {
          loadData(activeTimeRange);
        }}
        folded={creationMenuActive}
      />
      <SectionHeader
        header="Previous Quotes"
        folded={!quotesGalleryActive}
        onFoldedToggle={() => setQuotesGalleryActive(!quotesGalleryActive)}
      />
      <QuoteGallery
        folded={!quotesGalleryActive}
        quotes={quotes}
        loadingQuotes={loadingQuotes}
        activeTimeRange={activeTimeRange}
        timeRangeOptions={timeRangeOptions}
        updateActiveTimeRange={(i) => {
          setActiveTimeRange(i);
          loadData(i);
        }}
      />
    </div>
  );
}

export default App;
