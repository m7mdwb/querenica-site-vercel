"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Eye, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export default function GallerySection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [showAllImages, setShowAllImages] = useState(false)
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

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && lightboxOpen) {
        closeLightbox()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [lightboxOpen])

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

  const displayedImages = showAllImages ? galleryImages : galleryImages.slice(0, 4)

  const openLightbox = (index) => {
    setCurrentImage(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const handleViewLarger = () => {
    setCurrentImage(0)
    setLightboxOpen(true)
  }

  return (
    <section id="gallery" className="py-32 bg-gradient-to-b from-alabaster to-parchment relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-secondary text-sm uppercase tracking-[0.4em] font-light mb-4 block">
            {t("gallery.visualGallery")}
          </span>
          <h2 className="text-5xl md:text-6xl font-light text-primary mb-6 tracking-tight">
            {t("gallery.exploreQuerencia").split(" ")[0]}
            <span className="block font-serif italic text-secondary" style={{ fontFamily: "var(--font-bodoni)" }}>
              {t("gallery.exploreQuerencia").split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p className="text-lg text-slate-grey max-w-3xl mx-auto leading-relaxed">{t("gallery.introText")}</p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-secondary to-accent mx-auto mt-8"></div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedImages.map((image, index) => (
            <GalleryCard
              key={image.id || index}
              image={image}
              index={index}
              isVisible={isVisible}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-16">
          {/* View Larger Button */}
          <button
            onClick={handleViewLarger}
            className="inline-flex items-center bg-gradient-to-r from-secondary to-accent text-white px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Maximize2 size={20} className="mr-3 relative z-10" />
            <span className="font-medium relative z-10">{t("gallery.viewLarger")}</span>
          </button>
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 bg-primary/90 backdrop-blur-md z-[9999] flex items-center justify-center p-8 pt-24"
            onClick={closeLightbox}
          >
            <div
              className="relative w-[75vw] max-w-[75vw] bg-parchment rounded-2xl overflow-hidden shadow-2xl z-[10000] aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-parchment/95 backdrop-blur-sm rounded-xl p-2 text-primary hover:bg-parchment hover:text-secondary transition-all duration-300 shadow-lg hover:shadow-xl border border-secondary/20 z-20"
              >
                <X size={18} />
              </button>

              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={galleryImages[currentImage].src || "/placeholder.svg"}
                  alt={galleryImages[currentImage].alt}
                  fill
                  className="object-cover"
                  width={1200}
                  height={900}
                  sizes="100vw"
                />
                {/* Navigation buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-parchment/20 backdrop-blur-sm p-2 rounded-xl text-white hover:bg-parchment/30 transition-all duration-300"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-parchment/20 backdrop-blur-sm p-2 rounded-xl text-white hover:bg-parchment/30 transition-all duration-300"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Image counter */}
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

function GalleryCard({ image, index, isVisible, onClick }) {
  return (
    <div
      className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-700 cursor-pointer transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{
        transitionDelay: `${index * 200}ms`,
        aspectRatio: "4/3", // 1200x900 aspect ratio
      }}
      onClick={onClick}
    >
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* View icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-parchment/20 backdrop-blur-sm p-4 rounded-full">
            <Eye size={24} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}
