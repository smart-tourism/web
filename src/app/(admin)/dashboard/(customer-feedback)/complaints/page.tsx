"use client";

import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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

// Define the valid keys for reviewsData
type ReviewCategory =
  | "Meal"
  | "Surrounding"
  | "General"
  | "Facility"
  | "Location"
  | "Value"
  | "Room"
  | "Quality"
  | "Service";

// Sample review data for each category
const reviewsData: Record<
  ReviewCategory,
  {
    user: string;
    date: string;
    ota: string;
    comment: string;
    otaIcon: string;
  }[]
> = {
  Meal: [
    {
      user: "Andri Basuki",
      date: "4 Agustus 2024",
      ota: "traveloka",
      comment: "Masakannya enak... Rasa enak, bahan bagus.",
      otaIcon: "/traveloka-icon.png", // OTA logo icon
    },
    {
      user: "Tyas Yunikto",
      date: "4 Agustus 2024",
      ota: "tripadvisor",
      comment:
        "Nilai yg paling penting dari sebuah hotel salah satunya adalah service. Makanannya enak, minumannya kurang.",
      otaIcon: "/tripadvisor-icon.png", // OTA logo icon
    },
  ],
  Surrounding: [],
  General: [],
  Facility: [],
  Location: [],
  Value: [],
  Room: [],
  Quality: [],
  Service: [],
};

export default function CustomerFeedbackComplaints() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  // Default to "Meal" if category is not in the query parameters
  const [activeTab, setActiveTab] = useState<ReviewCategory>("Meal");

  // Set active tab based on query parameter when component mounts
  useEffect(() => {
    if (
      categoryParam &&
      typeof categoryParam === "string" &&
      categoryParam in reviewsData
    ) {
      setActiveTab(categoryParam as ReviewCategory);
    }
  }, [categoryParam]);

  // Get the active tab's data
  const activeReviews = reviewsData[activeTab];

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
          {Object.keys(reviewsData).map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 font-semibold"
                  : "text-gray-400"
              }`}
              onClick={() => handleTabChange(tab as ReviewCategory)}
            >
              {tab} ({reviewsData[tab as ReviewCategory].length})
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
                    <Image
                      src={review.otaIcon}
                      alt={`${review.ota} icon`}
                      width={32}
                      height={32}
                    />
                    <div className="flex flex-col">
                      {/* User and Date */}
                      <p className="font-semibold">{review.user}</p>
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
