'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Cpu, 
  HardHat, 
  Monitor,
  ArrowUpRight,
  Plus,
  Minus
} from 'lucide-react';

const RSWEcosystemSection = () => {
  const [expandedCompany, setExpandedCompany] = useState<number | null>(0);

  const companies = [
    {
      id: 'rsw-investment',
      name: 'RSW Investment',
      tagline: 'Commercial & Real Estate Investments',
      icon: Building2,
      description: 'The flagship investment arm managing diverse portfolios across real estate, commercial ventures, and strategic partnerships.',
      services: [
        'Commercial Brokers',
        'Real Estate Leasing Brokerage',
        'Real Estate Purchase and Sale',
        'Companies Representation',
        'Real Estate Development & Management',
        'Commercial Enterprises Investment'
      ],
    },
    {
      id: 'hector-tech',
      name: 'Hector Advance Technology',
      tagline: 'AI Research & IT Consultancy',
      icon: Cpu,
      description: 'Pioneering innovation through artificial intelligence research, cybersecurity solutions, and cloud computing services.',
      services: [
        'AI Research & Consultancies',
        'Cybersecurity Risk Auditing',
        'IT Consultancy',
        'Cloud Computing Services',
        'Computer Systems Design',
        'Network Services'
      ],
    },
    {
      id: 'rsw-construction',
      name: 'RSW Construction & Decoration',
      tagline: 'Building Projects & Contracting',
      icon: HardHat,
      description: 'Full-service construction solutions from building contracting to interior design, serving oil & gas and commercial sectors.',
      services: [
        'Building Projects Contracting',
        'Oil & Gas Facilities Services',
        'Mechanical Contracting',
        'Electrical Contracting',
        'Interior Design Implementation',
        'Buildings Maintenance'
      ],
    },
    {
      id: 'cortex-82',
      name: 'Cortex 82 Technology',
      tagline: 'Software Design & Tech Projects',
      icon: Monitor,
      description: 'Cutting-edge software development and technological project management driving digital transformation.',
      services: [
        'Software Design & Development',
        'Tech Projects Management',
        'Systems Innovation',
        'Network Services & Operations',
        'Digital Solutions',
        'Custom Applications'
      ],
    }
  ];

  const toggleCompany = (index: number) => {
    setExpandedCompany(expandedCompany === index ? null : index);
  };

  return (
    <section 
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ background: '#f8f9fa' }}
    >
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(22, 59, 95, 0.07) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        
        {/* Header - Left aligned, different style */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <span 
              className="text-xs tracking-[0.4em] uppercase mb-4 block"
              style={{ color: '#BFC7CD' }}
            >
              The RSW Group
            </span>
            <h2 
              className="text-4xl lg:text-5xl font-light leading-[1.15]"
              style={{ color: '#163b5f' }}
            >
              Four companies,
              <span className="font-semibold block">one vision</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p 
              className="text-base font-light leading-relaxed"
              style={{ color: 'rgba(22, 59, 95, 0.6)' }}
            >
              A unified ecosystem headquartered in Abu Dhabi, delivering comprehensive 
              investment, technology, and construction solutions with full UAE regulatory compliance.
            </p>
          </div>
        </div>

        {/* Accordion Style Companies */}
        <div className="space-y-4">
          {companies.map((company, index) => {
            const Icon = company.icon;
            const isExpanded = expandedCompany === index;
            
            return (
              <motion.div
                key={company.id}
                className="overflow-hidden"
                style={{
                  background: isExpanded ? '#ffffff' : 'transparent',
                  borderRadius: '24px',
                  border: '1px solid',
                  borderColor: isExpanded ? 'rgba(22, 59, 95, 0.1)' : 'rgba(191, 199, 205, 0.4)',
                }}
                layout
              >
                {/* Header Row */}
                <div 
                  className="flex items-center justify-between p-6 lg:p-8 cursor-pointer"
                  onClick={() => toggleCompany(index)}
                >
                  <div className="flex items-center gap-6">
                    {/* Number */}
                    <span 
                      className="text-5xl lg:text-6xl font-extralight w-20"
                      style={{ color: isExpanded ? '#163b5f' : '#BFC7CD' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    
                    {/* Icon & Title */}
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                        style={{
                          background: isExpanded ? '#163b5f' : 'rgba(22, 59, 95, 0.06)',
                        }}
                      >
                        <Icon 
                          className="w-5 h-5" 
                          style={{ color: isExpanded ? '#ffffff' : '#163b5f' }}
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <h3 
                          className="text-xl lg:text-2xl font-medium transition-colors duration-300"
                          style={{ color: '#163b5f' }}
                        >
                          {company.name}
                        </h3>
                        <p 
                          className="text-sm transition-colors duration-300"
                          style={{ color: isExpanded ? 'rgba(22, 59, 95, 0.6)' : '#BFC7CD' }}
                        >
                          {company.tagline}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Toggle Button */}
                  <button 
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isExpanded ? '#163b5f' : 'rgba(22, 59, 95, 0.06)',
                    }}
                  >
                    {isExpanded ? (
                      <Minus className="w-5 h-5" style={{ color: '#ffffff' }} strokeWidth={1.5} />
                    ) : (
                      <Plus className="w-5 h-5" style={{ color: '#163b5f' }} strokeWidth={1.5} />
                    )}
                  </button>
                </div>

                {/* Expanded Content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isExpanded ? 'auto' : 0,
                    opacity: isExpanded ? 1 : 0
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 lg:px-8 pb-8">
                    {/* Divider */}
                    <div 
                      className="h-px mb-8 ml-20"
                      style={{ background: 'rgba(22, 59, 95, 0.08)' }}
                    />
                    
                    <div className="grid lg:grid-cols-2 gap-8 ml-0 lg:ml-20">
                      {/* Description */}
                      <div>
                        <p 
                          className="text-base font-light leading-relaxed mb-6"
                          style={{ color: 'rgba(22, 59, 95, 0.7)' }}
                        >
                          {company.description}
                        </p>
                        <button 
                          className="group inline-flex items-center gap-2 text-sm font-medium transition-colors"
                          style={{ color: '#163b5f' }}
                        >
                          Learn more
                          <ArrowUpRight 
                            className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                            strokeWidth={1.5}
                          />
                        </button>
                      </div>
                      
                      {/* Services */}
                      <div>
                        <p 
                          className="text-xs tracking-wider uppercase mb-4"
                          style={{ color: '#BFC7CD' }}
                        >
                          Key Services
                        </p>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                          {company.services.map((service, idx) => (
                            <div 
                              key={idx}
                              className="flex items-center gap-2"
                            >
                              <div 
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: '#163b5f' }}
                              />
                              <span 
                                className="text-sm"
                                style={{ color: 'rgba(22, 59, 95, 0.7)' }}
                              >
                                {service}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div 
            className="inline-flex items-center gap-8 p-8 rounded-3xl"
            style={{ 
              background: '#163b5f',
            }}
          >
            <div className="text-left">
              <p className="text-white text-lg font-medium">Ready to explore opportunities?</p>
              <p style={{ color: 'rgba(191, 199, 205, 0.8)' }} className="text-sm">Connect with our investment team today</p>
            </div>
            <button 
              className="group flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <span className="text-sm tracking-wider text-white">Get in Touch</span>
              <ArrowUpRight 
                className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSWEcosystemSection;