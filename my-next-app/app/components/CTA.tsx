'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider'

const RSWCTASection = () => {
  const { t, locale, direction } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const gold = '#a79370';
  const black = '#000000';
  const white = '#ffffff';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormData({ name: '', email: '', company: '', interest: '', message: '' });
  };

  const interests = t('contact.form.interests');

  const contactMethods = [
    {
      icon: Phone,
      label: t('contact.methods.phone.label'),
      sublabel: t('contact.methods.phone.sublabel'),
      href: 'tel:+97126123456'
    },
    {
      icon: Mail,
      label: t('contact.methods.email.label'),
      sublabel: t('contact.methods.email.sublabel'),
      href: 'mailto:invest@rswinvestment.ae'
    },
    {
      icon: MessageCircle,
      label: t('contact.methods.whatsapp.label'),
      sublabel: t('contact.methods.whatsapp.sublabel'),
      href: 'https://wa.me/97126123456'
    }
  ];

  return (
    <section className="relative overflow-hidden py-16 lg:py-24" style={{ background: white }} dir={direction}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Tajawal:wght@300;400;500;600;700;800&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');
        
        [dir="ltr"] .cta-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        [dir="rtl"] .cta-title {
          font-family: 'Tajawal', sans-serif;
          font-weight: 700;
        }
        
        [dir="ltr"] .cta-body {
          font-family: 'Inter', sans-serif;
        }
        
        [dir="rtl"] .cta-body {
          font-family: 'IBM Plex Sans Arabic', sans-serif;
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
            <div className="w-8 h-px" style={{ background: gold }} />
            <span 
              className="cta-body text-[10px] tracking-[0.25em] uppercase font-medium"
              style={{ color: gold }}
            >
              {t('contact.eyebrow')}
            </span>
            <div className="w-8 h-px" style={{ background: gold }} />
          </motion.div>
          
          <motion.h2 
            className="cta-title text-4xl lg:text-5xl leading-tight mb-4"
            style={{ color: black }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('contact.title')}
          </motion.h2>

          <motion.p 
            className="cta-body text-sm max-w-2xl mx-auto"
            style={{ color: 'rgba(0, 0, 0, 0.6)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('contact.description')}
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <a 
                  key={index}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:shadow-lg group"
                  style={{ 
                    background: 'rgba(167, 147, 112, 0.05)',
                    border: '1px solid rgba(167, 147, 112, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = gold
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(167, 147, 112, 0.2)'
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(167, 147, 112, 0.15)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: gold }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="cta-body text-sm font-semibold group-hover:underline" style={{ color: black }}>
                      {method.label}
                    </p>
                    <p className="cta-body text-[10px]" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                      {method.sublabel}
                    </p>
                  </div>
                </a>
              );
            })}

            {/* Location */}
            <div 
              className="p-4 rounded-xl"
              style={{ 
                background: 'rgba(167, 147, 112, 0.05)',
                border: '1px solid rgba(167, 147, 112, 0.2)'
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(167, 147, 112, 0.15)' }}
                >
                  <MapPin className="w-5 h-5" style={{ color: gold }} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="cta-body text-sm font-semibold mb-1" style={{ color: black }}>
                    {t('contact.location.title')}
                  </p>
                  <p className="cta-body text-[10px] leading-relaxed" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                    {t('contact.location.address')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="p-6 rounded-xl"
              style={{ 
                background: 'rgba(167, 147, 112, 0.05)',
                border: '1px solid rgba(167, 147, 112, 0.2)'
              }}
            >
              <h3 
                className="cta-body text-lg font-semibold mb-1"
                style={{ color: black }}
              >
                {t('contact.form.title')}
              </h3>
              <p 
                className="cta-body text-[10px] mb-6"
                style={{ color: 'rgba(0, 0, 0, 0.5)' }}
              >
                {t('contact.form.subtitle')}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label 
                    className="cta-body text-[10px] font-medium mb-1.5 block"
                    style={{ color: black }}
                  >
                    {t('contact.form.fields.name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg cta-body text-xs transition-all duration-300 focus:outline-none"
                    style={{ 
                      background: white,
                      border: '1px solid rgba(167, 147, 112, 0.25)',
                      color: black
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = gold
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(167, 147, 112, 0.25)'
                    }}
                    placeholder={t('contact.form.placeholders.name')}
                  />
                </div>

                {/* Email */}
                <div>
                  <label 
                    className="cta-body text-[10px] font-medium mb-1.5 block"
                    style={{ color: black }}
                  >
                    {t('contact.form.fields.email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg cta-body text-xs transition-all duration-300 focus:outline-none"
                    style={{ 
                      background: white,
                      border: '1px solid rgba(167, 147, 112, 0.25)',
                      color: black
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = gold
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(167, 147, 112, 0.25)'
                    }}
                    placeholder={t('contact.form.placeholders.email')}
                  />
                </div>

                {/* Interest */}
                <div>
                  <label 
                    className="cta-body text-[10px] font-medium mb-1.5 block"
                    style={{ color: black }}
                  >
                    {t('contact.form.fields.interest')}
                  </label>
                  <select
                    required
                    value={formData.interest}
                    onChange={(e) => setFormData({...formData, interest: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg cta-body text-xs transition-all duration-300 focus:outline-none appearance-none cursor-pointer"
                    style={{ 
                      background: white,
                      border: '1px solid rgba(167, 147, 112, 0.25)',
                      color: formData.interest ? black : 'rgba(0, 0, 0, 0.4)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = gold
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(167, 147, 112, 0.25)'
                    }}
                  >
                    <option value="">{t('contact.form.placeholders.interest')}</option>
                    {interests.map((interest: string, idx: number) => (
                      <option key={idx} value={interest}>{interest}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label 
                    className="cta-body text-[10px] font-medium mb-1.5 block"
                    style={{ color: black }}
                  >
                    {t('contact.form.fields.message')}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg cta-body text-xs transition-all duration-300 focus:outline-none resize-none"
                    style={{ 
                      background: white,
                      border: '1px solid rgba(167, 147, 112, 0.25)',
                      color: black
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = gold
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(167, 147, 112, 0.25)'
                    }}
                    placeholder={t('contact.form.placeholders.message')}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg cta-body text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 disabled:opacity-70"
                  style={{ 
                    background: gold,
                    color: black
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div 
                        className="w-4 h-4 border-2 rounded-full animate-spin" 
                        style={{
                          borderColor: 'rgba(0, 0, 0, 0.3)',
                          borderTopColor: black
                        }}
                      />
                      {t('contact.form.submitting')}
                    </>
                  ) : (
                    <>
                      {t('contact.form.submit')}
                      <Send 
                        className="w-3.5 h-3.5" 
                        strokeWidth={2}
                        style={{
                          transform: locale === 'ar' ? 'scaleX(-1)' : 'none'
                        }}
                      />
                    </>
                  )}
                </button>

                <p 
                  className="cta-body text-[9px] text-center"
                  style={{ color: 'rgba(0, 0, 0, 0.4)' }}
                >
                  {t('contact.form.privacy')}
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div 
          className="pt-8"
          style={{ borderTop: '1px solid rgba(167, 147, 112, 0.2)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <p 
              className="cta-body text-[10px] text-center"
              style={{ color: 'rgba(0, 0, 0, 0.5)' }}
            >
              {t('contact.badges.regulated')}
            </p>
            <div className="flex items-center gap-3">
              {t('contact.badges.authorities').map((badge: string, idx: number) => (
                <div 
                  key={idx}
                  className="px-3 py-1.5 rounded-lg cta-body text-[10px] font-semibold"
                  style={{ 
                    background: 'rgba(167, 147, 112, 0.12)',
                    color: gold
                  }}
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RSWCTASection;