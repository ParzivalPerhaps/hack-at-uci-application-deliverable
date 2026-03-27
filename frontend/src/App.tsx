import { useState } from "react";
import quoteImage from "./assets/quotes.png";
import QuoteIcon from "./components/icons/ArrowIcon";
import ArrowIcon from "./components/icons/ArrowIcon";
import CreateQuoteMenu from "./components/CreateQuoteMenu";
import SectionHeader from "./components/SectionHeader";
import QuoteGallery from "./components/QuoteGallery";

function App() {
  const onQuoteCreationFormSubmit = (ev) => {};

  const [creationMenuActive, setCreationMenuActive] = useState(true);
  const [quotesGalleryActive, setQuotesGalleryActive] = useState(true);

  return (
    <div className="p-10 pl-20 text-[#111111] w-fit">
      <img src={quoteImage} className="w-15 h-15" />
      <h1 className="text-6xl font-semibold">Hack @ UCI Tech Deliverable</h1>
      <SectionHeader
        header="Submit a quote"
        folded={!creationMenuActive}
        onFoldedToggle={() => setCreationMenuActive(!creationMenuActive)}
      />
      <CreateQuoteMenu folded={creationMenuActive} />
      <SectionHeader
        header="Previous Quotes"
        folded={!quotesGalleryActive}
        onFoldedToggle={() => setQuotesGalleryActive(!quotesGalleryActive)}
      />
      <QuoteGallery
        folded={!quotesGalleryActive}
        quotes={[
          {
            message: "Zot Zot Zot!",
            name: "Peter Anteater",
            time: new Date("1965-11-30T13:52:09"),
          },
          {
            message: "Zot Zot Zot!",
            name: "Peter Anteater",
            time: new Date("1965-11-30T13:52:09"),
          },
        ]}
      />
    </div>
  );
}

export default App;
