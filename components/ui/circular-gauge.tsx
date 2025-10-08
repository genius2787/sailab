"use client"

import React from "react"

interface CircularGaugeProps {
  value: number
  size?: number
  strokeWidth?: number
  label?: React.ReactNode
  sublabel?: React.ReactNode
  showPercentText?: boolean
  className?: string
}

export function CircularGauge({
  value,
  size = 120,
  strokeWidth = 8,
  label,
  sublabel,
  showPercentText = true,
  className = ""
}: CircularGaugeProps) {
  const normalizedValue = Math.min(Math.max(value, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (normalizedValue / 100) * circumference

  const getColor = (value: number) => {
    if (value >= 75) return "#10b981" // emerald-500
    if (value >= 50) return "#f59e0b" // amber-500
    if (value >= 25) return "#ef4444" // red-500
    return "#6b7280" // gray-500
  }

  const color = getColor(normalizedValue)

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-white/10"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-in-out drop-shadow-sm"
            style={{
              filter: `drop-shadow(0 0 6px ${color}40)`
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {showPercentText && (
            <span className="text-2xl font-bold text-white font-mono">
              {normalizedValue}%
            </span>
          )}
          {label && !showPercentText && (
            <div className="text-center">
              {label}
            </div>
          )}
        </div>
      </div>

      {/* Labels below gauge */}
      {label && showPercentText && (
        <div className="mt-2 text-center">
          <div className="text-sm font-medium text-white/80">
            {label}
          </div>
          {sublabel && (
            <div className="text-xs text-white/60 mt-1">
              {sublabel}
            </div>
          )}
        </div>
      )}
    </div>
  )
}