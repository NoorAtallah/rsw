'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Cpu, 
  HardHat,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Minus,
  MapPin,
  Calendar,
  TrendingUp,
  Layers,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  id: string
  title: string
  subtitle: string
  sector: string
  size: string
  location: string
  timeline: string
  status: string
  outcome: string
  description: string
  tags: string[]
  image: string
}

const VenturesPage = () => {
  const [activeVenture, setActiveVenture] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t, locale, direction } = useI18n();

  const gold = '#a79370';
  const black = '#000000';
  const white = '#ffffff';
  const cream = '#faf9f6';
  const isRTL = direction === 'rtl';

  // ── Ventures ────────────────────────────────────────────────────────────────
  const ventures = [
    {
      id: 'real-estate',
      icon: Building2,
      number: '01',
      title: locale === 'ar' ? 'العقارات' : 'Real Estate',
      subtitle: locale === 'ar' ? 'الاستثمار التجاري' : 'Commercial Investment',
      description: locale === 'ar' ? 'استثمارات عقارية استراتيجية، تأجير تجاري، وتطوير عقاري عبر أكثر الأسواق الإماراتية الواعدة. نركز على المواقع الاستراتيجية والعقارات عالية الجودة التي توفر عوائد طويلة الأجل.' : "Strategic real estate investments, commercial leasing, and property development across UAE's most promising markets. We focus on prime locations and high-quality properties that deliver long-term value.",
      image: 'https://img.freepik.com/free-photo/tokyo-japan-cityscape-filtered-image-processed-vintage-effect_1232-2427.jpg?semt=ais_hybrid&w=740&q=80',
      capabilities: [
        { title: locale === 'ar' ? 'التأجير التجاري' : 'Commercial Leasing', desc: locale === 'ar' ? 'إدارة مساحات مكتبية وتجزئة متميزة عبر المواقع الرئيسية' : 'Premium office and retail space management across key locations' },
        { title: locale === 'ar' ? 'التطوير العقاري' : 'Property Development', desc: locale === 'ar' ? 'مشاريع تطوير عقاري شاملة من التصور إلى التسليم' : 'Comprehensive development projects from concept to delivery' },
        { title: locale === 'ar' ? 'إدارة الاستثمار' : 'Investment Management', desc: locale === 'ar' ? 'تحسين المحفظة والنمو الاستراتيجي للأصول' : 'Portfolio optimization and strategic asset growth' },
      ],
      projects: locale === 'ar' ? [
        { id: 're-01', title: 'برج أبوظبي التجاري', subtitle: 'مكتب وتجزئة متعددة الاستخدامات', sector: 'العقارات التجارية', size: '12,400 م²', location: 'جزيرة الريم، أبوظبي', timeline: '2021–2023', status: 'مكتمل', outcome: 'نسبة إشغال 94٪ في السنة الأولى', description: 'مبنى تجاري متعدد الاستخدامات يضم مكاتب درجة A ومساحات تجزئة في موقع استراتيجي على جزيرة الريم. المشروع يوفر عوائد إيجارية ثابتة مع ارتفاع تقدير قيمة الأصل.', tags: ['تجاري', 'مكاتب', 'تجزئة'], image: 'https://img.freepik.com/free-photo/tokyo-japan-cityscape-filtered-image-processed-vintage-effect_1232-2427.jpg?semt=ais_hybrid&w=740&q=80' },
        { id: 're-02', title: 'مجمع الشارقة السكني', subtitle: 'وحدات سكنية مخططة', sector: 'العقارات السكنية', size: '8,200 م²', location: 'المجاز، الشارقة', timeline: '2022–2024', status: 'مكتمل', outcome: 'بيع 100٪ قبل الإنجاز بـ 6 أشهر', description: 'مجمع سكني راقٍ يتضمن 48 وحدة سكنية متنوعة. صُمم المشروع لتلبية الطلب المتنامي على المساكن المميزة في الشارقة مع توفير مرافق حديثة وتصاميم معاصرة.', tags: ['سكني', 'وحدات', 'مبيعات'], image: 'https://i.ytimg.com/vi/puQoxZnrwlA/maxresdefault.jpg' },
        { id: 're-03', title: 'مركز دبي اللوجستي', subtitle: 'مستودعات ومرافق صناعية', sector: 'العقارات الصناعية', size: '22,000 م²', location: 'جبل علي، دبي', timeline: '2023–2025', status: 'جاري', outcome: 'عقود مبرمة بنسبة 78٪', description: 'منشأة لوجستية متكاملة في منطقة جبل علي الحرة تخدم متطلبات التخزين والتوزيع للشركات الدولية. الموقع الاستراتيجي يضمن طلبًا دائمًا وعوائد إيجارية قوية.', tags: ['لوجستي', 'صناعي', 'مستودعات'], image: 'https://img.freepik.com/free-photo/tokyo-japan-cityscape-filtered-image-processed-vintage-effect_1232-2427.jpg?semt=ais_hybrid&w=740&q=80' },
      ] : [
        { id: 're-01', title: 'Abu Dhabi Commercial Tower', subtitle: 'Mixed-use office & retail', sector: 'Commercial Real Estate', size: '12,400 m²', location: 'Reem Island, Abu Dhabi', timeline: '2021–2023', status: 'Completed', outcome: '94% occupancy in year one', description: 'A multi-use commercial building featuring Grade-A offices and retail spaces in a prime Reem Island location. The project delivers steady rental yields alongside long-term asset appreciation.', tags: ['Commercial', 'Offices', 'Retail'], image: 'https://img.freepik.com/free-photo/tokyo-japan-cityscape-filtered-image-processed-vintage-effect_1232-2427.jpg?semt=ais_hybrid&w=740&q=80' },
        { id: 're-02', title: 'Sharjah Residential Complex', subtitle: 'Planned residential units', sector: 'Residential Real Estate', size: '8,200 m²', location: 'Al Majaz, Sharjah', timeline: '2022–2024', status: 'Completed', outcome: '100% sold 6 months pre-completion', description: 'A premium residential complex comprising 48 diverse units. Designed to meet the growing demand for quality housing in Sharjah with modern amenities and contemporary design.', tags: ['Residential', 'Units', 'Sales'], image: 'https://i.ytimg.com/vi/puQoxZnrwlA/maxresdefault.jpg' },
        { id: 're-03', title: 'Dubai Logistics Centre', subtitle: 'Warehousing & industrial facilities', sector: 'Industrial Real Estate', size: '22,000 m²', location: 'Jebel Ali, Dubai', timeline: '2023–2025', status: 'Active', outcome: '78% contracts secured', description: 'An integrated logistics facility in the Jebel Ali Free Zone serving the storage and distribution needs of international companies. The strategic location ensures sustained demand and strong rental returns.', tags: ['Logistics', 'Industrial', 'Warehousing'], image: 'https://img.freepik.com/free-photo/tokyo-japan-cityscape-filtered-image-processed-vintage-effect_1232-2427.jpg?semt=ais_hybrid&w=740&q=80' },
      ],
    },
    {
      id: 'construction',
      icon: HardHat,
      number: '02',
      title: locale === 'ar' ? 'البناء' : 'Construction',
      subtitle: locale === 'ar' ? 'التنفيذ المتكامل' : 'Integrated Execution',
      description: locale === 'ar' ? 'حلول إنشائية شاملة من منشآت النفط والغاز إلى المباني التجارية والتصميم الداخلي. نقدم خبرة تقنية متخصصة وإدارة مشاريع من الطراز العالمي.' : 'Full-spectrum construction solutions from oil & gas facilities to commercial buildings and interior design. We deliver specialized technical expertise and world-class project management.',
      image: 'https://media.istockphoto.com/id/2247515387/photo/industrial-plant-structure-with-pipes-and-metal-beams-shows-complex-manufacturing-system.jpg?s=612x612&w=0&k=20&c=hXGM3pe643J0HwBdgHU8Zb4tAQa4zO5OCS0UAA9y9Eg=',
      capabilities: [
        { title: locale === 'ar' ? 'مقاولات البناء' : 'Building Contracting', desc: locale === 'ar' ? 'مشاريع تجارية وسكنية واسعة النطاق ذات معايير عالية' : 'Large-scale commercial and residential projects to exacting standards' },
        { title: locale === 'ar' ? 'منشآت النفط والغاز' : 'Oil & Gas Facilities', desc: locale === 'ar' ? 'بنية تحتية متخصصة للقطاع الصناعي والطاقة' : 'Specialized infrastructure for industrial and energy sectors' },
        { title: locale === 'ar' ? 'التصميم والتنفيذ' : 'Design & Build', desc: locale === 'ar' ? 'حلول متكاملة من المفهوم إلى الإنجاز' : 'Integrated solutions from concept through completion' },
      ],
      projects: locale === 'ar' ? [
        { id: 'co-01', title: 'محطة معالجة المياه — أبوظبي', subtitle: 'بنية تحتية صناعية', sector: 'النفط والغاز', size: 'AED 45M', location: 'منطقة مصفح الصناعية', timeline: '2021–2022', status: 'مكتمل', outcome: 'تسليم قبل الجدول بـ 3 أسابيع', description: 'تصميم وتنفيذ منشأة متكاملة لمعالجة المياه الصناعية تخدم مجمعات النفط والغاز في المنطقة. تضمن المشروع تركيب أنظمة معالجة متقدمة وفق أعلى معايير السلامة الدولية.', tags: ['نفط وغاز', 'بنية تحتية', 'صناعي'], image: 'https://media.istockphoto.com/id/2247515387/photo/industrial-plant-structure-with-pipes-and-metal-beams-shows-complex-manufacturing-system.jpg?s=612x612&w=0&k=20&c=hXGM3pe643J0HwBdgHU8Zb4tAQa4zO5OCS0UAA9y9Eg=' },
        { id: 'co-02', title: 'مجمع المكاتب التجارية — دبي', subtitle: 'بناء تجاري متعدد الطوابق', sector: 'البناء التجاري', size: 'AED 28M', location: 'مدينة دبي للإعلام', timeline: '2022–2023', status: 'مكتمل', outcome: 'صفر حوادث سلامة، تقييم LEED فضي', description: 'إنشاء مجمع مكاتب تجارية حديث من 12 طابقاً مع مرافق متكاملة. نُفذ المشروع وفق أعلى معايير الاستدامة وحصل على شهادة LEED فضي كاعتراف بالممارسات البيئية المتقدمة.', tags: ['تجاري', 'متعدد الطوابق', 'LEED'], image: 'https://media.istockphoto.com/id/862758024/photo/construction-site.jpg?s=612x612&w=0&k=20&c=gYl455m4B91lwQpIidx9YBCxwLaeLKFR632FRaPqffc=' },
        { id: 'co-03', title: 'تجديد الفندق الفاخر — الشارقة', subtitle: 'تصميم داخلي وتجديد شامل', sector: 'التصميم الداخلي', size: 'AED 9M', location: 'وسط مدينة الشارقة', timeline: '2023–2024', status: 'مكتمل', outcome: 'رفع تصنيف الفندق من 4 إلى 5 نجوم', description: 'إعادة تصميم شاملة لفندق من 180 غرفة تضمنت تجديد جميع الغرف والمناطق المشتركة والمطاعم. أسهم التصميم الداخلي الراقي في رفع التصنيف الفندقي وزيادة الإيرادات بنسبة 35٪.', tags: ['تصميم داخلي', 'ضيافة', 'تجديد'], image: 'https://media.istockphoto.com/id/2247515387/photo/industrial-plant-structure-with-pipes-and-metal-beams-shows-complex-manufacturing-system.jpg?s=612x612&w=0&k=20&c=hXGM3pe643J0HwBdgHU8Zb4tAQa4zO5OCS0UAA9y9Eg=' },
      ] : [
        { id: 'co-01', title: 'Water Treatment Plant — Abu Dhabi', subtitle: 'Industrial infrastructure', sector: 'Oil & Gas', size: 'AED 45M', location: 'Mussafah Industrial Area', timeline: '2021–2022', status: 'Completed', outcome: 'Delivered 3 weeks ahead of schedule', description: 'Design and execution of an integrated industrial water treatment facility serving oil and gas complexes in the region. The project included advanced treatment systems installed to the highest international safety standards.', tags: ['Oil & Gas', 'Infrastructure', 'Industrial'], image: 'https://media.istockphoto.com/id/2247515387/photo/industrial-plant-structure-with-pipes-and-metal-beams-shows-complex-manufacturing-system.jpg?s=612x612&w=0&k=20&c=hXGM3pe643J0HwBdgHU8Zb4tAQa4zO5OCS0UAA9y9Eg=' },
        { id: 'co-02', title: 'Commercial Office Complex — Dubai', subtitle: 'Multi-storey commercial build', sector: 'Commercial Construction', size: 'AED 28M', location: 'Dubai Media City', timeline: '2022–2023', status: 'Completed', outcome: 'Zero safety incidents, LEED Silver rated', description: 'Construction of a modern 12-storey commercial office complex with integrated facilities. Executed to the highest sustainability standards, the project received LEED Silver certification in recognition of advanced environmental practices.', tags: ['Commercial', 'Multi-storey', 'LEED'], image: 'https://media.istockphoto.com/id/862758024/photo/construction-site.jpg?s=612x612&w=0&k=20&c=gYl455m4B91lwQpIidx9YBCxwLaeLKFR632FRaPqffc=' },
        { id: 'co-03', title: 'Luxury Hotel Renovation — Sharjah', subtitle: 'Interior design & full refurbishment', sector: 'Interior Design', size: 'AED 9M', location: 'Sharjah City Centre', timeline: '2023–2024', status: 'Completed', outcome: 'Hotel upgraded from 4 to 5 stars', description: 'A comprehensive redesign of a 180-room hotel encompassing all rooms, common areas, and restaurants. The high-end interior design contributed to a star-rating upgrade and a 35% increase in revenue.', tags: ['Interior Design', 'Hospitality', 'Renovation'], image: 'https://media.istockphoto.com/id/2247515387/photo/industrial-plant-structure-with-pipes-and-metal-beams-shows-complex-manufacturing-system.jpg?s=612x612&w=0&k=20&c=hXGM3pe643J0HwBdgHU8Zb4tAQa4zO5OCS0UAA9y9Eg=' },
      ],
    },
    {
      id: 'technology',
      icon: Cpu,
      number: '03',
      title: locale === 'ar' ? 'التكنولوجيا' : 'Technology',
      subtitle: locale === 'ar' ? 'الابتكار الرقمي' : 'Digital Innovation',
      description: locale === 'ar' ? 'حلول تكنولوجية متطورة تشمل أبحاث الذكاء الاصطناعي، الأمن السيبراني، الخدمات السحابية، وتطوير البرمجيات. نقود التحول الرقمي من خلال التكنولوجيا المتقدمة.' : 'Cutting-edge technology solutions spanning AI research, cybersecurity, cloud services, and software development. We drive digital transformation through advanced technology.',
      image: 'https://images.stockcake.com/public/2/b/f/2bf29317-f749-4092-8312-023ebf60baa5_large/server-room-technician-stockcake.jpg',
      capabilities: [
        { title: locale === 'ar' ? 'أبحاث الذكاء الاصطناعي' : 'AI Research', desc: locale === 'ar' ? 'تطوير حلول ذكية للتحديات التجارية المعقدة' : 'Developing intelligent solutions for complex business challenges' },
        { title: locale === 'ar' ? 'الأمن السيبراني' : 'Cybersecurity', desc: locale === 'ar' ? 'حماية شاملة للأنظمة والبيانات المؤسسية' : 'Comprehensive protection for enterprise systems and data' },
        { title: locale === 'ar' ? 'الخدمات السحابية' : 'Cloud Services', desc: locale === 'ar' ? 'بنية تحتية قابلة للتوسع وإدارة سحابية متقدمة' : 'Scalable infrastructure and advanced cloud management' },
      ],
      projects: locale === 'ar' ? [
        { id: 'te-01', title: 'منصة الذكاء الاصطناعي للتمويل', subtitle: 'نظام تحليلي مدعوم بالذكاء الاصطناعي', sector: 'الذكاء الاصطناعي', size: '18 شهراً من التطوير', location: 'أبوظبي + عن بُعد', timeline: '2022–2024', status: 'مكتمل', outcome: 'خفض وقت المعالجة بنسبة 60٪', description: 'تطوير منصة تحليلية متقدمة مدعومة بالذكاء الاصطناعي لأتمتة قرارات الإقراض وتقييم المخاطر لمؤسسة مالية إماراتية. المنصة تعالج آلاف الطلبات يومياً بدقة تفوق المعالجة اليدوية.', tags: ['ذكاء اصطناعي', 'مالية', 'أتمتة'], image: 'https://images.stockcake.com/public/2/b/f/2bf29317-f749-4092-8312-023ebf60baa5_large/server-room-technician-stockcake.jpg' },
        { id: 'te-02', title: 'بنية تحتية سحابية — وزارة حكومية', subtitle: 'ترحيل وتحديث البنية التحتية', sector: 'الخدمات السحابية', size: '200+ خادم', location: 'أبوظبي', timeline: '2023–2024', status: 'مكتمل', outcome: 'توفير 40٪ في التكاليف التشغيلية', description: 'ترحيل شامل لبنية تحتية حكومية من النظام التقليدي إلى السحابة الهجينة. المشروع شمل إعادة هيكلة 200+ خادم وتدريب الفرق التقنية وضمان استمرارية العمل خلال مرحلة الانتقال.', tags: ['سحابة', 'حكومي', 'ترحيل'], image: 'https://abdullahsakkijha.com/wp-content/uploads/2023/10/ezgif.com-gif-maker.jpg' },
        { id: 'te-03', title: 'نظام الأمن السيبراني — بنك خليجي', subtitle: 'حماية وأمن المعلومات', sector: 'الأمن السيبراني', size: 'AED 3.2M', location: 'دبي', timeline: '2024–مستمر', status: 'جاري', outcome: 'صفر اختراقات منذ التطبيق', description: 'تصميم وتنفيذ منظومة أمن سيبراني متكاملة لبنك إقليمي تشمل جدران الحماية المتقدمة ومراقبة التهديدات في الوقت الفعلي وبروتوكولات الاستجابة للحوادث. المنظومة تحمي أصولاً رقمية بمليارات الدراهم.', tags: ['أمن سيبراني', 'بنوك', 'حماية'], image: 'https://images.stockcake.com/public/2/b/f/2bf29317-f749-4092-8312-023ebf60baa5_large/server-room-technician-stockcake.jpg' },
      ] : [
        { id: 'te-01', title: 'AI Finance Platform', subtitle: 'AI-powered analytics system', sector: 'Artificial Intelligence', size: '18 months development', location: 'Abu Dhabi + Remote', timeline: '2022–2024', status: 'Completed', outcome: '60% reduction in processing time', description: 'Development of an advanced AI-powered analytics platform to automate lending decisions and risk assessment for a UAE financial institution. The platform processes thousands of applications daily with accuracy surpassing manual processing.', tags: ['AI', 'Finance', 'Automation'], image: 'https://images.stockcake.com/public/2/b/f/2bf29317-f749-4092-8312-023ebf60baa5_large/server-room-technician-stockcake.jpg' },
        { id: 'te-02', title: 'Cloud Infrastructure — Government Ministry', subtitle: 'Infrastructure migration & modernisation', sector: 'Cloud Services', size: '200+ servers', location: 'Abu Dhabi', timeline: '2023–2024', status: 'Completed', outcome: '40% reduction in operational costs', description: 'Comprehensive migration of government infrastructure from legacy systems to hybrid cloud. The project involved restructuring 200+ servers, training technical teams, and ensuring business continuity throughout the transition.', tags: ['Cloud', 'Government', 'Migration'], image: 'https://abdullahsakkijha.com/wp-content/uploads/2023/10/ezgif.com-gif-maker.jpg' },
        { id: 'te-03', title: 'Cybersecurity System — Gulf Bank', subtitle: 'Information security & protection', sector: 'Cybersecurity', size: 'AED 3.2M', location: 'Dubai', timeline: '2024–Ongoing', status: 'Active', outcome: 'Zero breaches since deployment', description: 'Design and implementation of an integrated cybersecurity framework for a regional bank, encompassing advanced firewalls, real-time threat monitoring, and incident response protocols. The system protects digital assets worth billions of dirhams.', tags: ['Cybersecurity', 'Banking', 'Protection'], image: 'https://images.stockcake.com/public/2/b/f/2bf29317-f749-4092-8312-023ebf60baa5_large/server-room-technician-stockcake.jpg' },
      ],
    },
  ];

  const activeV = ventures[activeVenture];

  const statusColor = (status: string) => {
    const s = status.toLowerCase()
    if (s === 'completed' || s === 'مكتمل') return { bg: 'rgba(167,147,112,0.12)', color: gold }
    if (s === 'active' || s === 'جاري') return { bg: 'rgba(167,147,112,0.2)', color: '#8a7355' }
    return { bg: 'rgba(0,0,0,0.06)', color: 'rgba(0,0,0,0.5)' }
  }

  return (
    <div className="min-h-screen bg-white" dir={direction}>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&family=Tajawal:wght@300;400;500;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700;800&family=Cairo:wght@300;400;600;700;800&display=swap');
        
        [dir="ltr"] .ventures-title { font-family: 'Playfair Display', serif; }
        [dir="rtl"] .ventures-title { font-family: 'Tajawal', sans-serif; }
        [dir="ltr"] .ventures-body { font-family: 'Inter', sans-serif; }
        [dir="rtl"] .ventures-body { font-family: 'IBM Plex Sans Arabic', sans-serif; }
        [dir="ltr"] .ventures-mono { font-family: 'Space Mono', monospace; }
        [dir="rtl"] .ventures-mono { font-family: 'Cairo', sans-serif; font-weight: 700; }
        
        .image-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.03) 3px);
          opacity: 0.15;
          pointer-events: none;
        }

        .project-card:hover .project-arrow { opacity: 1; transform: translate(0, 0); }
      `}</style>
      
      {/* ══ HERO — ORIGINAL ═════════════════════════════════════════════════ */}
      <section className="relative h-screen overflow-hidden" style={{ background: black }}>
        <div className="absolute inset-0 image-grain">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80" alt="RSW Ventures" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: 'rgba(0, 0, 0, 0.5)' }}/>
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 w-full">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className={isRTL ? 'text-right' : ''}>
              <div className="mb-8">
                <div className={`ventures-mono text-xs uppercase mb-2 ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`} style={{ color: gold }}>
                  {locale === 'ar' ? 'مجموعة RSW للاستثمار' : 'RSW Investment Group'}
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-px w-12" style={{ background: gold }} />
                  <div className={`ventures-mono text-xs ${locale === 'ar' ? '' : 'tracking-widest'}`} style={{ color: gold }}>
                    {locale === 'ar' ? '2026' : 'MMXXVI'}
                  </div>
                </div>
              </div>

              <h1 className="ventures-title text-6xl lg:text-8xl font-light text-white mb-8 leading-[1.05]" style={{ letterSpacing: '-0.01em' }}>
                {locale === 'ar' ? (<>استثمارات<br/><span className="italic font-serif" style={{ color: gold }}>استراتيجية</span><br/>عبر ثلاثة قطاعات</>) : (<>Strategic<br/><span className="italic font-serif" style={{ color: gold }}>Investments</span><br/>Across Three Sectors</>)}
              </h1>

              <div className="max-w-2xl">
                <p className="ventures-body text-lg leading-relaxed text-white/90 mb-8">
                  {locale === 'ar' ? 'نهج متكامل للاستثمار في العقارات والبناء والتكنولوجيا، يدمج الخبرة العميقة في السوق مع الرؤية طويلة المدى.' : 'An integrated approach to real estate, construction, and technology investment, combining deep market expertise with long-term vision.'}
                </p>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Minus className="w-6 h-6" style={{ color: gold }} strokeWidth={1} />
                  <span className="ventures-body text-sm" style={{ color: gold }}>
                    {locale === 'ar' ? 'أبوظبي، الإمارات العربية المتحدة' : 'Abu Dhabi, United Arab Emirates'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2">
            <div className="w-px h-16" style={{ background: `linear-gradient(to bottom, ${gold}, transparent)` }} />
          </motion.div>
        </div>
      </section>

      {/* ══ TABLE OF CONTENTS — ORIGINAL ════════════════════════════════════ */}
      <section className="py-16 border-b" style={{ borderColor: 'rgba(167, 147, 112, 0.2)' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className={`ventures-mono text-[10px] uppercase mb-8 ${isRTL ? 'text-right' : ''} ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`} style={{ color: gold }}>
            {locale === 'ar' ? 'المحتويات' : 'Contents'}
          </div>
          <div className="grid md:grid-cols-3 gap-1">
            {ventures.map((venture, idx) => {
              const Icon = venture.icon;
              return (
                <button key={idx} onClick={() => { setActiveVenture(idx); setSelectedProject(null); }}
                  className={`group text-left p-8 transition-all duration-300 ${isRTL ? 'text-right' : ''}`}
                  style={{ background: activeVenture === idx ? 'rgba(167, 147, 112, 0.08)' : 'transparent', borderBottom: activeVenture === idx ? `2px solid ${gold}` : '2px solid transparent' }}
                >
                  <div className={`flex items-start gap-4 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="ventures-mono text-xs" style={{ color: 'rgba(167, 147, 112, 0.5)' }}>{venture.number}</span>
                    <Icon className="w-5 h-5" style={{ color: gold }} strokeWidth={1.5} />
                  </div>
                  <h3 className="ventures-title text-2xl font-light mb-1" style={{ color: black }}>{venture.title}</h3>
                  <p className="ventures-body text-xs" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>{venture.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ FEATURE ARTICLE — ORIGINAL + PROJECT CARDS BELOW ════════════════ */}
      <AnimatePresence mode="wait">
        {ventures.map((venture, idx) => {
          const Icon = venture.icon;
          return activeVenture === idx && (
            <motion.article key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="py-24 lg:py-32 bg-white">
              <div className="max-w-6xl mx-auto px-6 lg:px-12">

                {/* Article Header */}
                <div className={`mb-16 ${isRTL ? 'text-right' : ''}`}>
                  <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="ventures-mono text-sm" style={{ color: 'rgba(167, 147, 112, 0.5)' }}>{venture.number}</span>
                    <Minus className="w-8 h-8" style={{ color: 'rgba(167, 147, 112, 0.3)' }} strokeWidth={1} />
                    <span className={`ventures-mono text-xs uppercase ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`} style={{ color: gold }}>{venture.subtitle}</span>
                  </div>
                  <h2 className="ventures-title text-5xl lg:text-7xl font-light mb-8 leading-[1.05]" style={{ color: black, letterSpacing: '-0.01em' }}>{venture.title}</h2>
                </div>

                {/* Two Column — Original */}
                <div className="grid lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-7">
                    <div className="relative aspect-[4/5] rounded-sm overflow-hidden image-grain mb-4">
                      <img src={venture.image} alt={venture.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(167, 147, 112, 0.15) 0%, transparent 50%)' }} />
                    </div>
                    <div className={`ventures-body text-xs italic ${isRTL ? 'text-right' : ''}`} style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                      {locale === 'ar' ? `${venture.title} — نظرة عامة على القطاع` : `${venture.title} — Sector Overview`}
                    </div>
                  </div>

                  <div className={`lg:col-span-5 ${isRTL ? 'text-right' : ''}`}>
                    <div className="mb-12">
                      <p className="ventures-body text-lg leading-relaxed" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>{venture.description}</p>
                    </div>

                    <div>
                      <h3 className={`ventures-mono text-[10px] uppercase mb-8 ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`} style={{ color: gold }}>
                        {locale === 'ar' ? 'القدرات الأساسية' : 'Core Capabilities'}
                      </h3>
                      <div className="space-y-8">
                        {venture.capabilities.map((cap, capIdx) => (
                          <motion.div key={capIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: capIdx * 0.1 }} className="pb-8" style={{ borderBottom: '1px solid rgba(167, 147, 112, 0.2)' }}>
                            <h4 className="ventures-title text-xl font-light mb-3" style={{ color: black }}>{cap.title}</h4>
                            <p className="ventures-body text-sm leading-relaxed" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>{cap.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(167, 147, 112, 0.2)' }}>
                      <button className={`group inline-flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="ventures-body text-sm font-medium" style={{ color: gold }}>{locale === 'ar' ? 'استكشف المزيد' : 'Explore Further'}</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" style={{ color: gold, transform: isRTL ? 'scaleX(-1)' : 'none' }} strokeWidth={1.5} />
                      </button>
                    </div> */}
                  </div>
                </div>

                {/* ── PROJECT INDEX (new) ──────────────────────────────────── */}
                <div className="mt-24 pt-16" style={{ borderTop: '1px solid rgba(167,147,112,0.2)' }}>
                  <div className={`flex items-end justify-between mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={isRTL ? 'text-right' : ''}>
                      <div className={`ventures-mono text-[10px] uppercase mb-3 ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`} style={{ color: gold }}>
                        {locale === 'ar' ? 'مشاريع منتقاة' : 'Selected Projects'}
                      </div>
                      <h3 className="ventures-title text-3xl lg:text-4xl font-light" style={{ color: black }}>
                        {locale === 'ar' ? 'الأعمال المنجزة' : 'Portfolio Work'}
                      </h3>
                    </div>
                    <span className="ventures-mono text-xs" style={{ color: 'rgba(167,147,112,0.5)' }}>
                      {locale === 'ar' ? `${venture.projects.length} مشاريع` : `${venture.projects.length} Projects`}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {venture.projects.map((project, pi) => {
                      const sc = statusColor(project.status)
                      return (
                        <motion.button
                          key={pi}
                          className={`project-card text-left w-full overflow-hidden group ${isRTL ? 'text-right' : ''}`}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: pi * 0.1 }}
                          onClick={() => setSelectedProject(project as Project)}
                          style={{
                            background: white,
                            border: '1px solid rgba(167,147,112,0.18)',
                            borderRadius: 4,
                            position: 'relative',
                          }}
                        >
                          {/* Image */}
                          <div className="relative h-44 overflow-hidden">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
                            {/* Status badge */}
                            <div style={{ position: 'absolute', top: 14, left: isRTL ? 'auto' : 14, right: isRTL ? 14 : 'auto', background: sc.bg, color: sc.color, backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 20, border: `1px solid ${sc.color}33` }}>
                              <span className="ventures-mono" style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{project.status}</span>
                            </div>
                            {/* Arrow */}
                            <div className="project-arrow" style={{ position: 'absolute', bottom: 14, right: isRTL ? 'auto' : 14, left: isRTL ? 14 : 'auto', opacity: 0, transform: 'translate(4px, 4px)', transition: 'all 0.3s ease', background: gold, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <ArrowUpRight size={14} color={black} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <div className={`ventures-mono text-[9px] uppercase mb-3 ${locale === 'ar' ? '' : 'tracking-wider'}`} style={{ color: gold }}>{project.sector}</div>
                            <h4 className="ventures-title text-lg font-medium mb-1 leading-tight" style={{ color: black }}>{project.title}</h4>
                            <p className="ventures-body text-xs mb-5" style={{ color: 'rgba(0,0,0,0.5)' }}>{project.subtitle}</p>

                            {/* Meta row */}
                            <div className={`flex items-center gap-4 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <Calendar size={11} color={gold} strokeWidth={1.5} />
                                <span className="ventures-mono" style={{ fontSize: 10, color: 'rgba(0,0,0,0.45)' }}>{project.timeline}</span>
                              </div>
                              <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <Layers size={11} color={gold} strokeWidth={1.5} />
                                <span className="ventures-mono" style={{ fontSize: 10, color: 'rgba(0,0,0,0.45)' }}>{project.size}</span>
                              </div>
                            </div>

                            {/* Outcome teaser */}
                            <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(167,147,112,0.15)' }}>
                              <div className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <TrendingUp size={11} color={gold} strokeWidth={1.5} style={{ marginTop: 2, flexShrink: 0 }} />
                                <span className="ventures-body" style={{ fontSize: 11, color: gold, lineHeight: 1.4 }}>{project.outcome}</span>
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

              </div>
            </motion.article>
          );
        })}
      </AnimatePresence>

      {/* ══ PROJECT DETAIL PANEL ════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProject(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 40, backdropFilter: 'blur(4px)', cursor: 'pointer' }}
            />

            {/* Panel — slides in from right (or left for RTL) */}
            <motion.div
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              dir={direction}
              style={{
                position: 'fixed',
                top: 0, bottom: 0,
                [isRTL ? 'left' : 'right']: 0,
                width: '100%',
                maxWidth: 680,
                background: white,
                zIndex: 50,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Panel Header */}
              <div style={{ position: 'sticky', top: 0, background: white, borderBottom: '1px solid rgba(167,147,112,0.2)', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`ventures-mono text-[10px] uppercase ${locale === 'ar' ? '' : 'tracking-widest'}`} style={{ color: gold }}>{selectedProject.sector}</span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(167,147,112,0.3)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: gold, transition: 'background 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = gold; (e.currentTarget as HTMLElement).style.color = black }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = gold }}
                >
                  <X size={15} />
                </button>
              </div>

              {/* Panel Image */}
              <div className="relative h-64 overflow-hidden flex-shrink-0 image-grain">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
                {/* Status */}
                <div style={{ position: 'absolute', bottom: 20, left: isRTL ? 'auto' : 24, right: isRTL ? 24 : 'auto' }}>
                  <div style={{ background: statusColor(selectedProject.status).bg, color: statusColor(selectedProject.status).color, border: `1px solid ${statusColor(selectedProject.status).color}44`, padding: '5px 14px', borderRadius: 20, display: 'inline-block' }}>
                    <span className="ventures-mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{selectedProject.status}</span>
                  </div>
                </div>
              </div>

              {/* Panel Body */}
              <div style={{ padding: '36px 32px', flex: 1 }} className={isRTL ? 'text-right' : ''}>

                {/* Title block */}
                <div className="mb-8">
                  <h2 className="ventures-title" style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 600, color: black, lineHeight: 1.2, marginBottom: 8 }}>
                    {selectedProject.title}
                  </h2>
                  <p className="ventures-body" style={{ fontSize: 14, color: 'rgba(0,0,0,0.5)' }}>{selectedProject.subtitle}</p>
                </div>

                {/* Key facts grid */}
                <div className="grid grid-cols-2 gap-px mb-8" style={{ background: 'rgba(167,147,112,0.15)', border: '1px solid rgba(167,147,112,0.15)' }}>
                  {[
                    { icon: Layers,    label: locale === 'ar' ? 'الحجم'     : 'Size',     value: selectedProject.size },
                    { icon: MapPin,    label: locale === 'ar' ? 'الموقع'    : 'Location', value: selectedProject.location },
                    { icon: Calendar,  label: locale === 'ar' ? 'الجدول الزمني' : 'Timeline', value: selectedProject.timeline },
                    { icon: CheckCircle2, label: locale === 'ar' ? 'القطاع'  : 'Sector',   value: selectedProject.sector },
                  ].map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div key={i} style={{ background: white, padding: '18px 20px' }} className={isRTL ? 'text-right' : ''}>
                        <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                          <Icon size={13} color={gold} strokeWidth={1.5} />
                          <span className={`ventures-mono text-[9px] uppercase ${locale === 'ar' ? '' : 'tracking-wider'}`} style={{ color: 'rgba(0,0,0,0.4)' }}>{item.label}</span>
                        </div>
                        <div className="ventures-body" style={{ fontSize: 13, fontWeight: 500, color: black }}>{item.value}</div>
                      </div>
                    )
                  })}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <div className={`ventures-mono text-[10px] uppercase mb-4 ${locale === 'ar' ? '' : 'tracking-[0.25em]'}`} style={{ color: gold }}>
                    {locale === 'ar' ? 'نظرة عامة' : 'Overview'}
                  </div>
                  <p className="ventures-body" style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(0,0,0,0.72)' }}>
                    {selectedProject.description}
                  </p>
                </div>

                {/* Outcome highlight */}
                <div style={{ background: 'rgba(167,147,112,0.07)', border: '1px solid rgba(167,147,112,0.2)', borderRadius: 8, padding: '20px 22px', marginBottom: 32 }}>
                  <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <TrendingUp size={18} color={gold} strokeWidth={1.5} style={{ marginTop: 2, flexShrink: 0 }} />
                    <div className={isRTL ? 'text-right' : ''}>
                      <div className={`ventures-mono text-[9px] uppercase mb-1.5 ${locale === 'ar' ? '' : 'tracking-wider'}`} style={{ color: gold }}>
                        {locale === 'ar' ? 'النتيجة المحققة' : 'Achieved Outcome'}
                      </div>
                      <div className="ventures-title" style={{ fontSize: 18, fontWeight: 600, color: black, lineHeight: 1.3 }}>
                        {selectedProject.outcome}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className={`flex flex-wrap gap-2 mb-10 ${isRTL ? 'justify-end' : ''}`}>
                  {selectedProject.tags.map((tag, ti) => (
                    <span key={ti} style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: gold, background: 'rgba(167,147,112,0.08)', border: '1px solid rgba(167,147,112,0.2)', padding: '4px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{tag}</span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  style={{ width: '100%', background: gold, color: black, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, padding: '15px 28px', borderRadius: 4, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'opacity 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                >
                  <span>{locale === 'ar' ? 'طلب معلومات عن هذا المشروع' : 'Request Information About This Project'}</span>
                  <ArrowUpRight size={14} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ══ EDITORIAL FOOTER — ORIGINAL ══════════════════════════════════════ */}
      <section className="py-24 border-t" style={{ borderColor: 'rgba(167, 147, 112, 0.2)' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={isRTL ? 'text-right' : ''}>
              <div className={`ventures-mono text-[10px] uppercase mb-6 ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`} style={{ color: gold }}>
                {locale === 'ar' ? 'ابدأ المحادثة' : 'Begin the Conversation'}
              </div>
              <h2 className="ventures-title text-4xl lg:text-5xl font-light mb-6 leading-tight" style={{ color: black, letterSpacing: '-0.01em' }}>
                {locale === 'ar' ? (<>استثمر في<br/><span style={{ color: gold }}>المستقبل</span></>) : (<>Invest in<br/><span style={{ color: gold }}>the Future</span></>)}
              </h2>
              <p className="ventures-body text-base leading-relaxed mb-8" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                {locale === 'ar' ? 'تواصل مع فريقنا لمناقشة فرص الاستثمار عبر محفظتنا المتنوعة من العقارات والبناء والتكنولوجيا.' : 'Connect with our team to discuss investment opportunities across our diversified portfolio of real estate, construction, and technology.'}
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <button className="ventures-body inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium transition-all hover:shadow-lg hover:scale-105" style={{ background: gold, color: black }}>
                  <span>{locale === 'ar' ? 'طلب معلومات' : 'Request Information'}</span>
                  <ArrowUpRight className="w-4 h-4" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} strokeWidth={1.5} />
                </button>
                <button className="ventures-body inline-flex items-center justify-center px-8 py-4 text-sm font-medium transition-all" style={{ background: 'transparent', color: gold, border: `1px solid ${gold}` }}
                  onMouseEnter={e => { e.currentTarget.style.background = gold; e.currentTarget.style.color = black }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = gold }}>
                  <span>{locale === 'ar' ? 'حدد استشارة' : 'Schedule Consultation'}</span>
                </button>
              </div>
            </div>

            <div className={`space-y-8 ${isRTL ? 'text-right' : ''}`}>
              {[
                { label: locale === 'ar' ? 'المقر الرئيسي' : 'Headquarters', value: locale === 'ar' ? 'أبوظبي، الإمارات' : 'Abu Dhabi, UAE' },
                { label: locale === 'ar' ? 'القطاعات' : 'Sectors',         value: locale === 'ar' ? 'العقارات • البناء • التكنولوجيا' : 'Real Estate • Construction • Technology' },
                { label: locale === 'ar' ? 'الامتثال' : 'Compliance',      value: locale === 'ar' ? 'متوافق مع هيئة الأوراق المالية في الإمارات' : 'UAE DFM Compliant' },
              ].map((item, i) => (
                <div key={i} className="pb-8" style={{ borderBottom: '1px solid rgba(167, 147, 112, 0.2)' }}>
                  <div className={`ventures-mono text-[9px] uppercase mb-2 ${locale === 'ar' ? '' : 'tracking-wider'}`} style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{item.label}</div>
                  <div className="ventures-body text-sm" style={{ color: gold }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VenturesPage;