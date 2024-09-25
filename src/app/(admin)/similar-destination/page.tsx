"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

// Tipe data untuk destinasi
type Destination = {
  name: string;
  image: string;
};

// Tipe untuk detail informasi destinasi
type DetailType = {
  ratePrice: string;
  performa: number;
  responseRate: number;
  reviews: number;
  popularity: string;
  overallRating: number;
  location: string;
};

// Daftar destinasi DPSP yang tersedia
const dpspDestinations: Destination[] = [
  { name: "Borobudur", image: "/borobudur.jpg" },
  { name: "Mandalika", image: "/mandalika.jpg" },
  { name: "Likupang", image: "/likupang.jpg" },
  { name: "DanauToba", image: "/danautoba.jpg" },
  { name: "LabuanBajo", image: "/labuanbajo.jpg" },
];

// Definisikan destinationDetails menggunakan Record untuk tipe dinamis
const destinationDetails: Record<string, DetailType> = {
  Borobudur: {
    ratePrice: "Coming Soon",
    performa: 5.0,
    responseRate: 7.84,
    reviews: 0.0,
    popularity: "0.00%",
    overallRating: 0,
    location:
      "Jalan Badrawati, Kecamatan Borobudur, Kabupaten Magelang, Jawa Tengah, Indonesia.",
  },
  Mandalika: {
    ratePrice: "Coming Soon",
    performa: 4.0,
    responseRate: 8.8,
    reviews: 9.81,
    popularity: "100%",
    overallRating: 16,
    location:
      "Kawasan Ekonomi Khusus Mandalika, Lombok Tengah, Nusa Tenggara Barat, Indonesia.",
  },
  LabuanBajo: {
    ratePrice: "Coming Soon",
    performa: 5.0,
    responseRate: 7.84,
    reviews: 0.0,
    popularity: "0.00%",
    overallRating: 0,
    location:
      "Jalan Badrawati, Kecamatan Borobudur, Kabupaten Magelang, Jawa Tengah, Indonesia.",
  },
  Likupang: {
    ratePrice: "Coming Soon",
    performa: 4.0,
    responseRate: 8.8,
    reviews: 9.81,
    popularity: "100%",
    overallRating: 16,
    location:
      "Kawasan Ekonomi Khusus Mandalika, Lombok Tengah, Nusa Tenggara Barat, Indonesia.",
  },
  DanauToba: {
    ratePrice: "Coming Soon",
    performa: 4.0,
    responseRate: 8.8,
    reviews: 9.81,
    popularity: "100%",
    overallRating: 16,
    location:
      "Kawasan Ekonomi Khusus Mandalika, Lombok Tengah, Nusa Tenggara Barat, Indonesia.",
  },
  // Tambahkan detail untuk destinasi lain sama kayak diatas
};

// Komponen untuk menampilkan detail destinasi
const DestinationDetails = ({
  name,
  showDetails,
  toggleDetails,
}: {
  name: string;
  showDetails: boolean;
  toggleDetails: () => void;
}) => {
  // Ambil detail dari destinationDetails menggunakan name
  const details = destinationDetails[name];

  return (
    <div className="relative border-2 border-gray-200 rounded-lg p-4 text-center shadow-md bg-white h-auto w-[300px] max-w-[300px]">
      {/* Gambar destinasi */}
      <img
        src={`/${name.toLowerCase().replace(" ", "-")}.jpg`}
        alt={name}
        className="h-40 w-full object-cover mb-2 rounded"
      />
      <h3 className="font-bold text-lg mb-2 text-black">{name}</h3>

      {/* Tombol Show/Hide Details */}
      <button
        className="text-blue-500 hover:underline mb-2"
        onClick={toggleDetails}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      {/* Tampilkan Detail jika showDetails true */}
      {showDetails && details && (
        <div className="text-center text-sm mt-2 text-black">
          <p>
            <strong>Rate Price:</strong> {details.ratePrice}
          </p>
          <p>
            <strong>Performa:</strong> {details.performa}
          </p>
          <p>
            <strong>Tingkat Response:</strong> {details.responseRate}
          </p>
          <p>
            <strong>Ulasan:</strong> {details.reviews}
          </p>
          <p>
            <strong>Popularitas:</strong> {details.popularity}
          </p>
          <p>
            <strong>Penilaian Keseluruhan:</strong> {details.overallRating}
          </p>
          <p>
            <strong>Location:</strong> {details.location}
          </p>
        </div>
      )}
    </div>
  );
};

export default function CompetitorPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]); // Menyimpan destinasi yang dipilih
  const [showPopup, setShowPopup] = useState(false); // Mengontrol tampilan popup
  const [searchTerm, setSearchTerm] = useState(""); // Menyimpan input pencarian
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>(
    {}
  ); // Menyimpan state show/hide untuk setiap destinasi

  // Menghapus destinasi dari daftar
  const handleRemoveDestination = (indexToRemove: number) => {
    setDestinations(destinations.filter((_, index) => index !== indexToRemove));
  };

  // Membuka popup pencarian
  const openPopup = () => {
    setShowPopup(true);
  };

  // Mencari destinasi yang cocok berdasarkan input pencarian
  const filteredDestinations = dpspDestinations.filter((dest) =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi untuk menambahkan destinasi ke dalam daftar dan menutup popup
  const handleSelectDestination = (destination: Destination) => {
    setDestinations([...destinations, destination]);
    setShowPopup(false);
  };

  // Fungsi untuk toggle show/hide detail destinasi
  const toggleDetails = (name: string) => {
    setShowDetails((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <ContentLayout title="Similar Destination">
      <div className=" flex flex-col items-center justify-center p-4">
        <div className="grid grid-cols-3 gap-6">
          {/* Kotak destinasi yang dipilih */}
          {destinations.map((dest, index) => (
            <div key={index} className="relative h-auto">
              <DestinationDetails
                name={dest.name}
                showDetails={showDetails[dest.name] || false}
                toggleDetails={() => toggleDetails(dest.name)}
              />
              {/* Tombol hapus */}
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
                onClick={() => handleRemoveDestination(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}

          {/* Tombol tambah destinasi */}
          {destinations.length < 3 && (
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-50 h-[400px] w-[300px] max-w-[300px]"
              onClick={openPopup}
            >
              <div className="text-3xl">+</div>
              <p>Add Similar Destination</p>
            </div>
          )}
        </div>

        {/* Popup pencarian destinasi */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center text-black">
            <Command className="bg-white p-6 rounded-lg shadow-lg w-96 h-96">
              <CommandInput
                placeholder="Search destination..."
                value={searchTerm}
                onValueChange={setSearchTerm}
              />
              <CommandList>
                {/* Menampilkan pesan jika tidak ada hasil */}
                <CommandEmpty>No results found.</CommandEmpty>
                {/* Menampilkan hasil pencarian */}
                <CommandGroup heading="Destinations">
                  {filteredDestinations.map((dest, index) => (
                    <CommandItem
                      key={index}
                      onSelect={() => handleSelectDestination(dest)}
                      className="cursor-pointer"
                    >
                      <span>{dest.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
              {/* Tombol Save & Cancel */}
              <div className="flex justify-end mt-4">
                <button
                  className="mr-2 border-2 rounded-md p-1 hover:bg-gray-50 text-gray-500 hover:text-red-500"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </Command>
          </div>
        )}
      </div>
    </ContentLayout>
  );
}
