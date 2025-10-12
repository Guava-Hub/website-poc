"use client";

import React from "react";

interface DonutChartProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
  size?: number;
  thickness?: number;
  showLegend?: boolean;
}

export function DonutChart({ 
  data, 
  size = 200, 
  thickness = 40,
  showLegend = true 
}: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = (size - thickness) / 2;
  
  let currentAngle = -90; // Start from top

  const segments = data.map((item) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');

    return {
      ...item,
      pathData,
      percentage: percentage.toFixed(1),
    };
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-0">
          {segments.map((segment, index) => (
            <g key={index}>
              <path
                d={segment.pathData}
                fill={segment.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              >
                <title>{`${segment.label}: ${segment.value} (${segment.percentage}%)`}</title>
              </path>
            </g>
          ))}
          {/* Center circle for donut effect */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius - thickness}
            fill="white"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold">{total}</div>
          <div className="text-xs text-muted-foreground">Total</div>
        </div>
      </div>

      {showLegend && (
        <div className="grid grid-cols-2 gap-3 w-full">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: segment.color }}
              />
              <div className="flex flex-col">
                <span className="text-xs font-medium">{segment.label}</span>
                <span className="text-xs text-muted-foreground">
                  {segment.value} ({segment.percentage}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
