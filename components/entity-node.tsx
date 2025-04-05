"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "reactflow"

interface Field {
  id: string
  name: string
  type: string
  isPrimary: boolean
  isRequired: boolean
}

interface EntityNodeData {
  label: string
  fields: Field[]
}

function EntityNode({ data, isConnectable }: NodeProps<EntityNodeData>) {
  return (
    <div className="rounded-md border bg-background shadow-sm min-w-[200px]">
      <div className="border-b bg-muted px-4 py-2 font-medium">{data.label}</div>
      <div className="p-2">
        {data.fields.map((field) => (
          <div key={field.id} className="flex items-center py-1 text-sm">
            <div className="flex-1 flex items-center">
              <span className="font-medium">{field.name}</span>
              <span className="ml-2 text-muted-foreground">{field.type}</span>
              {field.isPrimary && <span className="ml-2 text-xs bg-primary/10 text-primary px-1 rounded">PK</span>}
              {field.isRequired && !field.isPrimary && <span className="ml-2 text-xs">*</span>}
            </div>
          </div>
        ))}
      </div>
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="w-3 h-3 bg-primary" />
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="w-3 h-3 bg-primary" />
    </div>
  )
}

export default memo(EntityNode)

