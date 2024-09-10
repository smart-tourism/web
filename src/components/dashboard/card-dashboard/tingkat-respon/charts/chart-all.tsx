"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

// Define chart data with two categories: Tingkat Respon and Review
const chartData = [
  {
    ota: "Traveloka",
    TingkatRespon: 120,
    Review: 300,
  },
  {
    ota: "Tripadvisor",
    TingkatRespon: 98,
    Review: 280,
  },
  {
    ota: "Tiket",
    TingkatRespon: 150,
    Review: 250,
  },
];

// Chart configuration for two data sets
const chartConfig = {
  TingkatRespon: {
    label: "Tingkat Respon",
    color: "rgb(199,223,255)", // Light blue
  },
  Review: {
    label: "Review",
    color: "rgb(89,141,226)", // Dark blue
  },
} satisfies ChartConfig;

export function ChartAll() {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        width={700}
        height={300}
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barCategoryGap="20%"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ota" />
        <YAxis tickMargin={10} />
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="p-2 bg-white shadow rounded text-black">
                  <p>{data.ota}</p>
                  <p>Tingkat Respon: {data.TingkatRespon}</p>
                  <p>Review: {data.Review}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        {/* First bar for Tingkat Respon */}
        <Bar
          dataKey="TingkatRespon"
          fill={chartConfig.TingkatRespon.color}
          radius={[10, 10, 0, 0]}
        />
        {/* Second bar for Review */}
        <Bar
          dataKey="Review"
          fill={chartConfig.Review.color}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}
