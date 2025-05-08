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

// Define property types with proper TypeScript interfaces
interface PropertyDetail {
  size: string
  bedrooms: number
  bathrooms: number
  features: string[]
}

interface PropertyType {
  id: string
  name: string
  description: string
  feature: string
  images: string[]
  details: PropertyDetail
}

interface PropertyBlock {
  id: string
  name: string
  types: PropertyType[]
}

// Property data
const propertyTypes: PropertyBlock[] = [
  {
    id: "a",
    name: "Block A",
    types: [
      {
        id: "a-1-1",
        name: "A 1+1",
        description: "One-bedroom residence with panoramic sea views",
        feature: "Floor-to-ceiling windows with smart home integration",
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
          size: "65-75 m²",
          bedrooms: 1,
          bathrooms: 1,
          features: ["Sea View", "Smart Home", "Private Balcony"],
        },
      },
      {
        id: "a-2-1",
        name: "A 2+1",
        description: "Two-bedroom residence with private balcony",
        feature: "Luxury finishes and underfloor heating",
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
          size: "85-95 m²",
          bedrooms: 2,
          bathrooms: 1,
          features: ["Sea View", "Underfloor Heating", "Spacious Living Area"],
        },
      },
      {
        id: "a-studio",
        name: "A Studio",
        description: "Efficient studio apartment with modern amenities",
        feature: "Compact luxury with premium finishes",
        images: [
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/a-block-studio-1-mKak4gCk7RL89aDz2lA4V8FS6saRLf.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/a-block-studio-2-DrQXBfn4X0Yr9oVzW9n7Cg7fpiAm5h.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/a-block-studio-3-GesZog5dr72uC9t7JQLb7uQv1hgZFq.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/a-block-studio-4-6PjmkXfXzGvSmSG676io1VMKxuc1hD.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/a-block-studio-5-iWq6dxuKr7LjqnPyHUNRP40nMdBLwd.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/a-block-studio-plan-Cb5Me3GXf23qTFYjbye1Eo4n3B9yEO.webp",
        ],
        details: {
          size: "45-55 m²",
          bedrooms: 0,
          bathrooms: 1,
          features: ["Efficient Layout", "Modern Kitchen", "Built-in Storage"],
        },
      },
    ],
  },
  {
    id: "bcd",
    name: "Block B, C & D",
    types: [
      {
        id: "bcd-1-1",
        name: "BCD 1+1",
        description: "One-bedroom residence with premium amenities",
        feature: "Elegant design with high-end finishes",
        images: [
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/b-c-d-block-1%2B1-1-C0CeKMIJsPovkOv1ZZiVCbgOHJ2MYz.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/b-c-d-block-1%2B1-2-f40yzeTrws3yzZyL5hEMcGuatKcEw4.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/b-c-d-block-1%2B1-3-t3KFcoW3ItnEZR3Pea8xM0KgTcQ4q9.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/b-c-d-block-1%2B1-4-U1j89QhzfWgfOIQnxMDqik71e2SOSY.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/b-c-d-block-1%2B1-5-tucTOyPw8LKltHBVKDk14JrLheKTXJ.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/b-c-d-block-1%2B1-plan-q1zbi1u4hcJGwgHwIJDVH3fZE1Yy7P.webp",
        ],
        details: {
          size: "70-80 m²",
          bedrooms: 1,
          bathrooms: 1,
          features: ["Premium Location", "Luxury Finishes", "Modern Design"],
        },
      },
      {
        id: "bcd-2-1",
        name: "BCD 2+1",
        description: "Two-bedroom residence with spacious layout",
        feature: "Perfect for families with premium amenities",
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
          size: "90-100 m²",
          bedrooms: 2,
          bathrooms: 1,
          features: ["Family-Friendly", "Spacious Layout", "Premium Appliances"],
        },
      },
      {
        id: "bcd-3-1",
        name: "BCD 3+1",
        description: "Three-bedroom residence with panoramic views",
        feature: "Luxury living with ample space for families",
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
          size: "120-140 m²",
          bedrooms: 3,
          bathrooms: 2,
          features: ["Panoramic Views", "Spacious Terrace", "Premium Finishes"],
        },
      },
      {
        id: "bcd-duplex",
        name: "BCD Duplex",
        description: "Two-floor luxury residence with premium features",
        feature: "Exclusive living across two floors with private terrace",
        images: [
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/b-c-d-block-penthouse-duplex-5%2B1-1-VCViOvtwdwRDWwmDbWx99J4WMasbcG.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/b-c-d-block-penthouse-duplex-5%2B1-2-cxaT3VPx1uEIzVo2zb8acAhzH67JEZ.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/b-c-d-block-penthouse-duplex-5%2B1-3-xFMyN8Gngn5e3hV8LBLKiS8H5KIXdO.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/b-c-d-block-penthouse-duplex-5%2B1-4-34QhkNBJEhgk7c7bxeOoQbgJK18N4o.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/b-c-d-block-penthouse-duplex-5%2B1-5-oT1oKWplOIsqMBxXMdNTGzPfYwSawN.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/b-c-d-block-penthouse-duplex-5%2B1-6-pl1KDWafYh4A7yu473XlZYRpoRfdpN.webp",
        ],
        details: {
          size: "150-180 m²",
          bedrooms: 3,
          bathrooms: 2,
          features: ["Two Floors", "Private Terrace", "Luxury Finishes"],
        },
      },
      {
        id: "bcd-penthouse",
        name: "BCD Penthouse",
        description: "Exclusive top-floor living with 360° views",
        feature: "Private rooftop terrace with infinity plunge pool",
        images: [
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/b-c-d-block-penthouse-5%2B1-1-SHTfRkXnlb8DCUNOAzL1372jBh4Em5.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/b-c-d-block-penthouse-5%2B1-2-GnXpYe650BVyUf4xTWNjqK9OGF5xDR.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/b-c-d-block-penthouse-5%2B1-3-SzeKSmVBZtnWiDVfavp92zAcTmi3Y8.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/b-c-d-block-penthouse-5%2B1-4-TPsMWRjBUbuS24YCwhRrwUQl2H9WQG.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/b-c-d-block-penthouse-5%2B1-5-8S2Wd3hs7hL3GSqZZLviPsmxYj5v5N.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/b-c-d-block-penthouse-5%2B1-6-IxhRlwb7avlY65Y3wYbCIKHb3gV0eB.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/b-c-d-block-penthouse-5%2B1-7-4rJzF7SE5mgfPpuZqTS2kTHn9k5Cjc.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/b-c-d-block-penthouse-5%2B1-8-FizECc3NgMSEF8s5FQZDa0BqsKhsrU.webp",
        ],
        details: {
          size: "180-220 m²",
          bedrooms: 3,
          bathrooms: 3,
          features: ["Rooftop Terrace", "Private Pool", "Panoramic Views"],
        },
      },
      {
        id: "bcd-studio",
        name: "BCD Studio",
        description: "Premium studio apartment with luxury amenities",
        feature: "Efficient luxury living with premium finishes",
        images: [
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/b-c-d-block-studio-1-qT2mBy1ETY7kONZr6CgE9bMsoSatnz.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/b-c-d-block-studio-2-E2AnZCecvxRpNYeJmGWjz41IdFf1Hx.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/b-c-d-block-studio-3-TgohZM6BnOgp7mLn3757noi2a9OKQT.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/b-c-d-block-studio-4-PpdsKY2uKxeCe12bfAbYIXCmHoNnxr.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/b-c-d-block-studio-plan-bVsvfW2zON6ST6c8w9RBO8g5X4R5mI.webp",
        ],
        details: {
          size: "50-60 m²",
          bedrooms: 0,
          bathrooms: 1,
          features: ["Premium Location", "Efficient Design", "Luxury Finishes"],
        },
      },
    ],
  },
]

// Image carousel component for residence cards
function ResidenceImageCarousel({ images, name }: { images: string[]; name: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isTransitioning) return // Prevent rapid clicks during transition

    setIsTransitioning(true)
    setCurrentImageIndex((prev) => (prev + 1) % images.length)

    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isTransitioning) return // Prevent rapid clicks during transition

    setIsTransitioning(true)
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)

    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const goToImage = (e: React.MouseEvent, index: number) => {
    e.stopPropagation()
    if (isTransitioning) return // Prevent rapid clicks during transition

    setIsTransitioning(true)
    setCurrentImageIndex(index)

    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 300)
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
      {/* Image Display */}
      <div className="absolute inset-0 bg-gray-200">
        <img
          src={images[currentImageIndex] || "/images/placeholder.jpg"}
          alt={`${name} - Image ${currentImageIndex + 1}`}
          className="h-full w-full object-cover transition-opacity duration-300"
          loading="lazy"
        />
      </div>

      {/* Carousel Controls */}
      {images.length > 1 && (
        <>
          {/* Previous Button - Fixed hover state for touch devices */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#f8f8f8] text-[#666] shadow-md transition-all hover:bg-[#2c4051] hover:text-white active:bg-[#2c4051] active:text-white md:h-10 md:w-10"
            aria-label="Previous image"
            style={{ WebkitTapHighlightColor: "transparent" }} // Prevent tap highlight on mobile
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          {/* Next Button - Fixed hover state for touch devices */}
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#f8f8f8] text-[#666] shadow-md transition-all hover:bg-[#2c4051] hover:text-white active:bg-[#2c4051] active:text-white md:h-10 md:w-10"
            aria-label="Next image"
            style={{ WebkitTapHighlightColor: "transparent" }} // Prevent tap highlight on mobile
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          {/* Indicator Dots */}
          <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center space-x-1.5 md:bottom-3 md:space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToImage(e, index)}
                className={cn(
                  "h-1.5 w-5 rounded-full transition-all md:h-2 md:w-6",
                  currentImageIndex === index ? "bg-white" : "bg-white/50 hover:bg-white/75",
                )}
                aria-label={`Go to image ${index + 1}`}
                style={{ WebkitTapHighlightColor: "transparent" }} // Prevent tap highlight on mobile
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
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [selectedBlock, setSelectedBlock] = useState("a")
  const [selectedResidence, setSelectedResidence] = useState<PropertyType | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)

  // Find the currently selected block
  const currentBlock = propertyTypes.find((block) => block.id === selectedBlock)

  // Handle opening the residence detail dialog
  const openResidenceDialog = (residence: PropertyType) => {
    setSelectedResidence(residence)
    setGalleryIndex(0)
    setDialogOpen(true)
  }

  // Handle navigation in the gallery dialog
  const nextImage = useCallback(() => {
    if (selectedResidence) {
      setGalleryIndex((prev) => (prev + 1) % selectedResidence.images.length)
    }
  }, [selectedResidence])

  const prevImage = useCallback(() => {
    if (selectedResidence) {
      setGalleryIndex((prev) => (prev - 1 + selectedResidence.images.length) % selectedResidence.images.length)
    }
  }, [selectedResidence])

  // Function to scroll to contact form and set catalog flag
  const scrollToContactForm = () => {
    // Set the global state to indicate catalog request
    window.localStorage.setItem("requestCatalog", "true")

    // Close the dialog if it's open
    if (dialogOpen) {
      setDialogOpen(false)
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
    <section ref={ref} id="residences" className="bg-[#f8f8f8] py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <h2 className="mb-4 text-center text-3xl font-light tracking-wider text-[#1a1a1a] sm:text-4xl md:text-5xl">
          Residences Crafted for Luxury
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-[#666] md:mb-16">
          705 Luxury Apartments with 180° Uninterrupted Sea View, featuring penthouses with private pools and panoramic
          terraces.
        </p>

        {/* Block Selection Tabs */}
        <div className="mb-8 flex flex-col items-center justify-center">
          <div className="flex w-full max-w-md flex-col space-y-4">
            <Tabs defaultValue="a" value={selectedBlock} onValueChange={setSelectedBlock} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                {propertyTypes.map((block) => (
                  <TabsTrigger key={block.id} value={block.id} className="text-sm md:text-base">
                    {block.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Residence Cards Grid */}
        <div
          className={cn(
            "grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3",
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
            "transition-all duration-1000 ease-out",
          )}
        >
          {currentBlock?.types.map((residence, index) => (
            <Card
              key={residence.id}
              className={cn(
                "group relative flex cursor-pointer flex-col overflow-hidden border-none bg-white shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-lg",
                { "delay-0": index % 3 === 0 },
                { "delay-200": index % 3 === 1 },
                { "delay-[400ms]": index % 3 === 2 },
              )}
              style={{ transitionDelay: inView ? `${(index % 3) * 200}ms` : "0ms" }}
              onClick={() => openResidenceDialog(residence)}
            >
              {/* Image Carousel */}
              <ResidenceImageCarousel images={residence.images} name={residence.name} />

              {/* Card Content */}
              <div className="flex flex-grow flex-col p-4 md:p-5">
                <CardHeader className="p-0 pb-2">
                  <CardTitle className="text-lg font-medium text-[#1a1a1a] md:text-xl">{residence.name}</CardTitle>
                  <CardDescription className="text-sm text-[#666] md:text-base">
                    {residence.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow p-0">
                  <p className="text-xs text-[#c9a77c] md:text-sm">{residence.feature}</p>
                </CardContent>
                {/* Footer with Details Button */}
                <div className="mt-auto pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#666]">
                      {residence.details.bedrooms === 0
                        ? "Studio"
                        : `${residence.details.bedrooms} ${
                            residence.details.bedrooms === 1 ? "Bedroom" : "Bedrooms"
                          }`}{" "}
                      • {residence.details.size}
                    </span>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-xs font-medium text-[#0a1a2a] opacity-70 transition-opacity hover:opacity-100 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        openResidenceDialog(residence)
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Catalog Download CTA */}
        <div className="mt-16 flex flex-col items-center justify-center space-y-4">
          <h3 className="text-center text-2xl font-light tracking-wider text-[#1a1a1a] sm:text-3xl">
            Want to See More?
          </h3>
          <p className="max-w-2xl text-center text-[#666]">
            Get our comprehensive catalog with detailed information about all residence types, floor plans, and pricing.
          </p>
          <Button size="lg" className="bg-[#c9a77c] text-white hover:bg-[#b89669]" asChild>
            <Link href="#contact" onClick={scrollToContactForm}>
              <Download className="mr-2 h-4 w-4" />
              Download Catalog
            </Link>
          </Button>
        </div>
      </div>

      {/* Residence Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto overflow-x-hidden p-0 sm:rounded-lg">
          {selectedResidence && (
            <>
              {/* Image Gallery */}
              <div className="relative aspect-video w-full">
                <img
                  src={selectedResidence.images[galleryIndex] || "/images/placeholder.jpg"}
                  alt={selectedResidence.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {selectedResidence.images.length > 1 && (
                  <>
                    {/* Previous Button */}
                    <button
                      onClick={prevImage}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f8f8] text-[#666] transition-colors hover:bg-[#2c4051] hover:text-white absolute left-4 top-1/2  -translate-y-1/2 shadow-md transition-all hover:bg-white active:scale-95"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    {/* Next Button */}
                    <button
                      onClick={nextImage}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f8f8] text-[#666] transition-colors hover:bg-[#2c4051] hover:text-white absolute right-4 top-1/2  -translate-y-1/2 shadow-md transition-all hover:bg-white active:scale-95"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    {/* Indicator Dots */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                      {selectedResidence.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setGalleryIndex(index)}
                          className={cn(
                            "h-2 w-8 rounded-full transition-all",
                            galleryIndex === index ? "bg-white" : "bg-white/50 hover:bg-white/75",
                          )}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Details Content */}
              <div className="p-6 sm:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-light tracking-wide text-[#1a1a1a] md:text-3xl">
                    {selectedResidence.name}
                  </h2>
                  <p className="pt-1 text-base text-[#666]">{selectedResidence.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                  <div>
                    <h4 className="mb-3 text-lg font-medium text-[#1a1a1a]">Details</h4>
                    <ul className="space-y-2.5 text-sm">
                      <li className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                        <span className="text-[#666]">Size</span>
                        <span className="font-medium text-[#1a1a1a]">{selectedResidence.details.size}</span>
                      </li>
                      <li className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                        <span className="text-[#666]">Bedrooms</span>
                        <span className="font-medium text-[#1a1a1a]">{selectedResidence.details.bedrooms}</span>
                      </li>
                      <li className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                        <span className="text-[#666]">Bathrooms</span>
                        <span className="font-medium text-[#1a1a1a]">{selectedResidence.details.bathrooms}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 text-lg font-medium text-[#1a1a1a]">Features</h4>
                    <ul className="space-y-2.5 text-sm">
                      {selectedResidence.details.features.map((feature, index) => (
                        <li key={index} className="flex items-center border-b border-gray-100 pb-2.5">
                          <div className="mr-2.5 mt-px h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#c9a77c]"></div>
                          <span className="text-[#333]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-6">
                  <p className="text-base text-[#c9a77c]">{selectedResidence.feature}</p>
                </div>

                <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <Button variant="outline" className="w-full sm:w-auto" asChild>
                    <Link href="#contact" onClick={scrollToContactForm}>
                      <Download className="mr-2 h-4 w-4" />
                      Get Floor Plans
                    </Link>
                  </Button>
                  <Button className="w-full bg-[#2c4051] text-white hover:bg-[#3a526a] sm:w-auto" asChild>
                    <Link href="#contact" onClick={scrollToContactForm}>
                      Request Information
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
