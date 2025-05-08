import { cn } from "@/lib/utils"
import { MapPin, PoundSterling } from "lucide-react"

// Define a type for project phases
export interface ProjectPhase {
  id: number
  name: string
  completionDate: string
  description: string
  blocks: string
}

interface ProjectDetailsShowcaseProps {
  city: string
  startingPrice: string
  phases: ProjectPhase[]
  className?: string
}

export default function ProjectDetailsShowcase({
  city,
  startingPrice,
  phases,
  className,
}: ProjectDetailsShowcaseProps) {
  return (
    <div className={cn("rounded-lg bg-white p-6 shadow-sm project-details-card", className)}>
      <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:items-stretch">
        {/* City Information - Left Box */}
        <div className="flex flex-col items-center justify-center md:items-center md:w-1/5 md:border-r md:border-[#f0f0f0] md:pr-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2c4051]/5 text-[#2c4051] mb-3">
            <MapPin className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-medium tracking-wider text-[#666] text-center mb-1">CITY</h3>
          <p className="text-xl font-light text-[#2c4051] text-center">{city}</p>
        </div>

        {/* Timeline - Center */}
        <div className="flex-grow md:w-3/5 md:px-8 timeline-section">
          {/* Mobile Timeline (vertical) */}
          <div className="md:hidden space-y-6">
            {phases.map((phase) => (
              <div key={phase.id} className="flex items-start">
                <div className="relative mr-4 flex h-full w-6 flex-shrink-0 items-start justify-center">
                  <div className="absolute top-4 bottom-0 left-1/2 w-[1px] bg-[#f0f0f0] transform -translate-x-1/2"></div>
                  <div className="relative z-10 h-[10px] w-[10px] rounded-full bg-[#c9a77c] mt-2 timeline-dot"></div>
                </div>
                <div className="pb-4">
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-base font-medium text-[#2c4051]">{phase.name}</h4>
                    <span className="ml-4 text-sm font-light text-[#c9a77c]">{phase.completionDate}</span>
                  </div>
                  <p className="mt-1 text-sm font-light text-[#666] opacity-80">{phase.description}</p>
                  <p className="mt-1 text-xs font-medium text-[#2c4051] opacity-90">{phase.blocks}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Timeline (horizontal) */}
          <div className="relative hidden md:block">
            {/* Horizontal timeline line */}
            <div className="absolute left-0 right-0 top-[45px] h-[1px] bg-[#f0f0f0]"></div>

            <div className="flex justify-between">
              {phases.map((phase, index) => (
                <div
                  key={phase.id}
                  className={cn(
                    "relative flex flex-1 flex-col items-center px-2 text-center",
                    index === 0 ? "items-start text-left" : "",
                    index === phases.length - 1 ? "items-end text-right" : "",
                  )}
                >
                  {/* Phase dot with pulse animation */}
                  <div className="relative z-10 mb-4 h-[10px] w-[10px] rounded-full bg-[#c9a77c] timeline-dot"></div>

                  {/* Phase content */}
                  <div className="mt-4 w-full">
                    <h4 className="text-base font-medium text-[#2c4051]">{phase.name}</h4>
                    <p className="mt-1 text-sm font-light text-[#c9a77c]">{phase.completionDate}</p>
                    <p className="mt-2 text-sm font-light text-[#666] opacity-80">{phase.description}</p>
                    <p className="mt-1 text-xs font-medium text-[#2c4051] opacity-90">{phase.blocks}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Starting Price - Right Box */}
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
