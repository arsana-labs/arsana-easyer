"use client"

import { memo } from "react"
import { type EdgeProps, getBezierPath, EdgeLabelRenderer } from "reactflow"

function RelationEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path stroke-muted-foreground stroke-2"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan bg-background rounded px-2 py-1 text-xs shadow border"
        >
          Relation
        </div>
      </EdgeLabelRenderer>
    </>
  )
}

export default memo(RelationEdge)

