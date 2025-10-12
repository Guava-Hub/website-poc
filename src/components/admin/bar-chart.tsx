"use client";

import React from "react";

interface BarChartProps {
  data: {
    label: string;
    value: number;
    color?: string;
  }[];
  height?: number;
  showValues?: boolean;
}

export function BarChart({ data, height = 200, showValues = true }: BarChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-2" style={{ height: `${height}px` }}>
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100;
          const color = item.color || "rgb(59, 130, 246)"; // default blue

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col items-center justify-end h-full">
                {showValues && (
                  <span className="text-xs font-medium mb-1">
                    {item.value.toLocaleString()}
                  </span>
                )}
                <div
                  className="w-full rounded-t-md transition-all duration-500 hover:opacity-80"
                  style={{
                    height: `${barHeight}%`,
                    backgroundColor: color,
                    minHeight: "4px",
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground text-center">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
