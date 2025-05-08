"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface ZoomableImageProps {
  src: string
  alt: string
  className?: string
  initialZoom?: number
  maxZoom?: number
  minZoom?: number
  zoomStep?: number
  showControls?: boolean
}

export function ZoomableImage({
  src,
  alt,
  className,
  initialZoom = 1,
  maxZoom = 3,
  minZoom = 1,
  zoomStep = 0.5,
  showControls = true,
}: ZoomableImageProps) {
  const [zoom, setZoom] = useState(initialZoom)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // Reset position when zoom is reset to 1
  useEffect(() => {
    if (zoom === 1) {
      setPosition({ x: 0, y: 0 })
    }
  }, [zoom])

  // Handle zoom in
  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + zoomStep, maxZoom))
  }

  // Handle zoom out
  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - zoomStep, minZoom))
  }

  // Reset zoom
  const resetZoom = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  // Handle double click to toggle between zoom levels
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (zoom > 1) {
      resetZoom()
    } else {
      // Zoom in centered on the click position
      const container = containerRef.current
      const image = imageRef.current
      if (!container || !image) return

      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / container.offsetWidth
      const y = (e.clientY - rect.top) / container.offsetHeight

      // Calculate the position to center the zoom on the click point
      const newZoom = Math.min(maxZoom, zoom + zoomStep * 2)
      setZoom(newZoom)

      // Center the zoom on the clicked point
      const newX = ((0.5 - x) * container.offsetWidth * (newZoom - 1)) / newZoom
      const newY = ((0.5 - y) * container.offsetHeight * (newZoom - 1)) / newZoom
      setPosition({ x: newX, y: newY })
    }
  }

  // Handle mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      zoomIn()
    } else {
      zoomOut()
    }
  }

  // Handle drag start
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (zoom <= 1) return

    setIsDragging(true)

    // Handle both mouse and touch events
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    setDragStart({
      x: clientX - position.x,
      y: clientY - position.y,
    })
  }

  // Handle drag
  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || zoom <= 1) return

    // Handle both mouse and touch events
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    const container = containerRef.current
    if (!container) return

    // Calculate boundaries to prevent dragging outside image bounds
    const maxX = (container.offsetWidth * (zoom - 1)) / (2 * zoom)
    const maxY = (container.offsetHeight * (zoom - 1)) / (2 * zoom)

    const newX = clientX - dragStart.x
    const newY = clientY - dragStart.y

    // Constrain position within boundaries
    setPosition({
      x: Math.max(-maxX, Math.min(maxX, newX)),
      y: Math.max(-maxY, Math.min(maxY, newY)),
    })
  }

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false)
  }

  // Handle touch events
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && zoom > 1) {
        e.preventDefault() // Prevent page scrolling when dragging
      }
    }

    container.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      container.removeEventListener("touchmove", handleTouchMove)
    }
  }, [isDragging, zoom])

  // Handle pinch to zoom
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let initialDistance = 0
    let initialZoomValue = zoom

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        initialDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY,
        )
        initialZoomValue = zoom
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const currentDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY,
        )

        if (initialDistance > 0) {
          const newZoom = Math.max(minZoom, Math.min(maxZoom, initialZoomValue * (currentDistance / initialDistance)))
          setZoom(newZoom)
        }
      }
    }

    container.addEventListener("touchstart", handleTouchStart)
    container.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
    }
  }, [zoom, maxZoom, minZoom])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden select-none", zoom > 1 ? "cursor-move" : "cursor-zoom-in", className)}
      onDoubleClick={handleDoubleClick}
      onWheel={handleWheel}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDrag}
      onTouchEnd={handleDragEnd}
    >
      <img
        ref={imageRef}
        src={src || "/placeholder.svg"}
        alt={alt}
        className={cn("transition-opacity duration-300", imageLoaded ? "opacity-100" : "opacity-0")}
        style={{
          transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
          transformOrigin: "center",
          transition: isDragging ? "none" : "transform 0.2s ease-out",
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        onLoad={() => setImageLoaded(true)}
        draggable={false}
      />

      {/* Loading indicator */}
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#c9a77c] border-t-transparent"></div>
        </div>
      )}

      {/* Zoom controls */}
      {showControls && zoom > 1 && (
        <div className="absolute bottom-4 right-4 flex space-x-2 bg-black/30 rounded-full p-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              zoomOut()
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              resetZoom()
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Reset zoom"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              zoomIn()
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Zoom in"
            disabled={zoom >= maxZoom}
          >
            <ZoomIn className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Zoom indicator */}
      {zoom > 1 && (
        <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
          {Math.round(zoom * 100)}%
        </div>
      )}

      {/* Zoom instructions (shown briefly) */}
      {zoom === 1 && imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">Double-click to zoom</div>
        </div>
      )}
    </div>
  )
}
