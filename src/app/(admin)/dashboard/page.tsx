"use client";

import * as React from "react";
import { addDays, format, subDays, subMonths } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { FaRegQuestionCircle } from "react-icons/fa";
import { ChartDashboard } from "@/components/dashboard/charts";
import TopKeywords from "@/components/dashboard/top-keywords";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import OverviewStatus from "@/components/dashboard/overview-status";
import { SentimentOverview } from "@/components/dashboard/sentiment";
import CustomerFeedback from "@/components/dashboard/customer-feedback";
import Impact from "@/components/dashboard/impact";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
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

  const handleCustomDateChange = (date: DateRange | undefined) => {
    setSelectedRange("custom");
    setCustomDate(date);
    if (date?.from && date.to) {
      refreshData("custom", date);
    }
  };

  return (
    <ContentLayout title="Dashboard">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
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

        {/* Custom Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={`w-[300px] justify-start text-left font-normal ${
                !customDate ? "text-muted-foreground" : ""
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {loading ? (
                <Skeleton className="w-full h-6" />
              ) : customDate?.from ? (
                customDate.to ? (
                  <>
                    {format(customDate.from, "LLL dd, y")} -{" "}
                    {format(customDate.to, "LLL dd, y")}
                  </>
                ) : (
                  format(customDate.from, "LLL dd, y")
                )
              ) : (
                <span>Pilih tanggal</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={customDate?.from}
              selected={customDate}
              onSelect={handleCustomDateChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Card Dashboard */}
      <div className="grid gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 grid-rows-1 mt-2">
        <Link href="/dashboard/performa">
          <Card className="rounded-lg border-none mt-6 hover:bg-gray-100">
            <CardHeader>
              <CardTitle className="flex flex-auto gap-1">
                Performa
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer">
                    <FaRegQuestionCircle />
                  </HoverCardTrigger>
                  <HoverCardContent className="z-50 bg-white shadow-md rounded-md">
                    <p className="text-justify font-normal text-sm">
                      Nilai Performa menunjukkan tingkat pencapaian unit hotel
                      yang dihitung berdasarkan rating dan jumlah review tamu
                      dari masing - masing OTA.
                    </p>
                  </HoverCardContent>
                </HoverCard>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {loading ? (
                <Skeleton className="w-16 h-6" />
              ) : (
                <h1 className="font-bold">0</h1>
              )}
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/tingkat-respon">
          <Card className="rounded-lg border-none mt-6 hover:bg-gray-100">
            <CardHeader>
              <CardTitle className="flex flex-auto gap-1">
                Tingkat Respon
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer">
                    <FaRegQuestionCircle />
                  </HoverCardTrigger>
                  <HoverCardContent className="z-50 bg-white shadow-md rounded-md">
                    <p className="text-justify font-normal text-sm">
                      Tingkat Respon merupakan nilai perbandingan antara jumlah
                      review dari tamu dan jumlah response yang diberikan oleh
                      unit hotel di masing - masing OTA.
                    </p>
                  </HoverCardContent>
                </HoverCard>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {loading ? (
                <Skeleton className="w-16 h-6" />
              ) : (
                <h1 className="font-bold">0.00%</h1>
              )}
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/ulasan">
          <Card className="rounded-lg border-none mt-6 hover:bg-gray-100">
            <CardHeader>
              <CardTitle className="flex flex-auto gap-1">
                Ulasan
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer">
                    <FaRegQuestionCircle />
                  </HoverCardTrigger>
                  <HoverCardContent className="z-50 bg-white shadow-md rounded-md">
                    <p className="text-justify font-normal text-sm">
                      Kumpulan review tamu dari masing - masing OTA yang
                      dipetakan berdasarkan kategorinya.
                    </p>
                  </HoverCardContent>
                </HoverCard>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {loading ? (
                <Skeleton className="w-16 h-6" />
              ) : (
                <h1 className="font-bold">0</h1>
              )}
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/popularitas">
          <Card className="rounded-lg border-none mt-6 hover:bg-gray-100">
            <CardHeader>
              <CardTitle className="flex flex-auto gap-1">
                Popularitas
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer">
                    <FaRegQuestionCircle />
                  </HoverCardTrigger>
                  <HoverCardContent className="z-50 bg-white shadow-md rounded-md">
                    <p className="text-justify font-normal text-sm">
                      Nilai Popularitas menunjukkan popularitas unit hotel yang
                      dihitung berdasarkan banyaknya rating dari masing - masing
                      OTA.
                    </p>
                  </HoverCardContent>
                </HoverCard>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {loading ? (
                <Skeleton className="w-16 h-6" />
              ) : (
                <h1 className="font-bold">0</h1>
              )}
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/penilaian-keseluruhan">
          <Card className="rounded-lg border-none mt-6 hover:bg-gray-100">
            <CardHeader>
              <CardTitle className="flex flex-auto text-sm gap-1">
                <h1 className="mt-[-2px]">Penilaian Keseluruhan</h1>
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer">
                    <FaRegQuestionCircle />
                  </HoverCardTrigger>
                  <HoverCardContent className="z-50 bg-white shadow-md rounded-md">
                    <p className="text-justify font-normal text-sm">
                      Penilaian Keseluruhan adalah penilaian tingkat reputasi
                      unit hotel dari Robota yang dihitung berdasarkan tingkat
                      popularitas dari waktu ke waktu.
                    </p>
                  </HoverCardContent>
                </HoverCard>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {loading ? (
                <Skeleton className="w-16 h-6" />
              ) : (
                <h1 className="font-bold">0</h1>
              )}
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Chart & Top Keyword */}
      <div className="grid gap-4 lg:grid-cols-6 md:grid-cols-1 sm:grid-cols-1 grid-rows-1 text-black py-4">
        <div className="col-span-4">
          <Card className="lg:h-[29rem]">
            <CardHeader>
              <CardTitle className="flex flex-auto gap-1">
                Ulasan Unit
                <HoverCard>
                  <HoverCardTrigger className="cursor-pointer">
                    <FaRegQuestionCircle />
                  </HoverCardTrigger>
                  <HoverCardContent className="z-50 bg-white shadow-md rounded-md">
                    <p className="text-justify font-normal text-sm">
                      Penilaian Keseluruhan adalah penilaian tingkat reputasi
                      unit hotel dari Robota yang dihitung berdasarkan tingkat
                      popularitas dari waktu ke waktu.
                    </p>
                  </HoverCardContent>
                </HoverCard>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <div className="lg:w-[100%] md:w-[70%] sm:w-[40%]">
                  {loading ? (
                    <Skeleton className="w-full h-48" />
                  ) : (
                    <ChartDashboard />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2">
          <Card className="h-[29rem]">
            <CardHeader>
              <CardTitle className="flex flex-auto gap-1">
                Top Keyword
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-start text-base text-[#B0B2B2]">
                10 kata yang sering muncul pada review
              </p>
              {loading ? <Skeleton className="w-full h-6" /> : <TopKeywords />}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Overview Status, Dampak, Sentimen, & Customer Feedback */}
      <div className="flex w-full">
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1">
          <div className="flex w-full max-w-[355px]">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-auto gap-1">
                  Overview Status
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer">
                      <FaRegQuestionCircle />
                    </HoverCardTrigger>
                    <HoverCardContent className="z-50 bg-white shadow-md rounded-md">
                      <p className="text-justify font-normal text-sm">
                        Distribusi review dari masing - masing OTA.
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="w-full h-6" />
                ) : (
                  <OverviewStatus />
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex w-full flex-grow flex-col gap-2">
            <Link href="/dashboard/dampak">
              <Card className="hover:border-neutral-600">
                <CardHeader>
                  <CardTitle className="flex flex-auto gap-1">Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? <Skeleton className="w-full h-6" /> : <Impact />}
                </CardContent>
              </Card>
            </Link>

            <Card>
              <CardHeader>
                <CardTitle className="flex flex-auto gap-1">
                  Sentiment Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="w-full h-6" />
                ) : (
                  <SentimentOverview />
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex w-full min-w-[327px] flex-grow">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-auto gap-1">
                  Customer Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="items-center">
                {loading ? (
                  <Skeleton className="w-full h-6" />
                ) : (
                  <CustomerFeedback />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
