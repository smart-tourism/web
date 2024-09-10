"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const chartData = [
  { sentiment: "Positif", visitors: 275, fill: "rgb(76, 155, 117, 1)" },
  { sentiment: "Netral", visitors: 200, fill: "rgb(250, 222, 100, 1)" },
  { sentiment: "Negatif", visitors: 287, fill: "rgb(255, 97, 113, 1)" },
];

const chartConfig = {
  visitors: {
    label: "Total",
  },
  positif: {
    label: "Positif",
    color: "rgb(76, 155, 117, 1)",
  },
  netral: {
    label: "Netral",
    color: "rgb(250, 222, 100, 1)",
  },
  negatif: {
    label: "Negatif",
    color: "rgb(255, 97, 113, 1)",
  },
} satisfies ChartConfig;

export function SentimentOverview() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <div className="flex items-center justify-center space-x-8 w-full">
      <ChartContainer config={chartConfig} className="h-[150px] w-[150px]">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="sentiment"
            innerRadius={40}
            strokeWidth={2}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-lg font-bold"
                      >
                        {totalVisitors.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 18}
                        className="fill-muted-foreground"
                      >
                        Visitors
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      <div className="flex flex-col space-y-2">
        {chartData.map((item, index) => (
          <div className="flex justify-between">
            <div key={index} className="flex items-center space-x-2">
              {/* Circle Color Indicator */}
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              ></span>
              <span className="text-sm">{item.sentiment}</span>
            </div>
            <span className="ml-2 text-sm font-semibold">{item.visitors}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
