"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"

interface ZoomableImageProps {
  src: string
  alt: string
  className?: string
  maxZoom?: number
}

export function ZoomableImage({ src, alt, className = "", maxZoom = 2 }: ZoomableImageProps) {
  const [scale, setScale] = useState(1)
  const [panning, setPanning] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setPanning(true)
      setStartPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (panning) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y,
      })
    }
  }

  const handleMouseUp = () => {
    setPanning(false)
  }

  const handleMouseLeave = () => {
    setPanning(false)
  }

  const handleClick = () => {
    if (scale === 1) {
      setScale(maxZoom)
    } else {
      setScale(1)
      setPosition({ x: 0, y: 0 })
    }
  }

  return (
    <div
      className={`relative overflow-hidden cursor-zoom-in ${className}`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          transition: panning ? "none" : "transform 0.3s ease-out",
          transformOrigin: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" />
      </div>
    </div>
  )
}
