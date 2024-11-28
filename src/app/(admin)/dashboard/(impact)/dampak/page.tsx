"use client";

import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useState } from "react";
import { ChartImpactAll } from "@/components/dashboard/impact-dashboard/chart-impact-all";
import { useSearchParams } from "next/navigation";

export default function DashboardTingkatRespon() {
  const searchParams = useSearchParams();
  let tempatWisata = searchParams.get("location") || "";

  // Fetch data
  const [datas, setDatas] = useState({
    reviewsByDate: [],
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/dashboard/dampak?tempat_wisata=${encodeURIComponent(
            tempatWisata
          )}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const res = await response.json();
        setDatas({
          reviewsByDate: res.data ? res.data : [],
        });
      } catch (error) {
        console.error("Fetching data failed:", error);
      }
    };

    fetchData();
  }, [tempatWisata]);

  return (
    <ContentLayout title="Dashboard">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Impact</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex h-full flex-col gap-6 mt-8">
        <h2 className="text-2xl font-bold text-black">Dampak</h2>
        <p className="font-base text-muted-foreground">
          Nilai Dampak didapatkan dari perhitungan sentimen masing - masing
          review yang dapat bernilai positif dan negatif.
        </p>

        {/* Tabel dan Chart */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Tabel & Chart OTA Impact */}
          <div className=" lg:w-full p-4 rounded-lg shadow-md border text-black">
            <ChartImpactAll data={datas.reviewsByDate} />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
