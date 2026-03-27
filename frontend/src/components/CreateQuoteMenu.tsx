import { useState } from "react";
import { addQuote } from "../lib/api";

interface CreateQuoteMenuProps {
  folded: boolean;
  onQuoteAdded: (newQuote: { name: string; message: string }) => void;
}

export default function CreateQuoteMenu({
  folded,
  onQuoteAdded,
}: CreateQuoteMenuProps) {
  const [quoteAuthor, setQuoteAuthor] = useState("");
  const [quoteContent, setQuoteContent] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        try {
          const newQuote = await addQuote({
            message: quoteContent,
            name: quoteAuthor,
          });

          onQuoteAdded(newQuote);

          setQuoteAuthor("");
          setQuoteContent("");
        } catch (error) {}
      }}
      className={`overflow-hidden ${folded ? "max-h-0" : "max-h-fit"} transition-max-height duration-100`}
    >
      {/* TODO: implement custom form submission logic to not refresh the page */}
      <label htmlFor="input-name" className="p-1 text-[#111111]/70 block pl-0">
        Name
      </label>
      <input
        type="text"
        className="peer outline-none border-b-[1px] p-1.5 pt-0 pr-3 w-2/3 pl-0 border-[#111111]/40 focus:border-[#111111]/80 transition-all duration-75"
        name="name"
        id="input-name"
        value={quoteAuthor}
        onChange={(e) => setQuoteAuthor(e.target.value)}
        required
      />
      <label
        htmlFor="input-message"
        className={"p-1 text-[#111111]/70 block pl-0 mt-3"}
      >
        Quote
      </label>
      <input
        type="text"
        className="outline-none border-b-[1px] p-1.5 pr-3 w-2/3 pt-0 pl-0 border-[#111111]/40 focus:border-[#111111]/80 transition-all duration-75"
        name="message"
        id="input-message"
        value={quoteContent}
        onChange={(e) => setQuoteContent(e.target.value)}
        required
      />
      <br />
      <button
        disabled={
          !quoteContent ||
          !quoteAuthor ||
          quoteContent.trim().length == 0 ||
          quoteAuthor.trim().length == 0
        }
        type="submit"
        className="mt-5 border-[1px] rounded-[4px] disabled:cursor-not-allowed cursor-pointer not-disabled:border-[#111111]/80 disabed:border-[#111111]/30 disabled:text-[#111111]/30 not-disabled:hover:bg-[#111111]/2 p-1 pl-4 pr-4 transition-all duration-75"
      >
        Submit
      </button>
    </form>
  );
}
