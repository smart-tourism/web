import { ScrollArea } from "@/components/ui/scroll-area";

export default function TopKeywords() {
  const keywords = [
    { text: "Kamar Bagus", count: 2 },
    { text: "Kamar Luas", count: 2 },
    { text: "Kebersihan Sangat Terawat", count: 2 },
    { text: "Coffee Break Enak", count: 1 },
    { text: "Cold Meat Very Little Variation", count: 1 },
    { text: "Dinner Enak Banget", count: 1 },
    { text: "Dinner Enak Banget", count: 1 },
    { text: "Dinner Enak Banget", count: 1 },
    { text: "Dinner Enak Banget", count: 1 },
    { text: "Dinner Enak Banget", count: 1 },
    { text: "Dinner Enak Banget", count: 1 },
    { text: "Dinner Enak Banget", count: 1 },
  ];

  return (
    <ScrollArea className="h-[320px] w-[380px]">
      <div>
        <div className="flex flex-wrap gap-2 mt-4">
          {keywords.map((keyword, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-200 px-2 py-1 rounded-md text-sm"
            >
              <span>{keyword.text}</span>
              <span className="ml-2 bg-white px-2 py-1 rounded-md text-sm font-bold">
                {keyword.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
