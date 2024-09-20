"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";

export function ChartImpactAll() {
  // Traveloka
  const [hoverPositiveTraveloka, sethoverPositiveTraveloka] = useState<
    string | null
  >(null);
  const [hoverNegativeTraveloka, setHoverNegativeTraveloka] = useState<
    string | null
  >(null);
  const [hoverNetralTraveloka, setHoverNetralTraveloka] = useState<
    string | null
  >(null);

  // Tripadvisor
  const [hoverPositiveTripadvisor, sethoverPositiveTripadvisor] = useState<
    string | null
  >(null);
  const [hoverNegativeTripadvisor, sethoverNegativeTripadvisor] = useState<
    string | null
  >(null);
  const [hoverNetralTripadvisor, sethoverNetralTripadvisor] = useState<
    string | null
  >(null);

  // Tiket
  const [hoverPositiveTiket, sethoverPositiveTiket] = useState<string | null>(
    null
  );
  const [hoverNegativeTiket, sethoverNegativeTiket] = useState<string | null>(
    null
  );
  const [hoverNetralTiket, sethoverNetralTiket] = useState<string | null>(null);
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 px-3 py-2">
        <div className="col-span-1">OTA</div>
        <div className="col-span-2 mr-12">Detail</div>
        <div className="col-span-1">Dampak</div>
      </div>
      <ScrollArea>
        {/* Traveloka */}
        <Link href="/dashboard/dampak/traveloka">
          <div className="grid cursor-pointer grid-cols-4 gap-4 border-2 rounded-md border-gray-200 bg-white px-5 py-4 hover:bg-gray-100 hover:opacity-[0.8] mt-2">
            {/* icon traveloka */}
            <div className="col-span-1 flex flex-row items-center gap-2">
              <Image
                src="/traveloka-icon.png" // Assuming you've placed the image in the public folder
                alt="Traveloka Icon"
                width={32}
                height={32}
              />
              <span className="font-bold">Traveloka</span>
            </div>

            {/* chart */}
            <div className="col-span-2 mr-12">
              {/* Green Progress */}
              <div
                className="relative"
                onMouseEnter={() => sethoverPositiveTraveloka("Positif")}
                onMouseLeave={() => sethoverPositiveTraveloka(null)}
              >
                <Progress
                  value={80}
                  className="h-3 bg-gray-200 mt-2"
                  indicatorColor="bg-green-500 rounded-full hover:bg-green-700"
                />
                {hoverPositiveTraveloka && (
                  <div className="absolute top-0 left-0 -mt-8 p-2 bg-green-50 text-green-500 rounded-md shadow-md">
                    {hoverPositiveTraveloka}
                  </div>
                )}
              </div>
              <p className="text-sm">80.0%</p>

              {/* Yellow Progress */}
              <div
                className="relative"
                onMouseEnter={() => setHoverNetralTraveloka("Netral")}
                onMouseLeave={() => setHoverNetralTraveloka(null)}
              >
                <Progress
                  value={13.3}
                  className="h-3 bg-gray-200 mt-2"
                  indicatorColor="bg-yellow-500 rounded-full hover:bg-yellow-700"
                />
                {hoverNetralTraveloka && (
                  <div className="absolute top-0 left-0 -mt-8 p-2 bg-yellow-50 text-yellow-500 rounded-md shadow-md">
                    {hoverNetralTraveloka}
                  </div>
                )}
              </div>
              <p className="text-sm">13.3%</p>

              {/* Red Progress */}
              <div
                className="relative"
                onMouseEnter={() => setHoverNegativeTraveloka("Negative")}
                onMouseLeave={() => setHoverNegativeTraveloka(null)}
              >
                <Progress
                  value={6.7}
                  className="h-3 bg-gray-200 mt-2"
                  indicatorColor="bg-red-500 rounded-full hover:bg-red-700"
                />
                {hoverNegativeTraveloka && (
                  <div className="absolute top-0 left-0 -mt-8 p-2 bg-red-50 text-red-500 rounded-md shadow-md">
                    {hoverNegativeTraveloka}
                  </div>
                )}
              </div>
              <p className="text-sm">6.7%</p>
            </div>

            {/* dampak */}
            <div className="col-span-1 flex flex-row items-center justify-between text-base font-bold">
              <span className="text-green-500">Positive</span>
              <ChevronRight className="ml-4 h-4 w-4" />
            </div>
          </div>
        </Link>

        {/* Tripadvisor */}
        <Link href="/dashboard/dampak/tripadvisor">
          <div className="grid cursor-pointer grid-cols-4 gap-4 border-2 rounded-md border-gray-200 bg-white px-5 py-4 hover:bg-gray-100 hover:opacity-[0.8] mt-2">
            {/* icon tripadvisor */}
            <div className="col-span-1 flex flex-row items-center gap-2">
              <Image
                src="/tripadvisor-icon.png" // Assuming you've placed the image in the public folder
                alt="Traveloka Icon"
                width={32}
                height={32}
              />
              <span className="font-bold">Tripadvisor</span>
            </div>

            {/* chart */}
            <div className="col-span-2 mr-12">
              {/* Green Progress */}
              <div
                className="relative"
                onMouseEnter={() => sethoverPositiveTripadvisor("Positif")}
                onMouseLeave={() => sethoverPositiveTripadvisor(null)}
              >
                <Progress
                  value={80}
                  className="h-3 bg-gray-200 mt-2"
                  indicatorColor="bg-green-500 rounded-full hover:bg-green-700"
                />
                {hoverPositiveTripadvisor && (
                  <div className="absolute top-0 left-0 -mt-8 p-2 bg-green-50 text-green-500 rounded-md shadow-md">
                    {hoverPositiveTripadvisor}
                  </div>
                )}
              </div>
              <p className="text-sm">80.0%</p>

              {/* Yellow Progress */}
              <div
                className="relative"
                onMouseEnter={() => sethoverNetralTripadvisor("Netral")}
                onMouseLeave={() => sethoverNetralTripadvisor(null)}
              >
                <Progress
                  value={13.3}
                  className="h-3 bg-gray-200 mt-2"
                  indicatorColor="bg-yellow-500 rounded-full hover:bg-yellow-700"
                />
                {hoverNetralTripadvisor && (
                  <div className="absolute top-0 left-0 -mt-8 p-2 bg-yellow-50 text-yellow-500 rounded-md shadow-md">
                    {hoverNetralTripadvisor}
                  </div>
                )}
              </div>
              <p className="text-sm">13.3%</p>

              {/* Red Progress */}
              <div
                className="relative"
                onMouseEnter={() => sethoverNegativeTripadvisor("Negative")}
                onMouseLeave={() => sethoverNegativeTripadvisor(null)}
              >
                <Progress
                  value={6.7}
                  className="h-3 bg-gray-200 mt-2"
                  indicatorColor="bg-red-500 rounded-full hover:bg-red-700"
                />
                {hoverNegativeTripadvisor && (
                  <div className="absolute top-0 left-0 -mt-8 p-2 bg-red-50 text-red-500 rounded-md shadow-md">
                    {hoverNegativeTripadvisor}
                  </div>
                )}
              </div>
              <p className="text-sm">6.7%</p>
            </div>

            {/* dampak */}
            <div className="col-span-1 flex flex-row items-center justify-between text-base font-bold">
              <span className="text-red-500">Negative</span>
              <ChevronRight className="ml-4 h-4 w-4" />
            </div>
          </div>
        </Link>

        {/* Tiket */}
        <Link href="/dashboard/dampak/tiket">
          <div className="grid cursor-pointer grid-cols-4 gap-4 border-2 rounded-md border-gray-200 bg-white px-5 py-4 hover:bg-gray-100 hover:opacity-[0.8] mt-2">
            {/* icon tiket */}
            <div className="col-span-1 flex flex-row items-center gap-2">
              <Image
                src="/tiketdotcom-icon.png" // Assuming you've placed the image in the public folder
                alt="Traveloka Icon"
                width={32}
                height={32}
              />
              <span className="font-bold">Tiket</span>
            </div>

            {/* chart */}
            <div className="col-span-2 mr-12">
              {/* Green Progress */}
              <div
                className="relative"
                onMouseEnter={() => sethoverPositiveTiket("Positif")}
                onMouseLeave={() => sethoverPositiveTiket(null)}
              >
                <Progress
                  value={80}
                  className="h-3 bg-gray-200 mt-2"
                  indicatorColor="bg-green-500 rounded-full hover:bg-green-700"
                />
                {hoverPositiveTiket && (
                  <div className="absolute top-0 left-0 -mt-8 p-2 bg-green-50 text-green-500 rounded-md shadow-md">
                    {hoverPositiveTiket}
                  </div>
                )}
              </div>
              <p className="text-sm">80.0%</p>

              {/* Yellow Progress */}
              <div
                className="relative"
                onMouseEnter={() => sethoverNetralTiket("Netral")}
                onMouseLeave={() => sethoverNetralTiket(null)}
              >
                <Progress
                  value={13.3}
                  className="h-3 bg-gray-200 mt-2"
                  indicatorColor="bg-yellow-500 rounded-full hover:bg-yellow-700"
                />
                {hoverNetralTiket && (
                  <div className="absolute top-0 left-0 -mt-8 p-2 bg-yellow-50 text-yellow-500 rounded-md shadow-md">
                    {hoverNetralTiket}
                  </div>
                )}
              </div>
              <p className="text-sm">13.3%</p>

              {/* Red Progress */}
              <div
                className="relative"
                onMouseEnter={() => sethoverNegativeTiket("Negative")}
                onMouseLeave={() => sethoverNegativeTiket(null)}
              >
                <Progress
                  value={6.7}
                  className="h-3 bg-gray-200 mt-2"
                  indicatorColor="bg-red-500 rounded-full hover:bg-red-700"
                />
                {hoverNegativeTiket && (
                  <div className="absolute top-0 left-0 -mt-8 p-2 bg-red-50 text-red-500 rounded-md shadow-md">
                    {hoverNegativeTiket}
                  </div>
                )}
              </div>
              <p className="text-sm">6.7%</p>
            </div>

            {/* dampak */}
            <div className="col-span-1 flex flex-row items-center justify-between text-base font-bold">
              <span className="text-green-500">Positive</span>
              <ChevronRight className="ml-4 h-4 w-4" />
            </div>
          </div>
        </Link>
      </ScrollArea>
    </div>
  );
}
