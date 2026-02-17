'use client'

import React from 'react';
import { Building2, ArrowUpRight, Linkedin, Twitter, Instagram, ChevronUp } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider'
import Image from 'next/image'

const RSWFooter = () => {
  const { t, locale, direction } = useI18n();

  const gold = '#a79370'
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

  return (
    <footer className="relative" style={{ background: black }} dir={direction}>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=Space+Mono:wght@400;700&family=Tajawal:wght@200;300;400;500;600;700;800&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');
        
        [dir="ltr"] .footer-heading {
          font-family: 'Space Mono', monospace;
        }
        
        [dir="rtl"] .footer-heading {
          font-family: 'IBM Plex Sans Arabic', sans-serif;
          letter-spacing: 0;
        }
        
        [dir="ltr"] .footer-body {
          font-family: 'Outfit', sans-serif;
        }
        
        [dir="rtl"] .footer-body {
          font-family: 'Tajawal', sans-serif;
        }
      `}</style>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-12">
        
        {/* Top Row - Logo & Description */}
        <div className="grid lg:grid-cols-2 gap-12 pb-16 mb-16" style={{ borderBottom: `1px solid ${gold}` }}>
          
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              {/* Replace the Building2 icon with your logo */}
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
                  className="text-2xl font-semibold tracking-wide footer-body"
                  style={{ color: white }}
                >
                  RSW
                </p>
                <p 
                  className="text-xs tracking-[0.2em] footer-heading" 
                  style={{ color: gold }}
                >
                  {t('footer.tagline')}
                </p>
              </div>
            </div>
            <p 
              className="text-base font-light leading-relaxed max-w-md mb-6 footer-body"
              style={{ color: 'rgba(255, 255, 255, 0.8)' }}
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
                  style={{ background: 'rgba(167, 147, 112, 0.15)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = gold
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(167, 147, 112, 0.15)'
                  }}
                >
                  <social.icon className="w-5 h-5" style={{ color: white }} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter - Commented out as in original */}
          {/* <div className="lg:pl-12">
            <h4 
              className="text-lg font-medium text-white mb-3 footer-body"
            >
              Stay Updated
            </h4>
            <p 
              className="text-sm mb-6 footer-body"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Subscribe to our newsletter for investment insights and market updates.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 rounded-xl text-sm focus:outline-none placeholder:text-white/40 footer-body"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(167, 147, 112, 0.3)',
                  color: white
                }}
              />
              <button 
                className="px-6 py-4 rounded-xl text-sm font-medium transition-all duration-300 hover:opacity-90 flex items-center gap-2 footer-body"
                style={{ background: gold, color: black }}
              >
                Subscribe
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div> */}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-16 mb-12" style={{ borderBottom: `1px solid rgba(167, 147, 112, 0.2)` }}>
          
          {/* Company */}
          <div>
            <h5 
              className="text-xs font-medium tracking-[0.2em] uppercase mb-6 footer-heading"
              style={{ color: gold }}
            >
              {t('footer.sections.company')}
            </h5>
            <ul className="space-y-3">
              {footerLinks.company.map((link: any, idx: number) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-sm transition-colors duration-300 footer-body"
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = white
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
                    }}
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
              className="text-xs font-medium tracking-[0.2em] uppercase mb-6 footer-heading"
              style={{ color: gold }}
            >
              {t('footer.sections.services')}
            </h5>
            <ul className="space-y-3">
              {footerLinks.services.map((link: any, idx: number) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-sm transition-colors duration-300 footer-body"
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = white
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
                    }}
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
              className="text-xs font-medium tracking-[0.2em] uppercase mb-6 footer-heading"
              style={{ color: gold }}
            >
              {t('footer.sections.investors')}
            </h5>
            <ul className="space-y-3">
              {footerLinks.investors.map((link: any, idx: number) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-sm transition-colors duration-300 footer-body"
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = white
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
                    }}
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
              className="text-xs font-medium tracking-[0.2em] uppercase mb-6 footer-heading"
              style={{ color: gold }}
            >
              {t('footer.sections.legal')}
            </h5>
            <ul className="space-y-3">
              {footerLinks.legal.map((link: any, idx: number) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-sm transition-colors duration-300 footer-body"
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = white
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
                    }}
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
              className="text-sm footer-body"
              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
            >
              {t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}
            </p>
            <div 
              className="hidden sm:block w-px h-4"
              style={{ background: gold }}
            />
            <p 
              className="text-sm footer-body"
              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
            >
              {t('footer.location')}
            </p>
          </div>

          {/* Compliance Badges */}
          <div className="flex items-center gap-4">
            <p 
              className="text-xs hidden lg:block footer-heading"
              style={{ color: 'rgba(255, 255, 255, 0.4)' }}
            >
              {t('footer.regulated')}
            </p>
            {['SCA', 'DFM', 'ADGM'].map((badge, idx) => (
              <span 
                key={idx}
                className="px-3 py-1.5 rounded text-xs font-medium footer-heading"
                style={{ 
                  background: 'rgba(167, 147, 112, 0.15)',
                  color: gold
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
        style={{ background: 'rgba(167, 147, 112, 0.15)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = gold
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(167, 147, 112, 0.15)'
        }}
        aria-label={t('footer.backToTop')}
      >
        <ChevronUp className="w-5 h-5" style={{ color: white }} strokeWidth={1.5} />
      </button>

      {/* Decorative Line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }}
      />
    </footer>
  );
};

export default RSWFooter;