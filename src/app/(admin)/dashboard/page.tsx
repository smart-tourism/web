import Link from "next/link";

import { FaRegQuestionCircle } from "react-icons/fa";
import { ChartDashboard } from "@/components/dashboard/charts";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import TopKeywords from "@/components/dashboard/top-keywords";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

export default function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      {/* Breadcumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          {/* <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem> */}
          {/* <BreadcrumbSeparator /> */}
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Card Dashboard */}
      <div className="grid gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 grid-rows-1">
        <Card className="rounded-lg border-none mt-6">
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
                    yang dihitung berdasarkan rating dan jumlah review tamu dari
                    masing - masing OTA.
                  </p>
                </HoverCardContent>
              </HoverCard>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <h1 className="font-bold">0</h1>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-none mt-6">
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
            <h1 className="font-bold">0.00%</h1>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-none mt-6">
          <CardHeader>
            <CardTitle className="flex flex-auto gap-1">
              Ulasan
              <HoverCard>
                <HoverCardTrigger className="cursor-pointer">
                  <FaRegQuestionCircle />
                </HoverCardTrigger>
                <HoverCardContent className="z-50 bg-white shadow-md rounded-md">
                  <p className="text-justify font-normal text-sm">
                    Kumpulan review tamu dari masing - masing OTA yang dipetakan
                    berdasarkan kategorinya.
                  </p>
                </HoverCardContent>
              </HoverCard>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <h1 className="font-bold">0</h1>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-none mt-6">
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
            <h1 className="font-bold">0</h1>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-none mt-6">
          <CardHeader>
            <CardTitle className="flex flex-auto text-sm gap-1">
              <h1 className="mt-[-2px]">Penilaian Keseluruhan</h1>
              <HoverCard>
                <HoverCardTrigger className="cursor-pointer">
                  <FaRegQuestionCircle />
                </HoverCardTrigger>
                <HoverCardContent className="z-50 bg-white shadow-md rounded-md">
                  <p className="text-justify font-normal text-sm">
                    Penilaian Keseluruhan adalah penilaian tingkat reputasi unit
                    hotel dari Robota yang dihitung berdasarkan tingkat
                    popularitas dari waktu ke waktu.
                  </p>
                </HoverCardContent>
              </HoverCard>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <h1 className="font-bold">0</h1>
          </CardContent>
        </Card>
      </div>

      {/* Chart & Top Keyword */}
      <div className="grid gap-4 lg:grid-cols-5 md:grid-cols-1 sm:grid-cols-1 grid-rows-1 text-black py-4">
        <div className="col-span-3">
          <Card className="max-h-[27rem]">
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
              {/* Charts */}
              <ChartDashboard />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2">
          <Card className="h-[27rem]">
            <CardHeader>
              <CardTitle className="flex flex-auto gap-1">
                Top Keyword
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-start text-base text-[#B0B2B2]">
                10 kata yang sering muncul pada review
              </p>
              <TopKeywords />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Status, Dampak, Sentimen, & Customer Feedback */}
    </ContentLayout>
  );
}
