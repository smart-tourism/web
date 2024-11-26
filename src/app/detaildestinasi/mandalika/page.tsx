"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartMandalika } from "@/components/detail-destinasi/mandalika/chart-mandalika";
import { ScrollArea } from "@/components/ui/scroll-area";
import TopKeywordsMandalika from "@/components/detail-destinasi/mandalika/topkeywords-mandalika";

export default function LikupangDetail() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

  const [datas, setDatas] = useState({
    averageRating: 0,
    totalReviews: 0,
    positivePercentage: 0,
    reviewsByDate: [],
    positive: 0,
    netral: 0,
    negative: 0,
    topKeywords: [],
    positiveFeedback: [],
    negativeFeedback: [],
  });

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          className="text-white font-bold text-2xl mr-4 bg-orange-500 p-1.5 rounded-sm"
          onClick={() => router.back()}
        >
          &larr;
        </button>
        <h1 className="text-orange-500 text-4xl font-bold uppercase">
          mandalika
        </h1>
      </div>

      {/* Konten Utama */}
      <div className="flex flex-wrap">
        {/* Gambar dan Rating */}
        <div className="w-full md:w-2/3">
          <div className="relative">
            <img
              src="/images/Mandalika.jpg"
              alt="Likupang"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-md shadow-md flex items-center">
              <span className="text-yellow-500 font-bold">⭐</span>
              <p className="ml-1 font-bold text-gray-800">4.0</p>
            </div>
          </div>
        </div>

        {/* Detail Wisata */}
        <div className="w-full md:w-1/3 mt-6 md:mt-0 md:pl-6 text-justify">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Detail Wisata:
          </h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>Mandalika</strong>adalah kawasan wisata seluas 20.035 hektar
            yang berlokasi di <strong>Kabupaten Lombok Tengah</strong>,{" "}
            <strong>Nusa Tenggara Barat</strong>. Sejak 2017, Mandalika sudah
            diresmikan sebagai <strong>Kawasan Ekonomi Khusus (KEK)</strong>{" "}
            pariwisata yang direncanakan dapat menjadi kawasan wisata. Nama
            Mandalika berasal dari nama seorang putri dalam cerita rakyat yang
            terkait dengan perayaan Nyale di Lombok.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Salah satu daya tarik utama di Mandalika adalah{" "}
            <strong>Pertamina Mandalika International Street Circuit</strong>,
            yang menjadi lokasi ajang balap internasional seperti{" "}
            <strong>MotoGP</strong> dan <strong>World Superbike</strong>. Selain
            itu, Mandalika menawarkan keindahan pantai seperti{" "}
            <em>Pantai Kuta Mandalika</em>,<em>Pantai Tanjung Aan</em>, dan{" "}
            <em>Bukit Merese</em>, tempat yang cocok untuk menikmati pemandangan
            matahari terbit maupun terbenam.
          </p>
        </div>
      </div>

      {/* Chart, Top Keywords, & Tingkat Respon */}
      <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 mt-10">
        {/* Card Jumlah Ulasan */}
        <div className="col-span-2 flex w-full">
          <Card className="w-full h-[100%]">
            <CardHeader>
              <CardTitle>Jumlah Ulasan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-full lg:w-[100%] md:w-[70%] sm:w-[40%]">
                {loading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <ScrollArea>
                    <ChartMandalika />
                  </ScrollArea>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex w-full flex-grow flex-col gap-2">
          {/* Card Tingkat Respon */}
          <Card className="flex flex-col items-center justify-center">
            <CardHeader>
              <CardTitle>Tingkat Respon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-500">2.3%</p>
            </CardContent>
          </Card>

          {/* Card Top Keywords */}
          <Card className="h-96">
            <CardHeader>
              <CardTitle className="flex flex-auto gap-1">
                Top Keywords
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-start text-base text-[#B0B2B2]">
                10 kata yang sering muncul pada review
              </p>
              {loading ? (
                <Skeleton className="w-full h-6" />
              ) : (
                <TopKeywordsMandalika data={datas.topKeywords} />
              )}
              {/* yg top keywords ini aku copas dari yg dashboard tapi udah dibedakan filenya */}
              {/* nah yg di dashboard kan tergantung dari select destination + filter" lainnya, nah yg ini kan ngga nanti */}
              {/* jadi selamat mengatur" :D */}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="mt-8 text-center">
        <button className="bg-orange-500 text-white text-lg font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-orange-600">
          Ingin Berkunjung Ke Destinasi Ini?
        </button>
      </div>
    </div>
  );
}