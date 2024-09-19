"use client";

import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function RateTrendPage() {
  const [activeTab, setActiveTab] = useState("Traveloka");
  return (
    <ContentLayout title="RateTrend">
      {/* Breadcumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/rate-trend">Rate Trend</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {/* <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Performa</BreadcrumbPage>
          </BreadcrumbItem> */}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex h-full flex-col gap-6 mt-4">
        <p className="font-base text-muted-foreground">
          Data nama kamar dapat bervariasi, karena diadaptasi dari sumber OTA
        </p>

        {/* Button OTA & All */}
        <div className="h-14 items-center gap-2 rounded-md border-2 text-muted-foreground flex w-full justify-start">
          {/* Performa OTA */}
          <div className="justify-center">
            <Tabs
              defaultValue="Traveloka"
              className=""
              onValueChange={(value) => setActiveTab(value)}
            >
              <TabsList className="w-full rounded-lg bg-white gap-2">
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
                    width={80}
                    height={80}
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
              <TabsContent value="Traveloka"></TabsContent>
              <TabsContent value="Tripadvisor"></TabsContent>
              <TabsContent value="Tiket"></TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Charts nanti berubah sesuai dengan tabs */}
        <div className="flex h-full w-full justify-center rounded-lg border-2">
          <div className="w-[80%]">
            {activeTab === "Traveloka" && (
              <div className="mt-8">
                {/* Charts Traveloka */}
                <ScrollArea>{/* <ChartTraveloka /> */}</ScrollArea>
              </div>
            )}
            {activeTab === "Tripadvisor" && (
              <div className="mt-8">
                {/* Charts Tripadvisor */}
                <ScrollArea>{/* <ChartTripadvisor /> */}</ScrollArea>
              </div>
            )}
            {activeTab === "Tiket" && (
              <div className="mt-8">
                {/* Charts Tiket */}
                <ScrollArea>{/* <ChartTiket /> */}</ScrollArea>
              </div>
            )}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
