"use client";

import { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton"; // Import Skeleton
import "react-loading-skeleton/dist/skeleton.css";
import { constructNow } from "date-fns";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: -2.5489,
  lng: 118.0149,
};

const locations = [
  { name: "Borobudur", lat: -7.7956, lng: 110.3695 },
  { name: "Mandalika", lat: -8.8955, lng: 116.2951 },
  { name: "Likupang", lat: 1.6824, lng: 125.0568 },
  { name: "Labuan Bajo", lat: -8.4539, lng: 119.889 },
  { name: "Danau Toba", lat: 2.6845, lng: 98.8588 },
];

type SentimentSummary = {
  totalCount: number;
  positiveCount: number;
  negativeCount: number;
  averageScore: any;
};

export default function GISSentimentMap({
  moveToLocation,
}: {
  moveToLocation: { lat: number; lng: number } | null;
}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_MAPS_KEY}`, // Replace with your actual API key
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [sentimentSummary, setSentimentSummary] =
    useState<SentimentSummary | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    locations.forEach((location) =>
      bounds.extend({ lat: location.lat, lng: location.lng })
    );
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMarkerClick = (locationName: string) => {
    setSelectedLocation(locationName);
  };

  const closeInfoWindow = () => {
    setSelectedLocation(null);
    setSentimentSummary(null);
  };

  // fetch data
  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(
        `/api/maps?name=${encodeURIComponent(selectedLocation || "")}`
      );

      if (!response.ok) {
        console.error("Failed to fetch data");
        return;
      }

      const data = await response.json();

      setSentimentSummary({
        totalCount: data?.data?.total || 0,
        positiveCount: data?.data?.positif || 0,
        negativeCount: data?.data?.negatif || 0,
        averageScore: data?.data?.performa || 0,
      });
    };

    if (selectedLocation) {
      fetchDetails();
    }
  }, [selectedLocation]);

  // Update map position based on moveToLocation prop
  useEffect(() => {
    if (map && moveToLocation) {
      map.setCenter(moveToLocation);
      map.setZoom(10); // Optional: Adjust the zoom level as needed
    }
  }, [map, moveToLocation]);

  const router = useRouter(); // Inisialisasi router

  return (
    <div className="container mx-auto">
      <div className="flex mb-4 justify-between">
        <h1 className="text-3xl font-bold text-black">Maps / GIS Analisis</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push("/dashboard")}
        >
          Dashboard -&gt;
        </button>
      </div>

      {!isLoaded ? (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {/* Skeleton Loading */}
          <Skeleton height={600} />
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={5}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {locations.map((location, index) => (
              <Marker
                key={index}
                position={{ lat: location.lat, lng: location.lng }}
                title={location.name}
                onClick={() => handleMarkerClick(location.name)}
              />
            ))}
            {selectedLocation && (
              <InfoWindow
                position={locations.find(
                  (loc) => loc.name === selectedLocation
                )}
                onCloseClick={closeInfoWindow}
              >
                <div className="max-w-md p-4 bg-white rounded-lg shadow-lg border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedLocation}
                  </h2>

                  <img
                    src={`/images/${selectedLocation
                      .replace(/\s+/g, "")
                      .toLowerCase()}.jpg`}
                    alt={selectedLocation}
                    className="w-full h-40 object-cover rounded-t-lg mb-4"
                  />

                  {sentimentSummary && (
                    <div className="mb-4 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg shadow-sm">
                      <p className="text-gray-700 font-medium">
                        Total Sentiments:{" "}
                        <span className="font-bold text-gray-900">
                          {sentimentSummary.totalCount
                            ? sentimentSummary.totalCount
                            : 0}
                        </span>
                      </p>
                      <p className="text-green-600 font-medium">
                        Positive:{" "}
                        <span className="font-bold">
                          {sentimentSummary.positiveCount
                            ? sentimentSummary.positiveCount
                            : 0}
                        </span>
                      </p>
                      <p className="text-red-600 font-medium">
                        Negative:{" "}
                        <span className="font-bold">
                          {sentimentSummary.negativeCount
                            ? sentimentSummary.negativeCount
                            : 0}
                        </span>
                      </p>
                      <p className="text-gray-800 font-medium">
                        Average Score:{" "}
                        <span className="font-bold text-blue-600">
                          {sentimentSummary.averageScore
                            ? Math.round(sentimentSummary.averageScore * 10) /
                              10
                            : 0}{" "}
                          ⭐
                        </span>
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end space-x-3 mt-4">
                    <Button
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                      onClick={() =>
                        router.push("/dashboard?location=" + selectedLocation)
                      }
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      )}
    </div>
  );
}
