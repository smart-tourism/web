"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function UlasanPage() {
  const router = useRouter();

  // Dummy data untuk ulasan
  const ulasanData = [
    {
      id: 1,
      nama: "Nama User 1",
      rating: 4,
      sentimen: "Positif",
      ulasan: "Tempat yang sangat menyenangkan untuk dikunjungi!",
      profilImage: "/user-profile.png",
      judul: "Pengalaman Hebat!",
      tanggal: "Oktober 2024",
      createdAt: "10 Oktober 2024",
    },
    {
      id: 2,
      nama: "Nama User 2",
      rating: 3,
      sentimen: "Netral",
      ulasan: "Tempat ini oke, tapi tidak begitu menarik.",
      profilImage: "/user-profile.png",
      judul: "Cukup Oke",
      tanggal: "Oktober 2024",
      createdAt: "20 Oktober 2024",
    },
    {
      id: 3,
      nama: "Nama User 3",
      rating: 5,
      sentimen: "Positif",
      ulasan: "Sangat luar biasa! Akan kembali lagi.",
      profilImage: "/user-profile.png",
      judul: "Tempat yang Luar Biasa!",
      tanggal: "Mei 2024",
      createdAt: "05 Mei 2024",
    },
  ];

  const [waktu, setWaktu] = useState("Terbaru");
  const [sentimen, setSentimen] = useState("Positif");

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="bg-white min-h-screen p-8 text-black">
      {/* Kembali ke halaman sebelumnya */}
      <Button
        onClick={handleBackClick}
        className="mb-4 bg-orange-500 text-white hover:bg-orange-600"
      >
        &larr; Kembali
      </Button>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Ulasan-Ulasan</h1>

        {/* Total Ulasan di sebelah kanan */}
        <div className="text-lg font-bold">
          Total Ulasan: {ulasanData.length}
        </div>
      </div>

      {/* Dropdown untuk Filter */}
      <div className="flex space-x-6 mb-4">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Button variant="outline">Jangka Waktu: {waktu}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="cursor-pointer">
              <DropdownMenuItem
                onClick={() => setWaktu("Terbaru")}
                className="cursor-pointer"
              >
                Terbaru
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setWaktu("Terlama")}
                className="cursor-pointer"
              >
                Terlama
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Button variant="outline">Sentimen: {sentimen}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setSentimen("Positif")}
                className="cursor-pointer"
              >
                Positif
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSentimen("Negatif")}
                className="cursor-pointer"
              >
                Negatif
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSentimen("Netral")}
                className="cursor-pointer"
              >
                Netral
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Daftar Ulasan */}
      <div>
        {ulasanData.map((ulasan) => (
          <div key={ulasan.id} className="mb-8">
            <div className="flex items-center space-x-4">
              {/* Profil Image */}
              <img
                src={ulasan.profilImage}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                {/* Nama Pengguna */}
                <p className="font-semibold text-lg">{ulasan.nama}</p>

                {/* Rating */}
                <div className="flex text-yellow-500 text-xl">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`${
                        index < ulasan.rating
                          ? "text-orange-500"
                          : "text-gray-200"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Judul Ulasan */}
                <p className="font-medium text-sm mt-2">{ulasan.judul}</p>

                {/* Bulan Komentar */}
                <p className="text-xs text-gray-500 mt-1">{ulasan.tanggal}</p>

                {/* Komentar */}
                <p className="mt-2">{ulasan.ulasan}</p>

                {/* Tanggal User Berkomentar */}
                <p className="text-xs text-gray-500 mt-1">
                  Ditulis Pada {ulasan.createdAt}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
