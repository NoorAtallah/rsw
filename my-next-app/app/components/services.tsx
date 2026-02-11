'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Wrench, Handshake, Leaf, ArrowUpRight } from 'lucide-react'

export default function RSWInvestmentsSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [activeInvestment, setActiveInvestment] = useState<number | null>(null)

  const purple = '#432c96'
  const white = '#ffffff'
  const lightPurple = '#f5f3fb'

  const approaches = [
    {
      id: 1,
      icon: Shield,
      title: 'Risk & Capital Protection',
      description: 'We place central importance on risk management in all our investment decisions, through portfolio diversification, continuous evaluation, and adherence to clear operational frameworks aimed at protecting capital.',
    },
    {
      id: 2,
      icon: Wrench,
      title: 'Operational Expertise',
      description: "RSW's role is not limited to financing; it extends to strategic oversight and operational support, enhancing asset efficiency and increasing their long-term value.",
    },
    {
      id: 3,
      icon: Handshake,
      title: 'Strategic Partnerships',
      description: 'We work with local and international partners who possess specialized expertise, enabling more efficient project execution and the achievement of sustainable results.',
    },
    {
      id: 4,
      icon: Leaf,
      title: 'Sustainable Investment',
      description: 'We integrate principles of sustainability and responsibility into our investment decisions, taking into account long-term economic and social impact and strengthening business continuity.',
    },
  ]

  const investments = [
    {
      id: 1,
      title: 'Real Estate',
      description: 'We invest in well-studied real estate projects in strategic locations, focusing on operational value and long-term sustainability.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
    },
    {
      id: 2,
      title: 'Infrastructure & Construction',
      description: 'We participate in infrastructure and construction projects with clear economic viability, supported by operational and managerial expertise.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    },
    {
      id: 3,
      title: 'Technology & Innovation',
      description: 'We direct capital toward technology projects with high growth potential, focusing on scalable solutions and digital transformation.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
    },
  ]

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden" style={{ background: white }}>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        
        .investment-card-hover {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .investment-card-hover:hover {
          transform: translateY(-4px);
        }
        .investment-image-overlay {
          background: linear-gradient(
            to top,
            rgba(67, 44, 150, 0.9) 0%,
            rgba(67, 44, 150, 0.4) 60%,
            transparent 100%
          );
        }
      `}</style>

      {/* Subtle purple gradient background */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none opacity-10"
        style={{ background: purple }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Header - Centered */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px" style={{ background: purple }} />
            <span 
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: purple, fontFamily: 'Space Mono, monospace', fontWeight: 400 }}
            >
              Strategic Portfolio
            </span>
            <div className="w-12 h-px" style={{ background: purple }} />
          </div>

          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6"
            style={{ color: purple, fontFamily: 'Outfit, sans-serif' }}
          >
            Our <span className="font-bold">Investments</span>
          </h2>

          <p 
            className="text-base md:text-lg font-light leading-relaxed max-w-3xl mx-auto mb-8"
            style={{ color: 'rgba(67, 44, 150, 0.75)', fontFamily: 'Outfit, sans-serif' }}
          >
            RSW's investments are distributed across carefully selected strategic sectors, enabling a balance between returns and stability, with long-term scalability.
          </p>

          <div 
            className="max-w-2xl mx-auto p-6 md:p-8 rounded-2xl"
            style={{ 
              background: lightPurple,
              border: `1px solid rgba(67, 44, 150, 0.1)`
            }}
          >
            <h3 
              className="text-lg md:text-xl font-semibold mb-3"
              style={{ color: purple, fontFamily: 'Outfit, sans-serif' }}
            >
              We complete the vision
            </h3>
            <p 
              className="text-sm md:text-base leading-relaxed"
              style={{ color: 'rgba(67, 44, 150, 0.7)', fontFamily: 'Outfit, sans-serif' }}
            >
              Our investments span strategic sectors including real estate, infrastructure, and technology. This diversification enables a balanced approach to returns and stability, while maintaining agility in evolving market conditions.
            </p>
          </div>
        </div>

        {/* Our Approach */}
        <div className="mb-12 md:mb-16">
          <h3 
            className="text-2xl md:text-3xl font-semibold text-center mb-10"
            style={{ color: purple, fontFamily: 'Outfit, sans-serif' }}
          >
            Our Approach
          </h3>

          {/* Approach Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {approaches.map((approach, index) => (
              <motion.div
                key={approach.id}
                className="relative p-6 md:p-7 rounded-xl cursor-pointer group transition-all duration-300"
                style={{
                  background: activeCard === approach.id ? purple : lightPurple,
                  border: `1px solid ${activeCard === approach.id ? purple : 'rgba(67, 44, 150, 0.1)'}`,
                }}
                onMouseEnter={() => setActiveCard(approach.id)}
                onMouseLeave={() => setActiveCard(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Icon */}
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300"
                  style={{
                    background: activeCard === approach.id 
                      ? 'rgba(255, 255, 255, 0.15)' 
                      : white,
                  }}
                >
                  <approach.icon 
                    className="w-5 h-5 transition-colors duration-300"
                    style={{ 
                      color: activeCard === approach.id ? white : purple,
                      strokeWidth: 1.5 
                    }}
                  />
                </div>

                {/* Title */}
                <h4 
                  className="text-base font-semibold mb-3 transition-colors duration-300"
                  style={{ 
                    color: activeCard === approach.id ? white : purple,
                    fontFamily: 'Outfit, sans-serif' 
                  }}
                >
                  {approach.title}
                </h4>

                {/* Description */}
                <p 
                  className="text-xs leading-relaxed transition-colors duration-300"
                  style={{ 
                    color: activeCard === approach.id 
                      ? 'rgba(255, 255, 255, 0.85)' 
                      : 'rgba(67, 44, 150, 0.65)',
                    fontFamily: 'Outfit, sans-serif' 
                  }}
                >
                  {approach.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Investment Sectors */}
        <div>
          <h3 
            className="text-2xl md:text-3xl font-semibold text-center mb-10"
            style={{ color: purple, fontFamily: 'Outfit, sans-serif' }}
          >
            Investment Sectors
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {investments.map((investment, index) => (
              <motion.div
                key={investment.id}
                className="investment-card-hover group cursor-pointer rounded-2xl overflow-hidden"
                style={{
                  background: white,
                  border: `1px solid rgba(67, 44, 150, 0.15)`,
                  boxShadow: activeInvestment === investment.id 
                    ? '0 20px 60px rgba(67, 44, 150, 0.25)' 
                    : '0 4px 20px rgba(67, 44, 150, 0.08)',
                }}
                onMouseEnter={() => setActiveInvestment(investment.id)}
                onMouseLeave={() => setActiveInvestment(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={investment.image} 
                    alt={investment.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="investment-image-overlay absolute inset-0" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 
                    className="text-xl font-bold mb-3 transition-colors duration-300"
                    style={{ 
                      color: activeInvestment === investment.id 
                        ? purple 
                        : 'rgba(67, 44, 150, 0.9)',
                      fontFamily: 'Outfit, sans-serif' 
                    }}
                  >
                    {investment.title}
                  </h4>

                  <p 
                    className="text-sm leading-relaxed mb-5"
                    style={{ 
                      color: 'rgba(67, 44, 150, 0.7)',
                      fontFamily: 'Outfit, sans-serif' 
                    }}
                  >
                    {investment.description}
                  </p>

                  <button 
                    className="flex items-center gap-2 text-sm font-medium group/btn"
                    style={{ color: purple, fontFamily: 'Outfit, sans-serif' }}
                  >
                    <span>Learn More</span>
                    <ArrowUpRight 
                      className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" 
                      strokeWidth={2}
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}