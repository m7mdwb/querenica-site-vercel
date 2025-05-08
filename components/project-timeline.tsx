"use client"

import { cn } from "@/lib/utils"
import { MapPin, PoundSterling } from "lucide-react"

interface TimelinePhase {
  id: number
  name: string
  date: string
  description: string
  blocks: string
}

interface ProjectTimelineProps {
  city: string
  startingPrice: string
  phases: TimelinePhase[]
  className?: string
}

export default function ProjectTimeline({ city, startingPrice, phases, className }: ProjectTimelineProps) {
  const DOT_SIZE = 10
  const PULSE_SIZE = 24
  const LINE_WIDTH = 1
  
  const DESKTOP_DOT_CONTAINER_HEIGHT = 25;
  const DESKTOP_PARENT_PADDING_TOP_PX = 2.5 * 16; 

  // Mobile: Define how much space the dot column will take in the "text beside line" layout
  const MOBILE_DOT_AREA_WIDTH_PX = PULSE_SIZE; // Use pulse size for width allocation
  const MOBILE_TEXT_LEFT_MARGIN_PX = MOBILE_DOT_AREA_WIDTH_PX + 16; // Dot area width + 1rem gap (16px)

  return (
    <div className={cn("mb-16 rounded-lg bg-white p-6 shadow-sm", className)}>
      <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:items-stretch">
        {/* City Info */}
        <div className="flex flex-col items-center justify-center md:items-center md:w-1/5 md:border-r md:border-[#f0f0f0] md:pr-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2c4051]/5 text-[#2c4051] mb-3">
            <MapPin className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-medium tracking-wider text-[#666] text-center mb-1">CITY</h3>
          <p className="text-xl font-light text-[#2c4051] text-center">{city}</p>
        </div>

        {/* Timeline - Center */}
        <div className="flex-grow md:w-3/5 md:px-8">
          {/* Desktop Timeline - Verified as Perfect */}
          <div className="relative hidden md:block pt-10 pb-6">
            <div
              className="absolute bg-[#f0f0f0] z-0"
              style={{
                left: 0,
                right: 0,
                top: `${DESKTOP_PARENT_PADDING_TOP_PX + (DESKTOP_DOT_CONTAINER_HEIGHT / 2) - (LINE_WIDTH / 2)}px`,
                height: `${LINE_WIDTH}px`,
              }}
            ></div>
            <div className="flex justify-between">
              {phases.map((phase, index) => (
                <div
                  key={phase.id}
                  className={cn(
                    "relative flex flex-1 flex-col px-2",
                    index === 0 ? "items-start text-left" : "",
                    index === phases.length - 1 ? "items-end text-right" : "items-center text-center",
                  )}
                >
                  <div className={`relative h-[${DESKTOP_DOT_CONTAINER_HEIGHT}px]`}>
                    <div
                      className="absolute z-10 rounded-full bg-[#c9a77c]" // Solid golden dot
                      style={{
                        width: `${DOT_SIZE}px`,
                        height: `${DOT_SIZE}px`,
                        top: "50%",
                        left: index === 0 ? 0 : index === phases.length - 1 ? "auto" : "50%",
                        right: index === phases.length - 1 ? 0 : "auto",
                        transform:
                          index === 0
                            ? "translateY(-50%)"
                            : index === phases.length - 1
                              ? "translateY(-50%)"
                              : "translate(-50%, -50%)",
                      }}
                    >
                      {/* Pulsing effect centered on the golden dot */}
                      <div
                        className="absolute rounded-full bg-[#c9a77c]/20 animate-pulse"
                        style={{
                          width: `${PULSE_SIZE}px`,
                          height: `${PULSE_SIZE}px`,
                          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-4 w-full">
                    <h4 className="text-base font-medium text-[#2c4051]">{phase.name}</h4>
                    <p className="mt-1 text-sm font-light text-[#c9a77c]">{phase.date}</p>
                    <p className="mt-2 text-sm font-light text-[#666] opacity-80">{phase.description}</p>
                    <p className="mt-1 text-xs font-medium text-[#2c4051] opacity-90">{phase.blocks}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

           {/* Mobile Timeline (vertical) - Text beside the line layout */}
          <div className="md:hidden">
            {/* Outer container for padding and line context */}
            <div className="relative pl-8 pr-4"> {/* Adjusted padding: More space on left for dots/line */}
              {/* Vertical connecting line - Positioned relative to this container */}
              <div
                className="absolute bg-[#f0f0f0] z-0"
                style={{
                  left: `44px`, // Center of the allocated dot area width
                  width: `${LINE_WIDTH}px`,
                  transform: "translateX(-50%)",
                  // Line starts from the center of the first pulse assembly
                  top: `${PULSE_SIZE / 2}px`, // Starts half pulse size down from top edge of list
                  // Line ends using your empirically determined bottom value
                  bottom: `calc(5rem + ${PULSE_SIZE / 2}px)`, 
                }}
              ></div>

              {/* Phase items container */}
              <div className="w-full space-y-10"> {/* Adjust space-y for vertical gap between phases */}
                {phases.map((phase, index) => (
                  <div key={phase.id} className="relative flex flex-row items-start"> {/* Use flex-row */}
                    
                    {/* Dot and Pulse Column (Fixed Width) */}
                    <div 
                      className={`relative flex-shrink-0 w-[${MOBILE_DOT_AREA_WIDTH_PX}px] h-[${PULSE_SIZE}px] z-10 flex items-center justify-center`}
                      // Height is PULSE_SIZE to vertically center the assembly within this allocated space
                    >
                      {/* Container to center dot and pulse */}
                      <div className={`relative w-[${PULSE_SIZE}px] h-[${PULSE_SIZE}px]`}>
                          {/* Solid Golden Dot - STATIC, centered */}
                          <div
                              className="absolute bg-[#c9a77c] rounded-full"
                              style={{
                                  width: `${DOT_SIZE}px`, height: `${DOT_SIZE}px`,
                                  top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2,
                              }}
                          ></div>
                          {/* Pulsing Circle - pulses, centered, behind solid dot */}
                          <div
                              className="absolute rounded-full bg-[#c9a77c]/20 animate-pulse"
                              style={{
                                  width: `${PULSE_SIZE}px`, height: `${PULSE_SIZE}px`,
                                  top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1,
                              }}
                          ></div>
                      </div>
                    </div>
                    
                    {/* Content Column (Takes remaining space) */}
                    <div className="flex-grow pl-4 text-left"> {/* Gap from dot area, text aligned left */}
                      {/* Adjust paddingTop to visually align text with dot center */}
                      {/* Try aligning top of text slightly above dot center */}
                      <div style={{ paddingTop: `${(PULSE_SIZE / 2) - 8}px` }}> {/* e.g., center (12px) - approx half font height (8px) */}
                        <h4 className="text-base font-medium text-[#2c4051]">{phase.name}</h4>
                        <p className="mt-1 text-sm font-light text-[#c9a77c]">{phase.date}</p>
                        <p className="mt-2 text-sm font-light text-[#666] opacity-80">{phase.description}</p>
                        <p className="mt-1 text-xs font-medium text-[#2c4051] opacity-90">{phase.blocks}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Starting Price */}
        <div className="flex flex-col items-center justify-center md:items-center md:w-1/5 md:border-l md:border-[#f0f0f0] md:pl-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2c4051]/5 text-[#2c4051] mb-3">
            <PoundSterling className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-medium tracking-wider text-[#666] text-center mb-1">STARTING PRICE</h3>
          <p className="text-xl font-light text-[#2c4051] text-center">{startingPrice}</p>
        </div>
      </div>
    </div>
  )
}
