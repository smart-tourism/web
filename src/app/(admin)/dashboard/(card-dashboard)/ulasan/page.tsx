"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ReviewPage() {
  const [selectedOTA, setSelectedOTA] = useState("OTA");
  const [sentiment, setSentiment] = useState("Sentiment");
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const limit = 10; // Set limit per page
  const searchParams = useSearchParams();
  const tempatWisata = searchParams.get("location") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/dashboard/ulasan?tempat_wisata=${encodeURIComponent(
            tempatWisata
          )}&source=${encodeURIComponent(
            selectedOTA
          )}&sentiment=${encodeURIComponent(
            sentiment
          )}&page=${page}&limit=${limit}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setReviews(data.data || []);
        setTotalReviews(data.total || 0); // Set total reviews from response
      } catch (error) {
        console.error("Fetching data failed:", error);
      }
    };
    fetchData();
  }, [tempatWisata, selectedOTA, sentiment, page]);

  const totalPages = Math.ceil(totalReviews / limit);

  return (
    <ContentLayout title="Dashboard">
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

      <div className="flex flex-col gap-6 mt-8 text-black">
        <h2 className="text-2xl font-bold">Ulasan</h2>
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            Ulasan merupakan jumlah seluruh response atau komentar pada tiap
            destinasi.
          </p>

          <div className="flex flex-row gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="filter-button">
                  {selectedOTA}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["OTA", "Google", "Traveloka", "Tripadvisor", "Tiket"].map(
                  (ota) => (
                    <DropdownMenuItem
                      key={ota}
                      onClick={() => setSelectedOTA(ota)}
                      className="cursor-pointer"
                    >
                      {ota}
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="filter-button">
                  {sentiment}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["Sentiment", "Positif", "Netral", "Negatif"].map(
                  (sentimentType) => (
                    <DropdownMenuItem
                      key={sentimentType}
                      onClick={() => setSentiment(sentimentType)}
                      className="cursor-pointer"
                    >
                      {sentimentType}
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <ScrollArea className="p-4 max-h-[500px] overflow-y-auto">
          {reviews.length > 0 ? (
            reviews.map((review: any) => (
              <div
                key={review.id}
                className="p-4 mb-4 border rounded-lg shadow-sm bg-white"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {/* Gambar logo sumber */}
                    <img
                      src={`/${review.source}-icon.png`} // Ganti dengan path yang sesuai
                      alt={review.source}
                      className="w-6 h-6 rounded-full"
                    />
                    <div className="ml-2">
                      <p className="text-lg font-semibold mb-2">
                        {review.source} user
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        {review.komentar}
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(review.date), "PPP")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl text-yellow-400">
                      {review.rating}⭐
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-xl font-semibold">Tidak ada Review!</p>
              <p className="text-muted-foreground">
                Coba ubah filter atau rentang tanggal.
              </p>
            </div>
          )}
        </ScrollArea>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="btn"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="btn"
          >
            Next
          </button>
        </div>
      </div>
    </ContentLayout>
  );
}
