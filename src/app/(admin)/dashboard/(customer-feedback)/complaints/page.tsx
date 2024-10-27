"use client";

import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";

// Define valid keys for reviews data
type ReviewCategory =
  | "jelek"
  | "kotor"
  | "bau"
  | "jijik"
  | "mahal"
  | "tidak nyaman"
  | "basi"
  | "buruk"
  | "lama";

export default function CustomerFeedbackComplaints() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const location = searchParams.get("location") || "";

  const [activeTab, setActiveTab] = useState<ReviewCategory>("jelek");
  const [datas, setDatas] = useState<
    Record<ReviewCategory, { date: string; ota: string; comment: string }[]>
  >({
    jelek: [],
    kotor: [],
    bau: [],
    jijik: [],
    mahal: [],
    "tidak nyaman": [],
    basi: [],
    buruk: [],
    lama: [],
  });

  // Set active tab based on query parameter when component mounts
  useEffect(() => {
    if (categoryParam && categoryParam in datas) {
      setActiveTab(categoryParam as ReviewCategory);
    }
  }, [categoryParam, datas]);

  // Fetch data from the API based on location
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/dashboard/complaints?tempat_wisata=${encodeURIComponent(
            location
          )}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const res = await response.json();
        setDatas(res.data || datas);
      } catch (error) {
        console.error("Fetching data failed:", error);
      }
    };

    fetchData();
  }, [location, datas]);

  const activeReviews = datas[activeTab];

  // Handle manual tab change (when clicking on tabs within this page)
  const handleTabChange = (tab: ReviewCategory) => {
    setActiveTab(tab);
    // Update URL when changing tabs
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("category", tab);
    window.history.pushState(null, "", newUrl.toString());
  };

  return (
    <ContentLayout title="Dashboard">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Customer Feedback</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Complaints</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Content */}
      <div className="flex h-full flex-col gap-8 text-black mt-6">
        <div className="text-2xl font-bold">Customer Feedback: Complaints</div>

        {/* Tab List */}
        <div className="flex gap-4 mb-4">
          {Object.keys(datas).map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 font-semibold"
                  : "text-gray-400"
              }`}
              onClick={() => handleTabChange(tab as ReviewCategory)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Display Content */}
        <div className="min-h-[300px]">
          <ScrollArea>
            {/* If no reviews are available */}
            {activeReviews.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Tidak ada data "{activeTab}"</p>
              </div>
            ) : (
              // If reviews are available
              activeReviews.map((review, index) => (
                <div
                  key={index}
                  className="border p-4 mb-4 rounded-md shadow-md"
                >
                  <div className="flex items-start gap-3">
                    {/* OTA Icon */}
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-full overflow-hidden">
                      <Image
                        src={`/${review.ota}-icon.png`}
                        alt={`${review.ota} icon`}
                        width={32}
                        height={32}
                        className="object-contain w-full h-full"
                      />
                    </div>

                    <div className="flex flex-col">
                      {/* User and Date */}
                      <p className="font-semibold">{review.ota} user</p>
                      <p className="text-sm text-gray-500">{review.date}</p>

                      {/* Comment */}
                      <p className="mt-2">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </ScrollArea>
        </div>
      </div>
    </ContentLayout>
  );
}
