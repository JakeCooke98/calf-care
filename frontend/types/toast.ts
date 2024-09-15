import * as React from "react"

export interface ToastProps {
  variant?: "default" | "destructive" | "success"
  title?: string
  description?: React.ReactNode
  action?: ToastActionElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type ToastActionElement = React.ReactElement<{
  altText: string
  onClick: () => void
}>