"use client"

import type React from "react"

import { useCallback, useState } from "react"
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
  type NodeTypes,
  type EdgeTypes,
} from "reactflow"
import "reactflow/dist/style.css"
import { toPng } from "html-to-image"
import { EntityNode } from "../components/nodes/entity-node"
import { RelationshipNode } from "../components/nodes/relationship-node"
import { AttributeNode } from "../components/nodes/attribute-node"
import { ChenEdge } from "../components/edges/chen-edge"
import { CrowsFootEdge } from "../components/edges/crows-foot-edge"
import { UmlEdge } from "../components/edges/uml-edge"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

// Define node types
const nodeTypes: NodeTypes = {
  entity: EntityNode,
  relationship: RelationshipNode,
  attribute: AttributeNode,
}

// Initial nodes for demonstration
const initialNodes: Node[] = [
  {
    id: "1",
    type: "entity",
    data: {
      label: "Customer",
      attributes: ["customer_id", "name", "email", "phone"],
    },
    position: { x: 100, y: 100 },
  },
  {
    id: "2",
    type: "entity",
    data: {
      label: "Order",
      attributes: ["order_id", "order_date", "total_amount", "status"],
    },
    position: { x: 500, y: 100 },
  },
  {
    id: "3",
    type: "relationship",
    data: { label: "Places" },
    position: { x: 300, y: 120 },
  },
]

// Initial edges for demonstration
const initialEdges: Edge[] = [
  { id: "e1-3", source: "1", target: "3", type: "crowsfoot", data: { cardinality: "one-to-many" } },
  { id: "e3-2", source: "3", target: "2", type: "crowsfoot", data: { cardinality: "one-to-many" } },
]

interface DiagramEditorProps {
  type: string
}

export function DiagramEditor({ type }: DiagramEditorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)

  // Get edge types based on diagram type
  const getEdgeTypes = (): EdgeTypes => {
    switch (type) {
      case "chen":
        return { default: ChenEdge }
      case "crows-foot":
        return { default: CrowsFootEdge, crowsfoot: CrowsFootEdge }
      case "uml":
        return { default: UmlEdge }
      default:
        return { default: CrowsFootEdge, crowsfoot: CrowsFootEdge }
    }
  }

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      const reactFlowBounds = event.currentTarget.getBoundingClientRect()
      const type = event.dataTransfer.getData("application/reactflow")

      // Check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const newNode: Node = {
        id: `node_${Date.now()}`,
        type,
        position,
        data: {
          label: type === "entity" ? "New Entity" : type === "relationship" ? "Relationship" : "Attribute",
          attributes: type === "entity" ? ["id", "name"] : [],
        },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes],
  )

  const exportToPng = () => {
    if (reactFlowInstance) {
      const nodesBounds = reactFlowInstance.getNodes().reduce(
        (bounds: any, node: Node) => {
          const nodeWidth = node.width || 150
          const nodeHeight = node.height || 50

          bounds.minX = Math.min(bounds.minX, node.position.x)
          bounds.minY = Math.min(bounds.minY, node.position.y)
          bounds.maxX = Math.max(bounds.maxX, node.position.x + nodeWidth)
          bounds.maxY = Math.max(bounds.maxY, node.position.y + nodeHeight)

          return bounds
        },
        {
          minX: Number.POSITIVE_INFINITY,
          minY: Number.POSITIVE_INFINITY,
          maxX: Number.NEGATIVE_INFINITY,
          maxY: Number.NEGATIVE_INFINITY,
        },
      )

      const width = nodesBounds.maxX - nodesBounds.minX + 100
      const height = nodesBounds.maxY - nodesBounds.minY + 100

      const flowElement = document.querySelector(".react-flow") as HTMLElement

      if (flowElement) {
        toPng(flowElement, {
          backgroundColor: "#fff",
          width,
          height,
        }).then((dataUrl) => {
          const link = document.createElement("a")
          link.download = `er-diagram-${type}-${new Date().toISOString().slice(0, 10)}.png`
          link.href = dataUrl
          link.click()
        })
      }
    }
  }

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        edgeTypes={getEdgeTypes()}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-right">
          <Button onClick={exportToPng} className="gap-1">
            <Download className="h-4 w-4" />
            Export as PNG
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  )
}

