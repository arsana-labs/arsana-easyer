"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "reactflow"

interface EntityNodeData {
  label: string
  attributes?: string[]
}

export const EntityNode = memo(({ data, selected }: NodeProps<EntityNodeData>) => {
  return (
    <div className={`px-4 py-2 rounded-md border-2 bg-background ${selected ? "border-primary" : "border-border"}`}>
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
      <Handle type="target" position={Position.Left} className="w-3 h-3" />

      <div className="font-bold text-center border-b pb-2 mb-2">{data.label}</div>

      {data.attributes && data.attributes.length > 0 && (
        <div className="text-sm">
          {data.attributes.map((attr, index) => (
            <div key={index} className="py-1">
              {attr}
            </div>
          ))}
        </div>
      )}
    </div>
  )
})

EntityNode.displayName = "EntityNode"

