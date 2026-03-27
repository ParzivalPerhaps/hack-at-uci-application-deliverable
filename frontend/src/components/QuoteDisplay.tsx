interface QuoteDisplayProps {
  quote: {
    name: string;
    message: string;
    time: Date;
  };
}

export default function QuoteDisplay({ quote }: QuoteDisplayProps) {
  return (
    <div className="mb-5 w-fit">
      <p className="font-semibold text-2xl">{quote.message}</p>
      <div className="flex gap-2 mt-1">
        <p className="text-[#111111]/60">{quote.name}</p>
        <div className="size-1 bg-[#111111] rounded-full mt-auto mb-auto" />
        <p className="text-[#111111]/60">
          {new Date(quote.time).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
