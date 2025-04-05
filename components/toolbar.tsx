"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Database, Diamond, Circle, LayoutGrid } from "lucide-react"

export function Toolbar() {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <div className="w-64 border-r bg-background flex flex-col">
      <div className="p-4 font-medium">Elements</div>
      <Separator />
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Entities & Relationships</h3>
          <div className="grid grid-cols-2 gap-2">
            <div
              className="flex flex-col items-center gap-1 p-2 border rounded-md cursor-move hover:bg-muted/50"
              draggable
              onDragStart={(e) => onDragStart(e, "entity")}
            >
              <Database className="h-8 w-8 text-primary" />
              <span className="text-xs">Entity</span>
            </div>
            <div
              className="flex flex-col items-center gap-1 p-2 border rounded-md cursor-move hover:bg-muted/50"
              draggable
              onDragStart={(e) => onDragStart(e, "relationship")}
            >
              <Diamond className="h-8 w-8 text-primary" />
              <span className="text-xs">Relationship</span>
            </div>
            <div
              className="flex flex-col items-center gap-1 p-2 border rounded-md cursor-move hover:bg-muted/50"
              draggable
              onDragStart={(e) => onDragStart(e, "attribute")}
            >
              <Circle className="h-8 w-8 text-primary" />
              <span className="text-xs">Attribute</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Templates</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-2 h-auto py-2">
              <LayoutGrid className="h-4 w-4" />
              <div className="text-left">
                <div className="text-sm font-medium">One-to-Many</div>
                <div className="text-xs text-muted-foreground">Basic 1:N relationship</div>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 h-auto py-2">
              <LayoutGrid className="h-4 w-4" />
              <div className="text-left">
                <div className="text-sm font-medium">Many-to-Many</div>
                <div className="text-xs text-muted-foreground">M:N with junction table</div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 border-t">
        <Button variant="outline" className="w-full">
          Clear Canvas
        </Button>
      </div>
    </div>
  )
}

