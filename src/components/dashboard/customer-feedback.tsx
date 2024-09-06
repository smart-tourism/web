import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CustomerFeedback() {
  return (
    <div className="">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="Praises">Praises</TabsTrigger>
          <TabsTrigger value="Complaints">Complaints</TabsTrigger>
        </TabsList>
        <TabsContent value="Praises">Praises</TabsContent>
        <TabsContent value="Complaints">Complaints</TabsContent>
      </Tabs>
    </div>
  );
}
