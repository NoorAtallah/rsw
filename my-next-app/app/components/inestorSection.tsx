'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Users, TrendingUp, Download, ExternalLink, ChevronDown } from 'lucide-react';

const RSWInvestorRelationsSection = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const sections = [
    {
      icon: Shield,
      title: "Governance Framework",
      description: "RSW Investment Group operates under a corporate governance framework that clearly defines roles and responsibilities, ensuring effective oversight of investment activities in line with recognized best practices and regulatory standards.",
      color: "#432c96"
    },
    {
      icon: FileText,
      title: "Disclosure Policy",
      description: "We maintain transparent communication with our investors through regular disclosures, financial reporting, and timely updates on material developments that may impact investment decisions.",
      color: "#5a3fb8"
    },
    {
      icon: Users,
      title: "Shareholder Information",
      description: "Access comprehensive information about shareholder rights, voting procedures, dividend policies, and general meeting schedules to stay informed about your investments.",
      color: "#7856d9"
    },
    {
      icon: TrendingUp,
      title: "Financial Performance",
      description: "Review our quarterly and annual financial reports, performance metrics, and strategic outlook to understand our growth trajectory and investment returns.",
      color: "#8b6fd9"
    }
  ];

  const documents = [
    { name: "Annual Report 2025", size: "2.4 MB", type: "PDF" },
    { name: "Q4 2025 Financial Results", size: "1.8 MB", type: "PDF" },
    { name: "Governance Charter", size: "890 KB", type: "PDF" },
    { name: "Investor Presentation", size: "5.2 MB", type: "PDF" }
  ];

  return (
    <section className="relative overflow-hidden py-16 lg:py-24" style={{ background: '#ffffff' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        .ir-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        .ir-body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-px" style={{ background: '#432c96' }} />
            <span 
              className="ir-body text-[10px] tracking-[0.25em] uppercase font-medium"
              style={{ color: 'rgba(67, 44, 150, 0.6)' }}
            >
              Investor Relations
            </span>
            <div className="w-8 h-px" style={{ background: '#432c96' }} />
          </motion.div>
          
          <motion.h2 
            className="ir-title text-4xl lg:text-5xl leading-tight mb-4"
            style={{ color: '#432c96' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Transparent Communication
          </motion.h2>

          <motion.p 
            className="ir-body text-sm max-w-2xl mx-auto"
            style={{ color: 'rgba(67, 44, 150, 0.6)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            At RSW Investment Group, we are committed to transparent and structured communication with our investors. This page provides essential information to support informed investment decisions.
          </motion.p>
        </div>

        {/* Accordion Sections */}
        <div className="mb-12 space-y-3">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = activeAccordion === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setActiveAccordion(isActive ? null : index)}
                  className="w-full p-5 rounded-xl transition-all duration-300 text-left"
                  style={{
                    background: isActive ? 'rgba(67, 44, 150, 0.05)' : 'rgba(67, 44, 150, 0.03)',
                    border: `1px solid ${isActive ? 'rgba(67, 44, 150, 0.15)' : 'rgba(67, 44, 150, 0.1)'}`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(67, 44, 150, 0.08)' }}
                      >
                        <Icon className="w-5 h-5" style={{ color: section.color }} strokeWidth={1.5} />
                      </div>
                      <h3 className="ir-body text-base font-semibold" style={{ color: '#432c96' }}>
                        {section.title}
                      </h3>
                    </div>
                    <ChevronDown 
                      className="w-5 h-5 transition-transform duration-300"
                      style={{ 
                        color: '#432c96',
                        transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}
                      strokeWidth={2}
                    />
                  </div>
                  
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: isActive ? 'auto' : 0,
                      opacity: isActive ? 1 : 0,
                      marginTop: isActive ? '16px' : 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p 
                      className="ir-body text-sm leading-relaxed pl-16"
                      style={{ color: 'rgba(67, 44, 150, 0.7)' }}
                    >
                      {section.description}
                    </p>
                  </motion.div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Documents Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div 
            className="p-6 rounded-xl"
            style={{ 
              background: 'rgba(67, 44, 150, 0.03)',
              border: '1px solid rgba(67, 44, 150, 0.1)'
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(67, 44, 150, 0.08)' }}
              >
                <FileText className="w-5 h-5" style={{ color: '#432c96' }} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="ir-body text-base font-semibold" style={{ color: '#432c96' }}>
                  Key Documents
                </h3>
                <p className="ir-body text-[10px]" style={{ color: 'rgba(67, 44, 150, 0.5)' }}>
                  Download essential investor materials
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {documents.map((doc, index) => (
                <button
                  key={index}
                  className="group flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:shadow-md"
                  style={{ 
                    background: '#ffffff',
                    border: '1px solid rgba(67, 44, 150, 0.1)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(67, 44, 150, 0.08)' }}
                    >
                      <FileText className="w-4 h-4" style={{ color: '#432c96' }} strokeWidth={1.5} />
                    </div>
                    <div className="text-left">
                      <p className="ir-body text-xs font-semibold" style={{ color: '#432c96' }}>
                        {doc.name}
                      </p>
                      <p className="ir-body text-[9px]" style={{ color: 'rgba(67, 44, 150, 0.5)' }}>
                        {doc.type} • {doc.size}
                      </p>
                    </div>
                  </div>
                  <Download 
                    className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" 
                    style={{ color: '#432c96' }} 
                    strokeWidth={2}
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact IR Team */}
        <motion.div 
          className="mt-8 text-center p-6 rounded-xl"
          style={{ 
            background: '#432c96'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="ir-body text-lg font-semibold text-white mb-2">
            Need More Information?
          </h3>
          <p className="ir-body text-sm text-white/80 mb-4">
            Our Investor Relations team is here to assist you
          </p>
          
          <a
            href="mailto:ir@rswinvestment.ae"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-xl"
            style={{ 
              background: '#ffffff',
              color: '#432c96'
            }}
          >
            <span className="ir-body text-xs font-semibold">
              Contact IR Team
            </span>
            <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default RSWInvestorRelationsSection;