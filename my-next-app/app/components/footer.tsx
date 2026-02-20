'use client'

import React from 'react';
import { Linkedin, Twitter, Instagram, ChevronUp } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider'
import Image from 'next/image'

const RSWFooter = () => {
  const { t, locale, direction } = useI18n();

  const gold = '#a79370'
  const cream = '#f5f0e8'
  const black = '#000000'
  const white = '#ffffff'

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    company: t('footer.links.company'),
    services: t('footer.links.services'),
    investors: t('footer.links.investors'),
    legal: t('footer.links.legal')
  };

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const fontFamily = locale === 'ar' ? 'Tajawal, sans-serif' : 'Outfit, sans-serif'
  const monoFont = locale === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Space Mono, monospace'

  return (
    <footer className="relative" style={{ background: cream }} dir={direction}>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=Space+Mono:wght@400;700&family=Tajawal:wght@200;300;400;500;600;700;800&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');
      `}</style>

      {/* Decorative top line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }}
      />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-12">
        
        {/* Top Row - Logo & Description */}
        <div 
          className="grid lg:grid-cols-2 gap-12 pb-16 mb-16" 
          style={{ borderBottom: `1px solid ${gold}` }}
        >
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl overflow-hidden relative">
                <Image 
                  src="/1.png" 
                  alt="RSW Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p 
                  className="text-2xl font-semibold tracking-wide"
                  style={{ color: black, fontFamily }}
                >
                  RSW
                </p>
                <p 
                  className="text-xs tracking-[0.2em]" 
                  style={{ color: gold, fontFamily: monoFont }}
                >
                  {t('footer.tagline')}
                </p>
              </div>
            </div>
            <p 
              className="text-base font-light leading-relaxed max-w-md mb-6"
              style={{ color: 'rgba(0,0,0,0.65)', fontFamily }}
            >
              {t('footer.description')}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ 
                    background: 'rgba(167, 147, 112, 0.15)',
                    border: `1px solid ${gold}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = gold
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(167, 147, 112, 0.15)'
                  }}
                >
                  <social.icon className="w-5 h-5" style={{ color: black }} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-16 mb-12" 
          style={{ borderBottom: `1px solid rgba(167, 147, 112, 0.35)` }}
        >
          {/* Company */}
          <div>
            <h5 
              className="text-xs font-medium tracking-[0.2em] uppercase mb-6"
              style={{ color: gold, fontFamily: monoFont }}
            >
              {t('footer.sections.company')}
            </h5>
            <ul className="space-y-3">
              {footerLinks.company.map((link: any, idx: number) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-sm transition-colors duration-300"
                    style={{ color: 'rgba(0,0,0,0.55)', fontFamily }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = black }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(0,0,0,0.55)' }}
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
              style={{ color: gold, fontFamily: monoFont }}
            >
              {t('footer.sections.services')}
            </h5>
            <ul className="space-y-3">
              {footerLinks.services.map((link: any, idx: number) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-sm transition-colors duration-300"
                    style={{ color: 'rgba(0,0,0,0.55)', fontFamily }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = black }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(0,0,0,0.55)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Investors */}
          <div>
            <h5 
              className="text-xs font-medium tracking-[0.2em] uppercase mb-6"
              style={{ color: gold, fontFamily: monoFont }}
            >
              {t('footer.sections.investors')}
            </h5>
            <ul className="space-y-3">
              {footerLinks.investors.map((link: any, idx: number) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-sm transition-colors duration-300"
                    style={{ color: 'rgba(0,0,0,0.55)', fontFamily }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = black }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(0,0,0,0.55)' }}
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
              style={{ color: gold, fontFamily: monoFont }}
            >
              {t('footer.sections.legal')}
            </h5>
            <ul className="space-y-3">
              {footerLinks.legal.map((link: any, idx: number) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-sm transition-colors duration-300"
                    style={{ color: 'rgba(0,0,0,0.55)', fontFamily }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = black }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(0,0,0,0.55)' }}
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
              style={{ color: 'rgba(0,0,0,0.45)', fontFamily }}
            >
              {t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}
            </p>
            <div 
              className="hidden sm:block w-px h-4"
              style={{ background: gold }}
            />
            <p 
              className="text-sm"
              style={{ color: 'rgba(0,0,0,0.45)', fontFamily }}
            >
              {t('footer.location')}
            </p>
          </div>

          {/* Compliance Badges */}
          <div className="flex items-center gap-4">
            <p 
              className="text-xs hidden lg:block"
              style={{ color: 'rgba(0,0,0,0.4)', fontFamily: monoFont }}
            >
              {t('footer.regulated')}
            </p>
            {['SCA', 'DFM', 'ADGM'].map((badge, idx) => (
              <span 
                key={idx}
                className="px-3 py-1.5 rounded text-xs font-medium"
                style={{ 
                  background: 'rgba(167, 147, 112, 0.15)',
                  border: `1px solid ${gold}`,
                  color: gold,
                  fontFamily: monoFont,
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
        className={`absolute ${locale === 'ar' ? 'left-6 lg:left-12' : 'right-6 lg:right-12'} bottom-6 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110`}
        style={{ 
          background: 'rgba(167, 147, 112, 0.15)',
          border: `1px solid ${gold}`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = gold
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(167, 147, 112, 0.15)'
        }}
        aria-label={t('footer.backToTop')}
      >
        <ChevronUp className="w-5 h-5" style={{ color: black }} strokeWidth={1.5} />
      </button>
    </footer>
  );
};

export default RSWFooter;