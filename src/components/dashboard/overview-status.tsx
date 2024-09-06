import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function OverviewStatus() {
  const keywords = [
    { img: "/tiketdotcom-icon.png", text: "Ticket", count: 2 },
    { img: "/traveloka-icon.png", text: "Traveloka", count: 2 },
    { img: "/tripadvisor-icon.png", text: "Tripadvisor", count: 2 },
  ];

  return (
    <ScrollArea className="h-[314px] max-w-[462]">
      <div>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <div
              key={index}
              className="flex items-center w-[16rem] justify-between bg-gray-100 px-2 py-1 rounded-md text-sm"
            >
              <div className="flex items-center">
                <Image
                  src={keyword.img}
                  alt={keyword.text}
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <span className="text-start">{keyword.text}</span>
              </div>
              <span className="ml-2 bg-white px-2 py-1 rounded-md text-sm font-bold items-end">
                {keyword.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
