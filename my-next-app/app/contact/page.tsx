'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Send,
  CheckCircle2,
  Minus,
  Building2,
  Clock,
  Shield
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const ContactPage = () => {
  const { t, locale, direction } = useI18n();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const purple = '#432c96';
  const isRTL = direction === 'rtl';

  // Get translations
  const contact = (t as any)('contact');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - replace with actual endpoint
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: '',
          email: '',
          interest: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Phone,
      label: contact.methods.phone.label,
      sublabel: contact.methods.phone.sublabel,
      href: `tel:${contact.methods.phone.label.replace(/\s/g, '')}`
    },
    {
      icon: Mail,
      label: contact.methods.email.label,
      sublabel: contact.methods.email.sublabel,
      href: `mailto:${contact.methods.email.label}`
    },
    {
      icon: MessageCircle,
      label: contact.methods.whatsapp.label,
      sublabel: contact.methods.whatsapp.sublabel,
      href: 'https://wa.me/97126123456'
    }
  ];

  return (
    <div className="min-h-screen bg-white" dir={direction}>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&family=Tajawal:wght@300;400;500;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700;800&family=Cairo:wght@300;400;600;700;800&display=swap');
        
        [dir="ltr"] .contact-title { font-family: 'Playfair Display', serif; }
        [dir="rtl"] .contact-title { font-family: 'Tajawal', sans-serif; }
        [dir="ltr"] .contact-body { font-family: 'Inter', sans-serif; }
        [dir="rtl"] .contact-body { font-family: 'IBM Plex Sans Arabic', sans-serif; }
        [dir="ltr"] .contact-mono { font-family: 'Space Mono', monospace; }
        [dir="rtl"] .contact-mono { font-family: 'Cairo', sans-serif; font-weight: 700; }
        
        .image-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.03) 3px);
          opacity: 0.15;
          pointer-events: none;
        }
      `}</style>
      
      {/* Hero - Editorial Masthead */}
      <section className="relative h-screen overflow-hidden" style={{ background: purple }}>
        
        <div className="absolute inset-0 image-grain">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" 
            alt="Contact RSW" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(67, 44, 150, 0.5)' }}/>
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.2 }} 
              className={isRTL ? 'text-right' : ''}
            >
              {/* Issue/Edition Style */}
              <div className="mb-8">
                <div className={`contact-mono text-xs uppercase mb-2 ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`} 
                  style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {locale === 'ar' ? 'مجموعة RSW للاستثمار' : 'RSW Investment Group'}
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-px w-12" style={{ background: 'rgba(255, 255, 255, 0.4)' }} />
                  <div className={`contact-mono text-xs ${locale === 'ar' ? '' : 'tracking-widest'}`} 
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {contact.eyebrow}
                  </div>
                </div>
              </div>

              {/* Main Editorial Title */}
              <h1 className="contact-title text-6xl lg:text-8xl font-light text-white mb-8 leading-[1.05]" 
                style={{ letterSpacing: '-0.01em' }}>
                {contact.title}
              </h1>

              {/* Deck/Subtitle */}
              <div className="max-w-2xl">
                <p className="contact-body text-lg leading-relaxed text-white/90 mb-8">
                  {contact.description}
                </p>

                {/* Byline Style */}
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Minus className="w-6 h-6 text-white/60" strokeWidth={1} />
                  <span className="contact-body text-sm text-white/70">
                    {locale === 'ar' ? 'نحن هنا للمساعدة' : 'We\'re Here to Help'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)' }} />
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          
          <div className={`mb-16 ${isRTL ? 'text-right' : ''}`}>
            <div className={`contact-mono text-[10px] uppercase mb-6 ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`} 
              style={{ color: purple }}>
              {locale === 'ar' ? 'طرق التواصل' : 'Contact Methods'}
            </div>
            <h2 className="contact-title text-3xl lg:text-4xl font-light" 
              style={{ color: purple, letterSpacing: '-0.01em' }}>
              {locale === 'ar' ? 'تواصل معنا مباشرة' : 'Reach Us Directly'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, idx) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={idx}
                  href={method.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`group p-8 bg-white transition-all duration-300 hover:shadow-lg ${isRTL ? 'text-right' : ''}`}
                  style={{ border: '1px solid rgba(67, 44, 150, 0.1)' }}
                  whileHover={{ y: -4 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 transition-all duration-300"
                    style={{ background: 'rgba(67, 44, 150, 0.08)' }}>
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" 
                      style={{ color: purple }} strokeWidth={1.5} />
                  </div>
                  <div className={`contact-mono text-[9px] uppercase mb-2 ${locale === 'ar' ? '' : 'tracking-wider'}`} 
                    style={{ color: 'rgba(67, 44, 150, 0.5)' }}>
                    {method.sublabel}
                  </div>
                  <div className="contact-body text-lg font-semibold" style={{ color: purple }}>
                    {method.label}
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content - Form & Location */}
      <section className="py-24 lg:py-32" style={{ background: '#fafafa' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Left - Contact Form */}
            <div className={isRTL ? 'text-right' : ''}>
              <div className={`contact-mono text-[10px] uppercase mb-6 ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`} 
                style={{ color: purple }}>
                {contact.form.title}
              </div>

              <h2 className="contact-title text-3xl lg:text-4xl font-light mb-4" 
                style={{ color: purple, letterSpacing: '-0.01em' }}>
                {contact.form.subtitle}
              </h2>

              <div className={`flex items-center gap-2 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Clock className="w-4 h-4" style={{ color: 'rgba(67, 44, 150, 0.5)' }} strokeWidth={1.5} />
                <span className="contact-body text-sm" style={{ color: 'rgba(67, 44, 150, 0.6)' }}>
                  {locale === 'ar' ? 'الرد خلال 24 ساعة' : 'Response within 24 hours'}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="contact-body text-sm font-medium mb-2 block" style={{ color: purple }}>
                    {contact.form.fields.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder={contact.form.placeholders.name}
                    required
                    className="contact-body w-full px-4 py-3 bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple/20"
                    style={{ 
                      border: '1px solid rgba(67, 44, 150, 0.2)',
                      color: purple
                    }}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="contact-body text-sm font-medium mb-2 block" style={{ color: purple }}>
                    {contact.form.fields.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder={contact.form.placeholders.email}
                    required
                    className="contact-body w-full px-4 py-3 bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple/20"
                    style={{ 
                      border: '1px solid rgba(67, 44, 150, 0.2)',
                      color: purple
                    }}
                  />
                </div>

                {/* Interest Field */}
                <div>
                  <label className="contact-body text-sm font-medium mb-2 block" style={{ color: purple }}>
                    {contact.form.fields.interest}
                  </label>
                  <select
                    name="interest"
                    value={formState.interest}
                    onChange={handleChange}
                    required
                    className="contact-body w-full px-4 py-3 bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple/20"
                    style={{ 
                      border: '1px solid rgba(67, 44, 150, 0.2)',
                      color: formState.interest ? purple : 'rgba(67, 44, 150, 0.5)'
                    }}
                  >
                    <option value="">{contact.form.placeholders.interest}</option>
                    {contact.form.interests.map((interest: string, idx: number) => (
                      <option key={idx} value={interest}>{interest}</option>
                    ))}
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label className="contact-body text-sm font-medium mb-2 block" style={{ color: purple }}>
                    {contact.form.fields.message}
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder={contact.form.placeholders.message}
                    rows={6}
                    className="contact-body w-full px-4 py-3 bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple/20 resize-none"
                    style={{ 
                      border: '1px solid rgba(67, 44, 150, 0.2)',
                      color: purple
                    }}
                  />
                </div>

                {/* Privacy Notice */}
                <p className="contact-body text-xs" style={{ color: 'rgba(67, 44, 150, 0.5)' }}>
                  {contact.form.privacy}
                </p>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`contact-body w-full flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
                  style={{ 
                    background: isSubmitted ? '#10b981' : purple,
                    color: 'white',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" strokeWidth={2} />
                      <span>{locale === 'ar' ? 'تم الإرسال!' : 'Sent!'}</span>
                    </>
                  ) : isSubmitting ? (
                    <span>{contact.form.submitting}</span>
                  ) : (
                    <>
                      <span>{contact.form.submit}</span>
                      <Send className="w-4 h-4" strokeWidth={2} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right - Location & Info */}
            <div className={`space-y-12 ${isRTL ? 'text-right' : ''}`}>
              
              {/* Location */}
              <div>
                <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MapPin className="w-6 h-6" style={{ color: purple }} strokeWidth={1.5} />
                  <h3 className="contact-title text-2xl font-light" style={{ color: purple }}>
                    {contact.location.title}
                  </h3>
                </div>
                <p className="contact-body text-base leading-relaxed whitespace-pre-line" 
                  style={{ color: 'rgba(67, 44, 150, 0.7)' }}>
                  {contact.location.address}
                </p>

                {/* Map placeholder */}
                <div className="mt-6 aspect-video rounded-lg overflow-hidden image-grain">
                  <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                    alt="Abu Dhabi Location"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Compliance Badges */}
              <div className="pt-8" style={{ borderTop: '1px solid rgba(67, 44, 150, 0.1)' }}>
                <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Shield className="w-6 h-6" style={{ color: purple }} strokeWidth={1.5} />
                  <div>
                    <div className={`contact-mono text-[9px] uppercase ${locale === 'ar' ? '' : 'tracking-wider'}`} 
                      style={{ color: 'rgba(67, 44, 150, 0.5)' }}>
                      {contact.badges.regulated}
                    </div>
                  </div>
                </div>

                <div className={`flex flex-wrap gap-3 ${isRTL ? 'justify-end' : ''}`}>
                  {contact.badges.authorities.map((authority: string, idx: number) => (
                    <div
                      key={idx}
                      className="px-4 py-2"
                      style={{ 
                        background: 'rgba(67, 44, 150, 0.08)',
                        border: '1px solid rgba(67, 44, 150, 0.1)'
                      }}
                    >
                      <span className={`contact-mono text-xs font-bold ${locale === 'ar' ? '' : 'tracking-wide'}`} 
                        style={{ color: purple }}>
                        {authority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Hours */}
              <div className="pt-8" style={{ borderTop: '1px solid rgba(67, 44, 150, 0.1)' }}>
                <div className={`contact-mono text-[9px] uppercase mb-3 ${locale === 'ar' ? '' : 'tracking-wider'}`} 
                  style={{ color: 'rgba(67, 44, 150, 0.5)' }}>
                  {locale === 'ar' ? 'ساعات العمل' : 'Office Hours'}
                </div>
                <div className="contact-body text-sm space-y-2" style={{ color: purple }}>
                  <div>{locale === 'ar' ? 'الأحد - الخميس: 9:00 - 18:00' : 'Sunday - Thursday: 9:00 AM - 6:00 PM'}</div>
                  <div>{locale === 'ar' ? 'الجمعة - السبت: مغلق' : 'Friday - Saturday: Closed'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;