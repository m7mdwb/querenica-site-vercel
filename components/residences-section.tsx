"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowRight, Home, Building2, Crown, CheckSquare } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

function SafeImage({
  src,
  alt,
  ...rest
}: {
  src: string
  alt: string
  fill?: boolean
  className?: string
  sizes?: string
  width?: number
  height?: number
}) {
  const [imgSrc, setImgSrc] = useState(src ?? "/placeholder.svg")

  useEffect(() => {
    setImgSrc(src ?? "/placeholder.svg")
  }, [src])

  return (
    <Image
      {...rest}
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      onError={() => setImgSrc("/placeholder.svg")} // swap to placeholder if original fails
    />
  )
}

export default function ResidencesSection() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("blockA")
  const [isVisible, setIsVisible] = useState(false)
  const [selectedResidence, setSelectedResidence] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentModalImageIndex, setCurrentModalImageIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("residences")
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  useEffect(() => {
    if (dialogOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [dialogOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && dialogOpen) {
        closeDialog()
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [dialogOpen])

  const residenceTypes = {
    blockA: [
      {
        id: "a-studio",
        nameKey: "residences.propertyTypes.aStudio.displayName",
        descriptionKey: "residences.propertyTypes.aStudio.description",
        featureKey: "residences.propertyTypes.aStudio.feature",
        images: [
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/a-block-studio-1-mKak4gCk7RL89aDz2lA4V8FS6saRLf.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/a-block-studio-2-DrQXBfn4X0Yr9oVzW9n7Cg7fpiAm5h.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/a-block-studio-3-GesZog5dr72uC9t7JQLb7uQv1hgZFq.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/a-block-studio-4-6PjmkXfXzGvSmSG676io1VMKxuc1hD.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/a-block-studio-5-iWq6dxuKr7LjqnPyHUNRP40nMdBLwd.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/1-%20A%20Blok%20Studio/a-block-studio-plan-Cb5Me3GXf23qTFYjbye1Eo4n3B9yEO.webp",
        ],
        categoryKey: "residences.categoryContemporary",
        details: {
          size: "45-50 m²",
          bedrooms: 1,
          livingRooms: 0,
          price: t("residences.prices.aStudio"),
          amenitiesNoteKey: "residences.amenitiesNote",
          features: [
            "residences.features.seaView",
            "residences.features.efficientLayout",
            "residences.features.modernKitchen",
            "residences.features.builtInStorage",
          ],
        },
      },
      {
        id: "a-1-1",
        nameKey: "residences.propertyTypes.a1Plus1.displayName",
        descriptionKey: "residences.propertyTypes.a1Plus1.description",
        featureKey: "residences.propertyTypes.a1Plus1.feature",
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
        categoryKey: "residences.categoryRefined",
        details: {
          size: "80 m²",
          bedrooms: 1,
          livingRooms: 1,
          price: t("residences.prices.a1Plus1"),
          amenitiesNoteKey: "residences.amenitiesNote",
          features: [
            "residences.features.seaView",
            "residences.features.smartHome",
            "residences.features.privateBalcony",
          ],
        },
      },
      {
        id: "a-2-1",
        nameKey: "residences.propertyTypes.a2Plus1.displayName",
        descriptionKey: "residences.propertyTypes.a2Plus1.description",
        featureKey: "residences.propertyTypes.a2Plus1.feature",
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
        categoryKey: "residences.categoryFamily",
        details: {
          size: "140 m²",
          bedrooms: 2,
          livingRooms: 1,
          price: t("residences.prices.a2Plus1"),
          amenitiesNoteKey: "residences.amenitiesNote",
          features: [
            "residences.features.seaView",
            "residences.features.underfloorHeating",
            "residences.features.spaciousLivingArea",
          ],
        },
      },
    ],
    blocksBCD: [
      {
        id: "bcd-studio",
        nameKey: "residences.propertyTypes.bcdStudio.displayName",
        descriptionKey: "residences.propertyTypes.bcdStudio.description",
        featureKey: "residences.propertyTypes.bcdStudio.feature",
        images: [
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/b-c-d-block-studio-1-qT2mBy1ETY7kONZr6CgE9bMsoSatnz.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/b-c-d-block-studio-2-E2AnZCecvxRpNYeJmGWjz41IdFf1Hx.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/b-c-d-block-studio-3-TgohZM6BnOgp7mLn3757noi2a9OKQT.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/b-c-d-block-studio-4-PpdsKY2uKxeCe12bfAbYIXCmHoNnxr.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/4-%20B-C-D%20Studio/b-c-d-block-studio-plan-bVsvfW2zON6ST6c8w9RBO8g5X4R5mI.webp",
        ],
        categoryKey: "residences.categoryUrban",
        details: {
          size: "45-50 m²",
          bedrooms: 1,
          livingRooms: 0,
          price: t("residences.prices.bcdStudio"),
          amenitiesNoteKey: "residences.amenitiesNote",
          features: [
            "residences.features.seaView",
            "residences.features.premiumLocation",
            "residences.features.efficientDesign",
            "residences.features.luxuryFinishes",
          ],
        },
      },
      {
        id: "bcd-1-1",
        nameKey: "residences.propertyTypes.bcd1Plus1.displayName",
        descriptionKey: "residences.propertyTypes.bcd1Plus1.description",
        featureKey: "residences.propertyTypes.bcd1Plus1.feature",
        images: [
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/b-c-d-block-1%2B1-1-C0CeKMIJsPovkOv1ZZiVCbgOHJ2MYz.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/b-c-d-block-1%2B1-2-f40yzeTrws3yzZyL5hEMcGuatKcEw4.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/b-c-d-block-1%2B1-3-t3KFcoW3ItnEZR3Pea8xM0KgTcQ4q9.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/b-c-d-block-1%2B1-4-U1j89QhzfWgfOIQnxMDqik71e2SOSY.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/b-c-d-block-1%2B1-5-tucTOyPw8LKltHBVKDk14JrLheKTXJ.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/5-%20B-C-D%201%2B1/b-c-d-block-1%2B1-plan-q1zbi1u4hcJGwgHwIJDVH3fZE1Yy7P.webp",
        ],
        categoryKey: "residences.categoryExecutive",
        details: {
          size: "80 m²",
          bedrooms: 1,
          livingRooms: 1,
          price: t("residences.prices.bcd1Plus1"),
          amenitiesNoteKey: "residences.amenitiesNote",
          features: [
            "residences.features.seaView",
            "residences.features.premiumLocation",
            "residences.features.luxuryFinishes",
            "residences.features.modernDesign",
          ],
        },
      },
      {
        id: "bcd-2-1",
        nameKey: "residences.propertyTypes.bcd2Plus1.displayName",
        descriptionKey: "residences.propertyTypes.bcd2Plus1.description",
        featureKey: "residences.propertyTypes.bcd2Plus1.feature",
        images: [
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/b-c-d-block-2%2B1-1-NxEhAeHn53uE9xHnDytbFHkDsNTbzn.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/b-c-d-block-2%2B1-2-o6T0abMCnZLBrIxT5k05WixdNrydlV.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/b-c-d-block-2%2B1-3-NkArubpRgp4J6jfQ2qfGmejxp6prox.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/b-c-d-block-2%2B1-4-Lm7xUBNyVcwT5cIVYTSQI1145g04Gh.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/b-c-d-block-2%2B1-5-RxwR1T2tlJ6DrmDqsOwEfca3r35Ga0.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/b-c-d-block-2%2B1-bed-1-oiV5Tfu4S3VPkcb7ribgEiw0Sv86P3.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/b-c-d-block-2%2B1-plan-1f01CsuEd37Uh5lUPWIBCbtQRLj98n.webp",
        ],
        categoryKey: "residences.categoryFamily",
        details: {
          size: "110-170 m²",
          bedrooms: 2,
          livingRooms: 1,
          price: t("residences.prices.bcd2Plus1"),
          amenitiesNoteKey: "residences.amenitiesNote",
          features: [
            "residences.features.seaView",
            "residences.features.familyFriendly",
            "residences.features.spaciousLayout",
            "residences.features.premiumAppliances",
          ],
        },
      },
      {
        id: "bcd-3-1",
        nameKey: "residences.propertyTypes.bcd3Plus1.displayName",
        descriptionKey: "residences.propertyTypes.bcd3Plus1.description",
        featureKey: "residences.propertyTypes.bcd3Plus1.feature",
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
        categoryKey: "residences.categoryFamily",
        details: {
          size: "155-165 m²",
          bedrooms: 3,
          livingRooms: 1,
          price: t("residences.prices.bcd3Plus1"),
          amenitiesNoteKey: "residences.amenitiesNote",
          features: [
            "residences.features.panoramicSeaViews",
            "residences.features.spaciousTerrace",
            "residences.features.premiumFinishes",
          ],
        },
      },
      {
        id: "bcd-penthouse",
        nameKey: "residences.propertyTypes.bcdPenthouse.displayName",
        descriptionKey: "residences.propertyTypes.bcdPenthouse.description",
        featureKey: "residences.propertyTypes.bcdPenthouse.feature",
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
        categoryKey: "residences.categoryUltimate",
        details: {
          size: "270-500 m²",
          bedrooms: 5,
          livingRooms: 1,
          price: t("residences.prices.bcdPenthouse"),
          amenitiesNoteKey: "residences.amenitiesNote",
          features: [
            "residences.features.threeSixtyViews",
            "residences.features.rooftopTerrace",
            "residences.features.privatePool",
            "residences.features.panoramicSeaViews",
          ],
        },
      },
      {
        id: "bcd-duplex",
        nameKey: "residences.propertyTypes.bcdDuplex.displayName",
        descriptionKey: "residences.propertyTypes.bcdDuplex.description",
        featureKey: "residences.propertyTypes.bcdDuplex.feature",
        images: [
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/b-c-d-block-penthouse-duplex-5%2B1-1-VCViOvtwdwRDWwmDbWx99J4WMasbcG.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/b-c-d-block-penthouse-duplex-5%2B1-2-cxaT3VPx1uEIzVo2zb8acAhzH67JEZ.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/b-c-d-block-penthouse-duplex-5%2B1-3-xFMyN8Gngn5e3hV8LBLKiS8H5KIXdO.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/b-c-d-block-penthouse-duplex-5%2B1-4-34QhkNBJEhgk7c7bxeOoQbgJK18N4o.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/b-c-d-block-penthouse-duplex-5%2B1-5-oT1oKWplOIsqMBxXMdNTGzPfYwSawN.webp",
          "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Residencies/9-%20B-C-D%20Duplex%205%2B1%20Duplex/b-c-d-block-penthouse-duplex-5%2B1-6-pl1KDWafYh4A7yu473XlZYRpoRfdpN.webp",
        ],
        categoryKey: "residences.categoryUltimate",
        details: {
          size: "265-475 m²",
          bedrooms: 5,
          livingRooms: 1,
          price: t("residences.prices.bcdDuplex"),
          amenitiesNoteKey: "residences.amenitiesNote",
          features: [
            "residences.features.sweepingSeaViews",
            "residences.features.twoFloors",
            "residences.features.privateTerrace",
            "residences.features.luxuryFinish",
          ],
        },
      },
    ],
  }

  const openResidenceDialog = (residence) => {
    setSelectedResidence(residence)
    setCurrentModalImageIndex(0)
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
  }

  const handleNextModalImage = () => {
    if (selectedResidence) {
      setCurrentModalImageIndex((prev) => (prev === selectedResidence.images.length - 1 ? 0 : prev + 1))
    }
  }

  const handlePrevModalImage = () => {
    if (selectedResidence) {
      setCurrentModalImageIndex((prev) => (prev === 0 ? selectedResidence.images.length - 1 : prev - 1))
    }
  }

  return (
    <section id="residences" className="py-32 bg-gradient-to-b from-platinum-50 to-luxury-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-secondary text-sm uppercase tracking-[0.4em] font-light mb-4 block">
            {t("residences.luxuryResidences")}
          </span>
          <h2 className="text-5xl md:text-6xl font-light text-primary mb-6 tracking-tight">
            {t("residences.premiumLiving")}
            <span className="block font-serif italic text-secondary" style={{ fontFamily: "var(--font-bodoni)" }}>
              {t("residences.spaces")}
            </span>
          </h2>
          <p className="text-lg text-platinum-600 max-w-3xl mx-auto leading-relaxed">{t("residences.introText")}</p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-secondary to-accent mx-auto mt-8"></div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-white/90 backdrop-blur-sm rounded-xl p-2 border border-platinum-200 shadow-lg">
            {[
              { key: "blockA", label: t("residences.blockATab"), icon: <Home className="w-4 h-4 mr-2" /> },
              {
                key: "blocksBCD",
                label: t("residences.blocksBCDApartments"),
                icon: <Building2 className="w-4 h-4 mr-2" />,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-secondary to-accent text-white shadow-lg"
                    : "text-platinum-600 hover:text-primary hover:bg-white/50"
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Residences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(residenceTypes[activeTab] || []).map((residence, index) => (
            <ResidenceCard
              key={residence.id}
              residence={residence}
              index={index}
              isVisible={isVisible}
              onClick={() => openResidenceDialog(residence)}
              t={t}
            />
          ))}
        </div>

        {/* Sophisticated Modal */}
        {dialogOpen && selectedResidence && (
          <div
            className="fixed inset-0 bg-primary/90 backdrop-blur-md z-[9999] flex items-center justify-center pt-24 pb-4 overflow-y-auto"
            onClick={closeDialog}
          >
            <div
              className="bg-white rounded-2xl max-w-4xl w-[95%] border border-platinum-200 shadow-2xl shadow-primary/20 max-h-[80vh] overflow-y-auto relative z-[10000]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <div className="relative aspect-video overflow-hidden">
                  <SafeImage
                    src={selectedResidence.images[currentModalImageIndex] ?? "/placeholder.svg"}
                    alt={`${t(selectedResidence.nameKey)} - Image ${currentModalImageIndex + 1}`}
                    fill
                    className="object-contain rounded-t-2xl transition-opacity duration-500"
                    width={1920}
                    height={1080}
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-secondary/20 rounded-t-2xl"></div>
                  <button
                    onClick={closeDialog}
                    className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-3 text-primary hover:bg-white hover:text-secondary transition-all duration-300 shadow-lg hover:shadow-xl border border-platinum-100"
                    aria-label={t("residences.close")}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="absolute top-6 left-6 bg-gradient-to-r from-secondary to-accent text-white px-4 py-2 rounded-xl text-sm font-medium">
                    {t(selectedResidence.categoryKey)}
                  </div>

                  {/* Modal Image Navigation Buttons */}
                  {selectedResidence.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handlePrevModalImage()
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-lg text-white hover:bg-white/30 transition-opacity duration-300"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleNextModalImage()
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-lg text-white hover:bg-white/30 transition-opacity duration-300"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                  {/* Modal Image Indicators */}
                  {selectedResidence.images.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                      {selectedResidence.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setCurrentModalImageIndex(i)
                          }}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            i === currentModalImageIndex ? "bg-white" : "bg-white/50"
                          }`}
                          aria-label={t("residences.imageCounter", {
                            current: i + 1,
                            total: selectedResidence.images.length,
                          })}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-light text-primary mb-2">{t(selectedResidence.nameKey)}</h3>
                    <p className="text-secondary font-medium text-lg">{selectedResidence.details.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-light text-primary">{selectedResidence.details.size}</p>
                    <p className="text-platinum-600 text-sm">{t("residences.livingSpace")}</p>
                  </div>
                </div>
                <p className="text-platinum-700 mb-4 leading-relaxed">{t(selectedResidence.descriptionKey)}</p>
                {selectedResidence.details.amenitiesNoteKey && (
                  <p className="text-sm text-platinum-600 mb-8 italic">
                    {t(selectedResidence.details.amenitiesNoteKey)}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                  <div>
                    <h4 className="text-xl font-medium text-primary mb-4 flex items-center">
                      <Home className="w-5 h-5 mr-2 text-secondary" /> {t("residences.unitDetails")}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-platinum-100">
                        <span className="text-platinum-600">{t("residences.bedrooms")}</span>
                        <span className="font-medium">{selectedResidence.details.bedrooms}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-platinum-100">
                        <span className="text-platinum-600">{t("residences.livingAreas")}</span>
                        <span className="font-medium">{selectedResidence.details.livingRooms}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-platinum-100">
                        <span className="text-platinum-600">{t("residences.totalSpace")}</span>
                        <span className="font-medium">{selectedResidence.details.size}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-primary mb-4 flex items-center">
                      <Crown className="w-5 h-5 mr-2 text-secondary" /> {t("residences.keyFeaturesFinishes")}
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {selectedResidence.details.features.map((featureKey, i) => (
                        <li key={i} className="flex items-start">
                          <CheckSquare className="w-4 h-4 mr-2.5 text-secondary mt-[0.2rem] flex-shrink-0" />
                          <span className="text-platinum-700">{t(featureKey)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={closeDialog}
                    className="px-6 py-3 border border-platinum-200 rounded-xl text-primary hover:bg-platinum-50 transition-colors"
                  >
                    {t("residences.close")}
                  </button>
                  <button
                    onClick={() => {
                      closeDialog()
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-secondary to-accent text-white rounded-xl hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300 hover:scale-105"
                  >
                    {t("residences.schedulePrivateTour")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function ResidenceCard({ residence, index, isVisible, onClick, t }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === residence.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === 0 ? residence.images.length - 1 : prev - 1))
  }

  return (
    <div
      className={`group bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-platinum-300/20 transition-all duration-700 cursor-pointer transform border border-platinum-200 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden">
        <SafeImage
          src={residence.images[currentImageIndex] ?? "/placeholder.svg"}
          alt={`${t(residence.nameKey)} - Image ${currentImageIndex + 1}`}
          fill
          className="object-contain group-hover:scale-110 transition-transform duration-700"
          width={1920}
          height={1080}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {residence.images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage(e)
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} className="text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage(e)
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Next image"
            >
              <ChevronRight size={16} className="text-white" />
            </button>
          </>
        )}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {residence.images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation()
                setCurrentImageIndex(i)
              }}
              className={`w-2 h-2 rounded-full transition-colors ${i === currentImageIndex ? "bg-white" : "bg-white/50"}`}
              aria-label={t("residences.imageCounter", { current: i + 1, total: residence.images.length })}
            />
          ))}
        </div>
        <div className="absolute top-4 right-4 bg-gradient-to-r from-secondary to-accent text-white px-3 py-1 rounded-lg text-sm font-medium">
          {t("residences.from")} {residence.details.price.replace(/^From\s*/i, "")}
        </div>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium text-platinum-600">
          {t(residence.categoryKey)}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium text-primary mb-2 group-hover:text-secondary transition-colors">
          {t(residence.nameKey)}
        </h3>
        <p className="text-platinum-600 text-sm mb-3 leading-relaxed line-clamp-2">{t(residence.descriptionKey)}</p>
        <p className="text-secondary text-xs mb-3 font-medium line-clamp-1">{t(residence.featureKey)}</p>

        <div className="flex justify-between items-center text-xs text-platinum-500">
          <div>
            <span>
              {residence.details.bedrooms}{" "}
              {t(residence.details.bedrooms === 1 ? "residences.bedroom" : "residences.bedrooms")}
            </span>
            <span className="mx-1.5">•</span>
            <span>{residence.details.size}</span>
          </div>
          <div className="flex items-center text-secondary group-hover:translate-x-1 transition-transform">
            <span className="text-sm font-medium mr-1">{t("residences.explore")}</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  )
}
