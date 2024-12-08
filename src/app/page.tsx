"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatBot from "@/components/dashboard/chatbot";

// Data gambar destinasi
const destinations = [
  { name: "Likupang", image: "/images/likupang.jpg" },
  { name: "Mandalika", image: "/images/mandalika.jpg" },
  { name: "Borobudur", image: "/images/borobudur.jpg" },
  { name: "Labuan Bajo", image: "/images/labuanbajo.jpg" },
  { name: "Danau Toba", image: "/images/danautoba.jpg" },
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control hamburger menu

  // Mengatur transisi gambar dengan interval waktu
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === destinations.length - 1 ? 0 : prevIndex + 1
        );
        setFade(false);
      }, 500); // Durasi fade out
    }, 3000); // Interval gambar (3 detik)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Bagian Popup Fitur Unggulan
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const features = [
    {
      title: "Dashboard",
      image: "/keuntungan1.png",
      popupImage: "/gambarDashboard.png",
      description:
        "Dashboard Performa Wisata memudahkan pengguna untuk memantau kinerja destinasi melalui data ulasan dan grafik.",
      popupContent:
        "Halaman ini akan menampilkan berbagai informasi terkait performa destinasi. Dashboard di website Explorenesia menyediakan tampilan yang intuitif dan informatif bagi pengguna setelah login. Di sini, pengguna dapat melihat statistik penting seperti tingkat respon, ulasan, popularitas, dan penilaian keseluruhan untuk masing-masing destinasi. Jika pengguna mengklik bagian Performa di Dashboard, mereka akan diarahkan ke tampilan yang lebih detail mengenai kinerja masing-masing destinasi.",
    },
    {
      title: "Similar Destination",
      image: "/keuntungan2.png",
      popupImage: "/gambarSimilarDestination.png",
      description:
        "Fitur Similar Destination memberikan rekomendasi destinasi serupa berdasarkan preferensi pengguna.",
      popupContent:
        "Fitur Similar Destination pada ExploreNesia merekomendasikan destinasi wisata yang mirip dengan Destinasi Pariwisata Super Prioritas (DPSP) yang sedang dilihat, dengan informasi seperti Rate Price, Performa (contoh: 4.4 ⭐), Tingkat Respons (contoh: 100%), Jumlah Ulasan (contoh: 10,428), Popularitas (contoh: 82%), Penilaian Keseluruhan (contoh: 8,519), dan Lokasi Lengkap. Fitur ini dirancang untuk membantu pengguna membandingkan pilihan destinasi dengan karakteristik serupa sehingga mempermudah perencanaan perjalanan wisata.",
    },
    {
      title: "Rate Trend",
      image: "/keuntungan3.png",
      popupImage: "/gambarRateTrend.png",
      description:
        "Dengan Rate Trend, pengguna dapat melihat tren penilaian destinasi seiring waktu dan sentimen.",
      popupContent:
        "Pada halaman ini, pengguna akan melihat grafik yang menunjukkan tren penilaian dari waktu ke waktu untuk masing-masing destinasi. Grafik ini memberikan gambaran visual tentang bagaimana tingkat kepuasan wisatawan berubah, serta memudahkan identifikasi pola atau fluktuasi dalam penilaian. Pengguna dapat menganalisis data ini untuk memahami periode puncak atau penurunan rating, sehingga dapat mengambil langkah-langkah strategis untuk meningkatkan pengalaman wisatawan.",
    },
  ];

  return (
    <div className="font-poppins text-gray-900 relative">
      {/* Header */}
      <header
        className={`fixed w-full top-0 left-0 z-10 transition-all duration-300 ease-in-out ${isScrolled ? "bg-white shadow-md p-2" : "bg-white p-4 shadow-md"
          }`}
      >
        <div className="flex justify-between items-center max-w-9xl mx-auto">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Logo Polije" width={150} height={50} />
            <Image
              src="/logo-explorenesia.png"
              alt="Logo explorenesia"
              width={40}
              height={40}
            />
          </div>
          <div className="flex items-center">
            {/* Hamburger Menu */}
            <div className="md:hidden">
              <button onClick={toggleMenu}>
                {isMenuOpen ? (
                  <FaTimes className="text-3xl text-orange-600" />
                ) : (
                  <FaBars className="text-3xl text-orange-600" />
                )}
              </button>
            </div>

            {/* Navbar Links */}
            <nav
              className={`${isMenuOpen ? "flex" : "hidden"
                } flex-col md:flex md:flex-row md:items-center mr-10 space-x-5 space-y-4 md:space-y-0 md:space-x-5 transition-all duration-300 ease-in-out`}
            >
              <a
                href="#beranda"
                className="ml-5 text-gray-700 hover:text-orange-600"
              >
                Beranda
              </a>
              <a
                href="#destinasi"
                className="text-gray-700 hover:text-orange-600"
              >
                Destinasi Unggulan
              </a>
              <a href="#fitur" className="text-gray-700 hover:text-orange-600">
                Fitur Unggulan
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-orange-600"
              >
                Kontak
              </a>
            </nav>
            <button
              onClick={() => signIn()}
              className="hidden md:inline-block mr-4 border-2 border-orange-200 py-1 px-4 font-bold text-[#f38e58] rounded transition-all duration-100 hover:bg-gradient-to-l hover:from-[#FE7123] hover:to-[#F6D45E] hover:text-white"
            >
              Masuk
            </button>
          </div>
        </div>
      </header>

      {/* Rest of the content (unchanged) */}

      <ChatBot />

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
              Explore Indonesia's Hidden Gems with Explorenesia!
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
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {/* Gambar 1 */}
          <Link href={"/detaildestinasi/likupang"}>
            <div
              className="relative bg-cover bg-center h-80 w-80 rounded-md shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
              style={{ backgroundImage: "url(/images/likupang.jpg)" }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-end items-start space-y-2 p-4">
                <p className="text-white font-bold text-lg">Likupang</p>
                <button className="bg-[#FF8225] rounded-md text-white p-1.5 hover:bg-orange-500">
                  Selengkapnya
                </button>
              </div>
            </div>
          </Link>

          {/* Gambar 2 */}
          <Link href={"/detaildestinasi/mandalika"}>
            <div
              className="relative bg-cover bg-center h-80 w-80 rounded-md shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundImage: "url(/images/mandalika.jpg)",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-end items-start space-y-2 p-4">
                <p className="text-white font-bold text-lg">Mandalika</p>
                <button className="bg-[#FF8225] rounded-md text-white p-1.5 hover:bg-orange-500">
                  Selengkapnya
                </button>
              </div>
            </div>
          </Link>

          {/* Gambar 3 */}
          <Link href={"/detaildestinasi/borobudur"}>
            <div
              className="relative bg-cover bg-center h-80 w-80 rounded-md shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundImage: "url(/images/borobudur.jpg)",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-end items-start space-y-2 p-4">
                <p className="text-white font-bold text-lg">Borobudur</p>
                <button className="bg-[#FF8225] rounded-md text-white p-1.5 hover:bg-orange-500">
                  Selengkapnya
                </button>
              </div>
            </div>
          </Link>

          {/* Gambar 4 */}
          <Link href={"/detaildestinasi/labuan-bajo"}>
            <div
              className="relative bg-cover bg-center h-80 w-80 rounded-md shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundImage: "url(/images/labuanbajo.jpg)",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-end items-start space-y-2 p-4">
                <p className="text-white font-bold text-lg">Labuan Bajo</p>
                <button className="bg-[#FF8225] rounded-md text-white p-1.5 hover:bg-orange-500">
                  Selengkapnya
                </button>
              </div>
            </div>
          </Link>

          {/* Gambar 5 */}
          <Link href={"/detaildestinasi/danau-toba"}>
            <div
              className="relative bg-cover bg-center h-80 w-80 rounded-md shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundImage: "url(/images/danautoba.jpg)",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-end items-start space-y-2 p-4">
                <p className="text-white font-bold text-lg">Danau Toba</p>
                <button className="bg-[#FF8225] rounded-md text-white p-1.5 hover:bg-orange-500">
                  Selengkapnya
                </button>
              </div>
            </div>
          </Link>
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
            Explorenesia adalah aplikasi travel yang memberikan rekomendasi
            perjalanan terbaik ke destinasi unggulan Indonesia. Temukan
            pengalaman terbaik di Likupang, Mandalika, Borobudur, Labuan Bajo,
            dan Danau Toba — lima Destinasi Pariwisata Super Prioritas (DPSP)
            Indonesia.
          </p>
          <a href="https://wa.me/6285648807492?text=Halo Selamat Siang!">
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
          </a>
        </div>
        <div className="mx-auto max-w-2xl bg-white mt-8 shadow-lg rounded-lg">
          <div
            className={`w-full lg:h-72 md:h-64 sm:h-52 shadow-lg rounded-lg overflow-hidden relative transition-opacity duration-500 ease-in-out ${fade ? "opacity-0" : "opacity-100"
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
        <h1 className="lg:text-4xl md:text-4xl sm:text-4xl uppercase font-bold mb-6 bg-gradient-to-r from-[#FE7123] to-[#F6D45E] bg-clip-text text-transparent transition-all duration-300 hover:bg-gradient-to-l hover:from-[#F6D45E] hover:to-[#FE7123]">
          Fitur Unggulan Explorenesia
        </h1>
        <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-auto sm:grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto p-4">
          {features.map((feature, index) => (
            <Dialog
              key={index}
              open={activeFeature === index}
              onOpenChange={(isOpen) => setActiveFeature(isOpen ? index : null)}
            >
              <DialogTrigger asChild>
                <div className="flex flex-col justify-center items-center bg-white border border-gray-300 shadow-md shadow-[#FE7123] h-auto rounded-lg p-4 transform transition-transform hover:scale-105 cursor-pointer">
                  <h1 className="uppercase text-[#FE7123] font-bold lg:text-2xl md:text-2xl sm:text-lg">
                    {feature.title}
                  </h1>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="lg:w-[16rem] md:w-[16rem] sm:w-[12rem]"
                  />
                  <p className="text-base font-medium text-center text-black">
                    {feature.description}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[33vw]">
                <DialogHeader>
                  <DialogTitle className="text-[#FE7123] uppercase flex justify-center text-xl">
                    {feature.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="py-4 flex flex-col items-center">
                  <img
                    src={feature.popupImage}
                    alt={`Popup ${feature.title}`}
                    className="w-[70%] mb-2 shadow-lg"
                  />
                  <ScrollArea className="h-[100px]">
                    <p className="text-black text-justify px-4">
                      {feature.popupContent}
                    </p>
                  </ScrollArea>
                </div>
                <DialogFooter>
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-orange-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-500"
                    onClick={() => setActiveFeature(null)}
                  >
                    Close
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>

      {/* Kata - Kata */}
      <section className="bg-gradient-to-tr from-[#FE7123] to-[#F6D45E] text-white text-center py-32">
        <p className="text-2xl font-bold max-w-2xl mx-auto">
          "Visi kami adalah menjadikan Explorenesia sebagai platform terdepan
          dalam memberdayakan industri pariwisata Indonesia. Kami berkomitmen
          untuk membantu wisatawan melalui pemanfaatan teknologi yang inovatif"
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
              src="/logo-explorenesia.png"
              alt="Logo ExploreNesia"
              width={80}
              height={60}
              className="items-start lg:h-20 lg:w-20 md:h-20 md:w-20 sm:h-12 sm:w-12"
            />
          </div>

          <div className="text-center px-4">
            <p className="text-xl font-bold uppercase mb-2">
              Badan Riset dan Inovasi Nasional (BRIN)
            </p>
            <p className="text-end mb-2">
              Gedung B.J. Habibie, Jl. M.H. Thamrin No. 8, Jakarta Pusat 10340
            </p>
            <p className="text-end">
              Whatsapp:{" "}
              <a
                href="https://wa.me/6281119333639"
                className="hover:text-orange-500"
              >
                +62811-1933-3639
              </a>
            </p>
            <p className="text-end">
              Email:{" "}
              <a
                href="mailto:ppid@brin.go.id"
                className="hover:text-orange-500"
              >
                ppid@brin.go.id
              </a>
            </p>
          </div>

          <div className="text-end px-4" id="contact">
            <p className="text-xl font-bold uppercase mb-2">
              PT GLOBAL DATA INSPIRASI
            </p>
            <p className="text-end mb-2">
              Jl. Cik di Tiro No.34, Tarban, Kec. Gondokusuman, Kota Yogyakarta,
              Daerah Istimewa Yogyakarta 55223
            </p>
            <p className="text-end">
              Whatsapp:{" "}
              <a
                href="https://wa.me/6281520100171"
                className="hover:text-orange-500"
              >
                +62815-2010-0171
              </a>
            </p>
            <p className="text-end">
              Email:{" "}
              <a
                href="mailto:info@datains.id"
                className="hover:text-orange-500"
              >
                info@datains.id
              </a>
            </p>
          </div>
        </div>
      </footer>

      <hr className="w-[]" />

      <div className="text-center py-2 text-black bg-white">
        <p className="">&copy;copyright 2024</p>
      </div>
    </div>
  );
}
