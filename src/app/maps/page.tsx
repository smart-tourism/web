"use client";
import React, { useState } from "react";
import GISSentimentMap from "@/components/dashboard/gis-sentiment-map";
import DestinationCard from "@/components/maps/card-destination";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
export default function MapsPage() {
  const [mapCoordinates, setMapCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const destinations = [
    {
      rank: 1,
      title: "Danau Toba",
      location: "Sumatera Utara",
      lat: 2.6845,
      lng: 98.8588,
      imageUrl: "/images/danautoba.jpg",
    },
    {
      rank: 2,
      title: "Candi Borobudur",
      location: "Jawa Tengah",
      lat: -7.6079,
      lng: 110.2038,
      imageUrl: "/images/borobudur.jpg",
    },
    {
      rank: 3,
      title: "Likupang",
      location: "Sulawesi Utara",
      lat: 1.6824,
      lng: 125.0568,
      imageUrl: "/images/likupang.jpg",
    },
    {
      rank: 4,
      title: "Mandalika",
      location: "Nusa Tenggara Barat",
      lat: -8.8955,
      lng: 116.2951,
      imageUrl: "/images/mandalika.jpg",
    },
    {
      rank: 5,
      title: "Labuan Bajo",
      location: "Nusa Tenggara Timur",
      lat: -8.4539,
      lng: 119.889,
      imageUrl: "/images/labuanbajo.jpg",
    },
  ];

  const handleCardClick = (lat: number, lng: number) => {
    setMapCoordinates({ lat, lng }); // Set coordinates to move the map
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <div className="w-full pr-4 bg-white p-4 rounded-md shadow-md">
        <GISSentimentMap moveToLocation={mapCoordinates} />{" "}
        {/* Pass the coordinates here */}
      </div>
      <div className="space-y-4 flex bg-white p-4 mb-2">
        <ScrollArea className="">
          <div className="space-y-4 flex mb-8">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.rank}
                rank={destination.rank}
                title={destination.title}
                location={destination.location}
                imageUrl={destination.imageUrl}
                onClick={() =>
                  handleCardClick(destination.lat, destination.lng)
                } // Send lat and lng on click
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="cursor-pointer" />
        </ScrollArea>
      </div>
    </div>
  );
}
