"use client"

import { memo } from "react"
import { type EdgeProps, getSmoothStepPath } from "reactflow"

interface CrowsFootEdgeData {
  cardinality?: string
}

export const CrowsFootEdge = memo(
  ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps<CrowsFootEdgeData>) => {
    const [edgePath] = getSmoothStepPath({
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

    // Determine cardinality symbols based on data
    const getCardinalitySymbol = (end: "source" | "target") => {
      if (!data?.cardinality) return ""

      // For simplicity, we're just showing text labels
      // In a real implementation, you would draw the actual crow's foot notation
      if (end === "source") {
        if (data.cardinality.startsWith("one")) {
          return "1"
        } else if (data.cardinality.startsWith("many")) {
          return "N"
        }
      } else {
        if (data.cardinality.endsWith("one")) {
          return "1"
        } else if (data.cardinality.endsWith("many")) {
          return "N"
        }
      }

      return ""
    }

    return (
      <>
        <path id={id} className="react-flow__edge-path" d={edgePath} strokeWidth={1.5} stroke="currentColor" />

        {data?.cardinality && (
          <>
            <foreignObject width={20} height={20} x={sourceX - 10} y={sourceY - 10} className="overflow-visible">
              <div className="flex items-center justify-center h-full">
                <div className="bg-background px-1 text-xs border rounded">{getCardinalitySymbol("source")}</div>
              </div>
            </foreignObject>

            <foreignObject width={20} height={20} x={targetX - 10} y={targetY - 10} className="overflow-visible">
              <div className="flex items-center justify-center h-full">
                <div className="bg-background px-1 text-xs border rounded">{getCardinalitySymbol("target")}</div>
              </div>
            </foreignObject>
          </>
        )}
      </>
    )
  },
)

CrowsFootEdge.displayName = "CrowsFootEdge"

