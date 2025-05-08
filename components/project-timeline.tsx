"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Clock, ChevronDown, ChevronUp } from "lucide-react"

// Define a type for project phases
export interface ProjectPhase {
  id: number
  name: string
  completionDate: string
  description?: string
}

interface ProjectTimelineProps {
  phases: ProjectPhase[]
  className?: string
}

export default function ProjectTimeline({ phases, className }: ProjectTimelineProps) {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null)

  const togglePhase = (phaseId: number) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId)
  }

  return (
    <div className={cn("rounded-lg bg-white p-5 shadow-md", className)}>
      <div className="mb-4 flex items-center">
        <Clock className="mr-3 h-5 w-5 text-[#c9a77c]" />
        <h3 className="text-lg font-medium text-[#2c4051]">Project Timeline</h3>
      </div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[15px] top-0 h-full w-[2px] bg-[#f0f0f0]"></div>

        {/* Timeline phases */}
        <div className="space-y-4">
          {phases.map((phase) => (
            <div key={phase.id} className="relative pl-10">
              {/* Phase dot */}
              <div className="absolute left-0 top-1 z-10 h-8 w-8 rounded-full border-4 border-white bg-[#c9a77c] shadow-md"></div>

              {/* Phase content */}
              <div
                className={cn(
                  "cursor-pointer rounded-lg border border-[#f0f0f0] bg-white p-3 transition-all duration-300",
                  expandedPhase === phase.id ? "shadow-md" : "hover:shadow-sm",
                )}
                onClick={() => togglePhase(phase.id)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-[#2c4051]">{phase.name}</h4>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm text-[#666]">{phase.completionDate}</span>
                    {expandedPhase === phase.id ? (
                      <ChevronUp className="h-4 w-4 text-[#666]" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-[#666]" />
                    )}
                  </div>
                </div>

                {/* Expandable description */}
                {expandedPhase === phase.id && phase.description && (
                  <div className="mt-2 text-sm text-[#666]">{phase.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
