"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "reactflow"

interface RelationshipNodeData {
  label: string
}

export const RelationshipNode = memo(({ data, selected }: NodeProps<RelationshipNodeData>) => {
  return (
    <div
      className={`w-32 h-32 flex items-center justify-center transform rotate-45 border-2 ${
        selected ? "border-primary" : "border-border"
      }`}
    >
      <Handle type="source" position={Position.Right} className="w-3 h-3 transform -rotate-45" />
      <Handle type="target" position={Position.Left} className="w-3 h-3 transform -rotate-45" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 transform -rotate-45" />
      <Handle type="target" position={Position.Top} className="w-3 h-3 transform -rotate-45" />

      <div className="transform -rotate-45 text-center font-medium">{data.label}</div>
    </div>
  )
})

RelationshipNode.displayName = "RelationshipNode"

