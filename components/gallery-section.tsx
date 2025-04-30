"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ExternalLink, Download } from "lucide-react"

export default function GallerySection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [catalogOpen, setCatalogOpen] = useState(false)

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
      alt: 'infinity  alt: "infinity pool',
    },
  ]

  return (
    <section ref={ref} id="gallery" className="bg-[#f8f8f8] py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-light tracking-wider text-[#1a1a1a] sm:text-4xl md:mb-16 md:text-5xl">
          Explore Querencia
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                "group cursor-pointer overflow-hidden rounded-lg transition-all duration-700",
                inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                { "delay-[200ms]": index % 3 === 0 },
                { "delay-[400ms]": index % 3 === 1 },
                { "delay-[600ms]": index % 3 === 2 },
              )}
              onClick={() => setSelectedImage(image.src)}
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

        {/* Catalog Section - Moved from Residences Section */}
        <div className="mt-16 flex flex-col items-center justify-center space-y-6">
          <h3 className="text-center text-2xl font-light tracking-wider text-[#1a1a1a]">Download Our Catalog</h3>
          <p className="max-w-2xl text-center text-[#666]">
            Explore our comprehensive catalog with detailed information about all residence types, amenities, and
            features.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-[#c9a77c] text-white hover:bg-[#b89669]"
              onClick={() => setCatalogOpen(true)}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Catalog
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://sites.google.com/u/0/d/1PzQEUZsWPXnQcYaQlyJBHIElD5tv0kpS/preview"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Catalog
              </a>
            </Button>
          </div>
        </div>

        {/* Image Lightbox Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              aria-label="Close dialog"
            >
              <X className="h-6 w-6" />
            </button>
            {selectedImage && (
              <img
                src={selectedImage || "/images/placeholder.jpg"}
                alt="Gallery image"
                className="h-auto w-full rounded-lg object-contain"
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Catalog Dialog */}
        <Dialog open={catalogOpen} onOpenChange={setCatalogOpen}>
          <DialogContent className="max-h-[90vh] max-w-5xl p-0">
            <div className="aspect-[4/3] h-full w-full">
              <iframe
                src="https://sites.google.com/u/0/d/1PzQEUZsWPXnQcYaQlyJBHIElD5tv0kpS/preview"
                title="Querencia Catalog"
                className="h-full w-full border-0"
                allowFullScreen
              ></iframe>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
