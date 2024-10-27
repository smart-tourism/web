"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";

export function ChartImpactAll({
  data,
}: {
  data: {
    source: string;
    positivePercentage: number;
    neutralPercentage: number;
    negativePercentage: number;
  }[];
}) {
  // State untuk hover
  const [hoverState, setHoverState] = useState<{
    [key: string]: {
      positive: string | null;
      neutral: string | null;
      negative: string | null;
    };
  }>({});

  const handleMouseEnter = (source: string, type: string) => {
    setHoverState((prev) => ({
      ...prev,
      [source]: {
        ...prev[source],
        [type]: type.charAt(0).toUpperCase() + type.slice(1),
      },
    }));
  };

  const handleMouseLeave = (source: string, type: string) => {
    setHoverState((prev) => ({
      ...prev,
      [source]: {
        ...prev[source],
        [type]: null,
      },
    }));
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 px-3 py-2">
        <div className="col-span-1">OTA</div>
        <div className="col-span-2 mr-12">Detail</div>
        <div className="col-span-1">Dampak</div>
      </div>
      <ScrollArea>
        {data.map((item) => (
          <div key={item.source} className="mt-2">
            <div className="grid cursor-pointer grid-cols-4 gap-4 border-2 rounded-md border-gray-200 bg-white px-5 py-4 hover:bg-gray-100 hover:opacity-[0.8]">
              {/* Icon */}
              <div className="col-span-1 flex flex-row items-center gap-2">
                <Image
                  src={`/${item.source}-icon.png`} // Pastikan Anda memiliki ikon yang sesuai
                  alt={`${item.source} Icon`}
                  width={32}
                  height={32}
                />
                <span className="font-bold">
                  {item.source.charAt(0).toUpperCase() + item.source.slice(1)}
                </span>
              </div>

              {/* Chart */}
              <div className="col-span-2 mr-12">
                {/* Green Progress */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.source, "positive")}
                  onMouseLeave={() => handleMouseLeave(item.source, "positive")}
                >
                  <Progress
                    value={Math.round(item.positivePercentage * 10) / 10}
                    className="h-3 bg-gray-200 mt-2"
                    indicatorColor="bg-green-500 rounded-full hover:bg-green-700"
                  />
                  {hoverState[item.source]?.positive && (
                    <div className="absolute top-0 left-0 -mt-8 p-2 bg-green-50 text-green-500 rounded-md shadow-md">
                      {hoverState[item.source].positive}
                    </div>
                  )}
                </div>
                <p className="text-sm">
                  {Math.round(item.positivePercentage * 10) / 10}%
                </p>

                {/* Yellow Progress */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.source, "neutral")}
                  onMouseLeave={() => handleMouseLeave(item.source, "neutral")}
                >
                  <Progress
                    value={Math.round(item.neutralPercentage * 10) / 10}
                    className="h-3 bg-gray-200 mt-2"
                    indicatorColor="bg-yellow-500 rounded-full hover:bg-yellow-700"
                  />
                  {hoverState[item.source]?.neutral && (
                    <div className="absolute top-0 left-0 -mt-8 p-2 bg-yellow-50 text-yellow-500 rounded-md shadow-md">
                      {hoverState[item.source].neutral}
                    </div>
                  )}
                </div>
                <p className="text-sm">
                  {Math.round(item.neutralPercentage * 10) / 10}%
                </p>

                {/* Red Progress */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.source, "negative")}
                  onMouseLeave={() => handleMouseLeave(item.source, "negative")}
                >
                  <Progress
                    value={Math.round(item.negativePercentage * 10) / 10}
                    className="h-3 bg-gray-200 mt-2"
                    indicatorColor="bg-red-500 rounded-full hover:bg-red-700"
                  />
                  {hoverState[item.source]?.negative && (
                    <div className="absolute top-0 left-0 -mt-8 p-2 bg-red-50 text-red-500 rounded-md shadow-md">
                      {hoverState[item.source].negative}
                    </div>
                  )}
                </div>
                <p className="text-sm">
                  {Math.round(item.negativePercentage * 10) / 10}%
                </p>
              </div>

              {/* Dampak */}
              <div className="col-span-1 flex flex-row items-center justify-between text-base font-bold">
                <span
                  className={`text-${
                    item.positivePercentage > 50 ? "green" : "red"
                  }-500`}
                >
                  {item.positivePercentage > 50 ? "Positive" : "Negative"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
