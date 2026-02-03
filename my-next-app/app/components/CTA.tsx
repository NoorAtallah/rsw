'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Send, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    // Reset form
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

  return (
    <section className="relative overflow-hidden">
      {/* Top Diagonal Section */}
      <div 
        className="relative py-24 lg:py-32"
        style={{ background: '#163b5f' }}
      >
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23BFC7CD' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        {/* Floating Elements */}
        <motion.div 
          className="absolute top-20 left-[10%] w-20 h-20 rounded-full hidden lg:block"
          style={{ background: 'rgba(191, 199, 205, 0.08)' }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-32 right-[15%] w-32 h-32 rounded-full hidden lg:block"
          style={{ background: 'rgba(191, 199, 205, 0.05)' }}
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span 
                  className="text-xs tracking-[0.4em] uppercase mb-6 block"
                  style={{ color: '#BFC7CD' }}
                >
                  Start Your Journey
                </span>
                <h2 className="text-4xl lg:text-6xl font-light text-white leading-tight mb-6">
                  Ready to
                  <span className="font-semibold block mt-2">invest in your future?</span>
                </h2>
                <p 
                  className="text-lg font-light leading-relaxed mb-10 max-w-md"
                  style={{ color: 'rgba(191, 199, 205, 0.85)' }}
                >
                  Connect with our investment team to explore opportunities 
                  tailored to your goals. Request an investment memo today.
                </p>

                {/* Quick Contact Options */}
                <div className="space-y-4 mb-10">
                  <a 
                    href="tel:+97126123456" 
                    className="flex items-center gap-4 group"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ background: 'rgba(191, 199, 205, 0.1)' }}
                    >
                      <Phone className="w-5 h-5" style={{ color: '#BFC7CD' }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-white font-medium group-hover:underline">+971 2 612 3456</p>
                      <p className="text-xs" style={{ color: 'rgba(191, 199, 205, 0.6)' }}>Direct Line</p>
                    </div>
                  </a>
                  
                  <a 
                    href="mailto:invest@rswinvestment.ae" 
                    className="flex items-center gap-4 group"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ background: 'rgba(191, 199, 205, 0.1)' }}
                    >
                      <Mail className="w-5 h-5" style={{ color: '#BFC7CD' }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-white font-medium group-hover:underline">invest@rswinvestment.ae</p>
                      <p className="text-xs" style={{ color: 'rgba(191, 199, 205, 0.6)' }}>Email Us</p>
                    </div>
                  </a>

                  <a 
                    href="https://wa.me/97126123456" 
                    target="_blank"
                    className="flex items-center gap-4 group"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ background: 'rgba(191, 199, 205, 0.1)' }}
                    >
                      <MessageCircle className="w-5 h-5" style={{ color: '#BFC7CD' }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-white font-medium group-hover:underline">WhatsApp</p>
                      <p className="text-xs" style={{ color: 'rgba(191, 199, 205, 0.6)' }}>Quick Response</p>
                    </div>
                  </a>
                </div>

                {/* Location */}
                <div 
                  className="p-6 rounded-2xl"
                  style={{ background: 'rgba(191, 199, 205, 0.08)' }}
                >
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#BFC7CD' }} strokeWidth={1.5} />
                    <div>
                      <p className="text-white font-medium mb-1">RSW Group Headquarters</p>
                      <p className="text-sm" style={{ color: 'rgba(191, 199, 205, 0.7)' }}>
                        Al Maryah Island, Abu Dhabi Global Market<br />
                        Abu Dhabi, United Arab Emirates
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div 
                className="p-8 lg:p-10 rounded-3xl"
                style={{ 
                  background: '#f8f9fa',
                  boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div className="mb-8">
                  <h3 
                    className="text-2xl font-medium mb-2"
                    style={{ color: '#163b5f' }}
                  >
                    Request Investment Memo
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: 'rgba(22, 59, 95, 0.6)' }}
                  >
                    Fill out the form and our team will respond within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Email Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label 
                        className="text-xs font-medium mb-2 block"
                        style={{ color: '#163b5f' }}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none"
                        style={{ 
                          background: 'rgba(22, 59, 95, 0.04)',
                          border: '1px solid rgba(22, 59, 95, 0.1)',
                          color: '#163b5f'
                        }}
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label 
                        className="text-xs font-medium mb-2 block"
                        style={{ color: '#163b5f' }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none"
                        style={{ 
                          background: 'rgba(22, 59, 95, 0.04)',
                          border: '1px solid rgba(22, 59, 95, 0.1)',
                          color: '#163b5f'
                        }}
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label 
                      className="text-xs font-medium mb-2 block"
                      style={{ color: '#163b5f' }}
                    >
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none"
                      style={{ 
                        background: 'rgba(22, 59, 95, 0.04)',
                        border: '1px solid rgba(22, 59, 95, 0.1)',
                        color: '#163b5f'
                      }}
                      placeholder="Your company name"
                    />
                  </div>

                  {/* Interest Area */}
                  <div>
                    <label 
                      className="text-xs font-medium mb-2 block"
                      style={{ color: '#163b5f' }}
                    >
                      Area of Interest *
                    </label>
                    <select
                      required
                      value={formData.interest}
                      onChange={(e) => setFormData({...formData, interest: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none appearance-none cursor-pointer"
                      style={{ 
                        background: 'rgba(22, 59, 95, 0.04)',
                        border: '1px solid rgba(22, 59, 95, 0.1)',
                        color: formData.interest ? '#163b5f' : 'rgba(22, 59, 95, 0.4)'
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
                      className="text-xs font-medium mb-2 block"
                      style={{ color: '#163b5f' }}
                    >
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none resize-none"
                      style={{ 
                        background: 'rgba(22, 59, 95, 0.04)',
                        border: '1px solid rgba(22, 59, 95, 0.1)',
                        color: '#163b5f'
                      }}
                      placeholder="Tell us about your investment goals..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl text-sm font-medium tracking-wider transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-lg disabled:opacity-70"
                    style={{ 
                      background: '#163b5f',
                      color: '#ffffff'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <Send className="w-4 h-4" strokeWidth={1.5} />
                      </>
                    )}
                  </button>

                  {/* Privacy Note */}
                  <p 
                    className="text-xs text-center"
                    style={{ color: 'rgba(22, 59, 95, 0.5)' }}
                  >
                    By submitting, you agree to our Privacy Policy and consent to 
                    receive communications from RSW Group.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Diagonal Cut */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{
            background: '#f8f9fa',
            clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)'
          }}
        />
      </div>

      {/* Trust Indicators */}
      <div 
        className="py-16"
        style={{ background: '#f8f9fa' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <p 
              className="text-sm"
              style={{ color: 'rgba(22, 59, 95, 0.5)' }}
            >
              Regulated by UAE Financial Authorities • SCA & DFM Compliant • PDPL Certified
            </p>
            
            <div className="flex items-center gap-8">
              {['SCA', 'DFM', 'ADGM'].map((badge, idx) => (
                <div 
                  key={idx}
                  className="px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ 
                    background: 'rgba(22, 59, 95, 0.05)',
                    color: '#163b5f'
                  }}
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSWCTASection;