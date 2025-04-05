"use client"

import { memo } from "react"
import { type EdgeProps, getStraightPath } from "reactflow"

interface UmlEdgeData {
  cardinality?: string
  relationship?: string
}

export const UmlEdge = memo(
  ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps<UmlEdgeData>) => {
    const [edgePath] = getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    })

    // Calculate the middle point of the edge for the relationship label
    const midX = (sourceX + targetX) / 2
    const midY = (sourceY + targetY) / 2

    // Calculate points near source and target for cardinality labels
    const sourceCardX = sourceX + (targetX - sourceX) * 0.15
    const sourceCardY = sourceY + (targetY - sourceY) * 0.15

    const targetCardX = targetX - (targetX - sourceX) * 0.15
    const targetCardY = targetY - (targetY - sourceY) * 0.15

    return (
      <>
        <path id={id} className="react-flow__edge-path" d={edgePath} strokeWidth={1.5} stroke="currentColor" />

        {/* Relationship name in the middle */}
        {data?.relationship && (
          <foreignObject width={100} height={20} x={midX - 50} y={midY - 10} className="overflow-visible">
            <div className="flex items-center justify-center h-full">
              <div className="bg-background px-2 text-xs border rounded">{data.relationship}</div>
            </div>
          </foreignObject>
        )}

        {/* Source cardinality */}
        {data?.cardinality && (
          <>
            <foreignObject
              width={40}
              height={20}
              x={sourceCardX - 20}
              y={sourceCardY - 10}
              className="overflow-visible"
            >
              <div className="flex items-center justify-center h-full">
                <div className="bg-background px-1 text-xs border rounded">{data.cardinality.split("-to-")[0]}</div>
              </div>
            </foreignObject>

            {/* Target cardinality */}
            <foreignObject
              width={40}
              height={20}
              x={targetCardX - 20}
              y={targetCardY - 10}
              className="overflow-visible"
            >
              <div className="flex items-center justify-center h-full">
                <div className="bg-background px-1 text-xs border rounded">{data.cardinality.split("-to-")[1]}</div>
              </div>
            </foreignObject>
          </>
        )}
      </>
    )
  },
)

UmlEdge.displayName = "UmlEdge"

