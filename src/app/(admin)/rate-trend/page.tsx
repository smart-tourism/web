"use client";

import Link from "next/link";
import * as React from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { ChartRateTrendTiket } from "@/components/dashboard/rate-trend/tiket/chart-tiket";
import { ChartRateTrendTraveloka } from "@/components/dashboard/rate-trend/traveloka/chart-traveloka";
import { ChartRateTrendTripadvisor } from "@/components/dashboard/rate-trend/tripadvisor/chart-tripadvisor";

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
import { Button } from "@/components/ui/button";
import { TbMapSearch } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { addDays, format, subDays, subMonths } from "date-fns";
import { DateRange } from "react-day-picker";
export default function RateTrendPage() {
  const [activeTab, setActiveTab] = useState("Traveloka");
  const [selectedRange, setSelectedRange] = React.useState<
    "7days" | "30days" | "6months" | "12months" | "custom" | undefined
  >();
  const [loading, setLoading] = React.useState(true);
  const [customDate, setCustomDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });

  React.useEffect(() => {
    // Simulate a loading delay
    const timeout = setTimeout(() => {
      setLoading(false); // Data is now loaded
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  React.useEffect(() => {
    if (isDropdownOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isDropdownOpen]);

  const refreshData = (range: string, customDate?: DateRange) => {
    console.log("Refreshing data for range:", range, customDate);
    // Add logic to fetch and refresh data based on selected range or custom date
  };

  const handleRangeClick = (
    range: "7days" | "30days" | "6months" | "12months"
  ) => {
    setSelectedRange(range);
    setCustomDate(undefined); // Reset custom date picker

    let dateRange;
    switch (range) {
      case "7days":
        dateRange = { from: subDays(new Date(), 7), to: new Date() };
        break;
      case "30days":
        dateRange = { from: subDays(new Date(), 30), to: new Date() };
        break;
      case "6months":
        dateRange = { from: subMonths(new Date(), 6), to: new Date() };
        break;
      case "12months":
        dateRange = { from: subMonths(new Date(), 12), to: new Date() };
        break;
    }
    refreshData(range, dateRange);
  };

  // const handleCustomDateChange = (date: DateRange | undefined) => {
  //   setSelectedRange("custom");
  //   setCustomDate(date);
  //   if (date?.from && date.to) {
  //     refreshData("custom", date);
  //   }
  // };
  const [selectedDestination, setSelectedDestination] =
    useState<string>("Pilih Destinasi");
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

      {/* Date Range Selector */}
      <div className="flex justify-between items-center my-4 text-black">
        <div className="flex gap-2">
          <Button
            className={`${
              selectedRange === "7days"
                ? "bg-blue-500 text-white"
                : "bg-white text-black hover:text-white hover:bg-black"
            }`}
            onClick={() => handleRangeClick("7days")}
          >
            {loading ? <Skeleton className="w-16 h-4" /> : "7 Hari"}
          </Button>
          <Button
            className={`${
              selectedRange === "30days"
                ? "bg-blue-500 text-white"
                : "bg-white text-black hover:text-white hover:bg-black"
            }`}
            onClick={() => handleRangeClick("30days")}
          >
            {loading ? <Skeleton className="w-16 h-4" /> : "30 Hari"}
          </Button>
          <Button
            className={`${
              selectedRange === "6months"
                ? "bg-blue-500 text-white"
                : "bg-white text-black hover:text-white hover:bg-black"
            }`}
            onClick={() => handleRangeClick("6months")}
          >
            {loading ? <Skeleton className="w-16 h-4" /> : "6 Bulan"}
          </Button>
          <Button
            className={`${
              selectedRange === "12months"
                ? "bg-blue-500 text-white"
                : "bg-white text-black hover:text-white hover:bg-black"
            }`}
            onClick={() => handleRangeClick("12months")}
          >
            {loading ? <Skeleton className="w-16 h-4" /> : "12 Bulan"}
          </Button>
        </div>

        {/* Pilih Destinasi Dropdown */}
        <div>
          <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
            <DropdownMenuTrigger asChild className="text-black">
              <Button
                variant="outline"
                className="flex h-10 items-center justify-between rounded-md border 
                  border-input bg-transparent px-3 py-2 text-sm ring-offset-background 
                  placeholder:text-muted-foreground focus:outline-none focus:ring-2 
                  focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed 
                  disabled:opacity-50 lg:w-[100%] md:w-full sm:w-full"
              >
                {loading ? (
                  <Skeleton className="mr-2 h-4 w-4" />
                ) : (
                  <TbMapSearch className="mr-2 h-4 w-4" />
                )}
                {loading ? (
                  <Skeleton className="w-24 h-4" />
                ) : (
                  selectedDestination
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[100%] flex flex-col items-center text-center">
              <DropdownMenuItem
                onClick={() => setSelectedDestination("Pilih Destinasi")}
                className="cursor-pointer"
              >
                Semua Destinasi
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setSelectedDestination("Likupang")}
                className="cursor-pointer"
              >
                Likupang
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setSelectedDestination("Borobudur")}
                className="cursor-pointer"
              >
                Borobudur
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setSelectedDestination("Mandalika")}
                className="cursor-pointer"
              >
                Mandalika
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setSelectedDestination("Labuan Bajo")}
                className="cursor-pointer"
              >
                Labuan Bajo
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setSelectedDestination("Danau Toba")}
                className="cursor-pointer"
              >
                Danau Toba
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex h-full flex-col gap-6 mt-4">
        <p className="font-base text-muted-foreground">
          Rate Trend adalah jumlah ulasan dari setiap destinasi di setiap OTA
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
                  {loading ? (
                    <Skeleton className="mr-2 h-4 w-4 bg-white" />
                  ) : (
                    <Image
                      src="/traveloka-icon.png"
                      alt="traveloka"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                  )}
                  {loading ? (
                    <Skeleton className="w-24 h-4 bg-white" />
                  ) : (
                    "Traveloka"
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="Tripadvisor"
                  className="w-1/2 text-center py-2 data-[state=active]:bg-[#4D4DC8] data-[state=active]:text-white hover:bg-[#4D4DC8] hover:text-white"
                >
                  {loading ? (
                    <Skeleton className="mr-2 h-4 w-4" />
                  ) : (
                    <Image
                      src="/tripadvisor-icon.png"
                      alt="tripadvisor"
                      width={80}
                      height={80}
                      className="mr-2"
                    />
                  )}
                  {loading ? <Skeleton className="w-24 h-4" /> : "Tripadvisor"}
                </TabsTrigger>
                <TabsTrigger
                  value="Tiket"
                  className="w-1/2 text-center py-2 data-[state=active]:bg-[#4D4DC8] data-[state=active]:text-white hover:bg-[#4D4DC8] hover:text-white"
                >
                  {loading ? (
                    <Skeleton className="mr-2 h-4 w-4" />
                  ) : (
                    <Image
                      src="/tiketdotcom-icon.png"
                      alt="ticket.com"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                  )}
                  {loading ? <Skeleton className="w-24 h-4" /> : "Tiket"}
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
          <div className="w-[100%]">
            {activeTab === "Traveloka" && (
              <div className="mt-8 mr-4">
                {/* Charts Traveloka */}
                {loading ? (
                  <Skeleton className="w-full" />
                ) : (
                  <ScrollArea>
                    <ChartRateTrendTraveloka />
                  </ScrollArea>
                )}
              </div>
            )}
            {activeTab === "Tripadvisor" && (
              <div className="mt-8 mr-4">
                {/* Charts Tripadvisor */}
                {loading ? (
                  <Skeleton className="w-full" />
                ) : (
                  <ScrollArea>
                    <ChartRateTrendTripadvisor />
                  </ScrollArea>
                )}
              </div>
            )}
            {activeTab === "Tiket" && (
              <div className="mt-8 mr-4">
                {/* Charts Tiket */}
                {loading ? (
                  <Skeleton className="w-full" />
                ) : (
                  <ScrollArea>
                    <ChartRateTrendTiket />
                  </ScrollArea>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
