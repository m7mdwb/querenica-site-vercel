"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Eye, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"

interface GallerySectionProps {
  dict: Record<string, string>
  locale: string
}

export default function GallerySection({ dict }: GallerySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("gallery")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [lightboxOpen])

  const galleryImages = [
    {
      src: "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/Gallery/querenciaGallery1.webp",
      alt: "Querencia Exterior View 1",
    },
    {
      src: "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/Gallery/querenciaGallery2.webp",
      alt: "Querencia Exterior View 2",
    },
    {
      src: "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/Gallery/querenciaGallery3.webp",
      alt: "Querencia Pool Area",
    },
    {
      src: "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/Gallery/querenciaGallery4.webp",
      alt: "Querencia Living Space",
    },
    {
      src: "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/Gallery/querenciaGallery5.webp",
      alt: "Querencia Interior Design",
    },
    {
      src: "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/Gallery/querenciaGallery6.webp",
      alt: "Querencia Bedroom",
    },
    {
      src: "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/Gallery/querenciaGallery7.webp",
      alt: "Querencia Kitchen",
    },
    {
      src: "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/Gallery/querenciaGallery8.webp",
      alt: "Querencia Bathroom",
    },
    {
      src: "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/Gallery/querenciaGallery9.webp",
      alt: "Querencia Terrace View",
    },
    {
      src: "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/Gallery/querenciaGallery10.webp",
      alt: "Querencia Amenities",
    },
    {
      src: "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/Gallery/querenciaGallery11.webp",
      alt: "Querencia Common Area",
    },
    {
      src: "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/Gallery/querenciaGallery12.webp",
      alt: "Querencia Landscape",
    },
  ]

  // Only show first 3 images in the grid
  const previewImages = galleryImages.slice(0, 3)

  const openLightbox = (index: number) => {
    setCurrentImage(index)
    setLightboxOpen(true)
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  return (
    <section id="gallery" className="py-32 bg-gradient-to-b from-alabaster to-parchment relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="text-secondary text-sm uppercase tracking-[0.4em] font-light mb-4 block">
            {dict["gallery.visualGallery"]}
          </span>
          <h2 className="text-5xl md:text-6xl font-light text-primary mb-6 tracking-tight">
            {dict["gallery.exploreQuerencia"]}
          </h2>
          <p className="text-lg text-slate-grey max-w-3xl mx-auto leading-relaxed">{dict["gallery.introText"]}</p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-secondary to-accent mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {previewImages.map((image, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transform transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms`, aspectRatio: "4/3" }}
              onClick={() => openLightbox(index)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-parchment/20 backdrop-blur-sm p-4 rounded-full">
                    <Eye size={24} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={() => openLightbox(0)}
            className="inline-flex items-center bg-gradient-to-r from-secondary to-accent text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Maximize2 size={20} className="mr-3" />
            <span className="font-medium">{dict["gallery.viewLarger"]}</span>
          </button>
        </div>

        {lightboxOpen && (
          <div
            className="fixed inset-0 bg-primary/90 backdrop-blur-md z-[9999] flex items-center justify-center p-8"
            onClick={() => setLightboxOpen(false)}
          >
            <div
              className="relative w-[75vw] max-w-[75vw] bg-parchment rounded-2xl overflow-hidden shadow-2xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 bg-parchment/95 rounded-xl p-2 text-primary hover:text-secondary z-20"
              >
                <X size={18} />
              </button>
              <div className="relative w-full h-full">
                <Image
                  src={galleryImages[currentImage].src || "/placeholder.svg"}
                  alt={galleryImages[currentImage].alt}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-parchment/20 backdrop-blur-sm p-2 rounded-xl text-white hover:bg-parchment/30"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-parchment/20 backdrop-blur-sm p-2 rounded-xl text-white hover:bg-parchment/30"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="absolute top-4 left-4 bg-parchment/20 backdrop-blur-sm px-3 py-1 rounded-xl text-white text-sm">
                {currentImage + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
