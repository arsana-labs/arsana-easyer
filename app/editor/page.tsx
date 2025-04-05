"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DiagramEditor } from "@/components/diagram-editor"
import { Toolbar } from "@/components/toolbar"
import { Download, Save, Share, Undo, Redo, ZoomIn, ZoomOut } from "lucide-react"

export default function EditorPage() {
  const [diagramType, setDiagramType] = useState("crows-foot")

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            ERDiagram
          </div>
          <div className="flex items-center gap-4">
            <Select value={diagramType} onValueChange={setDiagramType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Diagram Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chen">Chen Notation</SelectItem>
                <SelectItem value="crows-foot">Crow's Foot Notation</SelectItem>
                <SelectItem value="uml">UML Notation</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-1">
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <Toolbar />
        <main className="flex-1 overflow-hidden flex flex-col">
          <div className="bg-muted/50 p-2 border-b flex items-center gap-2">
            <Button variant="ghost" size="icon" title="Undo">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Redo">
              <Redo className="h-4 w-4" />
            </Button>
            <div className="h-6 w-px bg-border mx-1"></div>
            <Button variant="ghost" size="icon" title="Zoom In">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Zoom Out">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="ml-auto text-sm text-muted-foreground">
              Diagram Type: {diagramType === "chen" ? "Chen" : diagramType === "crows-foot" ? "Crow's Foot" : "UML"}
            </div>
          </div>
          <DiagramEditor type={diagramType} />
        </main>
      </div>
    </div>
  )
}

