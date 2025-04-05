"use client"

import { memo } from "react"
import { type EdgeProps, getBezierPath } from "reactflow"

interface ChenEdgeData {
  cardinality?: string
}

export const ChenEdge = memo(
  ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps<ChenEdgeData>) => {
    const [edgePath] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    })

    // Calculate the middle point of the edge for the cardinality label
    const midX = (sourceX + targetX) / 2
    const midY = (sourceY + targetY) / 2

    // Determine cardinality text based on data
    const getCardinalityText = () => {
      if (!data?.cardinality) return ""

      switch (data.cardinality) {
        case "one-to-one":
          return "1:1"
        case "one-to-many":
          return "1:N"
        case "many-to-many":
          return "M:N"
        default:
          return data.cardinality
      }
    }

    return (
      <>
        <path id={id} className="react-flow__edge-path" d={edgePath} strokeWidth={1.5} stroke="currentColor" />

        {data?.cardinality && (
          <foreignObject width={40} height={20} x={midX - 20} y={midY - 10} className="overflow-visible">
            <div className="flex items-center justify-center h-full">
              <div className="bg-background px-1 text-xs border rounded">{getCardinalityText()}</div>
            </div>
          </foreignObject>
        )}
      </>
    )
  },
)

ChenEdge.displayName = "ChenEdge"

