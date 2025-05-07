"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
// Removed Button and Play imports as they are no longer used in the iframe version
// import { Button } from "@/components/ui/button"
// import { Play } from 'lucide-react'

export default function VirtualTourSection() {
  const { ref, inView } = useInView({
    threshold: 0.3, // Keep the threshold for the section animation
    triggerOnce: true,
  })

  // Define the Google Site URL
  const virtualTourUrl = "https://360.dovecconstruction.com/querencia/"

  return (
    // The ref is now on the main section for the fade-in effect
    <section ref={ref} className="bg-[#2c4051] py-24 text-white md:py-32">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-3xl font-light tracking-wider sm:text-4xl md:text-5xl">
          Immerse Yourself
        </h2>

        {/* Animation container */}
        <div
          className={cn(
            "mx-auto max-w-5xl transition-all duration-1000",
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          {/* Container maintaining the aspect ratio and styling */}
          <div className="relative aspect-video overflow-hidden rounded-lg bg-[#3a526a]">
            {/* --- Removed Placeholder Content --- */}

            {/* --- Added iframe --- */}
            <iframe
              src={virtualTourUrl} // Use the variable for the URL
              title="Querencia 360 Virtual Tour" // Accessible title for the iframe
              className="absolute inset-0 h-full w-full" // Make iframe fill the container
              frameBorder="0" // Removes the default border
              allowFullScreen // Allows the user to make the iframe fullscreen
              // Optional: You might need sandbox attributes depending on Google Sites' embedding policies
              // and required interactions, but start without them.
              // sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            >
              {/* Fallback content for browsers that don't support iframes */}
              Your browser does not support iframes. You can view the tour{" "}
              <a href={virtualTourUrl} target="_blank" rel="noopener noreferrer">
                here
              </a>
              .
            </iframe>
          </div>

          {/* Keep the descriptive text below the tour */}
          <div className="mt-8 text-center">
            <p className="text-[#8a9bae]">
              Experience Querencia from every angle with our immersive virtual tour.
              <br />
              Explore the residences, amenities, and breathtaking views from the comfort of your device.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
