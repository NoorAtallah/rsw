'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Cpu, HardHat, Shield, Award, Users, Globe, TrendingUp, ArrowUpRight, Sparkles } from 'lucide-react';

const RSWAboutSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      icon: Building2,
      label: "Our Story",
      title: "Founded on Excellence",
      content: "Headquartered in Abu Dhabi, RSW Group has evolved into a multifaceted enterprise, operating through four specialized divisions. Our journey is marked by strategic growth, innovation, and an unwavering commitment to quality across every project we undertake.",
      stats: [
        { value: "15+", label: "Years" },
        { value: "200+", label: "Projects" },
        { value: "5B+", label: "AED Value" }
      ]
    },
    {
      icon: Award,
      label: "Our Vision",
      title: "Building the Future",
      content: "To be the Middle East's most trusted integrated group, pioneering sustainable development through innovation, technology, and uncompromising quality. We envision a future where our projects set new standards in excellence and environmental responsibility.",
      stats: [
        { value: "4", label: "Divisions" },
        { value: "100%", label: "UAE Licensed" },
        { value: "98%", label: "Satisfaction" }
      ]
    },
    {
      icon: Users,
      label: "Our Team",
      title: "Expert Professionals",
      content: "Our success is driven by a diverse team of industry experts, bringing together decades of combined experience in real estate, technology, construction, and software development. Each member is committed to delivering exceptional results.",
      stats: [
        { value: "150+", label: "Experts" },
        { value: "12", label: "Nationalities" },
        { value: "24/7", label: "Operations" }
      ]
    }
  ];

  const divisions = [
    {
      icon: Building2,
      title: "Real Estate",
      description: "Investment, development & management solutions",
      color: "#432c96"
    },
    {
      icon: Cpu,
      title: "Technology",
      description: "AI research, cybersecurity & cloud computing",
      color: "#5a3fb8"
    },
    {
      icon: HardHat,
      title: "Construction",
      description: "End-to-end building & contracting services",
      color: "#7856d9"
    },
    {
      icon: Shield,
      title: "Software",
      description: "Custom development & system integration",
      color: "#8b6fd9"
    }
  ];

  return (
    <section 
      className="relative overflow-hidden py-16 lg:py-24"
      style={{ background: '#ffffff' }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap');
        
        .about-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        .about-body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div 
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-4 h-4" style={{ color: '#432c96' }} />
            <span 
              className="about-body text-[10px] tracking-[0.25em] uppercase font-medium"
              style={{ color: 'rgba(67, 44, 150, 0.6)' }}
            >
              About RSW Group
            </span>
            <Sparkles className="w-4 h-4" style={{ color: '#432c96' }} />
          </motion.div>
          
          <motion.h2 
            className="about-title text-4xl lg:text-5xl leading-tight mb-4"
            style={{ color: '#432c96' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Four Divisions, One Vision
          </motion.h2>

          <motion.p 
            className="about-body text-sm max-w-2xl mx-auto"
            style={{ color: 'rgba(67, 44, 150, 0.6)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A unified ecosystem of excellence in Abu Dhabi
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 about-body text-xs font-medium"
                style={{
                  background: activeTab === index ? '#432c96' : 'rgba(67, 44, 150, 0.05)',
                  color: activeTab === index ? '#ffffff' : '#432c96',
                  border: activeTab === index ? 'none' : '1px solid rgba(67, 44, 150, 0.15)'
                }}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div 
            className="p-8 rounded-2xl"
            style={{
              background: 'rgba(67, 44, 150, 0.03)',
              border: '1px solid rgba(67, 44, 150, 0.1)'
            }}
          >
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Content */}
              <div className="lg:col-span-2">
                <h3 
                  className="about-title text-2xl lg:text-3xl mb-4"
                  style={{ color: '#432c96' }}
                >
                  {tabs[activeTab].title}
                </h3>
                <p 
                  className="about-body text-sm leading-relaxed"
                  style={{ color: 'rgba(67, 44, 150, 0.7)' }}
                >
                  {tabs[activeTab].content}
                </p>
              </div>

              {/* Stats */}
              <div className="flex lg:flex-col gap-6 justify-center">
                {tabs[activeTab].stats.map((stat, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div className="about-title text-3xl mb-1" style={{ color: '#432c96' }}>
                      {stat.value}
                    </div>
                    <div className="about-body text-[10px]" style={{ color: 'rgba(67, 44, 150, 0.5)' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Four Divisions Grid */}
        <div className="mb-16">
          <h3 
            className="about-title text-2xl text-center mb-8"
            style={{ color: '#432c96' }}
          >
            Our Business Divisions
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {divisions.map((division, index) => {
              const Icon = division.icon;
              return (
                <motion.div
                  key={index}
                  className="group p-6 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(67, 44, 150, 0.1)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{ 
                        background: 'rgba(67, 44, 150, 0.08)',
                      }}
                    >
                      <Icon 
                        className="w-5 h-5 transition-colors duration-300 group-hover:scale-110" 
                        style={{ color: division.color }} 
                        strokeWidth={1.5} 
                      />
                    </div>
                    <div className="flex-1">
                      <h4 
                        className="about-body text-base font-semibold mb-1"
                        style={{ color: '#432c96' }}
                      >
                        {division.title}
                      </h4>
                      <p 
                        className="about-body text-xs leading-relaxed"
                        style={{ color: 'rgba(67, 44, 150, 0.6)' }}
                      >
                        {division.description}
                      </p>
                    </div>
                    <ArrowUpRight 
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                      style={{ color: '#432c96' }}
                      strokeWidth={2}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center p-8 rounded-2xl"
          style={{
            background: '#432c96'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Globe className="w-10 h-10 text-white mx-auto mb-4" />
          
          <h3 className="about-title text-2xl lg:text-3xl text-white mb-3">
            Ready to Start Your Project?
          </h3>
          
          <p className="about-body text-sm text-white/80 mb-6 max-w-xl mx-auto">
            Let's discuss how RSW Group can bring your vision to life with our integrated expertise
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover:shadow-xl"
              style={{
                background: '#ffffff',
                color: '#432c96'
              }}
            >
              <span className="about-body text-xs font-semibold">
                Schedule a Consultation
              </span>
              <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
            </button>

            <button 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              <span className="about-body text-xs font-semibold">
                View Our Portfolio
              </span>
            </button>
          </div>
        </motion.div>

        {/* Compliance Badges */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(67, 44, 150, 0.1)' }}>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {['UAE Licensed', 'ISO Certified', 'Fully Compliant', 'Award Winning'].map((badge, i) => (
              <div key={i} className="flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: '#432c96' }} strokeWidth={1.5} />
                <span className="about-body text-xs font-medium" style={{ color: 'rgba(67, 44, 150, 0.7)' }}>
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSWAboutSection;