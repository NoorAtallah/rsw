'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Cpu, 
  HardHat,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Users,
  Award,
  Target,
  Zap,
  Globe2,
  ChevronRight,
  Briefcase
} from 'lucide-react';

const VenturesPage = () => {
  const [activeVenture, setActiveVenture] = useState(0);

  const purple = '#432c96';

  const ventures = [
    {
      id: 'real-estate',
      icon: Building2,
      title: 'Real Estate',
      tagline: 'Commercial & Investment Properties',
      description: 'Strategic real estate investments, commercial leasing, and property development across UAE\'s most promising markets.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
      services: [
        {
          name: 'Commercial Leasing',
          description: 'Prime office and retail space management'
        },
        {
          name: 'Property Development',
          description: 'End-to-end real estate development projects'
        },
        {
          name: 'Investment Management',
          description: 'Strategic portfolio optimization and growth'
        },
        {
          name: 'Asset Management',
          description: 'Comprehensive property lifecycle management'
        }
      ],
      stats: [
        { value: '50+', label: 'Properties' },
        { value: '2M+', label: 'Sq Ft Managed' },
        { value: '95%', label: 'Occupancy Rate' }
      ]
    },
    {
      id: 'construction',
      icon: HardHat,
      title: 'Construction',
      tagline: 'Building & Contracting Excellence',
      description: 'Full-spectrum construction solutions from oil & gas facilities to commercial buildings and interior design.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80',
      services: [
        {
          name: 'Building Contracting',
          description: 'Large-scale commercial and residential projects'
        },
        {
          name: 'Oil & Gas Facilities',
          description: 'Specialized infrastructure for energy sector'
        },
        {
          name: 'Mechanical & Electrical',
          description: 'MEP systems design and installation'
        },
        {
          name: 'Interior Design',
          description: 'Premium commercial interior solutions'
        }
      ],
      stats: [
        { value: '100+', label: 'Projects' },
        { value: '500M+', label: 'AED Value' },
        { value: '15+', label: 'Years Experience' }
      ]
    },
    {
      id: 'technology',
      icon: Cpu,
      title: 'Technology',
      tagline: 'AI Research & IT Innovation',
      description: 'Cutting-edge technology solutions spanning AI research, cybersecurity, cloud services, and software development.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
      services: [
        {
          name: 'AI Research',
          description: 'Advanced artificial intelligence and machine learning'
        },
        {
          name: 'Cybersecurity',
          description: 'Enterprise-grade security solutions and consulting'
        },
        {
          name: 'Cloud Services',
          description: 'Scalable cloud infrastructure and management'
        },
        {
          name: 'Software Development',
          description: 'Custom applications and digital transformation'
        }
      ],
      stats: [
        { value: '50+', label: 'Tech Projects' },
        { value: '24/7', label: 'Support' },
        { value: '99.9%', label: 'Uptime' }
      ]
    }
  ];

  const whyInvest = [
    {
      icon: Target,
      title: 'Diversified Portfolio',
      description: 'Strategic exposure across real estate, construction, and technology sectors'
    },
    {
      icon: TrendingUp,
      title: 'Proven Track Record',
      description: 'Consistent returns and successful project delivery across all verticals'
    },
    {
      icon: Users,
      title: 'Expert Management',
      description: 'Industry-leading professionals with deep local market expertise'
    },
    {
      icon: Award,
      title: 'UAE Compliant',
      description: 'Full regulatory compliance with UAE DFM and data privacy standards'
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .ventures-title { font-family: 'Playfair Display', serif; }
        .ventures-body { font-family: 'Inter', sans-serif; }
        
        .image-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.03) 3px);
          opacity: 0.15;
          pointer-events: none;
        }
      `}</style>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-end overflow-hidden" style={{ background: purple }}>
        
        <div className="absolute inset-0 image-grain">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80" 
            alt="RSW Ventures" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(67, 44, 150, 0.85) 0%, transparent 100%)` }}/>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-20 lg:pb-32">
          
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px" style={{ background: 'rgba(255, 255, 255, 0.5)' }} />
              <span className="ventures-body text-xs uppercase tracking-widest" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Investment Verticals
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="ventures-title text-5xl lg:text-8xl font-light text-white mb-8 leading-[0.95]">
              Three Strategic
              <br/>
              <span className="font-bold">Investment</span>
              <br/>
              Sectors
            </h1>

            {/* Description */}
            <p className="ventures-body text-xl lg:text-2xl leading-relaxed mb-12 max-w-2xl font-light"
              style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Comprehensive investment opportunities across real estate, construction, and 
              technology—backed by proven expertise and strategic market positioning.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-12">
              {[
                { value: '3', label: 'Core Sectors' },
                { value: '200+', label: 'Active Projects' },
                { value: 'UAE', label: 'Based & Compliant' }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="ventures-title text-5xl mb-1 font-semibold text-white">
                    {stat.value}
                  </div>
                  <div className="ventures-body text-xs uppercase tracking-widest" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
          <motion.div 
            animate={{ y: [0, 12, 0] }} 
            transition={{ duration: 2, repeat: Infinity }} 
            className="flex flex-col items-center gap-3"
          >
            <div className="ventures-body text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              SCROLL
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent"/>
          </motion.div>
        </div>
      </section>

      {/* Ventures Navigation Tabs */}
      <section className="py-12 bg-white border-b" style={{ borderColor: 'rgba(67, 44, 150, 0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {ventures.map((venture, idx) => {
              const Icon = venture.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveVenture(idx)}
                  className="ventures-body flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-300"
                  style={{
                    background: activeVenture === idx ? purple : 'white',
                    border: activeVenture === idx ? 'none' : `1px solid rgba(67, 44, 150, 0.2)`,
                    color: activeVenture === idx ? '#ffffff' : purple
                  }}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                  <span className="text-sm font-semibold">
                    {venture.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Venture Details */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {ventures.map((venture, idx) => {
            const Icon = venture.icon;
            return (
              <motion.div
                key={idx}
                initial={false}
                animate={{
                  opacity: activeVenture === idx ? 1 : 0,
                  y: activeVenture === idx ? 0 : 20,
                  display: activeVenture === idx ? 'block' : 'none'
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
                  
                  {/* Left - Image */}
                  <div className="relative">
                    <div className="relative rounded-2xl overflow-hidden image-grain">
                      <img 
                        src={venture.image}
                        alt={venture.title}
                        className="w-full h-[500px] object-cover"
                      />
                      <div className="absolute inset-0"
                        style={{ background: `linear-gradient(to top, ${purple}dd 0%, transparent 50%)` }} />
                      
                      {/* Stats Overlay */}
                      <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl backdrop-blur-xl"
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}>
                        <div className="grid grid-cols-3 gap-4">
                          {venture.stats.map((stat, statIdx) => (
                            <div key={statIdx} className="text-center">
                              <div className="ventures-title text-2xl font-bold mb-1" style={{ color: purple }}>
                                {stat.value}
                              </div>
                              <div className="ventures-body text-xs" style={{ color: 'rgba(67, 44, 150, 0.6)' }}>
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Decorative element */}
                    <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-3xl blur-3xl opacity-20"
                      style={{ background: purple }} />
                  </div>

                  {/* Right - Content */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <Icon className="w-12 h-12" style={{ color: purple }} strokeWidth={1.5} />
                      <div className="ventures-body text-sm tracking-widest" style={{ color: purple }}>
                        0{idx + 1}
                      </div>
                    </div>

                    <h2 className="ventures-title text-2xl lg:text-3xl font-light mb-6 leading-tight"
                      style={{ color: purple }}>
                      {venture.title}
                      <span className="block font-bold mt-2">{venture.tagline}</span>
                    </h2>

                    <p className="ventures-body text-base leading-relaxed mb-8"
                      style={{ color: 'rgba(67, 44, 150, 0.75)' }}>
                      {venture.description}
                    </p>

                    <button 
                      className="ventures-body group flex items-center gap-2 text-sm font-semibold transition-all"
                      style={{ color: purple }}>
                      <span>Request Investment Memo</span>
                      <ArrowUpRight 
                        className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                        strokeWidth={2}
                      />
                    </button>
                  </div>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {venture.services.map((service, serviceIdx) => (
                    <motion.div
                      key={serviceIdx}
                      className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2"
                      style={{ 
                        background: '#fafafa',
                        border: '1px solid rgba(67, 44, 150, 0.1)'
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: serviceIdx * 0.1 }}
                    >
                      <CheckCircle2 
                        className="w-8 h-8 mb-4" 
                        style={{ color: purple }}
                        strokeWidth={1.5}
                      />
                      <h3 className="ventures-body text-base font-bold mb-2" style={{ color: purple }}>
                        {service.name}
                      </h3>
                      <p className="ventures-body text-sm leading-relaxed"
                        style={{ color: 'rgba(67, 44, 150, 0.6)' }}>
                        {service.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="py-24 lg:py-32" style={{ background: '#fafafa' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Header */}
          <div className="max-w-3xl mb-20">
            <div className="ventures-body text-xs mb-6 uppercase tracking-widest" style={{ color: purple }}>
              Investment Advantages
            </div>
            
            <h2 className="ventures-title text-2xl lg:text-3xl font-light leading-tight" 
              style={{ color: purple }}>
              Why invest with
              <br/>
              <span className="font-bold">RSW Group</span>
            </h2>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyInvest.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-6">
                    <Icon 
                      className="w-10 h-10 mb-4 transition-transform group-hover:scale-110" 
                      style={{ color: purple }} 
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="ventures-body text-base font-semibold mb-3" style={{ color: purple }}>
                    {item.title}
                  </h3>
                  <p className="ventures-body text-sm leading-relaxed"
                    style={{ color: 'rgba(67, 44, 150, 0.6)' }}>
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div 
            className="rounded-3xl p-12 lg:p-16"
            style={{ 
              background: 'white',
              border: `2px solid ${purple}`
            }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="ventures-title text-3xl lg:text-4xl font-light mb-6 leading-tight" style={{ color: purple }}>
                  Start your investment
                  <br/>
                  <span className="font-bold">journey today</span>
                </h2>
                
                <p className="ventures-body text-base mb-10 leading-relaxed" style={{ color: 'rgba(67, 44, 150, 0.7)' }}>
                  Connect with our investment team to explore opportunities across our 
                  diversified portfolio of real estate, construction, and technology ventures.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    className="ventures-body px-8 py-4 rounded-full font-semibold text-sm flex items-center justify-center gap-2 group transition-all hover:shadow-lg"
                    style={{ 
                      background: 'white', 
                      color: purple,
                      border: `2px solid ${purple}`
                    }}>
                    <span>Request Investment Memo</span>
                    <ArrowUpRight 
                      className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                      strokeWidth={2}
                    />
                  </button>
                  
                  <button 
                    className="ventures-body px-8 py-4 rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all"
                    style={{ 
                      background: 'white', 
                      color: purple,
                      border: `1px solid rgba(67, 44, 150, 0.3)`
                    }}>
                    <span>Schedule Consultation</span>
                  </button>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-end gap-8">
                {[
                  { icon: Target, label: 'Diversified' }, 
                  { icon: Award, label: 'Compliant' }, 
                  { icon: TrendingUp, label: 'Growing' }
                ].map((badge, idx) => {
                  const Icon = badge.icon;
                  return (
                    <div key={idx} className="text-center">
                      <Icon className="w-8 h-8 mx-auto mb-2" style={{ color: purple, opacity: 0.6 }} strokeWidth={1.5}/>
                      <div className="ventures-body text-[10px] uppercase tracking-widest" style={{ color: 'rgba(67, 44, 150, 0.6)' }}>
                        {badge.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VenturesPage;