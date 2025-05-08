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
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/A%20Blok%201%2B1%201-G0mes18sTWOZ2cWwd6FM2eYbgfGL3y.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/A%20Blok%201%2B1%202-i3tAJsXOcA3XBiWcDwbUm0rpEu6Vd5.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/A%20Blok%201%2B1%203-t1SrJHKR819rT29MznPY71FvT5pYWH.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/A%20Blok%201%2B1%204-1n0pKzwrlYt8iv2FBMgFPzhyNa3Xiy.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/A%20Blok%201%2B1%206-oASP3bbJZe2gGMetj6y0uA5Hdc16FS.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/A%20Blok%201%2B1%207-I71UZ2HowOU6L57Gfc8PUoKSgyF6H1.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/A%20Blok%201%2B1%208-VriVWAq52TXuXrSFgEuw47xmuEbHsX.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/A%20Blok%201%2B1%209-sDHHLIl1LDsWRCBBtJbvdm8npsokNl.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/A%20Blok%201%2B1%20Plan-h9sEBXz6hjGV8c0GHO3aFbkkDQMz2q.jpg",
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
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/A%20Blok%202%2B1%201-32NbplBa3pvC5dJqzWeUHJjRLVo6LO.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/A%20Blok%202%2B1%202-mV9hTECJEWoROSFzx3ac4421YBBdgj.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/A%20Blok%202%2B1%203-vEAiNHPftfQfnKGHviLrI78LKWtNYi.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/A%20Blok%202%2B1%204-6pKkMHYFOwf61OtmF5BYPQgwYQRg1c.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/A%20Blok%202%2B1%205-MMz0Wd679aKjkOyzxLTrZju4an47OS.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/A%20Blok%202%2B1%206-89BDxzwlfNXrk81dMXtIbRPfXkev6Z.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/A%20Blok%202%2B1%20Bathroom-2DjoHS3bym653jYpbLh0C2xnSxksFm.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/A%20Blok%202%2B1%20Bedroom%201-SC8ngbhASCGnpjhlqOdJ06Sc0AJu9o.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/A%20Blok%202%2B1%20Bedroom%202-Mm1eXcpjwZcCijD1Qd7MvJ07AY1PA1.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/A%20Blok%202%2B1%20Plan-vSf7sX1NEMfY0d51gSbhecrWSlPQQq.jpg",
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
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/A%20Blok%20Studio%201-5EHFd8vAqbuWbckDd914dcySyB4bUW.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/A%20Blok%20Studio%202-QUNYtxMTWd2nRs3sabpBT46xR0fzs0.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/A%20Blok%20Studio%202-QUNYtxMTWd2nRs3sabpBT46xR0fzs0.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/A%20Blok%20Studio%204-a9LHh1cwZ1eiarrIR8MclNYSU8bsdz.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/A%20Blok%20Studio%205-IXxWUnKFEwMKmnb2CnrntnBfekrqQc.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/A%20Blok%20Studio%20Plan-lH2Z9fa4uQzlAjsHB2Jd9mvMVTDBg8.jpg",
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
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/B-C-D%201%2B1%201-bOw6UNwHAhltzoz9CfaZGJUqh3iCzj.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/B-C-D%201%2B1%202-DpgVdhni7XX9WpNYSICWxZifWusrzp.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/B-C-D%201%2B1%202-DpgVdhni7XX9WpNYSICWxZifWusrzp.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/B-C-D%201%2B1%203-EREazJwtKXIFygRVK3nJDzbuWxHGv1.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/B-C-D%201%2B1%204-bHUYYIP5nsiZjgBo1zwDvsRISHseiA.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/B-C-D%201%2B1%205-ax5ywvSS2KQTWS9wF56qZ23KRvDEoy.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/B-C-D%201%2B1%20Floor%20Plan-X4Ej8Fm6KHzNn1nCrvaDmbr1b6SLeu.jpg",
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
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/B-C-D%202%2B1%201-pSGOjrRyvS0wWb9aPMmoGMGsQmskUP.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/B-C-D%202%2B1%202-9IZHX3ObdpQc8W4iQeMGA1oW0UWpgk.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/B-C-D%202%2B1%203-E7sgy9kRJGKSs8w2SQqeKEHFPHhyPv.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/B-C-D%202%2B1%204-B6tEdm4aLJR7zMLYIfwuu4vBwiSbZr.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/B-C-D%202%2B1%20Floor%20Plan-9CO8LgzpztwSMPRrYDPp3OGymlLXUC.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/BCD%202%2B1%205-mXMnBzB5egEAgIrkTxDR7IdZcKxBNh.jpg",
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
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/B-C-D%203%2B1%201-8wK1VD3e6L1ZKnGmxYPvCUIbOzPMym.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/B-C-D%203%2B1%2010-vTpfLiWJQIxCk8xUHhwv2gOwmiqy1G.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/B-C-D%203%2B1%202-J9nIInzqwKPE17LM7apgF813ITjSkr.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/B-C-D%203%2B1%203-qukw8P6kXnbhPaTnvKLhflixxxetDg.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/B-C-D%203%2B1%204-jaAe24XMXgoFF8UrHFNWrE4A8WJUuP.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/B-C-D%203%2B1%205-LtHJQGK0qeVRw3rk4F9RCA2T1ONyUL.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/B-C-D%203%2B1%207-OenWcuwQRPmE3eTxO102xt8UudsfmQ.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/B-C-D%203%2B1%208-TWta4xPyefoLv9onA3MG4NrM6gJv0T.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/B-C-D%203%2B1%209-6vJXZmyaNQ3PDs3LoRnauiB2HCBQPF.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/B-C-D%203%2B1%20FLOOR%20PLAN-M8kUDhKs2VmoTFiJFoOSKKqTrnBv6I.jpg",
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
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/1-KiWU4sf87peOI7snfLf14kBGEfFbqQ.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/2-zmK0zcHyW3qzY20b1x7Mw593edYZJc.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/3-hRhwEzR8Q1IuLipAKnjYqJlimwJESU.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/4-OOaZgWsTgBN0eFP5MvY3edK9FvTh20.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/5-QU44wmeY1wSEvY0BGqipaeBpehYe2S.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/6-AGsez2f9u5BEDRXcwPEEPLgVDmlsbl.jpg",
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
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/B-C-D%20Penthouse%205%2B1%201-caHXCusQdfcEwumVxTZS3AUvCCEbgE.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/B-C-D%20Penthouse%205%2B1%202-mHqbFhypMdZVcBsBvKyG40v4KBSrTn.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/B-C-D%20Penthouse%205%2B1%203-I2xjSbdwVyKuRd6aQTB6SAMic7i7w2.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/B-C-D%20Penthouse%205%2B1%204-XiiBp6S33mFnrpeKabwJ7wGeDzPAx7.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/B-C-D%20Penthouse%205%2B1%205-IrQq6omcfYPItfk8waR9tDgM0M4I8A.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/B-C-D%20Penthouse%205%2B1%206-4llSH8ahXfoGaG4P4LCr8kHCmxXp0V.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/B-C-D%20Penthouse%205%2B1%207-iNbqvoKMNoPSMx6c4r485oVyHVoXFT.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/8-%20B-C-D%20Penthouse%205%2B1/B-C-D%20Penthouse%205%2B1%208-qjrGvFSJedZ48B6OvgLKumOKVl01Xq.jpg",
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
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/B-C-D%20Studio%201-UUSUXQuHTInsPvBDO6XeZtR7ocsBmV.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/B-C-D%20Studio%202-FS0GeL4zGlHm9sJ3Ny2aB9IBq5a2hU.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/B-C-D%20Studio%203-XOe5RpEJnhGE4Tq8o4Dmt1YVl1bMPR.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/B-C-D%20Studio%204-vZ1hexD6Mg34Tf29wceEqwpycASq7q.jpg",
          "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/B-C-D%20Studio%205-haf30ppRHaBteTvMYIibcR8VXo0r2m.jpg",
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

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (e: React.MouseEvent, index: number) => {
    e.stopPropagation()
    setCurrentImageIndex(index)
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
          {/* Previous Button */}
          <button
            onClick={prevImage}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f8f8] text-[#666] transition-colors hover:bg-[#2c4051] hover:text-white absolute left-2 top-1/2 z-20  -translate-y-1/2 shadow-md transition-all hover:bg-white active:scale-95 md:h-10 md:w-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          {/* Next Button */}
          <button
            onClick={nextImage}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f8f8] text-[#666] transition-colors hover:bg-[#2c4051] hover:text-white absolute right-2 top-1/2 z-20  -translate-y-1/2 shadow-md transition-all hover:bg-white active:scale-95 md:h-10 md:w-10"
            aria-label="Next image"
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
