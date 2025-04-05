"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createProject } from "@/lib/actions"

export function ProjectForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const description = formData.get("description") as string

    try {
      const projectId = await createProject({ name, description })
      router.push(`/projects/${projectId}`)
    } catch (error) {
      console.error("Failed to create project:", error)
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={4} />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

