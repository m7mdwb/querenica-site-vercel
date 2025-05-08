import { cn } from "@/lib/utils"

// Define a type for project phases
export interface ProjectPhase {
  id: number
  name: string
  completionDate: string
  description?: string
}

interface ElegantTimelineProps {
  phases: ProjectPhase[]
  className?: string
}

export default function ElegantTimeline({ phases, className }: ElegantTimelineProps) {
  return (
    <div className={cn("overflow-hidden rounded-lg bg-white p-6 shadow-sm", className)}>
      <h3 className="mb-6 text-xl font-light text-[#2c4051]">Development Timeline</h3>

      {/* Mobile Timeline (vertical) */}
      <div className="md:hidden space-y-6">
        {phases.map((phase) => (
          <div key={phase.id} className="flex items-start">
            <div className="relative mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center">
              <div className="absolute h-full w-[1px] bg-[#f0f0f0]"></div>
              <div className="relative z-10 h-[10px] w-[10px] rounded-full bg-[#c9a77c]">
                <div className="absolute -left-[5px] -top-[5px] h-[20px] w-[20px] animate-pulse rounded-full bg-[#c9a77c]/20"></div>
              </div>
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <h4 className="text-sm font-medium text-[#2c4051]">{phase.name}</h4>
                <span className="ml-4 text-xs font-light text-[#c9a77c]">{phase.completionDate}</span>
              </div>
              {phase.description && (
                <p className="mt-1 text-xs font-light text-[#666] opacity-80">{phase.description}</p>
              )}
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
              <div className="relative z-10 mb-4 h-[10px] w-[10px] rounded-full bg-[#c9a77c]">
                <div className="absolute -left-[5px] -top-[5px] h-[20px] w-[20px] animate-pulse rounded-full bg-[#c9a77c]/20"></div>
              </div>

              {/* Phase content */}
              <div className="mt-2 w-full">
                <h4 className="text-sm font-medium text-[#2c4051]">{phase.name}</h4>
                <p className="mt-1 text-xs font-light text-[#c9a77c]">{phase.completionDate}</p>
                {phase.description && (
                  <p className="mt-2 text-xs font-light text-[#666] opacity-80">{phase.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
