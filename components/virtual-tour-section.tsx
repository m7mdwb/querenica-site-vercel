"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export default function VirtualTourSection() {
  const [isOpen, setIsOpen] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Reset iframe src when dialog closes to stop video playback
  useEffect(() => {
    if (!isOpen && iframeRef.current && hasInteracted) {
      const currentSrc = iframeRef.current.src
      iframeRef.current.src = ""
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentSrc
          setIsLoading(true)
        }
      }, 300)
    }
  }, [isOpen, hasInteracted])

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  return (
    <section id="virtual-tour" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-[#2c4051] mb-4">Virtual Tour</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Experience Querencia from the comfort of your home. Explore our residences and amenities through our
            immersive virtual tour.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Dialog
            open={isOpen}
            onOpenChange={(open) => {
              setIsOpen(open)
              if (open) setHasInteracted(true)
            }}
          >
            {/* Fix: Ensure DialogTrigger has exactly one child element by wrapping content in a button */}
            <DialogTrigger asChild>
              <button className="w-full p-0 m-0 bg-transparent border-0 cursor-pointer">
                <div className="relative aspect-video bg-gray-100 overflow-hidden rounded-lg shadow-lg group">
                  <img
                    src="https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Virtual%20Tour/querencia-virtual-tour-thumbnail-Rl9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd.webp"
                    alt="Virtual Tour Thumbnail"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 group-hover:bg-opacity-20">
                    <div className="w-20 h-20 rounded-full bg-[#c9a77c] bg-opacity-90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-10 h-10"
                        style={{ marginLeft: "4px" }}
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                    <h3 className="text-xl font-medium">Explore Querencia</h3>
                    <p className="text-sm opacity-90">Click to start virtual tour</p>
                  </div>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] p-0 bg-black overflow-hidden">
              <div className="relative w-full aspect-video">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="w-12 h-12 border-4 border-[#c9a77c] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <iframe
                  ref={iframeRef}
                  src="https://my.matterport.com/show/?m=UZ3rJV2ynga"
                  width="100%"
                  height="100%"
                  allow="xr-spatial-tracking"
                  allowFullScreen
                  className={cn("border-0 transition-opacity duration-500", isLoading ? "opacity-0" : "opacity-100")}
                  onLoad={handleIframeLoad}
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">For the best experience, view on a desktop device or tablet.</p>
        </div>
      </div>
    </section>
  )
}
