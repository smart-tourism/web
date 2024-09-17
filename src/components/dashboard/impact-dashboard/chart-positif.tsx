"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Dummy data for positive impact
const chartData = [
  {
    value: 5.5, // Current value
    maxValue: 10, // Maximum value
  },
];

// Chart configuration for labels and colors
const chartConfig = {
  positive: {
    label: "Positif",
    color: "rgb(76 155 117/var(--tw-bg-opacity))",
  },
};

// Custom Tooltip to show both value and maxValue
function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const { value, maxValue } = payload[0].payload;
    return (
      <div className="p-2 bg-white border rounded shadow-lg">
        <p>{`Value: ${value}`}</p>
        <p>{`Max Value: ${maxValue}`}</p>
      </div>
    );
  }
  return null;
}

// Main Chart Component
export function ChartPositif() {
  return (
    <Card className="h-[280px]">
      <CardHeader className="flex items-start">
        {/* Display Emoji */}
        <span className="text-4xl">😄</span>
      </CardHeader>
      <CardContent className="items-start gap-2 w-full">
        {/* Title */}
        <h3 className="text-lg font-semibold">Dampak Negatif</h3>

        {/* Display Value */}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-green-500">
            {chartData[0].value}
          </span>
          <span className="text-gray-500">/ {chartData[0].maxValue}</span>
        </div>

        {/* Chart Container */}
        <ChartContainer config={chartConfig}>
          {/* BarChart for displaying progress */}
          <BarChart
            width={250}
            height={20}
            data={chartData}
            layout="vertical"
            margin={{ left: 0, right: 0 }}
          >
            <YAxis
              type="category"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value}
              hide
            />
            <XAxis dataKey="value" type="number" hide />
            {/* Red Indicator Bar */}
            <Bar
              className="cursor-pointer"
              dataKey="value"
              fill={chartConfig.positive.color}
              radius={10}
              isAnimationActive={false}
            />
            {/* Tooltip */}
            <ChartTooltip
              cursor={false}
              content={<CustomTooltip hideLabel />}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
