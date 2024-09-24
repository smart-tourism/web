import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CustomerFeedback() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false); // For client-side rendering check

  useEffect(() => {
    setIsMounted(true); // Only after the component has been mounted
  }, []);

  const feedbackCategoriesPraises = [
    { label: "Meal", count: 0 },
    { label: "Surrounding", count: 0 },
    { label: "General", count: 0 },
    { label: "Facility", count: 0 },
    { label: "Location", count: 0 },
    { label: "Value", count: 0 },
    { label: "Room", count: 0 },
    { label: "Quality", count: 0 },
    { label: "Service", count: 0 },
  ];

  const feedbackCategoriesComplaints = [
    { label: "Meal", count: 0 },
    { label: "Surrounding", count: 0 },
    { label: "General", count: 0 },
    { label: "Facility", count: 0 },
    { label: "Location", count: 0 },
    { label: "Value", count: 0 },
    { label: "Room", count: 0 },
    { label: "Quality", count: 0 },
    { label: "Service", count: 0 },
  ];

  // Function to handle navigation to specific category
  const handleNavigation = (
    category: string,
    type: "Praises" | "Complaints"
  ) => {
    if (isMounted) {
      // Only allow navigation if the component is mounted
      if (type === "Praises") {
        router.push(`/dashboard/praises?category=${category}`);
      } else {
        router.push(`/dashboard/complaints?category=${category}`);
      }
    }
  };

  if (!isMounted) {
    return <p>Loading...</p>;
  }

  return (
    <div className="justify-center">
      <Tabs defaultValue="Praises" className="w-auto">
        <TabsList className="w-full rounded-lg">
          <TabsTrigger value="Praises" className="w-1/2 text-center">
            Praises
          </TabsTrigger>
          <TabsTrigger value="Complaints" className="w-1/2 text-center">
            Complaints
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Praises">
          <div className="grid grid-cols-3 gap-4">
            {feedbackCategoriesPraises.map((category, index) => (
              <button
                type="button"
                key={index}
                className="border border-gray-300 rounded-lg px-3 py-2 text-start hover:border-black"
                onClick={() => handleNavigation(category.label, "Praises")}
              >
                <span className="text-green-500 font-bold text-lg">
                  {category.count}
                </span>
                <p className="text-gray-700 mt-1 text-[12px]">
                  {category.label}
                </p>
              </button>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Complaints">
          <div className="grid grid-cols-3 gap-4">
            {feedbackCategoriesComplaints.map((category, index) => (
              <button
                type="button"
                key={index}
                className="border border-gray-300 rounded-lg px-3 py-2 text-start hover:border-black"
                onClick={() => handleNavigation(category.label, "Complaints")}
              >
                <span className="text-red-500 font-bold text-lg">
                  {category.count}
                </span>
                <p className="text-gray-700 mt-1 text-[12px]">
                  {category.label}
                </p>
              </button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
