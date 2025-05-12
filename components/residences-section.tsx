"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"
import Link from "next/link"
import { ZoomableImage } from "./ui/zoomable-image"
import { useLanguage } from "@/lib/i18n/context"

// Define property types with proper TypeScript interfaces
interface PropertyDetail {
  size: string
  bedrooms: number // Number of actual bedrooms
  livingRooms: number // Number of living rooms
  features: string[]
}

interface PropertyType {
  id: string
  name: string // e.g., "A Studio", "BCD 1+1" - can be an internal identifier
  displayName: string // User-friendly display name for UI
  description: string
  feature: string
  images: string[]
  details: PropertyDetail
}

interface PropertyBlock {
  id: string
  name: string // e.g., "Block A" - for the Tabs
  types: PropertyType[]
}

// Image carousel component for residence cards
function ResidenceImageCarousel({ images, name }: { images: string[]; name: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextImage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (isTransitioning || images.length <= 1) return
      setIsTransitioning(true)
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
      setTimeout(() => setIsTransitioning(false), 300) // Duration of CSS opacity transition
    },
    [images.length, isTransitioning],
  )

  const prevImage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (isTransitioning || images.length <= 1) return
      setIsTransitioning(true)
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
      setTimeout(() => setIsTransitioning(false), 300)
    },
    [images.length, isTransitioning],
  )

  const goToImage = useCallback(
    (e: React.MouseEvent, index: number) => {
      e.stopPropagation()
      if (isTransitioning || index === currentImageIndex) return
      setIsTransitioning(true)
      setCurrentImageIndex(index)
      setTimeout(() => setIsTransitioning(false), 300)
    },
    [isTransitioning, currentImageIndex],
  )

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
      <div className="absolute inset-0 bg-slate-200">
        <img
          key={images[currentImageIndex]} // Add key for re-triggering animation on src change
          src={images[currentImageIndex] || "/images/placeholder.jpg"}
          alt={`${name} - Image ${currentImageIndex + 1}`}
          className="h-full w-full object-cover animate-fadeInImage" // Simple fade for new image
          loading="lazy"
          onError={(e) => (e.currentTarget.src = "/images/placeholder.jpg")}
        />
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-md transition-all hover:bg-white md:h-9 md:w-9 residence-nav-btn active:scale-90"
            aria-label="Previous image"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <ChevronLeft className="h-5 w-5 md:h-5 md:w-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-md transition-all hover:bg-white md:h-9 md:w-9 residence-nav-btn active:scale-90"
            aria-label="Next image"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <ChevronRight className="h-5 w-5 md:h-5 md:w-5" />
          </button>
          <div className="absolute bottom-2.5 left-0 right-0 z-20 flex justify-center space-x-1.5 md:bottom-3 md:space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToImage(e, index)}
                className={cn(
                  "h-1.5 w-5 rounded-full ring-1 ring-black/10 transition-all md:h-2 md:w-6",
                  currentImageIndex === index ? "bg-white scale-110" : "bg-white/60 hover:bg-white/80",
                )}
                aria-label={`Go to image ${index + 1}`}
                style={{ WebkitTapHighlightColor: "transparent" }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// Main Section Component
export default function ResidencesSection() {
  const { t } = useLanguage()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Property data with translations
  const propertyTypes: PropertyBlock[] = [
    {
      id: "a",
      name: t("residences.blocks.a"),
      types: [
        {
          id: "a-studio",
          name: "A Studio",
          displayName: t("residences.propertyTypes.aStudio.displayName"),
          description: t("residences.propertyTypes.aStudio.description"),
          feature: t("residences.propertyTypes.aStudio.feature"),
          images: [
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/a-block-studio-1-mKak4gCk7RL89aDz2lA4V8FS6saRLf.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/a-block-studio-2-DrQXBfn4X0Yr9oVzW9n7Cg7fpiAm5h.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/a-block-studio-3-GesZog5dr72uC9t7JQLb7uQv1hgZFq.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/a-block-studio-4-6PjmkXfXzGvSmSG676io1VMKxuc1hD.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/a-block-studio-5-iWq6dxuKr7LjqnPyHUNRP40nMdBLwd.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/a-block-studio-plan-Cb5Me3GXf23qTFYjbye1Eo4n3B9yEO.webp",
          ],
          details: {
            size: "45-50 m²",
            bedrooms: 1,
            livingRooms: 0,
            features: [
              t("residences.features.seaView"),
              t("residences.features.efficientLayout"),
              t("residences.features.modernKitchen"),
              t("residences.features.builtInStorage"),
            ],
          },
        },
        {
          id: "a-1-1",
          name: "A 1+1",
          displayName: t("residences.propertyTypes.a1Plus1.displayName"),
          description: t("residences.propertyTypes.a1Plus1.description"),
          feature: t("residences.propertyTypes.a1Plus1.feature"),
          images: [
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/a-block-1%2B1-1-DXJKSm6tZegEKuRZKhl9zfYRuGpSZR.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/a-block-1%2B1-2-5XbCXgC8WnWE0fqccsUROhbUmZxis3.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/a-block-1%2B1-3-BwVTy0oKhEsT6TFjWKcD7163whLzAL.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/a-block-1%2B1-4-lcF67NW5Kyx93n5UQph43QBbIduGZU.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/a-block-1%2B1-5-oVY0m1EJwu1Q6uwV1hfxPr2jDPTnJT.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/a-block-1%2B1-6-EndZKhejuMDQv3J0C8EFfBhYIzf7xY.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/a-block-1%2B1-7-Y68i7vG6CuaU7x7nLi1ClBEl3QYYOO.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/a-block-1%2B1-8-fiEh3X4A6Tzyrn3t7g7QtQ2t3uhlSk.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/a-block-1%2B1-9-Myg1Hr9F5L0HkJ78Wl07QYnS989wsG.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/a-block-1%2B1-plan-bRjrz9JKNmCG2yGiG04rUo3YPLlzig.webp",
          ],
          details: {
            size: "80 m²",
            bedrooms: 1,
            livingRooms: 1,
            features: [
              t("residences.features.seaView"),
              t("residences.features.smartHome"),
              t("residences.features.privateBalcony"),
            ],
          },
        },
        {
          id: "a-2-1",
          name: "A 2+1",
          displayName: t("residences.propertyTypes.a2Plus1.displayName"),
          description: t("residences.propertyTypes.a2Plus1.description"),
          feature: t("residences.propertyTypes.a2Plus1.feature"),
          images: [
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/a-block-2%2B1-1-VpEFHWoiBh46wttfwoNWReQS9LaPOI.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/a-block-2%2B1-2-yHBfRvtHIy6DsQXr0DtUznQFW1DNs9.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/a-block-2%2B1-3-ymfhVVA2QNQ9FPGEKBspa1j8qKdr07.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/a-block-2%2B1-4-4Coin7FmDJObR41Ma05SEPZkRFWunB.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/a-block-2%2B1-5-Tgz1lgOPBKXulD3KxzuREwJXDzAi8s.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/a-block-2%2B1-6-6sZyIRUSK0ALKnVH8MhNigzvRvURUZ.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/a-block-2%2B1-bathroom-1-YsQTxKDtYXxDKbY9EMtrOSNwjSzjGs.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/a-block-2%2B1-bedroom-1-oeAgaclmPdPfhnQ2oooZlXGvDVv1GN.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/a-block-2%2B1-bedroom-2-DP8Wvz3NoFAgyije9a9M5dGO9yI5UF.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/a-block-2%2B1-plan-JyuOMYcbAX0RoMXHhUxB46K7yHzj5u.webp",
          ],
          details: {
            size: "140 m²",
            bedrooms: 2,
            livingRooms: 1,
            features: [
              t("residences.features.seaView"),
              t("residences.features.underfloorHeating"),
              t("residences.features.spaciousLivingArea"),
            ],
          },
        },
      ],
    },
    {
      id: "bcd",
      name: t("residences.blocks.bcd"),
      types: [
        {
          id: "bcd-studio",
          name: "BCD Studio",
          displayName: t("residences.propertyTypes.bcdStudio.displayName"),
          description: t("residences.propertyTypes.bcdStudio.description"),
          feature: t("residences.propertyTypes.bcdStudio.feature"),
          images: [
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/b-c-d-block-studio-1-qT2mBy1ETY7kONZr6CgE9bMsoSatnz.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/b-c-d-block-studio-2-E2AnZCecvxRpNYeJmGWjz41IdFf1Hx.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/b-c-d-block-studio-3-TgohZM6BnOgp7mLn3757noi2a9OKQT.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/b-c-d-block-studio-4-PpdsKY2uKxeCe12bfAbYIXCmHoNnxr.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/b-c-d-block-studio-plan-bVsvfW2zON6ST6c8w9RBO8g5X4R5mI.webp",
          ],
          details: {
            size: "45-50 m²",
            bedrooms: 1,
            livingRooms: 0,
            features: [
              t("residences.features.seaView"),
              t("residences.features.premiumLocation"),
              t("residences.features.efficientDesign"),
              t("residences.features.luxuryFinishes"),
            ],
          },
        },
        {
          id: "bcd-1-1",
          name: "BCD 1+1",
          displayName: t("residences.propertyTypes.bcd1Plus1.displayName"),
          description: t("residences.propertyTypes.bcd1Plus1.description"),
          feature: t("residences.propertyTypes.bcd1Plus1.feature"),
          images: [
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/b-c-d-block-1%2B1-1-C0CeKMIJsPovkOv1ZZiVCbgOHJ2MYz.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/b-c-d-block-1%2B1-2-f40yzeTrws3yzZyL5hEMcGuatKcEw4.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/b-c-d-block-1%2B1-3-t3KFcoW3ItnEZR3Pea8xM0KgTcQ4q9.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/b-c-d-block-1%2B1-4-U1j89QhzfWgfOIQnxMDqik71e2SOSY.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/b-c-d-block-1%2B1-5-tucTOyPw8LKltHBVKDk14JrLheKTXJ.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/b-c-d-block-1%2B1-plan-q1zbi1u4hcJGwgHwIJDVH3fZE1Yy7P.webp",
          ],
          details: {
            size: "80 m²",
            bedrooms: 1,
            livingRooms: 1,
            features: [
              t("residences.features.seaView"),
              t("residences.features.premiumLocation"),
              t("residences.features.luxuryFinishes"),
              t("residences.features.modernDesign"),
            ],
          },
        },
        {
          id: "bcd-2-1",
          name: "BCD 2+1",
          displayName: t("residences.propertyTypes.bcd2Plus1.displayName"),
          description: t("residences.propertyTypes.bcd2Plus1.description"),
          feature: t("residences.propertyTypes.bcd2Plus1.feature"),
          images: [
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/b-c-d-block-2%2B1-1-NxEhAeHn53uE9xHnDytbFHkDsNTbzn.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/b-c-d-block-2%2B1-2-o6T0abMCnZLBrIxT5k05WixdNrydlV.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/b-c-d-block-2%2B1-3-NkArubpRgp4J6jfQ2qfGmejxp6prox.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/b-c-d-block-2%2B1-4-Lm7xUBNyVcwT5cIVYTSQI1145g04Gh.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/b-c-d-block-2%2B1-5-RxwR1T2tlJ6DrmDqsOwEfca3r35Ga0.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/b-c-d-block-2%2B1-bed-1-oiV5Tfu4S3VPkcb7ribgEiw0Sv86P3.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/b-c-d-block-2%2B1-plan-1f01CsuEd37Uh5lUPWIBCbtQRLj98n.webp",
          ],
          details: {
            size: "110-170 m²",
            bedrooms: 2,
            livingRooms: 1,
            features: [
              t("residences.features.seaView"),
              t("residences.features.familyFriendly"),
              t("residences.features.spaciousLayout"),
              t("residences.features.premiumAppliances"),
            ],
          },
        },
        {
          id: "bcd-3-1",
          name: "BCD 3+1",
          displayName: t("residences.propertyTypes.bcd3Plus1.displayName"),
          description: t("residences.propertyTypes.bcd3Plus1.description"),
          feature: t("residences.propertyTypes.bcd3Plus1.feature"),
          images: [
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/b-c-d-block-3%2B1-1-z2Sj3N7kphBe26k6gCAFGLstyknAMf.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/b-c-d-block-3%2B1-2-SzbXQZr53aaBJHdMU7HVho82DRfH6A.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/b-c-d-block-3%2B1-3-hCRpdGaR1faokGIoIqGvwA1OSU6kNj.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/b-c-d-block-3%2B1-4-xfV0f5pEvCjaEqiAy1N20bO2cU9g7j.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/b-c-d-block-3%2B1-5-VfyJs9jRJM5JjIvDIKUa84x0BlnnIw.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/b-c-d-block-3%2B1-6-0aeE3TiSFQmWgD7wYrQpD8vymxWGKH.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/b-c-d-block-3%2B1-7-NVisCDqs15VDu3gSd52l6gkzsiO06j.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/b-c-d-block-3%2B1-8-FErMC7Dmc4fUC0liOMXaGuwx5ydbJQ.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/b-c-d-block-3%2B1-9-ESAISaSl3XIRkVLUuKoSnjfap5pfP6.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/b-c-d-block-3%2B1-10-Fhi4JFgrGxr54EQCEdCjdMqHYd2kLC.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/b-c-d-block-3%2B1-plan-j9BAihFn1jFU1Za1PTINSt6b9EII19.webp",
          ],
          details: {
            size: "155-165 m²",
            bedrooms: 3,
            livingRooms: 1,
            features: [
              t("residences.features.panoramicSeaViews"),
              t("residences.features.spaciousTerrace"),
              t("residences.features.premiumFinishes"),
            ],
          },
        },
        {
          id: "bcd-penthouse",
          name: "BCD Penthouse 5+1",
          displayName: t("residences.propertyTypes.bcdPenthouse.displayName"),
          description: t("residences.propertyTypes.bcdPenthouse.description"),
          feature: t("residences.propertyTypes.bcdPenthouse.feature"),
          images: [
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/b-c-d-block-penthouse-5%2B1-1-SHTfRkXnlb8DCUNOAzL1372jBh4Em5.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/b-c-d-block-penthouse-5%2B1-2-GnXpYe650BVyUf4xTWNjqK9OGF5xDR.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/b-c-d-block-penthouse-5%2B1-3-SzeKSmVBZtnWiDVfavp92zAcTmi3Y8.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/b-c-d-block-penthouse-5%2B1-4-TPsMWRjBUbuS24YCwhRrwUQl2H9WQG.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/b-c-d-block-penthouse-5%2B1-5-8S2Wd3hs7hL3GSqZZLviPsmxYj5v5N.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/b-c-d-block-penthouse-5%2B1-6-IxhRlwb7avlY65Y3wYbCIKHbcom/Residencies/8-%20B-C-D%20Penthouse%205%2B1/b-c-d-block-penthouse-5%2B1-6-IxhRlwb7avlY65Y3wYbCIKHb3gV0eB.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/b-c-d-block-penthouse-5%2B1-7-4rJzF7SE5mgfPpuZqTS2kTHn9k5Cjc.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/b-c-d-block-penthouse-5%2B1-8-FizECc3NgMSEF8s5FQZDa0BqsKhsrU.webp",
          ],
          details: {
            size: "270-500 m²",
            bedrooms: 5,
            livingRooms: 1,
            features: [
              t("residences.features.threeSixtyViews"),
              t("residences.features.rooftopTerrace"),
              t("residences.features.privatePool"),
              t("residences.features.panoramicSeaViews"),
            ],
          },
        },
        {
          id: "bcd-duplex",
          name: "BCD Duplex 5+1",
          displayName: t("residences.propertyTypes.bcdDuplex.displayName"),
          description: t("residences.propertyTypes.bcdDuplex.description"),
          feature: t("residences.propertyTypes.bcdDuplex.feature"),
          images: [
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/b-c-d-block-penthouse-duplex-5%2B1-1-VCViOvtwdwRDWwmDbWx99J4WMasbcG.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/b-c-d-block-penthouse-duplex-5%2B1-2-cxaT3VPx1uEIzVo2zb8acAhzH67JEZ.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/b-c-d-block-penthouse-duplex-5%2B1-3-xFMyN8Gngn5e3hV8LBLKiS8H5KIXdO.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/b-c-d-block-penthouse-duplex-5%2B1-4-34QhkNBJEhgk7c7bxeOoQbgJK18N4o.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/b-c-d-block-penthouse-duplex-5%2B1-5-oT1oKWplOIsqMBxXMdNTGzPfYwSawN.webp",
            "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/b-c-d-block-penthouse-duplex-5%2B1-6-pl1KDWafYh4A7yu473XlZYRpoRfdpN.webp",
          ],
          details: {
            size: "265-475 m²",
            bedrooms: 5,
            livingRooms: 1,
            features: [
              t("residences.features.sweepingSeaViews"),
              t("residences.features.twoFloors"),
              t("residences.features.privateTerrace"),
              t("residences.features.luxuryFinishes"),
            ],
          },
        },
      ],
    },
  ]

  const [selectedBlock, setSelectedBlock] = useState(propertyTypes[0]?.id || "")
  const [selectedResidence, setSelectedResidence] = useState<PropertyType | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)

  const currentBlock = propertyTypes.find((block) => block.id === selectedBlock)

  const openResidenceDialog = useCallback((residence: PropertyType) => {
    setSelectedResidence(residence)
    setGalleryIndex(0)
    setDialogOpen(true)
  }, [])

  const nextImageDialog = useCallback(() => {
    if (selectedResidence && selectedResidence.images.length > 1) {
      setGalleryIndex((prev) => (prev + 1) % selectedResidence.images.length)
    }
  }, [selectedResidence])

  const prevImageDialog = useCallback(() => {
    if (selectedResidence && selectedResidence.images.length > 1) {
      setGalleryIndex((prev) => (prev - 1 + selectedResidence.images.length) % selectedResidence.images.length)
    }
  }, [selectedResidence])

  const scrollToContactForm = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("requestCatalogFromResidences", "true") // Specific key
    }
    if (dialogOpen) {
      setDialogOpen(false)
    }
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
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
  }, [dialogOpen])

  const formatResidenceCardDetails = (details: PropertyDetail): string => {
    if (details.bedrooms === 1 && details.livingRooms === 0) {
      // Typical Studio definition
      return `${t("residences.details.studio")} • ${details.size}`
    }

    // Handle bedrooms with singular/plural forms
    const bedString = `${details.bedrooms} ${
      details.bedrooms === 1 ? t("residences.details.bedroom") : t("residences.details.bedrooms_plural")
    }`

    // Handle living rooms with singular/plural forms
    const livingString =
      details.livingRooms > 0
        ? ` • ${details.livingRooms} ${
            details.livingRooms === 1 ? t("residences.details.livingRoom") : t("residences.details.livingRooms_plural")
          }`
        : ""

    return `${bedString}${livingString} • ${details.size}`
  }

  return (
    <section ref={ref} id="residences" className="bg-[#f8f8f8] py-20 md:py-32 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-3xl font-light tracking-wider text-[#1a1a1a] sm:text-4xl md:text-5xl">
          {t("residences.title")}
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-center text-base text-[#555] md:mb-16 md:text-lg">
          {t("residences.description")}
        </p>

        <div className="mb-10 flex flex-col items-center justify-center md:mb-12">
          <div className="flex w-full max-w-sm flex-col space-y-4 md:max-w-md">
            <Tabs
              defaultValue={propertyTypes[0]?.id || ""}
              value={selectedBlock}
              onValueChange={setSelectedBlock}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-slate-200/80">
                {propertyTypes.map((block) => (
                  <TabsTrigger
                    key={block.id}
                    value={block.id}
                    className="text-sm data-[state=active]:bg-[#c9a77c] data-[state=active]:text-white data-[state=active]:shadow-md md:text-base"
                  >
                    {block.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-3",
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
            "transition-all duration-1000 ease-out",
          )}
        >
          {currentBlock?.types.map((residence, index) => (
            <Card
              key={residence.id}
              className={cn(
                "group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border-transparent bg-white shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-xl",
              )}
              style={{ transitionDelay: inView ? `${index * 100}ms` : "0ms" }}
              onClick={() => openResidenceDialog(residence)}
            >
              <ResidenceImageCarousel images={residence.images} name={residence.displayName} />
              <div className="flex flex-grow flex-col p-4 md:p-5">
                <CardHeader className="p-0 pb-2 md:pb-3">
                  <CardTitle className="text-lg font-semibold text-[#2c4051] md:text-xl">
                    {residence.displayName}
                  </CardTitle>
                  <CardDescription className="text-sm text-[#666] md:text-[0.9rem] leading-relaxed pt-1">
                    {residence.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow p-0 pt-1 md:pt-2">
                  <p className="text-xs font-medium text-[#c9a77c] md:text-sm">{residence.feature}</p>
                </CardContent>
                <div className="mt-auto pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#555] md:text-sm">
                      {formatResidenceCardDetails(residence.details)}
                    </span>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-xs font-semibold text-[#2c4051] opacity-80 transition-opacity hover:opacity-100 group-hover:opacity-100 md:text-sm"
                      onClick={(e) => {
                        e.stopPropagation() // Prevent card click when button is clicked
                        openResidenceDialog(residence)
                      }}
                    >
                      {t("residences.details.viewDetails")}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-center space-y-4 md:mt-20">
          <h3 className="text-center text-2xl font-light tracking-wider text-[#1a1a1a] sm:text-3xl">
            {t("residences.wantToSeeMore")}
          </h3>
          <p className="max-w-2xl text-center text-base text-[#555] md:text-lg">{t("residences.catalogDescription")}</p>
          <Button
            size="lg"
            className="bg-[#c9a77c] px-8 py-3 text-base text-white shadow-md hover:bg-[#b89669] transition-colors duration-300"
            asChild
          >
            <Link href="#contact" onClick={scrollToContactForm}>
              <Download className="mr-2.5 h-5 w-5" />
              {t("residences.downloadCatalog")}
            </Link>
          </Button>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[95vh] w-[95vw] max-w-4xl overflow-y-auto overflow-x-hidden p-0 data-[state=open]:animate-contentShow sm:rounded-lg md:w-full">
          {/* FIX: Wrap the conditional content in a single, always-present div */}
          <div>
            {selectedResidence && (
              <>
                <div className="relative aspect-video w-full bg-slate-200">
                  <ZoomableImage
                    key={selectedResidence.images[galleryIndex]} // Add key for re-triggering zoom on image change
                    src={selectedResidence.images[galleryIndex] || "/images/placeholder.jpg"}
                    alt={selectedResidence.displayName}
                    className="h-full w-full" // Ensure image tries to fill container for ZoomableImage
                    maxZoom={3}
                  />
                  {selectedResidence.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImageDialog}
                        className="absolute left-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-lg transition-all hover:bg-white hover:text-[#2c4051] active:scale-90 md:left-4 md:h-10 md:w-10"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                      </button>
                      <button
                        onClick={nextImageDialog}
                        className="absolute right-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-lg transition-all hover:bg-white hover:text-[#2c4051] active:scale-90 md:right-4 md:h-10 md:w-10"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                      </button>
                      <div className="absolute bottom-3 left-0 right-0 z-30 flex justify-center space-x-2 md:bottom-4">
                        {selectedResidence.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setGalleryIndex(index)}
                            className={cn(
                              "h-2 w-6 rounded-full ring-1 ring-black/20 transition-all md:h-2.5 md:w-8",
                              galleryIndex === index ? "bg-white scale-110" : "bg-white/60 hover:bg-white/80",
                            )}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="p-5 sm:p-6 md:p-8">
                  <div className="mb-5 md:mb-6">
                    <h2 className="text-2xl font-semibold tracking-tight text-[#1a1a1a] md:text-3xl lg:text-4xl">
                      {selectedResidence.displayName}
                    </h2>
                    <p className="pt-1.5 text-sm text-[#555] md:text-base leading-relaxed">
                      {selectedResidence.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2 md:gap-x-8 md:gap-y-6">
                    <div>
                      <h4 className="mb-2.5 text-lg font-semibold text-[#1a1a1a] md:mb-3">
                        {t("residences.details.details")}
                      </h4>
                      <ul className="space-y-2 text-sm md:space-y-2.5">
                        <li className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                          <span className="text-[#555]">{t("residences.details.size")}</span>
                          <span className="font-medium text-[#1a1a1a]">{selectedResidence.details.size}</span>
                        </li>
                        <li className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                          <span className="text-[#555]">{t("residences.details.bedrooms")}</span>
                          <span className="font-medium text-[#1a1a1a]">{selectedResidence.details.bedrooms}</span>
                        </li>
                        <li className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                          <span className="text-[#555]">{t("residences.details.livingRooms")}</span>
                          <span className="font-medium text-[#1a1a1a]">{selectedResidence.details.livingRooms}</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2.5 text-lg font-semibold text-[#1a1a1a] md:mb-3">
                        {t("residences.details.features")}
                      </h4>
                      <ul className="space-y-2 text-sm md:space-y-2.5">
                        {selectedResidence.details.features.map((feature, index) => (
                          <li key={index} className="flex items-start border-b border-slate-200/80 pb-2.5">
                            <div className="mr-2.5 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#c9a77c]"></div>
                            <span className="text-[#333]">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-slate-200/80 pt-5 md:pt-6">
                    <p className="text-sm font-medium text-[#c9a77c] md:text-base">{selectedResidence.feature}</p>
                  </div>
                  <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-end sm:gap-4">
                    <Button
                      variant="outline"
                      className="w-full border-slate-300 text-slate-700 hover:bg-slate-100 sm:w-auto"
                      asChild
                    >
                      <Link href="#contact" onClick={scrollToContactForm}>
                        <Download className="mr-2 h-4 w-4" />
                        {t("residences.dialog.getFloorPlans")}
                      </Link>
                    </Button>
                    <Button className="w-full bg-[#c9a77c] text-white shadow hover:bg-[#b89669] sm:w-auto" asChild>
                      <Link href="#contact" onClick={scrollToContactForm}>
                        {t("residences.dialog.requestInformation")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>{" "}
          {/* End of the new wrapper div for DialogContent children */}
        </DialogContent>
      </Dialog>
    </section>
  )
}
