'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const RSWCTASection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormData({ name: '', email: '', company: '', interest: '', message: '' });
  };

  const interests = [
    'Real Estate Investment',
    'Commercial Brokerage',
    'Technology Ventures',
    'Construction Projects',
    'Partnership Inquiry',
    'General Inquiry'
  ];

  const contactMethods = [
    {
      icon: Phone,
      label: '+971 2 612 3456',
      sublabel: 'Direct Line',
      href: 'tel:+97126123456'
    },
    {
      icon: Mail,
      label: 'invest@rswinvestment.ae',
      sublabel: 'Email Us',
      href: 'mailto:invest@rswinvestment.ae'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      sublabel: 'Quick Response',
      href: 'https://wa.me/97126123456'
    }
  ];

  return (
    <section className="relative overflow-hidden py-16 lg:py-24" style={{ background: '#ffffff' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        .cta-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        .cta-body {
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
              className="cta-body text-[10px] tracking-[0.25em] uppercase font-medium"
              style={{ color: 'rgba(67, 44, 150, 0.6)' }}
            >
              Get in Touch
            </span>
            <div className="w-8 h-px" style={{ background: '#432c96' }} />
          </motion.div>
          
          <motion.h2 
            className="cta-title text-4xl lg:text-5xl leading-tight mb-4"
            style={{ color: '#432c96' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Let's Start a Conversation
          </motion.h2>

          <motion.p 
            className="cta-body text-sm max-w-2xl mx-auto"
            style={{ color: 'rgba(67, 44, 150, 0.6)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Connect with our team to explore investment opportunities tailored to your goals
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
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
                    background: 'rgba(67, 44, 150, 0.03)',
                    border: '1px solid rgba(67, 44, 150, 0.1)'
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(67, 44, 150, 0.08)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: '#432c96' }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="cta-body text-sm font-semibold group-hover:underline" style={{ color: '#432c96' }}>
                      {method.label}
                    </p>
                    <p className="cta-body text-[10px]" style={{ color: 'rgba(67, 44, 150, 0.5)' }}>
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
                background: 'rgba(67, 44, 150, 0.03)',
                border: '1px solid rgba(67, 44, 150, 0.1)'
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(67, 44, 150, 0.08)' }}
                >
                  <MapPin className="w-5 h-5" style={{ color: '#432c96' }} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="cta-body text-sm font-semibold mb-1" style={{ color: '#432c96' }}>
                    RSW Group HQ
                  </p>
                  <p className="cta-body text-[10px] leading-relaxed" style={{ color: 'rgba(67, 44, 150, 0.6)' }}>
                    Al Maryah Island, Abu Dhabi Global Market<br />
                    Abu Dhabi, United Arab Emirates
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
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
              <h3 
                className="cta-body text-lg font-semibold mb-1"
                style={{ color: '#432c96' }}
              >
                Send us a Message
              </h3>
              <p 
                className="cta-body text-[10px] mb-6"
                style={{ color: 'rgba(67, 44, 150, 0.5)' }}
              >
                We'll respond within 24 hours
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label 
                    className="cta-body text-[10px] font-medium mb-1.5 block"
                    style={{ color: '#432c96' }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg cta-body text-xs transition-all duration-300 focus:outline-none"
                    style={{ 
                      background: '#ffffff',
                      border: '1px solid rgba(67, 44, 150, 0.15)',
                      color: '#432c96'
                    }}
                    placeholder="John Smith"
                  />
                </div>

                {/* Email */}
                <div>
                  <label 
                    className="cta-body text-[10px] font-medium mb-1.5 block"
                    style={{ color: '#432c96' }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg cta-body text-xs transition-all duration-300 focus:outline-none"
                    style={{ 
                      background: '#ffffff',
                      border: '1px solid rgba(67, 44, 150, 0.15)',
                      color: '#432c96'
                    }}
                    placeholder="john@company.com"
                  />
                </div>

                {/* Interest */}
                <div>
                  <label 
                    className="cta-body text-[10px] font-medium mb-1.5 block"
                    style={{ color: '#432c96' }}
                  >
                    Area of Interest *
                  </label>
                  <select
                    required
                    value={formData.interest}
                    onChange={(e) => setFormData({...formData, interest: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg cta-body text-xs transition-all duration-300 focus:outline-none appearance-none cursor-pointer"
                    style={{ 
                      background: '#ffffff',
                      border: '1px solid rgba(67, 44, 150, 0.15)',
                      color: formData.interest ? '#432c96' : 'rgba(67, 44, 150, 0.4)'
                    }}
                  >
                    <option value="">Select an option</option>
                    {interests.map((interest, idx) => (
                      <option key={idx} value={interest}>{interest}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label 
                    className="cta-body text-[10px] font-medium mb-1.5 block"
                    style={{ color: '#432c96' }}
                  >
                    Message
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg cta-body text-xs transition-all duration-300 focus:outline-none resize-none"
                    style={{ 
                      background: '#ffffff',
                      border: '1px solid rgba(67, 44, 150, 0.15)',
                      color: '#432c96'
                    }}
                    placeholder="Tell us about your investment goals..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg cta-body text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-70"
                  style={{ 
                    background: '#432c96',
                    color: '#ffffff'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-3.5 h-3.5" strokeWidth={2} />
                    </>
                  )}
                </button>

                <p 
                  className="cta-body text-[9px] text-center"
                  style={{ color: 'rgba(67, 44, 150, 0.4)' }}
                >
                  By submitting, you agree to our Privacy Policy
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div 
          className="pt-8"
          style={{ borderTop: '1px solid rgba(67, 44, 150, 0.1)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <p 
              className="cta-body text-[10px] text-center"
              style={{ color: 'rgba(67, 44, 150, 0.5)' }}
            >
              Regulated by UAE Financial Authorities
            </p>
            <div className="flex items-center gap-3">
              {['SCA', 'DFM', 'ADGM'].map((badge, idx) => (
                <div 
                  key={idx}
                  className="px-3 py-1.5 rounded-lg cta-body text-[10px] font-semibold"
                  style={{ 
                    background: 'rgba(67, 44, 150, 0.08)',
                    color: '#432c96'
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