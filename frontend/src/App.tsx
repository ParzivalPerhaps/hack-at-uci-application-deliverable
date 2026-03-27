import { useState } from "react";
import quoteImage from "./assets/quotes.png";
import QuoteIcon from "./components/icons/ArrowIcon";
import ArrowIcon from "./components/icons/ArrowIcon";
import CreateQuoteMenu from "./components/CreateQuoteMenu";

function App() {
  const onQuoteCreationFormSubmit = (ev) => {};

  const [creationMenuActive, setCreationMenuActive] = useState(true);

  return (
    <div className="p-10 pl-20 text-[#111111] w-fit">
      <img src={quoteImage} className="w-15 h-15" />
      <h1 className="text-6xl font-semibold">Hack @ UCI Tech Deliverable</h1>

      <div className="flex">
        <h2
          className={`transition-all duration-75 mt-7 ${!creationMenuActive ? "text-4xl" : "text-3xl text-[#111111]/40"}`}
        >
          Submit a quote
        </h2>
        <div className="mt-auto mb-0 p-1 ml-auto hover:bg-[#111111]/2 rounded-full transition-all duration-75">
          <ArrowIcon
            onClick={() => setCreationMenuActive(!creationMenuActive)}
            className={`cursor-pointer transition-all duration-100 hover:opacity-90 ${creationMenuActive ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>
      <div
        className={`h-px ${!creationMenuActive ? "bg-[#111111]/90" : "bg-[#111111]/40"} mt-4 mb-4 w-full`}
      />
      <CreateQuoteMenu folded={creationMenuActive} />
      <h2>Previous Quotes</h2>
      {/* TODO: Display the actual quotes from the database */}
      <div className="messages">
        <p>Peter Anteater</p>
        <p>Zot Zot Zot!</p>
        <p>Every day</p>
      </div>
    </div>
  );
}

export default App;
