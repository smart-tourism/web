"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  YAxis,
  XAxis,
  Tooltip,
} from "recharts";
import { format, subDays } from "date-fns";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const generateChartData = (numDays: number) => {
  const chartData = [];
  const today = new Date();
  for (let i = 0; i < numDays; i++) {
    const date = subDays(today, i);
    chartData.push({
      date: format(date, "dd MMM yyyy"),
      days: Math.floor(Math.random() * 10), // for random data
    });
  }
  return chartData.slice(0, 10).reverse();
};

const chartConfig = {
  days: {
    label: "Performa",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChartTraveloka({
  data,
}: {
  data: { date: string; avg: number }[];
}) {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
          bottom: 30,
        }}
      >
        <CartesianGrid />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />

        <YAxis
          domain={[0, 10]}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(tick) => tick.toFixed(2)}
        />
        <Tooltip
          cursor={false}
          content={({ payload }) => {
            if (payload && payload.length > 0) {
              const { date, avg } = payload[0].payload;
              return (
                <div className="tooltip-content text-black bg-white p-2 rounded-lg">
                  <p>{`${date}`}</p>
                  <p>{`Performa: ${avg}`}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Line
          dataKey="avg"
          type="monotone"
          stroke="rgb(24, 156, 220, 1)"
          strokeWidth={2}
          dot={{
            fill: "rgb(24, 156, 220, 1)",
          }}
          activeDot={{
            r: 6,
          }}
        />
      </LineChart>
    </ChartContainer>
  );
}
