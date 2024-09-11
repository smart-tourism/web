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
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuPortal,
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

// Rating Stars component
function RatingStarsDropdown({
  rating,
  setRating,
}: {
  rating: number | string;
  setRating: (rating: number | string) => void;
}) {
  const stars = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex h-10 items-center justify-between rounded-md border 
                  border-input bg-transparent px-3 py-2 text-sm ring-offset-background 
                  placeholder:text-muted-foreground focus:outline-none focus:ring-2 
                  focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed 
                  disabled:opacity-50 lg:w-[95%] md:w-full sm:w-full"
        >
          Rating: {typeof rating === "number" ? rating : "All"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuItem disabled>
          <strong>Pilih Rating</strong>
        </DropdownMenuItem>
        <div className="grid lg:grid-cols-10 md:grid-cols-10 sm:grid-cols-10 items-center w-[380px]">
          {stars.map((star) => (
            <DropdownMenuItem
              key={star}
              onClick={() => setRating(star)}
              className="cursor-pointer justify-center"
            >
              {/* <div className=""> */}
              <span
                key={star}
                className={`cursor-pointer text-2xl ${
                  star <= (rating as number)
                    ? "text-yellow-400"
                    : "text-gray-400"
                }`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
              {/* </div> */}
            </DropdownMenuItem>
          ))}
        </div>
        <div className="max-w-[24%] justify-end ml-72">
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setRating("All")}
            className="cursor-pointer w-full justify-center"
          >
            Reset to All
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
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
          className={`flex h-10 rounded-md border 
                  border-input bg-transparent px-2 py-2 ring-offset-background 
                  placeholder:text-muted-foreground focus:outline-none focus:ring-2 
                  focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed 
                  disabled:opacity-50 lg:w-full md:w-full sm:w-full justify-start text-left font-normal ${
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
    otaLogo: "🛫",
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
    otaLogo: "🛫",
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
  const [selectedTab, setSelectedTab] = useState<string>("Kamar");

  // Filtering reviews based on dropdown selections and selected tab
  const filteredReviews = dummyReviews.filter((review) => {
    const matchesTab =
      selectedTab === "Semua" || review.categories.includes(selectedTab);
    return (
      matchesTab &&
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
            <BreadcrumbPage>Ulasan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex h-full flex-col gap-6 mt-8 text-black">
        <h2 className="text-2xl font-bold text-black">Ulasan</h2>
        <p className="font-base text-muted-foreground">
          Tingkat Respon merupakan nilai perbandingan antara jumlah review dari
          tamu dan jumlah response yang diberikan oleh unit hotel di
          masing-masing OTA.
        </p>

        {/* Filters (Dropdowns) */}
        <div className="flex flex-row gap-2 my-4">
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 md:gap-2 items-center">
            {/* OTA Dropdown */}
            <div>
              <label className="block mb-2">OTA</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex h-10 items-center justify-between rounded-md border 
                  border-input bg-transparent px-3 py-2 text-sm ring-offset-background 
                  placeholder:text-muted-foreground focus:outline-none focus:ring-2 
                  focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed 
                  disabled:opacity-50 lg:w-[95%] md:w-full sm:w-full"
                  >
                    {selectedOTA}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[13rem]">
                  <DropdownMenuItem
                    onClick={() => setSelectedOTA("Semua")}
                    className="cursor-pointer"
                  >
                    Semua
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedOTA("Traveloka")}
                    className="cursor-pointer"
                  >
                    Traveloka
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Rating Dropdown */}
            <div>
              <label className="block mb-2">Peringkat</label>
              <RatingStarsDropdown rating={rating} setRating={setRating} />
            </div>

            {/* Sentiment Dropdown */}
            <div className="">
              <label className="block mb-2">Sentimen</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex h-10 items-center justify-between rounded-md border 
                  border-input bg-transparent px-3 py-2 text-sm ring-offset-background 
                  placeholder:text-muted-foreground focus:outline-none focus:ring-2 
                  focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed 
                  disabled:opacity-50 lg:w-[95%] md:w-full sm:w-full"
                  >
                    {sentiment}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => setSentiment("Semua")}
                    className="cursor-pointer"
                  >
                    Semua
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSentiment("Positive")}
                    className="cursor-pointer"
                  >
                    Positif
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSentiment("Neutral")}
                    className="cursor-pointer"
                  >
                    Neutral
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSentiment("Negative")}
                    className="cursor-pointer"
                  >
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
                  <Button
                    variant="outline"
                    className="flex h-10 items-center justify-between rounded-md border 
                  border-input bg-transparent px-3 py-2 text-sm ring-offset-background 
                  placeholder:text-muted-foreground focus:outline-none focus:ring-2 
                  focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed 
                  disabled:opacity-50 lg:w-[95%] md:w-full sm:w-full"
                  >
                    {response}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => setResponse("Semua")}
                    className="cursor-pointer"
                  >
                    Semua
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setResponse("Ada Respon")}
                    className="cursor-pointer"
                  >
                    Ada Respon
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setResponse("Tidak Respon")}
                    className="cursor-pointer"
                  >
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
        </div>

        {/* Category Tabs */}
        <div className="my-4 border-b">
          <ul
            className="flex flex-grow lg:space-x-16 md:space-x-8 
          sm:space-x-2 items-center justify-center whitespace-nowrap 
          border-b-2 text-base font-medium ring-offset-background transition-all 
          hover:text-primary focus-visible:outline-none focus-visible:ring-2 
          focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
          disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:border-primary 
          data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            {[
              "Kamar",
              "Lokasi",
              "Layanan",
              "Fasilitas",
              "Nilai",
              "Makanan",
              "Lingkungan",
              "Staf",
              "Kualitas",
            ].map((tab) => (
              <li
                key={tab}
                className={`cursor-pointer ${
                  selectedTab === tab ? "border-b-2 pb-2 border-blue-600" : ""
                } hover:border-b-[#4D4DC8]`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        {/* Reviews List */}
        <ScrollArea className="p-4">
          <div className="max-h-96">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
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
                      <span className="text-2xl mr-2">⭐{review.rating}</span>
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
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-xl font-semibold">Tidak ada Review!</p>
                <p className="text-muted-foreground">
                  Anda dapat mengubah filter dropdown atau mengubah tanggal pada
                  interval lainnya.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </ContentLayout>
  );
}
