"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowRight, Home, Building2, Crown, CheckSquare } from "lucide-react"

interface ResidencesSectionProps {
  dict: Record<string, string>
  locale: string
}

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

  return <Image {...rest} src={imgSrc || "/placeholder.svg"} alt={alt} onError={() => setImgSrc("/placeholder.svg")} />
}

export default function ResidencesSection({ dict }: ResidencesSectionProps) {
  const [activeTab, setActiveTab] = useState("blockA")
  const [isVisible, setIsVisible] = useState(false)
  const [selectedResidence, setSelectedResidence] = useState<any>(null)
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

  const residenceTypes = {
    blockA: [
      {
        id: "a-studio",
        nameKey: "residences.propertyTypes.aStudio.displayName",
        descriptionKey: "residences.propertyTypes.aStudio.description",
        featureKey: "residences.propertyTypes.aStudio.feature",
        images: [
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%20Studio/aStudio1.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%20Studio/aStudio2.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%20Studio/aStudio3.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%20Studio/aStudio4.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%20Studio/aStudio5.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%20Studio/aStudio6.webp",
        ],
        categoryKey: "residences.categoryContemporary",
        details: {
          size: "45-50 m²",
          bedrooms: 1,
          livingRooms: 0,
          price: dict["residences.prices.aStudio"],
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
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%201%2B1/a1%2B1-1.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%201%2B1/a1%2B1-3.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%201%2B1/a1%2B1-4.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%201%2B1/a1%2B1-5.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%201%2B1/a1%2B1-6.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%201%2B1/a1%2B1-7.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%201%2B1/a1%2B1-8.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%201%2B1/a1%2B1-9.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%201%2B1/a1%2B1-10.webp",
        ],
        categoryKey: "residences.categoryRefined",
        details: {
          size: "80 m²",
          bedrooms: 1,
          livingRooms: 1,
          price: dict["residences.prices.a1Plus1"],
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
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%202%2B1/a2%2B1-1.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%202%2B1/a2%2B1-2.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%202%2B1/a2%2B1-3.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%202%2B1/a2%2B1-4.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%202%2B1/a2%2B1-5.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%202%2B1/a2%2B1-6.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%202%2B1/a2%2B1-7.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%202%2B1/a2%2B1-8.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%202%2B1/a2%2B1-9.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/A%202%2B1/a2%2B1-10.webp",
        ],
        categoryKey: "residences.categoryFamily",
        details: {
          size: "140 m²",
          bedrooms: 2,
          livingRooms: 1,
          price: dict["residences.prices.a2Plus1"],
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
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%20Studio/bcdStudio.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%20Studio/bcdStudio2.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%20Studio/bcdStudio3.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%20Studio/bcdStudio4.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%20Studio/bcdStudio5.webp",
        ],
        categoryKey: "residences.categoryUrban",
        details: {
          size: "45-50 m²",
          bedrooms: 1,
          livingRooms: 0,
          price: dict["residences.prices.bcdStudio"],
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
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%201%2B1/bcd1%2B1-1.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%201%2B1/bcd1%2B1-2.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%201%2B1/bcd1%2B1-3.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%201%2B1/bcd1%2B1-4.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%201%2B1/bcd1%2B1-5.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%201%2B1/bcd1%2B1-6.webp",
        ],
        categoryKey: "residences.categoryExecutive",
        details: {
          size: "80 m²",
          bedrooms: 1,
          livingRooms: 1,
          price: dict["residences.prices.bcd1Plus1"],
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
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%202%2B1/bcd2%2B1-1.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%202%2B1/bcd2%2B1-2.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%202%2B1/bcd2%2B1-3.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%202%2B1/bcd2%2B1-4.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%202%2B1/bcd2%2B1-5.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%202%2B1/bcd2%2B1-6.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%202%2B1/bcd2%2B1-7.webp",
        ],
        categoryKey: "residences.categoryFamily",
        details: {
          size: "110-170 m²",
          bedrooms: 2,
          livingRooms: 1,
          price: dict["residences.prices.bcd2Plus1"],
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
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%203%2B1/bds3%2B1-1.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%203%2B1/bds3%2B1-2.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%203%2B1/bds3%2B1-3.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%203%2B1/bds3%2B1-4.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%203%2B1/bds3%2B1-5.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%203%2B1/bds3%2B1-6.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%203%2B1/bds3%2B1-7.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%203%2B1/bds3%2B1-8.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%203%2B1/bds3%2B1-9.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%203%2B1/bds3%2B1-10.webp",
        ],
        categoryKey: "residences.categoryFamily",
        details: {
          size: "155-165 m²",
          bedrooms: 3,
          livingRooms: 1,
          price: dict["residences.prices.bcd3Plus1"],
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
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%20Penthouse%205%2B1/bcdPenthouse5%2B1-1.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%20Penthouse%205%2B1/bcdPenthouse5%2B1-2.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%20Penthouse%205%2B1/bcdPenthouse5%2B1-3.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%20Penthouse%205%2B1/bcdPenthouse5%2B1-4.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%20Penthouse%205%2B1/bcdPenthouse5%2B1-5.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%20Penthouse%205%2B1/bcdPenthouse5%2B1-6.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%20Penthouse%205%2B1/bcdPenthouse5%2B1-7.webp",
        ],
        categoryKey: "residences.categoryUltimate",
        details: {
          size: "270-500 m²",
          bedrooms: 5,
          livingRooms: 1,
          price: dict["residences.prices.bcdPenthouse"],
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
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%20Duplex%205%2B1/bcdDuplex5%2B1-1.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%20Duplex%205%2B1/bcdDuplex5%2B1-2.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%20Duplex%205%2B1/bcdDuplex5%2B1-3.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%20Duplex%205%2B1/bcdDuplex5%2B1-4.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%20Duplex%205%2B1/bcdDuplex5%2B1-5.webp",
          "https://6phzkhoic4bnat0e.public.blob.vercel-storage.com/BCD%20Duplex%205%2B1/bcdDuplex5%2B1-6.webp",
        ],
        categoryKey: "residences.categoryUltimate",
        details: {
          size: "265-475 m²",
          bedrooms: 5,
          livingRooms: 1,
          price: dict["residences.prices.bcdDuplex"],
          amenitiesNoteKey: "residences.amenitiesNote",
          features: [
            "residences.features.sweepingSeaViews",
            "residences.features.twoFloors",
            "residences.features.privateTerrace",
            "residences.features.premiumFinishes",
          ],
        },
      },
    ],
  }

  const openResidenceDialog = (residence: any) => {
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
        <div className="text-center mb-20">
          <span className="text-secondary text-sm uppercase tracking-[0.4em] font-light mb-4 block">
            {dict["residences.luxuryResidences"]}
          </span>
          <h2 className="text-5xl md:text-6xl font-light text-primary mb-6 tracking-tight">
            {dict["residences.premiumLiving"]}
            <span className="block font-serif italic text-secondary" style={{ fontFamily: "var(--font-bodoni)" }}>
              {dict["residences.spaces"]}
            </span>
          </h2>
          <p className="text-lg text-platinum-600 max-w-3xl mx-auto leading-relaxed">{dict["residences.introText"]}</p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-secondary to-accent mx-auto mt-8"></div>
        </div>

        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-white/90 backdrop-blur-sm rounded-xl p-2 border border-platinum-200 shadow-lg">
            {[
              { key: "blockA", label: dict["residences.blockATab"], icon: <Home className="w-4 h-4 mr-2" /> },
              {
                key: "blocksBCD",
                label: dict["residences.blocksBCDApartments"],
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(residenceTypes[activeTab as keyof typeof residenceTypes] || []).map((residence, index) => (
            <ResidenceCard
              key={residence.id}
              residence={residence}
              index={index}
              isVisible={isVisible}
              onClick={() => openResidenceDialog(residence)}
              dict={dict}
            />
          ))}
        </div>

        {dialogOpen && selectedResidence && (
          <div
            className="fixed inset-0 bg-primary/90 backdrop-blur-md z-[9999] flex items-center justify-center pt-24 pb-4 overflow-y-auto"
            onClick={closeDialog}
          >
            <div
              className="bg-white rounded-2xl max-w-4xl w-[95%] border border-platinum-200 shadow-2xl max-h-[80vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <SafeImage
                  src={selectedResidence.images[currentModalImageIndex] ?? "/placeholder.svg"}
                  alt={`${dict[selectedResidence.nameKey]} - Image ${currentModalImageIndex + 1}`}
                  fill
                  className="object-contain rounded-t-2xl"
                  sizes="100vw"
                />
                <button
                  onClick={closeDialog}
                  className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-3 text-primary hover:text-secondary"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute top-6 left-6 bg-gradient-to-r from-secondary to-accent text-white px-4 py-2 rounded-xl text-sm font-medium">
                  {dict[selectedResidence.categoryKey]}
                </div>

                {selectedResidence.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevModalImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-lg text-white hover:bg-white/30"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNextModalImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-lg text-white hover:bg-white/30"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-light text-primary mb-2">{dict[selectedResidence.nameKey]}</h3>
                    <p className="text-secondary font-medium text-lg">{selectedResidence.details.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-light text-primary">{selectedResidence.details.size}</p>
                    <p className="text-platinum-600 text-sm">{dict["residences.livingSpace"]}</p>
                  </div>
                </div>
                <p className="text-platinum-700 mb-4 leading-relaxed">{dict[selectedResidence.descriptionKey]}</p>
                {selectedResidence.details.amenitiesNoteKey && (
                  <p className="text-sm text-platinum-600 mb-8 italic">
                    {dict[selectedResidence.details.amenitiesNoteKey]}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                  <div>
                    <h4 className="text-xl font-medium text-primary mb-4 flex items-center">
                      <Home className="w-5 h-5 mr-2 text-secondary" /> {dict["residences.unitDetails"]}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-platinum-100">
                        <span className="text-platinum-600">{dict["residences.bedrooms"]}</span>
                        <span className="font-medium">{selectedResidence.details.bedrooms}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-platinum-100">
                        <span className="text-platinum-600">{dict["residences.livingAreas"]}</span>
                        <span className="font-medium">{selectedResidence.details.livingRooms}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-platinum-100">
                        <span className="text-platinum-600">{dict["residences.totalSpace"]}</span>
                        <span className="font-medium">{selectedResidence.details.size}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-primary mb-4 flex items-center">
                      <Crown className="w-5 h-5 mr-2 text-secondary" /> {dict["residences.keyFeaturesFinishes"]}
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {selectedResidence.details.features.map((featureKey: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <CheckSquare className="w-4 h-4 mr-2.5 text-secondary mt-[0.2rem] flex-shrink-0" />
                          <span className="text-platinum-700">{dict[featureKey]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={closeDialog}
                    className="px-6 py-3 border border-platinum-200 rounded-xl text-primary hover:bg-platinum-50"
                  >
                    {dict["residences.close"]}
                  </button>
                  <button
                    onClick={() => {
                      closeDialog()
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-secondary to-accent text-white rounded-xl hover:shadow-lg"
                  >
                    {dict["residences.schedulePrivateTour"]}
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

function ResidenceCard({ residence, index, isVisible, onClick, dict }: any) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <div
      className={`group bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transform border border-platinum-200 transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden">
        <SafeImage
          src={residence.images[currentImageIndex] ?? "/placeholder.svg"}
          alt={`${dict[residence.nameKey]} - Image ${currentImageIndex + 1}`}
          fill
          className="object-contain group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4 bg-gradient-to-r from-secondary to-accent text-white px-3 py-1 rounded-lg text-sm font-medium">
          {dict["residences.from"]} {residence.details.price?.replace(/^From\s*/i, "")}
        </div>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium text-platinum-600">
          {dict[residence.categoryKey]}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium text-primary mb-2 group-hover:text-secondary transition-colors">
          {dict[residence.nameKey]}
        </h3>
        <p className="text-platinum-600 text-sm mb-3 leading-relaxed line-clamp-2">{dict[residence.descriptionKey]}</p>
        <p className="text-secondary text-xs mb-3 font-medium line-clamp-1">{dict[residence.featureKey]}</p>

        <div className="flex justify-between items-center text-xs text-platinum-500">
          <div>
            <span>
              {residence.details.bedrooms}{" "}
              {dict[residence.details.bedrooms === 1 ? "residences.bedroom" : "residences.bedrooms"]}
            </span>
            <span className="mx-1.5">•</span>
            <span>{residence.details.size}</span>
          </div>
          <div className="flex items-center text-secondary group-hover:translate-x-1 transition-transform">
            <span className="text-sm font-medium mr-1">{dict["residences.explore"]}</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  )
}
