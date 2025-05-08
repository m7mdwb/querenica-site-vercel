"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Download, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ZoomableImage } from "./ui/zoomable-image"

export default function GallerySection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(0)
  const [totalImages, setTotalImages] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [isTouchActive, setIsTouchActive] = useState(false)

  // Expanded gallery with 12 images - now with width and height information
  const galleryImages = [
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Exterior/querencia-exterior-1-2KGar18rZ8kKbe4VwFivhnCUSGkbMU.webp",
      alt: "Querencia Exterior 1",
      width: 1200,
      height: 900,
      blurDataURL:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGESEHEhMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmeMOKNtbXF3ZWEk11KkZWOKJCdyAST9AAkk+gCToNUVB0AoIqL//2Q==",
      category: "Exterior",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Exterior/querencia-exterior-2-AfHnMYCOrV23nqcfRW1ncq3c0B8ey1.webp",
      alt: "Querencia Exterior 2",
      width: 1200,
      height: 900,
      blurDataURL:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGESEHEhMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmeMOKNtbXF3ZWEk11KkZWOKJCdyAST9AAkk+gCToNUVB0AoIqL//2Q==",
      category: "Exterior",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Exterior/querencia-exterior-3-wEuk0Z9SqDRJNEfRPjUrLqN61y3Lue.webp",
      alt: "Querencia Exterior 3",
      width: 1200,
      height: 900,
      blurDataURL:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGESEHEhMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmeMOKNtbXF3ZWEk11KkZWOKJCdyAST9AAkk+gCToNUVB0AoIqL//2Q==",
      category: "Exterior",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Interior%20Images/querencia-livingroom-3-hBcApxu4RbcuWLu55EycdoR0ffidyk.webp",
      alt: "Querencia Living Room 1",
      width: 1200,
      height: 900,
      blurDataURL:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGESEHEhMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmeMOKNtbXF3ZWEk11KkZWOKJCdyAST9AAkk+gCToNUVB0AoIqL//2Q==",
      category: "Living Room",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Interior%20Images/querencia-livingroom-2-BZpbRkT4JjiHNees59GwH9nRBI1Osf.webp",
      alt: "Querencia Living Room 2",
      width: 1200,
      height: 900,
      blurDataURL:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGESEHEhMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmeMOKNtbXF3ZWEk11KkZWOKJCdyAST9AAkk+gCToNUVB0AoIqL//2Q==",
      category: "Living Room",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Interior%20Images/querencia-livingroom-1-oSUhmiVU6aCYQr1ONrLGWVnH5hMIDc.webp",
      alt: "Querencia Living Room 3",
      width: 1200,
      height: 900,
      blurDataURL:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGESEHEhMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmeMOKNtbXF3ZWEk11KkZWOKJCdyAST9AAkk+gCToNUVB0AoIqL//2Q==",
      category: "Living Room",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Interior%20Images/querencia-dindingroom-1-YNHfShN6hkDT5YN5vjhyvCl5GwjwGd.webp",
      alt: "Querencia Dining Area 1",
      width: 1200,
      height: 900,
      blurDataURL:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGESEHEhMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmeMOKNtbXF3ZWEk11KkZWOKJCdyAST9AAkk+gCToNUVB0AoIqL//2Q==",
      category: "Dining",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Interior%20Images/querencia-diningroom-2-BtJPABFQYgbL1xHSh1PfT8I9X0RIQU.webp",
      alt: "Querencia Dining Area 2",
      width: 1200,
      height: 900,
      blurDataURL:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGESEHEhMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmeMOKNtbXF3ZWEk11KkZWOKJCdyAST9AAkk+gCToNUVB0AoIqL//2Q==",
      category: "Dining",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Interior%20Images/querencia-bedroom-1-C8AtmfwGpd18x6sZVGE2g3HeOvkI2x.webp",
      alt: "Querencia Bedroom 1",
      width: 1200,
      height: 900,
      blurDataURL:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGESEHEhMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmeMOKNtbXF3ZWEk11KkZWOKJCdyAST9AAkk+gCToNUVB0AoIqL//2Q==",
      category: "Bedroom ",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Interior%20Images/querencia-bedroom-2-K6KuymuDSP1abh3eZOJo6MwgeHOsyB.webp",
      alt: "Querencia Bedroom 2",
      width: 1200,
      height: 900,
      blurDataURL:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGESEHEhMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmeMOKNtbXF3ZWEk11KkZWOKJCdyAST9AAkk+gCToNUVB0AoIqL//2Q==",
      category: "Bedroom",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Interior%20Images/querencia-bedroom-3-UqoxI9WrnaXWMZLaGvQwymFmik28j9.webp",
      alt: "Querencia Bedroom 3",
      width: 1200,
      height: 900,
      blurDataURL:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGESEHEhMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmeMOKNtbXF3ZWEk11KkZWOKJCdyAST9AAkk+gCToNUVB0AoIqL//2Q==",
      category: "Bedroom",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Interior%20Images/querencia-bedroom-4-Cumu8CsD12p09Zu5HXKXqz97qEONzQ.webp",
      alt: "Querencia Bedroom 4",
      width: 1200,
      height: 900,
      blurDataURL:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGESEHEhMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmeMOKNtbXF3ZWEk11KkZWOKJCdyAST9AAkk+gCToNUVB0AoIqL//2Q==",
      category: "Bedroom",
    },
  ]

  // Function to open the image lightbox
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setSelectedImage(galleryImages[index].src)
    setIsGalleryOpen(true)
  }

  // Functions to navigate between images in the lightbox
  const nextImage = useCallback(() => {
    if (isTouchActive) return // Prevent duplicate triggers on touch devices

    setCurrentImageIndex((prev) => {
      const next = (prev + 1) % galleryImages.length
      setSelectedImage(galleryImages[next].src)
      return next
    })
  }, [galleryImages, isTouchActive])

  const prevImage = useCallback(() => {
    if (isTouchActive) return // Prevent duplicate triggers on touch devices

    setCurrentImageIndex((prev) => {
      const next = (prev - 1 + galleryImages.length) % galleryImages.length
      setSelectedImage(galleryImages[next].src)
      return next
    })
  }, [galleryImages, isTouchActive])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isGalleryOpen) return

      if (e.key === "ArrowRight") {
        nextImage()
      } else if (e.key === "ArrowLeft") {
        prevImage()
      } else if (e.key === "Escape") {
        setIsGalleryOpen(false)
        setSelectedImage(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isGalleryOpen, nextImage, prevImage])

  // Function to scroll to contact form and set catalog flag
  const scrollToContactForm = () => {
    // Set the global state to indicate catalog request
    window.localStorage.setItem("requestCatalog", "true")

    // Close the lightbox if it's open
    if (isGalleryOpen) {
      setIsGalleryOpen(false)
      setSelectedImage(null)
    }

    // Scroll to contact form
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })

      // Highlight the form
      setTimeout(() => {
        const formElement = document.getElementById("contact-form")
        if (formElement) {
          formElement.classList.add("highlight-form")
          setTimeout(() => {
            formElement.classList.remove("highlight-form")
          }, 2000)
        }
      }, 500)
    }
  }

  // Handle touch events for swiping in the gallery
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    setIsTouchActive(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!isGalleryOpen || !isTouchActive) return

    const difference = touchStartX.current - touchEndX.current
    const threshold = 50 // Minimum swipe distance

    if (difference > threshold) {
      // Swiped left, go to next image
      nextImage()
    } else if (difference < -threshold) {
      // Swiped right, go to previous image
      prevImage()
    }

    setIsTouchActive(false)
  }

  // Track image loading progress
  useEffect(() => {
    setTotalImages(galleryImages.length)
  }, [galleryImages.length])

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1)
  }

  // Determine how many images to show initially (4 on desktop, 2 on mobile)
  const initialImageCount = 4
  const visibleImages = galleryImages.slice(0, initialImageCount)

  return (
    <section ref={ref} id="gallery" className="bg-[#f8f8f8] py-20 md:py-32 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-light tracking-wider text-[#1a1a1a] sm:text-4xl md:mb-16 md:text-5xl">
          Explore Querencia
        </h2>

        {/* Gallery Grid with optimized images */}
        <div ref={galleryRef} className="mb-8">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-2 xl:grid-cols-4">
            {visibleImages.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "group relative cursor-pointer overflow-hidden rounded-lg transition-all duration-700",
                  inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                  { "delay-[200ms]": index % 4 === 0 },
                  { "delay-[300ms]": index % 4 === 1 },
                  { "delay-[400ms]": index % 4 === 2 },
                  { "delay-[500ms]": index % 4 === 3 },
                )}
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={index < 4}
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
                  <div className="rounded-full bg-white/80 p-2">
                    <Eye className="h-6 w-6 text-[#2c4051]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View More Button */}
        <div className="mb-12 flex justify-center">
          <Button onClick={() => openLightbox(0)} className="group bg-[#2c4051] text-white hover:bg-[#3a526a]">
            <Eye className="mr-2 h-4 w-4" />
            View Gallery
          </Button>
        </div>

        {/* Catalog Download CTA */}
        <div className="mt-8 flex flex-col items-center justify-center space-y-4">
          <h3 className="text-center text-2xl font-light tracking-wider text-[#1a1a1a] sm:text-3xl">
            Want to See More?
          </h3>
          <p className="max-w-2xl text-center text-[#666]">
            Download our comprehensive catalog with detailed information about all residence types, amenities, and
            features.
          </p>
          <Button size="lg" className="bg-[#c9a77c] text-white hover:bg-[#b89669]" asChild>
            <Link href="#contact" onClick={scrollToContactForm}>
              <Download className="mr-2 h-4 w-4" />
              Download Catalog
            </Link>
          </Button>
        </div>

        {/* Gallery Modal Dialog */}
        <Dialog
          open={isGalleryOpen}
          onOpenChange={(open) => {
            setIsGalleryOpen(open)
            if (!open) {
              setSelectedImage(null)
              setCurrentImageIndex(0)
            }
          }}
        >
          <DialogContent className="max-h-[90vh] max-w-5xl border-none bg-transparent p-0 shadow-none [&>button]:hidden">
            <button
              onClick={() => {
                setIsGalleryOpen(false)
                setSelectedImage(null)
              }}
              className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 p-2 text-white shadow-md transition-all hover:bg-black/80 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </button>

            {selectedImage && (
              <div
                className="relative"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Replace the standard img with our ZoomableImage component */}
                <ZoomableImage
                  src={selectedImage}
                  alt={galleryImages[currentImageIndex].alt}
                  className="h-auto w-full rounded-lg"
                  maxZoom={3}
                />

                {/* Navigation Controls */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white md:h-12 md:w-12 gallery-nav-btn"
                  aria-label="Previous image"
                  style={{ WebkitTapHighlightColor: "transparent" }} // Prevent tap highlight on mobile
                >
                  <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white md:h-12 md:w-12 gallery-nav-btn"
                  aria-label="Next image"
                  style={{ WebkitTapHighlightColor: "transparent" }} // Prevent tap highlight on mobile
                >
                  <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
                </button>

                {/* Horizontal Thumbnail Navigation */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4 py-2 gallery-thumbnail-scroll">
                  <div className="flex space-x-2 max-w-full overflow-x-auto pb-2">
                    {galleryImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentImageIndex(index)
                          setSelectedImage(image.src)
                        }}
                        className={cn(
                          "h-12 w-16 flex-shrink-0 overflow-hidden rounded border-2 transition-all md:h-16 md:w-24",
                          currentImageIndex === index
                            ? "border-[#c9a77c] opacity-100"
                            : "border-transparent opacity-60 hover:opacity-100",
                        )}
                        aria-label={`View ${image.alt}`}
                      >
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          width={120}
                          height={90}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-24 left-0 right-0 text-center text-white md:bottom-28">
                  <span className="rounded-full bg-black/50 px-3 py-1 text-sm">
                    {currentImageIndex + 1} / {galleryImages.length}
                  </span>
                </div>

                {/* Download Catalog Button in Lightbox */}
                <div className="absolute bottom-4 right-4">
                  <Button size="sm" className="bg-[#c9a77c] text-white hover:bg-[#b89669]" asChild>
                    <Link href="#contact" onClick={scrollToContactForm}>
                      <Download className="mr-1 h-3 w-3" />
                      Get Catalog
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
