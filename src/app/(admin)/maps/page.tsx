"use client";
import React, { useState } from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import GISSentimentMap from "@/components/dashboard/gis-sentiment-map";
import DestinationCard from "@/components/maps/card-destination";

export default function MapsPage() {
  const [mapCoordinates, setMapCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const destinations = [
    {
      rank: 1,
      title: "Danau Toba",
      location: "Sumatera Utara",
      lat: 2.6845,
      lng: 98.8588,
      imageUrl: "/danautoba.jpg",
    },
    {
      rank: 2,
      title: "Candi Borobudur",
      location: "Jawa Tengah",
      lat: -7.6079,
      lng: 110.2038,
      imageUrl: "/borobudur.jpg",
    },
    {
      rank: 3,
      title: "Likupang",
      location: "Sulawesi Utara",
      lat: 1.6824,
      lng: 125.0568,
      imageUrl: "/likupang.jpg",
    },
    {
      rank: 4,
      title: "Mandalika",
      location: "Nusa Tenggara Barat",
      lat: -8.8955,
      lng: 116.2951,
      imageUrl: "/mandalika.jpg",
    },
    {
      rank: 5,
      title: "Labuan Bajo",
      location: "Nusa Tenggara Timur",
      lat: -8.4539,
      lng: 119.889,
      imageUrl: "/labuanbajo.jpg",
    },
    // Add other destinations similarly
  ];

  const handleCardClick = (lat: number, lng: number) => {
    setMapCoordinates({ lat, lng }); // Set coordinates to move the map
  };

  return (
    <ContentLayout title="Maps">
      <div className="flex">
        <div className="w-2/3 pr-4">
          <GISSentimentMap moveToLocation={mapCoordinates} /> {/* Pass the coordinates here */}
        </div>
        <div className="w-1/3 space-y-4 flex flex-col">
          <h1 className="text-2xl font-bold mb-1 text-gray-600 mt-[10px] text-right">Top 5 DPSP</h1>
          <div className="space-y-4 h-[540px] overflow-y-scroll mt-[10px]">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.rank}
                rank={destination.rank}
                title={destination.title}
                location={destination.location}
                imageUrl={destination.imageUrl}
                onClick={() => handleCardClick(destination.lat, destination.lng)} // Send lat and lng on click
              />
            ))}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}