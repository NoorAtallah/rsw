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

  const ventures = [
    {
      id: 'real-estate',
      icon: Building2,
      title: 'Real Estate',
      tagline: 'Commercial & Investment Properties',
      description: 'Strategic real estate investments, commercial leasing, and property development across UAE\'s most promising markets.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
      color: '#163b5f',
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
      color: '#1e4a6f',
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
      color: '#2a5a85',
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
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden"
        style={{ background: '#163b5f' }}>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(191, 199, 205, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'rgba(191, 199, 205, 0.3)' }} />
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: 'rgba(191, 199, 205, 0.2)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-20">
          
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{ 
                background: 'rgba(191, 199, 205, 0.1)',
                border: '1px solid rgba(191, 199, 205, 0.2)'
              }}>
              <Briefcase className="w-4 h-4" style={{ color: '#BFC7CD' }} strokeWidth={1.5} />
              <span className="text-xs tracking-wider" style={{ color: 'rgba(191, 199, 205, 0.8)' }}>
                Investment Verticals
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-7xl font-light text-white mb-6 leading-[1.05]">
              Three Strategic
              <span className="block font-bold mt-3" style={{ color: '#BFC7CD' }}>
                Investment Sectors
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl leading-relaxed mb-10 max-w-3xl"
              style={{ color: 'rgba(191, 199, 205, 0.85)' }}>
              Comprehensive investment opportunities across real estate, construction, and 
              technology—backed by proven expertise and strategic market positioning.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8">
              {[
                { value: '3', label: 'Core Sectors' },
                { value: '200+', label: 'Active Projects' },
                { value: 'UAE', label: 'Based & Compliant' }
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                >
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(191, 199, 205, 0.6)' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ventures Navigation Tabs */}
      <section className="py-12 bg-white border-b" style={{ borderColor: 'rgba(22, 59, 95, 0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {ventures.map((venture, idx) => {
              const Icon = venture.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveVenture(idx)}
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: activeVenture === idx ? venture.color : '#f8f9fa',
                    border: '2px solid',
                    borderColor: activeVenture === idx ? venture.color : 'rgba(22, 59, 95, 0.1)',
                    color: activeVenture === idx ? '#ffffff' : '#163b5f'
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
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                      <img 
                        src={venture.image}
                        alt={venture.title}
                        className="w-full h-[500px] object-cover"
                      />
                      <div className="absolute inset-0"
                        style={{ background: `linear-gradient(to top, ${venture.color}dd 0%, transparent 50%)` }} />
                      
                      {/* Stats Overlay */}
                      <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl backdrop-blur-xl"
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}>
                        <div className="grid grid-cols-3 gap-4">
                          {venture.stats.map((stat, statIdx) => (
                            <div key={statIdx} className="text-center">
                              <div className="text-2xl font-bold mb-1" style={{ color: venture.color }}>
                                {stat.value}
                              </div>
                              <div className="text-xs" style={{ color: 'rgba(22, 59, 95, 0.6)' }}>
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Decorative element */}
                    <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-3xl blur-3xl opacity-20"
                      style={{ background: venture.color }} />
                  </div>

                  {/* Right - Content */}
                  <div>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: venture.color }}>
                      <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-light mb-4 leading-tight"
                      style={{ color: '#163b5f' }}>
                      {venture.title}
                      <span className="block font-bold mt-2">{venture.tagline}</span>
                    </h2>

                    <p className="text-lg leading-relaxed mb-8"
                      style={{ color: 'rgba(22, 59, 95, 0.7)' }}>
                      {venture.description}
                    </p>

                    <button 
                      className="group flex items-center gap-2 px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg"
                      style={{ background: venture.color }}>
                      <span className="text-sm font-semibold text-white">Request Investment Memo</span>
                      <ArrowUpRight 
                        className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
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
                      className="p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
                      style={{ 
                        background: '#f8f9fa',
                        border: '1px solid rgba(22, 59, 95, 0.1)'
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: serviceIdx * 0.1 }}
                    >
                      <CheckCircle2 
                        className="w-8 h-8 mb-4" 
                        style={{ color: venture.color }}
                        strokeWidth={1.5}
                      />
                      <h3 className="text-lg font-bold mb-2" style={{ color: '#163b5f' }}>
                        {service.name}
                      </h3>
                      <p className="text-sm leading-relaxed"
                        style={{ color: 'rgba(22, 59, 95, 0.6)' }}>
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
      <section className="py-24 lg:py-32" style={{ background: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs tracking-[0.3em] uppercase font-semibold mb-4 block"
              style={{ color: 'rgba(22, 59, 95, 0.5)' }}>
              Investment Advantages
            </span>
            
            <h2 className="text-4xl lg:text-5xl font-light mb-6 leading-tight" 
              style={{ color: '#163b5f' }}>
              Why invest with
              <span className="block font-bold mt-2">RSW Group</span>
            </h2>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyInvest.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  className="p-8 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
                  style={{ 
                    background: '#ffffff',
                    border: '1px solid rgba(22, 59, 95, 0.1)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: 'rgba(22, 59, 95, 0.05)' }}>
                    <Icon className="w-7 h-7" style={{ color: '#163b5f' }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#163b5f' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed"
                    style={{ color: 'rgba(22, 59, 95, 0.6)' }}>
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #163b5f 0%, #1e4a6f 100%)' }}>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(191, 199, 205, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'rgba(191, 199, 205, 0.3)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-12 h-12 mx-auto mb-6" style={{ color: '#BFC7CD' }} strokeWidth={1.5} />
            
            <h2 className="text-4xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Start your investment
              <span className="block font-bold mt-2" style={{ color: '#BFC7CD' }}>
                journey today
              </span>
            </h2>
            
            <p className="text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'rgba(191, 199, 205, 0.9)' }}>
              Connect with our investment team to explore opportunities across our 
              diversified portfolio of real estate, construction, and technology ventures.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ background: '#BFC7CD' }}>
                <span className="text-sm font-semibold" style={{ color: '#163b5f' }}>
                  Request Investment Memo
                </span>
              </button>
              
              <button className="group px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white/10"
                style={{ 
                  background: 'rgba(191, 199, 205, 0.1)',
                  border: '1px solid rgba(191, 199, 205, 0.3)'
                }}>
                <span className="text-sm font-semibold text-white">Schedule Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                  strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default VenturesPage;