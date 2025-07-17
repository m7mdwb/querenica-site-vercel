import Image from "next/image"
import { Download } from "lucide-react"
import Navbar from "@/components/navbar"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-primary pt-20" id="about">
      <Navbar />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl text-center mb-16 text-primary">Discover Courtyard Platinum</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center glass-card p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full glass-gold flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-primary">DEVELOPER</h3>
              <p className="text-xl text-primary">DÖVEC CONSTRUCTION</p>
            </div>

            <div className="text-center glass-card p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full glass-gold flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-primary">PROJECT TIMELINE</h3>
              <div className="flex justify-center space-x-4 mt-4">
                <div className="text-center glass p-4 w-32">
                  <div className="text-secondary font-semibold mb-1">Phase 1</div>
                  <div className="text-sm text-primary">April 2026</div>
                </div>
                <div className="text-center glass p-4 w-32">
                  <div className="text-secondary font-semibold mb-1">Phase 2</div>
                  <div className="text-sm text-primary">December 2026</div>
                </div>
                <div className="text-center glass p-4 w-32">
                  <div className="text-secondary font-semibold mb-1">Phase 3</div>
                  <div className="text-sm text-primary">June 2027</div>
                </div>
              </div>
            </div>

            <div className="text-center glass-card p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full glass-gold flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M12 2v20"></path>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-primary">STARTING PRICE</h3>
              <p className="text-xl text-primary">$ 450,000</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="glass-card p-8 rounded-lg">
              <p className="text-lg mb-6 leading-relaxed text-primary">
                Courtyard Platinum by DÖVEC CONSTRUCTION represents the pinnacle of luxury living, where architectural
                brilliance meets uncompromising quality. Nestled in one of the most coveted locations, this exclusive
                development offers a sanctuary for those who demand excellence.
              </p>
              <p className="text-lg mb-6 leading-relaxed text-primary">
                Each residence is meticulously crafted with premium materials and finishes, creating living spaces that
                are both timeless and contemporary. From elegant 60x120cm ceramic tiles to 10mm parquet flooring in
                bedrooms, every detail has been carefully considered.
              </p>
              <p className="text-lg mb-6 leading-relaxed text-primary">
                Premium fixtures from renowned brands like Hansgrohe and Bocci Milano ensure both functionality and
                aesthetic appeal. Modern comforts include underfloor heating in wet areas, comfort double glazing, and
                anthracite aluminum windows.
              </p>
              <p className="text-lg mb-8 leading-relaxed text-primary">
                Courtyard Platinum isn't merely a residence—it's a statement of discernment and achievement, offering a
                lifestyle that few will experience but many will aspire to.
              </p>

              <button className="flex items-center glass-gold hover:bg-secondary text-white px-6 py-3 rounded transition-colors">
                <Download size={18} className="mr-2" />
                Download Technical Specifications
              </button>
            </div>

            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
              <Image src="/pool-sunset.jpeg" alt="Courtyard Platinum at night" fill className="object-cover" />
            </div>
          </div>

          {/* Technical Specifications Section */}
          <div className="mt-20">
            <h3 className="text-3xl text-center mb-12 text-primary">Technical Specifications</h3>

            <div className="glass-card p-8 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-secondary">General Features</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>Flooring: 60x120cm ceramic tiles in living areas, 10mm parquet flooring in bedrooms</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>Bathroom: Walk-in shower with Hansgrohe fixtures, Bocci Milano shelf-type sinks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>Kitchen: "Belenco" Angel White countertop and backsplash, Hansgrohe faucets</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>Windows: Anthracite aluminum windows with comfort double glazing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>Doors: American panel doors with premium hardware</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-4 text-secondary">Apartment Types</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>Studio, 1+1, 1+1 Duplex, 2+1 Duplex, 3+1, and 3+1 Duplex options available</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>Duplex apartments feature elegant wooden stairs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>3+1 Duplex includes multi-system air conditioning infrastructure</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>All apartments include underfloor heating in wet areas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>Sliding and partially mirrored wardrobe doors in all units</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
