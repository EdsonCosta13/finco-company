"use client"

import React from "react"

// Import your context providers here

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Wrap children with your context providers
    <>
      {children}
    </>
  )
}
