"use client"

import { useState } from "react"

type ToastVariant = "default" | "destructive" | "success"

interface Toast {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({
    title,
    description,
    variant = "default",
  }: {
    title: string
    description?: string
    variant?: ToastVariant
  }) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, title, description, variant }

    setToasts((prevToasts) => [...prevToasts, newToast])

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, 5000)

    // For debugging purposes, log the toast to console
    console.log(`Toast [${variant}]: ${title}${description ? ` - ${description}` : ""}`)

    return id
  }

  const dismissToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  return {
    toasts,
    toast,
    dismissToast,
  }
}

// Export a simplified version for direct imports
export const toast = {
  default: (props: { title: string; description?: string }) => {
    console.log(`Toast: ${props.title}${props.description ? ` - ${props.description}` : ""}`)
  },
  destructive: (props: { title: string; description?: string }) => {
    console.error(`Error Toast: ${props.title}${props.description ? ` - ${props.description}` : ""}`)
  },
  success: (props: { title: string; description?: string }) => {
    console.log(`Success Toast: ${props.title}${props.description ? ` - ${props.description}` : ""}`)
  },
}

