"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "reactflow"

interface AttributeNodeData {
  label: string
  isPrimary?: boolean
}

export const AttributeNode = memo(({ data, selected }: NodeProps<AttributeNodeData>) => {
  return (
    <div
      className={`w-24 h-24 rounded-full flex items-center justify-center border-2 ${
        selected ? "border-primary" : "border-border"
      } ${data.isPrimary ? "bg-primary/10" : "bg-background"}`}
    >
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div className="text-center font-medium">
        {data.label}
        {data.isPrimary && <div className="text-xs text-muted-foreground">(PK)</div>}
      </div>
    </div>
  )
})

AttributeNode.displayName = "AttributeNode"

