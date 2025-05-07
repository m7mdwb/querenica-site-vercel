"use client"

import { useState, useEffect, useCallback } from "react"
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
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Exterior/Exterior1-vq7FaLshWuWErUhIJIAeeBUC06lIFw.jpg",
      alt: "Querencia exterior 1",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Exterior/Exterior2-ey2d6AB8XMYGytjOYWnG0Zgg3nLVh7.jpg",
      alt: "Querencia exterior 2",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Exterior/Exterior3-2Orxcjsht7yvpr9hFdccEq68nxOYO9.jpg",
      alt: "Querencia exterior 3",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Interior%20Images/Bedroom1-L3Gs2zSf3y3YkibIWf77C5gMNbOi3K.jpg",
      alt: "Bedroom 1",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Interior%20Images/Beroom2-V2nNtU8BbZ33aBgqv3yhpuT8Qih84d.jpg",
      alt: "Bedroom 2",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Interior%20Images/Bedroom3-o5sThkaYxGiZVS4cpU9qDpDKy5GqSs.jpg",
      alt: "Bedroom 3",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Interior%20Images/Bedroom4-epCGRoCiYLoA1yt8iSK2ZTwZOe1yV0.jpg",
      alt: "Bedroom 4",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Interior%20Images/Livingroom1-W8eJYwmVfczHVxEdklFivqQRFScgGB.jpg",
      alt: "Livingroom 1",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Interior%20Images/Livingroom2-iIc1Wjhmnr9wnCx8Vw8r2vUIUwZllm.jpg",
      alt: "Livingroom 2",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Interior%20Images/Livingroom3-iI74unTRzHuPxfDMvgqD1QOFqVp1gS.jpg",
      alt: "Livingroom 3",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Interior%20Images/Livingroom4-U6NEIWpgOjfU2UOmyrUtfn2ex4wU0s.jpg",
      alt: "Livingroom 4",
    },
    {
      src: "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Interior%20Images/DiningArea1-eJNjp0Rmzb3GoczNhi9R9wAv6xPG6L.jpg",
      alt: "Dining 1",
    },
  ]

  // Function to open the image lightbox
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setSelectedImage(galleryImages[index].src)
  }

  // Functions to navigate between images in the lightbox
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
    setSelectedImage(galleryImages[(currentImageIndex + 1) % galleryImages.length].src)
  }, [currentImageIndex, galleryImages])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    setSelectedImage(galleryImages[(currentImageIndex - 1 + galleryImages.length) % galleryImages.length].src)
  }, [currentImageIndex, galleryImages])

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
  }, [selectedImage, nextImage, prevImage])

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
