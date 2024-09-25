"use client";

// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
// import { Card, CardContent } from "@/components/ui/card"
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
// Data gambar destinasi
const destinations = [
  { name: "Likupang", image: "/likupang.jpg" },
  { name: "Mandalika", image: "/mandalika.jpg" },
  { name: "Borobudur", image: "/borobudur.jpg" },
  { name: "Labuan Bajo", image: "/labuanbajo.jpg" },
  { name: "Danau Toba", image: "/danautoba.jpg" },
];

export default function Home() {
  const [shine, setShine] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false);

  // Mengatur transisi gambar dengan interval waktu
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === destinations.length - 1 ? 0 : prevIndex + 1
        );
        setFade(false);
      }, 3000); // Durasi fade out
    }, 3000); // Interval gambar (3 detik)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShine(true);
      setTimeout(() => setShine(false), 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="font-poppins text-gray-900">
      {/* Header */}
      <header className="fixed w-full top-0 left-0 bg-white shadow-md z-10">
        <div className="flex justify-between items-center p-4 max-w-9xl mx-auto">
          <div className="flex items-start">
            <Image src="/logo.png" alt="Logo Polije" width={200} height={200} />
            <Image
              src="/logo-ajhelen.png"
              alt="Logo Ajhelen"
              width={50}
              height={50}
            />
          </div>
          <div className="flex items-center">
            <nav className="mr-10 space-x-5">
              <a href="#beranda" className="text-gray-700 hover:text-blue-600">
                Beranda
              </a>
              <a
                href="#destinasi"
                className="text-gray-700 hover:text-blue-600"
              >
                Destinasi Unggulan
              </a>
              <a href="#fitur" className="text-gray-700 hover:text-blue-600">
                Fitur Unggulan
              </a>
            </nav>
            <button
              onClick={() => signIn()}
              className="mr-4 border-2 border-orange-200 py-1 px-4 font-bold text-[#f38e58] rounded transition-all duration-100 hover:bg-gradient-to-l hover:from-[#FE7123] hover:to-[#F6D45E] hover:text-white"
            >
              Masuk
            </button>
            {/* <Link href="/register">
              <button
                className={`bg-[#FE7123] text-white font-bold py-1 px-4 rounded ${
                  shine ? "shining-animation" : ""
                }`}
              >
                Daftar
              </button>
            </Link> */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="text-center bg-gradient-to-tr from-[#FE7123] to-[#F6D45E] text-white pt-28 py-28 relative"
        id="beranda"
      >
        <div className="absolute inset-0">
          <Image
            src="/herosection-pattern.png"
            alt="Pattern Background"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>
        <div className="relative mx-auto mt-32 w-full md:mt-16 md:flex md:h-1/3 md:flex-col md:items-center md:justify-center">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-2 text-white">
            <h1 className="text-center text-2xl font-black uppercase tracking-wider sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              Your Personalized Travel Companion to Indonesia's Top Destinations
            </h1>
            <p className="mt-8 text-center text-sm sm:text-base md:text-lg lg:text-xl">
              Explore Indonesia's Hidden Gems with Ajhelen!
            </p>
          </div>
          <Link href={"/login"}>
            <div className="mt-16 flex w-full justify-center">
              <button
                className="text-[#FE7123] justify-center rounded-md text-sm ring-offset-background transition-colors 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
            disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground h-10 px-4 
            py-2 border-4 border-orange-200 hover:bg-orange-100 sm:h-12 sm:w-36 lg:h-14 lg:w-[11.4rem] 
            lg:text-lg mx-auto flex items-center gap-1 font-bold shadow-md shadow-black-400 hover:text-blue 
            mt-8 bg-white"
              >
                Coba Gratis
              </button>
            </div>
          </Link>
        </div>
      </section>

      {/* Destinasi Unggulan Section */}
      <section className="text-center bg-white py-16" id="destinasi">
        <h2 className="text-4xl uppercase font-bold mb-6 bg-gradient-to-r from-[#FE7123] to-[#F6D45E] bg-clip-text text-transparent transition-all duration-300 hover:bg-gradient-to-l hover:from-[#F6D45E] hover:to-[#FE7123]">
          Destinasi Unggulan
        </h2>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto justify-center">
          {/* Gambar 1 */}
          <div
            className="relative bg-cover bg-center h-80 w-80 rounded-md shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
            style={{ backgroundImage: "url(/likupang.jpg)" }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
              <p className="text-white font-bold text-lg">Likupang</p>
            </div>
          </div>

          {/* Gambar 2 */}
          <div
            className="relative bg-cover bg-center h-80 w-80 rounded-md shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundImage: "url(/mandalika.jpg)",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
              <p className="text-white font-bold text-lg">Mandalika</p>
            </div>
          </div>

          {/* Gambar 3 */}
          <div
            className="relative bg-cover bg-center h-80 w-80 rounded-md shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundImage: "url(/borobudur.jpg)",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
              <p className="text-white font-bold text-lg">Borobudur</p>
            </div>
          </div>

          <div className="col-span-3">
            <div className="flex justify-center gap-6">
              {/* Gambar 4 */}
              <div
                className="relative bg-cover bg-center h-80 w-80 rounded-md shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
                style={{
                  backgroundImage: "url(/labuanbajo.jpg)",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
                  <p className="text-white font-bold text-lg">Labuan Bajo</p>
                </div>
              </div>

              {/* Gambar 5 */}
              <div
                className="relative bg-cover bg-center h-80 w-80 rounded-md shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
                style={{
                  backgroundImage: "url(/danautoba.jpg)",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
                  <p className="text-white font-bold text-lg">Danau Toba</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mengenal Kami Lebih Dekat Section */}
      <section className="py-8 bg-gradient-to-tr from-[#FE7123] to-[#F6D45E] text-white relative">
        <div className="absolute inset-0">
          <Image
            src="/herosection-pattern.png"
            alt="Pattern Background"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>
        <div className="relative text-center mx-auto max-w-2xl">
          <h2 className="text-2xl font-semibold mb-6">
            MENGENAL KAMI LEBIH DEKAT
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-justify">
            Ajhelen adalah aplikasi travel yang memberikan rekomendasi
            perjalanan terbaik ke destinasi unggulan Indonesia. Temukan
            pengalaman terbaik di Likupang, Mandalika, Borobudur, Labuan Bajo,
            dan Danau Toba — lima Destinasi Pariwisata Super Prioritas (DPSP)
            Indonesia.
          </p>
          <button
            className="text-[#FE7123] justify-center rounded-md text-sm ring-offset-background 
          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
          focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary 
          text-secondary-foreground h-10 px-4 py-2 border-4 border-orange-200 hover:bg-orange-100 
          sm:h-12 sm:w-36 lg:h-14 lg:w-[11.4rem] lg:text-lg z-10 mx-auto flex items-center gap-1 
          font-bold shadow-md shadow-black-400 hover:text-blue mt-4 mb-4 bg-white"
          >
            Hubungi Kami
          </button>
        </div>
        <div className="mx-auto max-w-2xl bg-white mt-8 shadow-lg rounded-lg">
          <div
            className={`w-full h-64 shadow-lg rounded-lg overflow-hidden relative transition-opacity duration-500 ease-in-out ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src={destinations[currentImageIndex].image}
              alt={destinations[currentImageIndex].name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Keuntungan Menggunakan Robota Section */}
      <section className="bg-white text-center py-16" id="fitur">
        <h1 className="text-4xl uppercase font-bold mb-6 bg-gradient-to-r from-[#FE7123] to-[#F6D45E] bg-clip-text text-transparent transition-all duration-300 hover:bg-gradient-to-l hover:from-[#F6D45E] hover:to-[#FE7123]">
          Fitur Unggulan Ajhelen
        </h1>
        <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-auto sm:grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white border border-gray-300 shadow-md shadow-[#FE7123] h-96 rounded-lg p-4">
            <img
              src="/keuntungan1.png"
              alt="Keuntungan 1"
              className="w-[12rem] sm:w-[16rem]"
            />
            <p className="text-lg font-medium">
              Mudah Memantau informasi dari berbagai OTA dalam SATU PLATFORM
              saja
            </p>
          </div>
          <div className="bg-white border border-gray-300 shadow-md shadow-[#FE7123] h-96 rounded-lg p-4">
            <img
              src="/keuntungan2.png"
              alt="Keuntungan 2"
              className="w-[12rem] sm:w-[16rem]"
            />
            <p className="text-lg font-medium">
              Melihat berbagai ulasan dari tamu tentang reputasi hotel anda dari
              berbagai aspek
            </p>
          </div>
          <div className="bg-white border border-gray-300 shadow-md shadow-[#FE7123] h-96 rounded-lg p-4">
            <img
              src="/keuntungan3.png"
              alt="Keuntungan 3"
              className="w-[12rem] sm:w-[16rem]"
            />
            <p className="text-lg font-medium">
              Meningkatkan produktivitas dalam mengelola ulasan tamu di OTA
            </p>
          </div>
        </div>
        {/* <h2 className="text-3xl mt-20 font-bold bg-gradient-to-r from-[#FE7123] to-[#F6D45E] bg-clip-text text-transparent transition-all duration-300 hover:bg-gradient-to-l hover:from-[#F6D45E] hover:to-[#FE7123]">
          PENGGUNA TERPERCAYA
        </h2>

        <div className="h-40 w-80 mx-auto">
          <img src="/mgm.png" alt="mgm image" className="" />
        </div>
        <p className="font-poppins font-medium">
          PT Metropolitan Golden Management (MGM)
        </p> */}
      </section>

      {/* Kata - Kata */}
      <section className="bg-gradient-to-tr from-[#FE7123] to-[#F6D45E] text-white text-center py-32">
        <p className="text-2xl font-bold max-w-2xl mx-auto">
          "Visi kami adalah menjadikan Ajhelen sebagai platform terdepan dalam
          memberdayakan industri pariwisata Indonesia. Kami berkomitmen untuk
          membantu wisatawan melalui pemanfaatan teknologi yang inovatif"
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="grid grid-flow-row-dense grid-cols-3">
          <div className="px-4 flex items-start">
            <img
              src="/logo.png"
              alt="Logo Polije"
              width={300}
              className="items-start"
            />
            <img
              src="/logo-ajhelen.png"
              alt="Logo Ajhelen"
              width={80}
              height={60}
              className="items-start"
            />
          </div>

          <div className="text-center px-4">
            <p className="text-xl font-bold">
              Badan Riset dan Inovasi Nasional (BRIN)
            </p>
            <p className="text-justify">
              Jl. Babarsari, Tambak Bayan, Caturtunggal, Kec. Depok, Kabupaten
              Sleman, Daerah Istimewa Yogyakarta 55281
            </p>
          </div>

          <div className="text-end px-4">
            <p className="text-xl font-bold">PT GLOBAL DATA INSPIRASI</p>
            <p className="">
              Jl. Cik di Tiro No.34, Tarban, Kec. Gondokusuman, Kota Yogyakarta,
              Daerah Istimewa Yogyakarta 55223
            </p>
          </div>
        </div>
      </footer>

      <hr className="w-[]" />

      {/* <div className="bg-gradient-to-tr from-[#FE7123] to-[#F6D45E] text-center py-2 text-white"> */}
      <div className="text-center py-2 text-black bg-white">
        <p className="">&copy;copyright 2024</p>
      </div>
    </div>
  );
}
