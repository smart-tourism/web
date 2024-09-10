"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  YAxis,
  XAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartData {
  ota: keyof typeof chartConfig;
  TotalPerOTA: number;
  fill: string;
}

export const description = "A bar chart with a label";

const chartData: ChartData[] = [
  { ota: "Traveloka", TotalPerOTA: 186, fill: "rgb(24, 156, 220, 1)" },
  { ota: "Tripadvisor", TotalPerOTA: 305, fill: "rgb(51, 224, 161, 1)" },
  { ota: "Tiket", TotalPerOTA: 237, fill: "rgb(0, 100, 211, 1)" },
];

const chartConfig = {
  TotalPerOTA: {
    label: "OTA",
    color: "hsl(var(--chart-1))",
  },
  Traveloka: {
    label: "Traveloka",
    color: "rgb(24, 156, 220, 1)",
  },
  Tripadvisor: {
    label: "Tripadvisor",
    color: "rgb(51, 224, 161, 1)",
  },
  Tiket: {
    label: "Tiket",
    color: "rgb(0, 100, 211, 1)",
  },
} satisfies ChartConfig;

export function ChartAll() {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
        }}
      >
        <YAxis
          tickMargin={10} // Adds space between the axis and the labels
        />
        <CartesianGrid vertical={false} />
        <XAxis dataKey="ota" tickMargin={10} />
        {/* Customize tooltip to show label from chartConfig */}
        <ChartTooltip
          cursor={false}
          content={({ payload }) => {
            if (payload && payload.length) {
              const data = payload[0].payload as ChartData;
              // Type-safe access to chartConfig based on 'ota'
              const otaConfig = chartConfig[data.ota];
              return (
                <div className="p-2 bg-white shadow rounded flex items-center text-black justify-between gap-1">
                  {/* Circle representing the OTA color */}
                  <span
                    style={{
                      backgroundColor: otaConfig.color,
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: "2px",
                    }}
                  />
                  <div>
                    <p>{otaConfig.label}</p>
                    <p>{`Total Penilaian Keseluruhan: ${data.TotalPerOTA}`}</p>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="TotalPerOTA" fill="var(--color-desktop)" radius={8}>
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
