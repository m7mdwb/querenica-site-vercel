"use client"

import { useLanguage } from "@/lib/i18n/context"
import { cn } from "@/lib/utils"
import { MapPin, PoundSterling, ChevronRight, CalendarDays, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"

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
  const { t } = useLanguage()
  const [activePhase, setActivePhase] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    if (window.innerWidth < 768 && phases.length > 0) {
      setActivePhase(0)
    }

    return () => window.removeEventListener("resize", checkMobile)
  }, [phases.length])

  const handlePhaseClick = (index: number) => {
    setActivePhase((prevActivePhase) => (prevActivePhase === index ? null : index))
  }

  const isTimelineActive = activePhase !== null

  return (
    <div className={cn("mb-10 rounded-lg bg-white p-6 shadow-sm overflow-hidden", className)}>
      {/* Desktop Layout */}
      <div className={cn("hidden md:flex md:items-start md:justify-between md:space-x-4")}>
        <div
          className={cn(
            "flex flex-col items-center justify-start text-center pt-1 transition-all duration-300 ease-in-out",
            isTimelineActive
              ? "flex-none w-[130px] min-w-[120px] opacity-80 scale-95"
              : "flex-none w-[180px] min-w-[160px] opacity-100 scale-100",
          )}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2c4051]/5 text-[#2c4051] mb-2">
            <MapPin className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-semibold tracking-wider text-[#666] mb-1 uppercase">
            {t("about.timeline.cityLabel")}
          </h3>
          <p className="text-lg font-medium text-[#2c4051]">{city}</p>
        </div>

        <div className={cn("pt-1 transition-all duration-300 ease-in-out flex-grow")}>
          <div className="flex items-center justify-center text-center mb-5 space-x-2">
            <CalendarDays className="h-5 w-5 text-[#2c4051]" />
            <h3 className="text-sm font-semibold tracking-wider text-[#666] uppercase">
              {t("about.timeline.projectTimelineLabel")}
            </h3>
          </div>
          <div className="flex justify-center items-start">
            {phases.map((phase, index) => (
              <div key={phase.id} className="flex items-start">
                <div
                  className={cn(
                    "px-4 py-3 rounded-lg transition-all duration-300 ease-in-out cursor-pointer min-w-[200px] flex flex-col text-left relative",
                    activePhase === index
                      ? "bg-[#2c4051] text-white ring-2 ring-[#c9a77c] shadow-xl scale-105 z-10"
                      : "bg-[#f8f8f8] text-[#2c4051] hover:bg-slate-200 scale-100",
                  )}
                  onClick={() => handlePhaseClick(index)}
                >
                  <div className="flex items-center mb-2">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mr-3 flex-shrink-0",
                        activePhase === index
                          ? "bg-[#c9a77c] text-white"
                          : "bg-white text-[#2c4051] border border-slate-300",
                      )}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{phase.name}</p>
                      <p className={cn("text-xs", activePhase === index ? "text-[#c9a77c]" : "text-slate-500")}>
                        {phase.date}
                      </p>
                    </div>
                  </div>
                  {activePhase === index && (
                    <div className="mt-2 pt-2 border-t border-white/20 space-y-1">
                      <p className="text-xs text-white/90 leading-relaxed">{phase.description}</p>
                      <p className="text-sm font-semibold text-[#c9a77c] mt-1">{phase.blocks}</p>
                    </div>
                  )}
                </div>
                {index < phases.length - 1 && (
                  <div className="self-center px-2">
                    <ChevronRight
                      className={cn(
                        "h-6 w-6 transition-colors duration-300",
                        (activePhase === index && activePhase !== null) || activePhase === index + 1
                          ? "text-[#c9a77c]"
                          : "text-slate-300",
                      )}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div
          className={cn(
            "flex flex-col items-center justify-start text-center pt-1 transition-all duration-300 ease-in-out",
            isTimelineActive
              ? "flex-none w-[130px] min-w-[120px] opacity-80 scale-95"
              : "flex-none w-[180px] min-w-[160px] opacity-100 scale-100",
          )}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2c4051]/5 text-[#2c4051] mb-2">
            <PoundSterling className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-semibold tracking-wider text-[#666] mb-1 uppercase">
            {t("about.timeline.startingPriceLabel")}
          </h3>
          <p className="text-lg font-medium text-[#2c4051]">{startingPrice}</p>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center space-y-6">
        <div className="flex flex-col items-center text-center w-full">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2c4051]/5 text-[#2c4051] mb-2">
            <MapPin className="h-5 w-5" />
          </div>
          <h3 className="text-xs font-medium tracking-wider text-[#666] uppercase">{t("about.timeline.cityLabel")}</h3>
          <p className="text-base font-light text-[#2c4051]">{city}</p>
        </div>

        <div className="w-full">
          <div className="flex items-center justify-center text-center mb-3 border-t border-slate-200 pt-4 space-x-2">
            <CalendarDays className="h-4 w-4 text-[#666]" />
            <h3 className="text-xs font-medium tracking-wider text-[#666] uppercase">
              {t("about.timeline.projectTimelineLabel")}
            </h3>
          </div>
          <div className="space-y-3">
            {phases.map((phase, index) => (
              <div
                key={phase.id}
                className={cn(
                  "rounded-lg p-4 transition-all duration-300 ease-in-out cursor-pointer text-left shadow-sm hover:shadow-md",
                  activePhase === index
                    ? "bg-[#2c4051] text-white ring-2 ring-[#c9a77c] scale-[1.02]"
                    : "bg-[#f8f8f8] text-[#2c4051]",
                )}
                onClick={() => handlePhaseClick(index)}
              >
                <div className="flex items-start">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0 mt-0.5",
                      activePhase === index
                        ? "bg-[#c9a77c] text-white"
                        : "bg-white text-[#2c4051] border border-slate-300",
                    )}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-baseline justify-between">
                      <p className="text-base font-semibold">{phase.name}</p>
                      {activePhase !== index && isMobile && (
                        <ChevronDown className="h-5 w-5 text-slate-400 transition-transform duration-300 group-hover:text-slate-500" />
                      )}
                    </div>
                    <p className={cn("text-xs mt-0.5", activePhase === index ? "text-[#c9a77c]" : "text-slate-500")}>
                      {phase.date}
                    </p>
                    <p className={cn("text-sm mt-1.5", activePhase === index ? "text-white/80" : "text-slate-600/90")}>
                      {phase.blocks}
                    </p>
                    {activePhase === index && (
                      <p
                        className={cn(
                          "text-sm mt-2.5 leading-relaxed border-t pt-2.5",
                          activePhase === index
                            ? "text-white/90 border-white/20"
                            : "text-slate-700/90 border-slate-200",
                        )}
                      >
                        {phase.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center text-center w-full border-t border-slate-200 pt-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2c4051]/5 text-[#2c4051] mb-2">
            <PoundSterling className="h-5 w-5" />
          </div>
          <h3 className="text-xs font-medium tracking-wider text-[#666] uppercase">
            {t("about.timeline.startingPriceLabel")}
          </h3>
          <p className="text-base font-light text-[#2c4051]">{startingPrice}</p>
        </div>
      </div>
    </div>
  )
}
