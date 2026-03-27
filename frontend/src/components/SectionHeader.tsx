import ArrowIcon from "./icons/ArrowIcon";

interface SectionHeaderProps {
  header: string;
  folded: boolean;
  onFoldedToggle: () => void;
}

export default function SectionHeader({
  folded,
  onFoldedToggle,
  header,
}: SectionHeaderProps) {
  return (
    <div className="w-full">
      <div className="flex">
        <h2
          className={`transition-all duration-75 mt-7 ${folded ? "text-4xl" : "text-3xl text-[#111111]/40"}`}
        >
          {header}
        </h2>
        <div className="mt-auto mb-0 p-1 ml-auto hover:bg-[#111111]/2 rounded-full transition-all duration-75">
          <ArrowIcon
            onClick={() => onFoldedToggle()}
            className={`cursor-pointer transition-all duration-100 hover:opacity-90 ${!folded ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>
      <div
        className={`h-px ${folded ? "bg-[#111111]/90" : "bg-[#111111]/40"} mt-4 mb-4 w-full`}
      />
    </div>
  );
}
