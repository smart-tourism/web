"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Define types for the props
interface RatingStarsProps {
  rating: number | string;
  setRating: (rating: number | string) => void;
}

// Rating Stars component
function RatingStars({ rating, setRating }: RatingStarsProps) {
  const stars = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="flex items-center">
      {stars.map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-2xl ${
            star <= (rating as number) ? "text-yellow-500" : "text-gray-400"
          }`}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
      <button className="ml-4 text-blue-600" onClick={() => setRating("All")}>
        Reset to All
      </button>
    </div>
  );
}

// DatePickerWithRange component using shadcn
function DatePickerWithRange({
  date,
  setDate,
}: {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={`w-[300px] justify-start text-left font-normal ${
            !date ? "text-muted-foreground" : ""
          }`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}

// Dummy Data for Reviews
const dummyReviews = [
  {
    id: 1,
    name: "Haposan P.",
    date: "30 August 2024",
    rating: 9.1,
    sentiment: "Neutral",
    review: "Quite pleasant, cleanliness needs to be improved.",
    response:
      "Dear Mr. Haposan P., Warm Greetings from The Rich Hotel Jogja, Thank you for your visit and positive review...",
    categories: ["Makanan", "Lingkungan", "Layanan", "Lokasi", "Staf"],
    otaLogo: "🛫", // Assuming an emoji for OTA logo
    responseDate: "2 September 2024",
  },
  {
    id: 2,
    name: "Ian A. W.",
    date: "10 September 2023",
    rating: 10,
    sentiment: "Positive",
    review:
      "Really like it for a family staycation with 2 children under 3 years old, not complicated, good service...",
    response:
      "Dear Mr. Ian Aditya Warsita, Warm Greetings from The Rich Hotel Yogyakarta, thank you for choosing The Rich Hotel...",
    categories: ["Fasilitas", "Kualitas", "Nilai", "Makanan"],
    otaLogo: "🛫", // Assuming an emoji for OTA logo
    responseDate: "11 September 2023",
  },
];

// Main Component
export default function ReviewPage() {
  const [selectedOTA, setSelectedOTA] = useState<string>("Semua");
  const [rating, setRating] = useState<number | string>("All");
  const [sentiment, setSentiment] = useState<string>("Semua");
  const [response, setResponse] = useState<string>("Semua");
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });

  const [expandedReviewId, setExpandedReviewId] = useState<number | null>(null);

  // Filtering reviews based on dropdown selections
  const filteredReviews = dummyReviews.filter((review) => {
    return (
      (selectedOTA === "Semua" || review.otaLogo === selectedOTA) &&
      (rating === "All" || review.rating >= parseFloat(rating.toString())) &&
      (sentiment === "Semua" || review.sentiment === sentiment) &&
      (response === "Semua" || (response === "Ada Respon" && review.response))
    );
  });

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
          <BreadcrumbItem>
            <BreadcrumbPage>Tingkat Respon</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex h-full flex-col gap-6 mt-8 text-black">
        <h2 className="text-2xl font-bold text-black">Tingkat Respon</h2>
        <p className="font-base text-muted-foreground">
          Tingkat Respon merupakan nilai perbandingan antara jumlah review dari
          tamu dan jumlah response yang diberikan oleh unit hotel di
          masing-masing OTA.
        </p>

        {/* Filters (Dropdowns) */}
        <div className="flex space-x-4 my-4">
          {/* OTA Dropdown */}
          <div>
            <label className="block mb-2">OTA</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{selectedOTA}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedOTA("Semua")}>
                  Semua
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedOTA("🛫")}>
                  Traveloka
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Rating Dropdown */}
          <div>
            <label className="block mb-2">Peringkat</label>
            <RatingStars rating={rating} setRating={setRating} />
          </div>

          {/* Sentiment Dropdown */}
          <div>
            <label className="block mb-2">Sentimen</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{sentiment}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSentiment("Semua")}>
                  Semua
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSentiment("Positive")}>
                  Positif
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSentiment("Neutral")}>
                  Neutral
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSentiment("Negative")}>
                  Negatif
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Response Dropdown */}
          <div>
            <label className="block mb-2">Respon</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{response}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setResponse("Semua")}>
                  Semua
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setResponse("Ada Respon")}>
                  Ada Respon
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setResponse("Tidak Respon")}>
                  Tidak Respon
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block mb-2">Tanggal</label>
            <DatePickerWithRange
              date={selectedDate}
              setDate={setSelectedDate}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="my-4 border-b">
          <ul className="flex space-x-4">
            <li className="border-b-2 pb-2 border-blue-600 cursor-pointer">
              Kamar
            </li>
            <li className="cursor-pointer">Lokasi</li>
            <li className="cursor-pointer">Layanan</li>
            <li className="cursor-pointer">Fasilitas</li>
            <li className="cursor-pointer">Nilai</li>
            <li className="cursor-pointer">Makanan</li>
            <li className="cursor-pointer">Lingkungan</li>
            <li className="cursor-pointer">Staf</li>
            <li className="cursor-pointer">Kualitas</li>
          </ul>
        </div>

        {/* Reviews List */}
        <ScrollArea className="p-4">
          <div className="max-h-96">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="p-4 mb-4 border rounded-lg shadow-sm bg-white"
              >
                {/* Name, Date, and OTA Logo */}
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl">{review.otaLogo}</span>
                    <div className="ml-2">
                      <p className="font-bold">{review.name}</p>
                      <p className="text-sm">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{review.rating}</span>
                    <span>{review.sentiment}</span>
                  </div>
                </div>

                {/* Review Categories */}
                <div className="flex flex-wrap mt-2">
                  {review.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 border rounded-full text-xs m-1"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* Review Content */}
                <p className="mt-2">{review.review}</p>

                {/* Response (if available) */}
                {review.response && (
                  <div className="mt-4 p-2 bg-gray-100 rounded-lg">
                    <p className="text-sm mb-2">
                      <strong>Reply from Traveloka</strong> -{" "}
                      {review.responseDate}
                    </p>
                    <p>
                      {expandedReviewId === review.id
                        ? review.response
                        : `${review.response.slice(0, 100)}...`}
                    </p>
                    <button
                      className="text-blue-600"
                      onClick={() =>
                        setExpandedReviewId(
                          expandedReviewId === review.id ? null : review.id
                        )
                      }
                    >
                      {expandedReviewId === review.id
                        ? "Tampilkan Lebih Sedikit"
                        : "Tampilkan Lebih Banyak"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </ContentLayout>
  );
}
