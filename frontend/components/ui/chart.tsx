"use client"

import * as React from "react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { cn } from "@/lib/utils"

interface ChartProps {
  data: any[]
  className?: string
  height?: number
}

interface LineChartProps extends ChartProps {
  xKey: string
  yKey: string
  color?: string
}

interface BarChartProps extends ChartProps {
  xKey: string
  yKey: string
  color?: string
}

interface PieChartProps extends ChartProps {
  dataKey: string
  nameKey: string
  colors?: string[]
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { height?: number }
>(({ className, height = 300, children, ...props }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = React.useState<number | undefined>(undefined)

  // Fixe une fois la largeur réelle, évitant les re-renders en boucle
  React.useLayoutEffect(() => {
    const node = containerRef.current
    if (!node) return

    const updateSize = () => {
      const newWidth = node.offsetWidth
      if (newWidth !== containerWidth) {
        setContainerWidth(newWidth)
      }
    }

    updateSize()

    const observer = new ResizeObserver(updateSize)
    observer.observe(node)

    return () => observer.disconnect()
  }, [containerWidth])

  return (
    <div
      ref={(el) => {
        containerRef.current = el
        if (typeof ref === "function") ref(el)
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement>).current = el
      }}
      className={cn("w-full", className)}
      {...props}
      style={{
        height,
        minHeight: height,
        maxHeight: height,
        overflow: "hidden",
        ...props.style,
      }}
    >
      {containerWidth && (
        <ResponsiveContainer width={containerWidth} height="100%">
          {children}
        </ResponsiveContainer>
      )}
    </div>
  )
})


ChartContainer.displayName = "ChartContainer"

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function LineChartComponent({ data, xKey, yKey, color = "#8b5cf6", className, height }: LineChartProps) {
  return (
    <ChartContainer className={className} height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey={xKey} className="text-muted-foreground" />
        <YAxis className="text-muted-foreground" />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey={yKey}
          stroke={color}
          strokeWidth={2}
          dot={{ fill: color, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
        />
      </LineChart>
    </ChartContainer>
  )
}

export function BarChartComponent({ data, xKey, yKey, color = "#8b5cf6", className, height }: BarChartProps) {
  return (
    <ChartContainer className={className} height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey={xKey} className="text-muted-foreground" />
        <YAxis className="text-muted-foreground" />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}

export function PieChartComponent({
  data,
  dataKey,
  nameKey,
  colors = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"],
  className,
  height,
}: PieChartProps) {
  return (
    <ChartContainer className={className} height={height}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey={dataKey} nameKey={nameKey}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ChartContainer>
  )
}

export { ChartContainer }
