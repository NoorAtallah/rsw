'use client'

import React from 'react';
import { Building2, ArrowUpRight, Linkedin, Twitter, Instagram, ChevronUp } from 'lucide-react';

const RSWFooter = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    company: [
      { label: 'About RSW', href: '#' },
      { label: 'Our Leadership', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'News & Insights', href: '#' },
      { label: 'Contact Us', href: '#' },
    ],
    services: [
      { label: 'Real Estate Investment', href: '#' },
      { label: 'Commercial Brokerage', href: '#' },
      { label: 'Portfolio Management', href: '#' },
      { label: 'Risk Assessment', href: '#' },
      { label: 'Partnership Development', href: '#' },
    ],
    ecosystem: [
      { label: 'RSW Investment', href: '#' },
      { label: 'Hector Advance Technology', href: '#' },
      { label: 'RSW Construction', href: '#' },
      { label: 'Cortex 82 Technology', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Regulatory Disclosures', href: '#' },
    ]
  };

  return (
    <footer className="relative" style={{ background: '#163b5f' }}>
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-12">
        
        {/* Top Row - Logo & Newsletter */}
        <div className="grid lg:grid-cols-2 gap-12 pb-16 mb-16" style={{ borderBottom: '1px solid rgba(191, 199, 205, 0.1)' }}>
          
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(191, 199, 205, 0.1)' }}
              >
                <Building2 className="w-7 h-7" style={{ color: '#BFC7CD' }} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-white tracking-wide">RSW</p>
                <p className="text-xs tracking-[0.2em]" style={{ color: 'rgba(191, 199, 205, 0.6)' }}>INVESTMENT GROUP</p>
              </div>
            </div>
            <p 
              className="text-base font-light leading-relaxed max-w-md mb-6"
              style={{ color: 'rgba(191, 199, 205, 0.8)' }}
            >
              Building tomorrow's success through strategic partnerships and visionary 
              investments across real estate, technology, and construction sectors.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ background: 'rgba(191, 199, 205, 0.1)' }}
                >
                  <social.icon className="w-5 h-5" style={{ color: '#BFC7CD' }} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:pl-12">
            <h4 className="text-lg font-medium text-white mb-3">Stay Updated</h4>
            <p 
              className="text-sm mb-6"
              style={{ color: 'rgba(191, 199, 205, 0.7)' }}
            >
              Subscribe to our newsletter for investment insights and market updates.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 rounded-xl text-sm focus:outline-none"
                style={{ 
                  background: 'rgba(191, 199, 205, 0.08)',
                  border: '1px solid rgba(191, 199, 205, 0.15)',
                  color: '#ffffff'
                }}
              />
              <button 
                className="px-6 py-4 rounded-xl text-sm font-medium transition-all duration-300 hover:opacity-90 flex items-center gap-2"
                style={{ background: '#f8f9fa', color: '#163b5f' }}
              >
                Subscribe
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-16 mb-12" style={{ borderBottom: '1px solid rgba(191, 199, 205, 0.1)' }}>
          
          {/* Company */}
          <div>
            <h5 
              className="text-xs font-medium tracking-[0.2em] uppercase mb-6"
              style={{ color: '#BFC7CD' }}
            >
              Company
            </h5>
            <ul className="space-y-3">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-sm transition-colors duration-300 hover:text-white"
                    style={{ color: 'rgba(191, 199, 205, 0.7)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 
              className="text-xs font-medium tracking-[0.2em] uppercase mb-6"
              style={{ color: '#BFC7CD' }}
            >
              Services
            </h5>
            <ul className="space-y-3">
              {footerLinks.services.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-sm transition-colors duration-300 hover:text-white"
                    style={{ color: 'rgba(191, 199, 205, 0.7)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h5 
              className="text-xs font-medium tracking-[0.2em] uppercase mb-6"
              style={{ color: '#BFC7CD' }}
            >
              Our Companies
            </h5>
            <ul className="space-y-3">
              {footerLinks.ecosystem.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-sm transition-colors duration-300 hover:text-white"
                    style={{ color: 'rgba(191, 199, 205, 0.7)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 
              className="text-xs font-medium tracking-[0.2em] uppercase mb-6"
              style={{ color: '#BFC7CD' }}
            >
              Legal
            </h5>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-sm transition-colors duration-300 hover:text-white"
                    style={{ color: 'rgba(191, 199, 205, 0.7)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Copyright & Location */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-center sm:text-left">
            <p 
              className="text-sm"
              style={{ color: 'rgba(191, 199, 205, 0.5)' }}
            >
              © {new Date().getFullYear()} RSW Investment Group. All rights reserved.
            </p>
            <div 
              className="hidden sm:block w-px h-4"
              style={{ background: 'rgba(191, 199, 205, 0.2)' }}
            />
            <p 
              className="text-sm"
              style={{ color: 'rgba(191, 199, 205, 0.5)' }}
            >
              Abu Dhabi, United Arab Emirates
            </p>
          </div>

          {/* Compliance Badges */}
          <div className="flex items-center gap-4">
            <p 
              className="text-xs hidden lg:block"
              style={{ color: 'rgba(191, 199, 205, 0.4)' }}
            >
              Regulated by:
            </p>
            {['SCA', 'DFM', 'ADGM'].map((badge, idx) => (
              <span 
                key={idx}
                className="px-3 py-1.5 rounded text-xs font-medium"
                style={{ 
                  background: 'rgba(191, 199, 205, 0.08)',
                  color: 'rgba(191, 199, 205, 0.6)'
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute right-6 lg:right-12 bottom-6 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ background: 'rgba(191, 199, 205, 0.1)' }}
        aria-label="Back to top"
      >
        <ChevronUp className="w-5 h-5" style={{ color: '#BFC7CD' }} strokeWidth={1.5} />
      </button>

      {/* Decorative Line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(191, 199, 205, 0.15), transparent)' }}
      />
    </footer>
  );
};

export default RSWFooter;