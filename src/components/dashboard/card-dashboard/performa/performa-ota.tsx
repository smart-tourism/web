import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartAll } from "@/components/dashboard/card-dashboard/performa/charts/chart-all";
import Image from "next/image";

export default function PerformaOTA() {
  return (
    <div className="justify-center">
      <Tabs defaultValue="Semua" className="">
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
  );
}
