"use client";

import Link from "next/link";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

export function ChartImpactTraveloka() {
  // Define hover state for currently hovered category
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  // Chart data for Traveloka categories
  const chartData = [
    { category: "Makanan", positive: 5.33, negative: 0.67, icon: "/meal.png" },
    {
      category: "Layanan",
      positive: 7.05,
      negative: 0.67,
      icon: "/service.png",
    },
    { category: "Staf", positive: 6.19, negative: 0.67, icon: "/staff.png" },
    { category: "Nilai", positive: 5.91, negative: 0.67, icon: "/value.png" },
    {
      category: "Kualitas",
      positive: 5.33,
      negative: 0.67,
      icon: "/quality.png",
    },
    {
      category: "Lingkungan",
      positive: 8.19,
      negative: 0.67,
      icon: "/surrounding.png",
    },
    {
      category: "Lokasi",
      positive: 5.91,
      negative: 0.67,
      icon: "/location.png",
    },
    {
      category: "Fasilitas",
      positive: 5.91,
      negative: 0.67,
      icon: "/facility.png",
    },
    { category: "Kamar", positive: 6.48, negative: 0.67, icon: "/room.png" },
  ];

  return (
    <div className="grid grid-cols-1 justify-items-stretch gap-x-[10rem] gap-y-5 sm:grid-cols-2grid gap-8">
      <div className="flex flex-row items-center justify-between">
        <div className="flex gap-2">
          <img
            src="/traveloka-icon.png"
            alt="Traveloka"
            height={32}
            width={32}
          />
          <h2 className="text-2xl font-bold first-letter:uppercase">
            Traveloka
          </h2>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-row items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-green-400"></div>
            Positif
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-red-400"></div>
            Negatif
          </div>
        </div>
      </div>

      {/* Chart Data Display */}
      <div className="grid grid-cols-1 justify-items-stretch gap-x-[10rem] gap-y-5 sm:grid-cols-2">
        {chartData.map((data, index) => (
          <div
            key={index}
            className="flex w-full flex-row items-center justify-start gap-3"
          >
            {/* Icon and Category */}
            <div className="flex items-center justify-center rounded-full bg-blueUi">
              <Image
                src={data.icon}
                alt={data.category}
                width={32}
                height={32}
              />
            </div>
            <p className="flex min-w-[100px] items-center text-lg">
              {data.category}
            </p>

            {/* Positive Progress Bar */}
            <div className="flex h-full w-full flex-grow flex-col justify-center">
              <div
                className="relative"
                onMouseEnter={() => {
                  setHoveredCategory(data.category);
                  setHoveredType("Positif");
                }}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Progress
                  value={data.positive}
                  className="h-3 bg-gray-200"
                  indicatorColor="bg-green-500"
                />
                {hoveredCategory === data.category &&
                  hoveredType === "Positif" && (
                    <div className="absolute top-0 left-0 -mt-8 p-2 bg-green-50 text-green-500 rounded-md shadow-md">
                      {hoveredType}
                    </div>
                  )}
              </div>
              <p className="text-sm">{data.positive}%</p>

              {/* Negative Progress Bar */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setHoveredCategory(data.category);
                  setHoveredType("Negatif");
                }}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Progress
                  value={data.negative}
                  className="h-3 bg-gray-200"
                  indicatorColor="bg-red-500"
                />
                {hoveredCategory === data.category &&
                  hoveredType === "Negatif" && (
                    <div className="absolute top-0 left-0 -mt-8 p-2 bg-red-50 text-red-500 rounded-md shadow-md">
                      {hoveredType}
                    </div>
                  )}
              </div>
              <p className="text-sm">{data.negative}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
