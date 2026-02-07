'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Cpu, 
  HardHat, 
  Monitor,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Globe2,
  Users,
  TrendingUp,
  Award,
  Briefcase,
  Zap,
  Shield
} from 'lucide-react';

const RSWAboutPage = () => {
  const [activeSector, setActiveSector] = useState(0);

  const sectors = [
    {
      icon: Building2,
      name: 'Real Estate',
      description: 'Commercial investment, leasing brokerage, and strategic property development across prime UAE locations.',
      services: ['Investment Management', 'Commercial Brokerage', 'Property Development', 'Asset Management'],
      color: '#3b82f6'
    },
    {
      icon: Cpu,
      name: 'Technology',
      description: 'Cutting-edge AI research, cybersecurity solutions, and comprehensive cloud infrastructure services.',
      services: ['AI Research', 'Cybersecurity', 'Cloud Computing', 'IT Consultancy'],
      color: '#8b5cf6'
    },
    {
      icon: HardHat,
      name: 'Construction',
      description: 'End-to-end building solutions from oil & gas facilities to commercial interiors and ongoing maintenance.',
      services: ['Building Contracting', 'Oil & Gas Projects', 'Interior Design', 'Facility Management'],
      color: '#ef4444'
    },
    {
      icon: Monitor,
      name: 'Software',
      description: 'Advanced software engineering and digital transformation solutions powering modern businesses.',
      services: ['Custom Development', 'System Integration', 'Digital Platforms', 'Tech Innovation'],
      color: '#10b981'
    }
  ];

  const principles = [
    {
      icon: Shield,
      title: 'Integrity First',
      description: 'Full compliance with UAE regulations and international standards'
    },
    {
      icon: Zap,
      title: 'Innovation Driven',
      description: 'Leveraging technology and forward-thinking strategies'
    },
    {
      icon: Users,
      title: 'Client Success',
      description: 'Dedicated to delivering exceptional value and results'
    },
    {
      icon: Globe2,
      title: 'Global Vision',
      description: 'World-class operations with local market expertise'
    }
  ];

  const stats = [
    { number: '4', label: 'Core Sectors', suffix: '' },
    { number: '100', label: 'UAE Compliant', suffix: '%' },
    { number: '360', label: 'Integrated Solutions', suffix: '°' },
    { number: '2020', label: 'Since', suffix: '' }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section - Dark */}
      <section className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: '#0f172a' }}>
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }} />
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-20">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10b981' }} />
                <span className="text-xs tracking-wider text-white/70">
                  Diversified Investment Group
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl lg:text-7xl font-light text-white mb-6 leading-[1.05]">
                Powering Growth
                <span className="block font-bold mt-3 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  Across Industries
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg lg:text-xl text-white/70 leading-relaxed mb-10">
                A premier investment firm delivering integrated solutions across four strategic 
                sectors—Real Estate, Technology, Construction, and Software Development.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    className="text-center sm:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  >
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                      {stat.number}<span className="text-blue-400">{stat.suffix}</span>
                    </div>
                    <div className="text-xs text-white/50">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                  <span className="text-sm font-semibold text-white">Explore Sectors</span>
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                    strokeWidth={2} />
                </button>
                
                <button className="px-8 py-4 rounded-xl transition-all duration-300"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                  <span className="text-sm font-semibold text-white">Request Information</span>
                </button>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
                  alt="Modern skyline"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Floating Glass Card */}
                <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl backdrop-blur-xl"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
                  }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white mb-1">
                        Abu Dhabi Based
                      </p>
                      <p className="text-xs text-white/70">
                        UAE's Investment Capital
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(59, 130, 246, 0.2)' }}>
                      <Globe2 className="w-6 h-6 text-blue-400" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 -top-8 -right-8 w-72 h-72 rounded-full blur-3xl opacity-30"
                style={{ background: '#3b82f6' }} />
              <div className="absolute -z-10 -bottom-8 -left-8 w-64 h-64 rounded-full blur-3xl opacity-30"
                style={{ background: '#8b5cf6' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Sectors - Interactive Cards */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-xs tracking-[0.3em] uppercase font-semibold mb-4 block"
                style={{ color: 'rgba(15, 23, 42, 0.5)' }}>
                What We Do
              </span>
              
              <h2 className="text-4xl lg:text-6xl font-light mb-6 leading-tight" 
                style={{ color: '#0f172a' }}>
                Four Strategic
                <span className="block font-bold mt-2">Sectors</span>
              </h2>
              
              <p className="text-lg text-gray-600">
                Comprehensive solutions across real estate, technology, construction, and software
              </p>
            </motion.div>
          </div>

          {/* Sector Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {sectors.map((sector, idx) => {
              const Icon = sector.icon;
              return (
                <motion.div
                  key={idx}
                  className="group relative p-8 rounded-3xl cursor-pointer overflow-hidden"
                  style={{ 
                    background: '#f8fafc',
                    border: '2px solid #e2e8f0',
                    transition: 'all 0.3s ease'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -8,
                    borderColor: sector.color,
                    background: '#ffffff'
                  }}
                  onClick={() => setActiveSector(idx)}
                >
                  {/* Background Gradient on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                    style={{ background: `linear-gradient(135deg, ${sector.color}, transparent)` }} />
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
                      style={{ 
                        background: activeSector === idx ? sector.color : '#e2e8f0',
                      }}>
                      <Icon 
                        className="w-8 h-8 transition-colors" 
                        style={{ color: activeSector === idx ? '#ffffff' : '#0f172a' }}
                        strokeWidth={1.5} 
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-3" style={{ color: '#0f172a' }}>
                      {sector.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      {sector.description}
                    </p>

                    {/* Services List */}
                    <div className="space-y-2">
                      {sector.services.map((service, serviceIdx) => (
                        <div key={serviceIdx} className="flex items-center gap-2">
                          <CheckCircle2 
                            className="w-4 h-4 flex-shrink-0" 
                            style={{ color: sector.color }}
                            strokeWidth={2}
                          />
                          <span className="text-xs text-gray-500">
                            {service}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: sector.color }}>
                      <span>Learn More</span>
                      <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className="py-24 lg:py-32" style={{ background: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left - Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80"
                  alt="Business principles"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-3xl blur-3xl opacity-20"
                style={{ background: '#3b82f6' }} />
            </motion.div>

            {/* Right - Content */}
            <div>
              <span className="text-xs tracking-[0.3em] uppercase font-semibold mb-4 block"
                style={{ color: 'rgba(15, 23, 42, 0.5)' }}>
                Core Values
              </span>
              
              <h2 className="text-4xl lg:text-5xl font-light mb-6 leading-tight" 
                style={{ color: '#0f172a' }}>
                Built on
                <span className="block font-bold mt-2">Strong Principles</span>
              </h2>

              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Our commitment to excellence, integrity, and innovation guides every decision 
                and partnership we forge.
              </p>

              <div className="space-y-6">
                {principles.map((principle, idx) => {
                  const Icon = principle.icon;
                  return (
                    <motion.div
                      key={idx}
                      className="flex gap-4 p-5 rounded-2xl transition-all duration-300 hover:shadow-md"
                      style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: '#f1f5f9' }}>
                        <Icon className="w-6 h-6" style={{ color: '#0f172a' }} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2" style={{ color: '#0f172a' }}>
                          {principle.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {principle.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
        
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-blue-400" strokeWidth={1.5} />
            
            <h2 className="text-4xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Ready to explore
              <span className="block font-bold mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                new opportunities?
              </span>
            </h2>
            
            <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Partner with a diversified investment group that delivers results across 
              multiple high-growth sectors.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                <span className="text-sm font-semibold text-white">Schedule Consultation</span>
              </button>
              
              <button className="group px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                <span className="text-sm font-semibold text-white">Download Portfolio</span>
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

export default RSWAboutPage;