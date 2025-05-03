"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react"
import Link from "next/link"

export default function GallerySection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Expanded gallery with 12 images
  const galleryImages = [
    {
      src: "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/exterior%20view-MfjGE2pZN89bK7ozKCkjQZWCWmsmUj.webp",
      alt: "Querencia exterior view",
    },
    {
      src: "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/living-room-N0hRhMkJjQ4CTI9MN0VXqmQi0IfJw4.webp",
      alt: "Luxury living room",
    },
    {
      src: "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/bedroom-smOngHdljNfnV8npcW3hwajC6Oa7uS.webp",
      alt: "Master bedroom suite",
    },
    {
      src: "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/view-from-room-VdU7zWk0Cy1HT1ZpUxMtRzdoHMb3r0.webp",
      alt: "Terrace view",
    },
    {
      src: "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Querencia_exterior-XJNF8W4Nyw6RxGAnPQFQUb30WYv5oT.webp",
      alt: "Exterior view",
    },
    {
      src: "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Pool%20Infinity-OxIpoHHrIic4noMzkM1NkXvyZgQvDv.webp",
      alt: "Infinity pool",
    },
    // Additional 6 images from the residences
    {
      src: "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/A%20Blok%201%2B1%201-G0mes18sTWOZ2cWwd6FM2eYbgfGL3y.jpg",
      alt: "A Block 1+1 Residence",
    },
    {
      src: "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/A%20Blok%202%2B1%201-32NbplBa3pvC5dJqzWeUHJjRLVo6LO.jpg",
      alt: "A Block 2+1 Residence",
    },
    {
      src: "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/B-C-D%201%2B1%201-bOw6UNwHAhltzoz9CfaZGJUqh3iCzj.jpg",
      alt: "BCD Block 1+1 Residence",
    },
    {
      src: "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/B-C-D%203%2B1%201-8wK1VD3e6L1ZKnGmxYPvCUIbOzPMym.jpg",
      alt: "BCD Block 3+1 Residence",
    },
    {
      src: "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/B-C-D%20Penthouse%205%2B1%201-caHXCusQdfcEwumVxTZS3AUvCCEbgE.jpg",
      alt: "BCD Penthouse",
    },
    {
      src: "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/1-KiWU4sf87peOI7snfLf14kBGEfFbqQ.jpg",
      alt: "BCD Duplex",
    },
  ]

  // Function to open the image lightbox
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setSelectedImage(galleryImages[index].src)
  }

  // Functions to navigate between images in the lightbox
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
    setSelectedImage(galleryImages[(currentImageIndex + 1) % galleryImages.length].src)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    setSelectedImage(galleryImages[(currentImageIndex - 1 + galleryImages.length) % galleryImages.length].src)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return

      if (e.key === "ArrowRight") {
        nextImage()
      } else if (e.key === "ArrowLeft") {
        prevImage()
      } else if (e.key === "Escape") {
        setSelectedImage(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, currentImageIndex])

  // Function to scroll to contact form and set catalog flag
  const scrollToContactForm = () => {
    // Set the global state to indicate catalog request
    window.localStorage.setItem("requestCatalog", "true")

    // Close the lightbox if it's open
    if (selectedImage) {
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

  return (
    <section ref={ref} id="gallery" className="bg-[#f8f8f8] py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-light tracking-wider text-[#1a1a1a] sm:text-4xl md:mb-16 md:text-5xl">
          Explore Querencia
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                "group cursor-pointer overflow-hidden rounded-lg transition-all duration-700",
                inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                { "delay-[200ms]": index % 4 === 0 },
                { "delay-[300ms]": index % 4 === 1 },
                { "delay-[400ms]": index % 4 === 2 },
                { "delay-[500ms]": index % 4 === 3 },
              )}
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.src || "/images/placeholder.jpg"}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Catalog Download CTA */}
        <div className="mt-16 flex flex-col items-center justify-center space-y-4">
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

        {/* Image Lightbox Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              aria-label="Close dialog"
            >
              <X className="h-6 w-6" />
            </button>

            {selectedImage && (
              <div className="relative">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt={galleryImages[currentImageIndex].alt}
                  className="h-auto w-full rounded-lg object-contain"
                />

                {/* Navigation Controls */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-0 right-0 text-center text-white">
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
