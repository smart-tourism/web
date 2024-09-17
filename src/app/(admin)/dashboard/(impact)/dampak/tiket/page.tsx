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
import { ChartImpactTiket } from "@/components/dashboard/impact-dashboard/tiket/chart-tiket";

export default function DashboardTingkatRespon() {
  return (
    <ContentLayout title="Dashboard">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbLink asChild>
              <Link href="/dashboard/dampak">Impact</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Traveloka</BreadcrumbPage>
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

        {/* Tabel & Chart OTA Impact */}
        <div className="flex flex-col gap-10 rounded-lg border-2 p-6 text-black">
          {/* Traveloka */}
          <ChartImpactTiket />
        </div>
      </div>
    </ContentLayout>
  );
}
