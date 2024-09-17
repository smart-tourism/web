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
import { useState } from "react";
import { ChartImpactAll } from "@/components/dashboard/impact-dashboard/chart-impact-all";
import { ChartNegatif } from "@/components/dashboard/impact-dashboard/chart-negatif";
import { ChartPositif } from "@/components/dashboard/impact-dashboard/chart-positif";

export default function DashboardTingkatRespon() {
  const [activeTab, setActiveTab] = useState("Semua");

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
          Nilai Dampak didapatkan dari perhitungan sentimen masing-masing review
          yang dapat bernilai positif dan negatif.
        </p>

        {/* Tabel dan Chart */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Tabel & Chart OTA Impact */}
          <div className=" lg:w-full p-4 rounded-lg shadow-md border text-black">
            <ChartImpactAll />
          </div>

          {/* Chart Impact Negative & Postive */}
          <div className="flex w-[30%] h-full flex-grow flex-col gap-2">
            {/* Chart Positive */}
            <ChartPositif />

            {/* Chart Negative */}
            <ChartNegatif />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
