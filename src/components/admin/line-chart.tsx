"use client";

import React from "react";

interface LineChartProps {
  data: {
    label: string;
    value: number;
  }[];
  height?: number;
  color?: string;
  showGrid?: boolean;
}

export function LineChart({ 
  data, 
  height = 200, 
  color = "rgb(59, 130, 246)",
  showGrid = true 
}: LineChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value));
  const minValue = Math.min(...data.map((item) => item.value));
  const range = maxValue - minValue;

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((item.value - minValue) / range) * 100;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(" L ")}`;

  // Create area fill path
  const areaD = `M 0,100 L ${points.join(" L ")} L 100,100 Z`;

  return (
    <div className="w-full">
      <div className="relative" style={{ height: `${height}px` }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="overflow-visible"
        >
          {/* Grid lines */}
          {showGrid && (
            <>
              <line x1="0" y1="25" x2="100" y2="25" stroke="#e5e7eb" strokeWidth="0.2" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#e5e7eb" strokeWidth="0.2" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="#e5e7eb" strokeWidth="0.2" />
            </>
          )}

          {/* Area fill */}
          <path
            d={areaD}
            fill={color}
            fillOpacity="0.1"
          />

          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />

          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((item.value - minValue) / range) * 100;
            
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="1"
                  fill={color}
                  className="hover:r-2 transition-all cursor-pointer"
                >
                  <title>{`${item.label}: ${item.value}`}</title>
                </circle>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-2">
        {data.map((item, index) => (
          <span key={index} className="text-xs text-muted-foreground">
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
