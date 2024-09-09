"use client";

import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartAll } from "@/components/dashboard/card-dashboard/performa/charts/chart-all";
import { ChartTraveloka } from "@/components/dashboard/card-dashboard/performa/charts/chart-traveloka";
import { ChartTiket } from "@/components/dashboard/card-dashboard/performa/charts/chart-tiket";
import { ChartTripadvisor } from "@/components/dashboard/card-dashboard/performa/charts/chart-tripadvisor";
import { ChartDashboard } from "@/components/dashboard/charts";
import Image from "next/image";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState } from "react";

export default function DashboardPerforma() {
  const [activeTab, setActiveTab] = useState("Semua");
  return (
    <ContentLayout title="Dashboard">
      {/* Breadcumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Performa</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex h-full flex-col gap-6 mt-8">
        <h2 className="text-2xl font-bold text-black">Performa</h2>
        <p className="font-base text-muted-foreground">
          Nilai Performa menunjukkan tingkat pencapaian unit hotel yang dihitung
          berdasarkan rating dan jumlah review tamu dari masing-masing OTA
        </p>

        {/* Button OTA & All */}
        <div className="h-14 items-center gap-2 rounded-md border-2 text-muted-foreground flex w-full justify-start">
          {/* Performa OTA */}
          <div className="justify-center">
            <Tabs
              defaultValue="Semua"
              className=""
              onValueChange={(value) => setActiveTab(value)}
            >
              <TabsList className="w-full rounded-lg bg-white gap-2">
                <TabsTrigger
                  value="Semua"
                  className="w-1/2 text-center data-[state=active]:bg-[#4D4DC8] data-[state=active]:text-white hover:bg-[#4D4DC8] hover:text-white py-2"
                >
                  Semua
                </TabsTrigger>
                <TabsTrigger
                  value="Traveloka"
                  className="w-1/2 text-center py-2 data-[state=active]:bg-[#4D4DC8] data-[state=active]:text-white hover:bg-[#4D4DC8] hover:text-white"
                >
                  <Image
                    src="/traveloka-icon.png"
                    alt="traveloka"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Traveloka
                </TabsTrigger>
                <TabsTrigger
                  value="Tripadvisor"
                  className="w-1/2 text-center py-2 data-[state=active]:bg-[#4D4DC8] data-[state=active]:text-white hover:bg-[#4D4DC8] hover:text-white"
                >
                  <Image
                    src="/tripadvisor-icon.png"
                    alt="tripadvisor"
                    width={130}
                    height={130}
                    className="mr-2"
                  />
                  Tripadvisor
                </TabsTrigger>
                <TabsTrigger
                  value="Tiket"
                  className="w-1/2 text-center py-2 data-[state=active]:bg-[#4D4DC8] data-[state=active]:text-white hover:bg-[#4D4DC8] hover:text-white"
                >
                  <Image
                    src="/tiketdotcom-icon.png"
                    alt="ticket.com"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Tiket
                </TabsTrigger>
              </TabsList>
              <TabsContent value="Semua"></TabsContent>
              <TabsContent value="Traveloka"></TabsContent>
              <TabsContent value="Tripadvisor"></TabsContent>
              <TabsContent value="Tiket"></TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Charts nanti berubah sesuai dengan tabs */}
        <div className="flex h-full w-full justify-center rounded-lg border-2">
          <div className="w-[50%]">
            {activeTab === "Semua" && (
              <div>
                {/* Charts All */}
                <ChartAll />
              </div>
            )}
            {activeTab === "Traveloka" && (
              <div>
                {/* Charts Traveloka */}
                <ChartTraveloka />
              </div>
            )}
            {activeTab === "Tripadvisor" && (
              <div>
                {/* Charts Tripadvisor */}
                <ChartTripadvisor />
              </div>
            )}
            {activeTab === "Tiket" && (
              <div>
                {/* Charts Tiket */}
                <ChartTiket />
              </div>
            )}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
