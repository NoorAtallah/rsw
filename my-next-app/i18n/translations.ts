export interface Translations {
  nav: {
    home: string
    about: string
    ventures: string
    investorRelations: string
    contact: string
    requestDemo: string
    investments: string
  }
  hero: {
    eyebrow: string
    title: {
      line1: string
      line2: string
    }
    description: string
    cta: {
      explore: string
      investor: string
    }
    verticalText: string
    scroll: string
    ctaCard: {
      title: string
      subtitle: string
    }
  }
  about: {
    eyebrow: string
    title: string
    subtitle: string
    tabs: {
      label: string
      title: string
      content: string
      stats: { value: string; label: string }[]
    }[]
    divisionsTitle: string
    divisions: {
      title: string
      description: string
    }[]
    cta: {
      title: string
      description: string
      primary: string
      secondary: string
    }
    badges: string[]
  }
  investments: {
    eyebrow: string
    title: string
    description: string
    vision: {
      title: string
      description: string
    }
    approachTitle: string
    approach: {
      risk: {
        title: string
        description: string
      }
      operational: {
        title: string
        description: string
      }
      partnerships: {
        title: string
        description: string
      }
      sustainable: {
        title: string
        description: string
      }
    }
    sectorsTitle: string
    sectors: {
      realEstate: {
        title: string
        description: string
      }
      infrastructure: {
        title: string
        description: string
      }
      technology: {
        title: string
        description: string
      }
    }
    learnMore: string
  }
  investorRelations: {
    eyebrow: string
    title: string
    description: string
    sections: {
      governance: {
        title: string
        description: string
      }
      disclosure: {
        title: string
        description: string
      }
      shareholder: {
        title: string
        description: string
      }
      performance: {
        title: string
        description: string
      }
    }
    documentsTitle: string
    documentsSubtitle: string
    documents: {
      name: string
      size: string
      type: string
    }[]
    contact: {
      title: string
      description: string
      button: string
    }
  }
  contact: {
    eyebrow: string
    title: string
    description: string
    methods: {
      phone: {
        label: string
        sublabel: string
      }
      email: {
        label: string
        sublabel: string
      }
      whatsapp: {
        label: string
        sublabel: string
      }
    }
    location: {
      title: string
      address: string
    }
    form: {
      title: string
      subtitle: string
      fields: {
        name: string
        email: string
        interest: string
        message: string
      }
      placeholders: {
        name: string
        email: string
        interest: string
        message: string
      }
      interests: string[]
      submit: string
      submitting: string
      privacy: string
    }
    badges: {
      regulated: string
      authorities: string[]
    }
  }
  footer: {
    tagline: string
    description: string
    sections: {
      company: string
      services: string
      investors: string
      legal: string
    }
    links: {
      company: { label: string; href: string }[]
      services: { label: string; href: string }[]
      investors: { label: string; href: string }[]
      legal: { label: string; href: string }[]
    }
    copyright: string
    location: string
    regulated: string
    backToTop: string
  }
  socialPopup: {
    official: string
    slides: {
      telegram: {
        platform: string
        title: string
        subtitle: string
        description: string
        stats: {
          value: string
          label: string
        }
      }
      instagram: {
        platform: string
        title: string
        subtitle: string
        description: string
        stats: {
          value: string
          label: string
        }
      }
      facebook: {
        platform: string
        title: string
        subtitle: string
        description: string
        stats: {
          value: string
          label: string
        }
      }
    }
    cta: string
    maybeLater: string
    dontShowAgain: string
    hint: string
  }
  news: {
    eyebrow: string
    title: string
    updated: string
    categories: { key: string; label: string }[]
    readMore: string
    viewMore: string
    showLess: string
    items: {
      category: string
      date: string
      readTime: string
      title: string
      excerpt: string
      tag: string
      stats: { value: string; label: string }
    }[]
  }
}

export type Locale = 'en' | 'ar'

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      ventures: 'Ventures',
      investorRelations: 'Investor Relations',
      contact: 'Contact',
      requestDemo: 'REQUEST DEMO',
      investments: 'INVESTMENTS'
    },
    hero: {
      eyebrow: 'Integrated Investment Platform',
      title: {
        line1: 'Where Strategy',
        line2: 'Meets Sustainable Growth'
      },
      description: 'We manage capital with a long-term vision, building value through discipline, analysis, and strategic partnerships. RSW Investment Group operates as an integrated investment platform, allocating capital across diverse sectors with a strong commitment to governance and transparency.',
      cta: {
        explore: 'Explore Ventures',
        investor: 'Investor Relations'
      },
      verticalText: 'Capital Allocation & Strategic Partnerships',
      scroll: 'Scroll',
      ctaCard: {
        title: 'Investment Memo',
        subtitle: 'Request Information'
      }
    },
    about: {
      eyebrow: 'About RSW Group',
      title: 'Four Divisions, One Vision',
      subtitle: 'A unified ecosystem of excellence in Abu Dhabi',
      tabs: [
        {
          label: 'Our Story',
          title: 'Founded on Excellence',
          content: 'Headquartered in Abu Dhabi, RSW Group has evolved into a multifaceted enterprise, operating through four specialized divisions. Our journey is marked by strategic growth, innovation, and an unwavering commitment to quality across every project we undertake.',
          stats: [
            { value: '15+', label: 'Years' },
            { value: '200+', label: 'Projects' },
            { value: '5B+', label: 'AED Value' }
          ]
        },
        {
          label: 'Our Vision',
          title: 'Building the Future',
          content: 'To be the Middle East\'s most trusted integrated group, pioneering sustainable development through innovation, technology, and uncompromising quality. We envision a future where our projects set new standards in excellence and environmental responsibility.',
          stats: [
            { value: '4', label: 'Divisions' },
            { value: '100%', label: 'UAE Licensed' },
            { value: '98%', label: 'Satisfaction' }
          ]
        },
        {
          label: 'Our Team',
          title: 'Expert Professionals',
          content: 'Our success is driven by a diverse team of industry experts, bringing together decades of combined experience in real estate, technology, construction, and software development. Each member is committed to delivering exceptional results.',
          stats: [
            { value: '150+', label: 'Experts' },
            { value: '12', label: 'Nationalities' },
            { value: '24/7', label: 'Operations' }
          ]
        }
      ],
      divisionsTitle: 'Our Business Divisions',
      divisions: [
        { title: 'Real Estate', description: 'Investment, development & management solutions' },
        { title: 'Technology', description: 'AI research, cybersecurity & cloud computing' },
        { title: 'Construction', description: 'End-to-end building & contracting services' },
        { title: 'Software', description: 'Custom development & system integration' }
      ],
      cta: {
        title: 'Ready to Start Your Project?',
        description: 'Let\'s discuss how RSW Group can bring your vision to life with our integrated expertise',
        primary: 'Schedule a Consultation',
        secondary: 'View Our Portfolio'
      },
      badges: ['UAE Licensed', 'ISO Certified', 'Fully Compliant', 'Award Winning']
    },
    investments: {
      eyebrow: 'Strategic Portfolio',
      title: 'Our Investments',
      description: 'RSW\'s investments are distributed across carefully selected strategic sectors, enabling a balance between returns and stability, with long-term scalability.',
      vision: {
        title: 'We complete the vision',
        description: 'Our investments span strategic sectors including real estate, infrastructure, and technology. This diversification enables a balanced approach to returns and stability, while maintaining agility in evolving market conditions.'
      },
      approachTitle: 'Our Approach',
      approach: {
        risk: {
          title: 'Risk & Capital Protection',
          description: 'We place central importance on risk management in all our investment decisions, through portfolio diversification, continuous evaluation, and adherence to clear operational frameworks aimed at protecting capital.'
        },
        operational: {
          title: 'Operational Expertise',
          description: 'RSW\'s role is not limited to financing; it extends to strategic oversight and operational support, enhancing asset efficiency and increasing their long-term value.'
        },
        partnerships: {
          title: 'Strategic Partnerships',
          description: 'We work with local and international partners who possess specialized expertise, enabling more efficient project execution and the achievement of sustainable results.'
        },
        sustainable: {
          title: 'Sustainable Investment',
          description: 'We integrate principles of sustainability and responsibility into our investment decisions, taking into account long-term economic and social impact and strengthening business continuity.'
        }
      },
      sectorsTitle: 'Investment Sectors',
      sectors: {
        realEstate: {
          title: 'Real Estate',
          description: 'We invest in well-studied real estate projects in strategic locations, focusing on operational value and long-term sustainability.'
        },
        infrastructure: {
          title: 'Infrastructure & Construction',
          description: 'We participate in infrastructure and construction projects with clear economic viability, supported by operational and managerial expertise.'
        },
        technology: {
          title: 'Technology & Innovation',
          description: 'We direct capital toward technology projects with high growth potential, focusing on scalable solutions and digital transformation.'
        }
      },
      learnMore: 'Learn More'
    },
    investorRelations: {
      eyebrow: 'Investor Relations',
      title: 'Transparent Communication',
      description: 'At RSW Investment Group, we are committed to transparent and structured communication with our investors. This page provides essential information to support informed investment decisions.',
      sections: {
        governance: {
          title: 'Governance Framework',
          description: 'RSW Investment Group operates under a corporate governance framework that clearly defines roles and responsibilities, ensuring effective oversight of investment activities in line with recognized best practices and regulatory standards.'
        },
        disclosure: {
          title: 'Disclosure Policy',
          description: 'We maintain transparent communication with our investors through regular disclosures, financial reporting, and timely updates on material developments that may impact investment decisions.'
        },
        shareholder: {
          title: 'Shareholder Information',
          description: 'Access comprehensive information about shareholder rights, voting procedures, dividend policies, and general meeting schedules to stay informed about your investments.'
        },
        performance: {
          title: 'Financial Performance',
          description: 'Review our quarterly and annual financial reports, performance metrics, and strategic outlook to understand our growth trajectory and investment returns.'
        }
      },
      documentsTitle: 'Key Documents',
      documentsSubtitle: 'Download essential investor materials',
      documents: [
        { name: 'Annual Report 2025', size: '2.4 MB', type: 'PDF' },
        { name: 'Q4 2025 Financial Results', size: '1.8 MB', type: 'PDF' },
        { name: 'Governance Charter', size: '890 KB', type: 'PDF' },
        { name: 'Investor Presentation', size: '5.2 MB', type: 'PDF' }
      ],
      contact: {
        title: 'Need More Information?',
        description: 'Our Investor Relations team is here to assist you',
        button: 'Contact IR Team'
      }
    },
    contact: {
      eyebrow: 'Get in Touch',
      title: 'Let\'s Start a Conversation',
      description: 'Connect with our team to explore investment opportunities tailored to your goals',
      methods: {
        phone: {
          label: '+971 2 612 3456',
          sublabel: 'Direct Line'
        },
        email: {
          label: 'invest@rswinvestment.ae',
          sublabel: 'Email Us'
        },
        whatsapp: {
          label: 'WhatsApp',
          sublabel: 'Quick Response'
        }
      },
      location: {
        title: 'RSW Group HQ',
        address: 'Al Maryah Island, Abu Dhabi Global Market\nAbu Dhabi, United Arab Emirates'
      },
      form: {
        title: 'Send us a Message',
        subtitle: 'We\'ll respond within 24 hours',
        fields: {
          name: 'Full Name *',
          email: 'Email Address *',
          interest: 'Area of Interest *',
          message: 'Message'
        },
        placeholders: {
          name: 'John Smith',
          email: 'john@company.com',
          interest: 'Select an option',
          message: 'Tell us about your investment goals...'
        },
        interests: [
          'Real Estate Investment',
          'Commercial Brokerage',
          'Technology Ventures',
          'Construction Projects',
          'Partnership Inquiry',
          'General Inquiry'
        ],
        submit: 'Send Message',
        submitting: 'Sending...',
        privacy: 'By submitting, you agree to our Privacy Policy'
      },
      badges: {
        regulated: 'Regulated by UAE Financial Authorities',
        authorities: ['SCA', 'DFM', 'ADGM']
      }
    },
    footer: {
      tagline: 'INVESTMENT GROUP',
      description: 'Building tomorrow\'s success through strategic partnerships and visionary investments across real estate, technology, and construction sectors.',
      sections: {
        company: 'Company',
        services: 'Services',
        investors: 'Investors',
        legal: 'Legal'
      },
      links: {
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
        investors: [
          { label: 'Investment Portfolios', href: '#portfolios' },
          { label: 'Investor Relations', href: '#investor-relations' },
          { label: 'News & Updates', href: '#news' },
          { label: 'Board of Directors', href: '#board' },
          { label: 'Governance', href: '#governance' },
        ],
        legal: [
          { label: 'Privacy Policy', href: '#' },
          { label: 'Terms of Service', href: '#' },
          { label: 'Cookie Policy', href: '#' },
          { label: 'Regulatory Disclosures', href: '#' },
        ]
      },
      copyright: '© {year} RSW Investment Group. All rights reserved.',
      location: 'Abu Dhabi, United Arab Emirates',
      regulated: 'Regulated by:',
      backToTop: 'Back to top'
    },
    socialPopup: {
      official: 'RSW Group Official',
      slides: {
        telegram: {
          platform: 'Telegram',
          title: 'Join 12K+ Members',
          subtitle: 'Get Instant Updates',
          description: 'Exclusive deals, project updates, and direct support from our team',
          stats: {
            value: '12K+',
            label: 'Active Members'
          }
        },
        instagram: {
          platform: 'Instagram',
          title: 'Follow @rsw.group',
          subtitle: 'Daily Inspiration',
          description: 'Behind-the-scenes content, project showcases, and design inspiration',
          stats: {
            value: '25K+',
            label: 'Followers'
          }
        },
        facebook: {
          platform: 'Facebook',
          title: 'Like Our Page',
          subtitle: 'Community & Events',
          description: 'Latest news, community events, and engaging discussions with experts',
          stats: {
            value: '18K+',
            label: 'Likes'
          }
        }
      },
      cta: 'Join {platform}',
      maybeLater: 'Maybe Later',
      dontShowAgain: 'Don\'t show again',
      hint: 'Tap left or right to navigate • Tap X to close'
    },
    news: {
      eyebrow: 'Market Intelligence',
      title: 'Latest News',
      updated: 'Updated February 2026',
      categories: [
        { key: 'all', label: 'All' },
        { key: 'construction', label: 'Construction' },
        { key: 'real estate', label: 'Real Estate' },
        { key: 'investment', label: 'Investment' },
        { key: 'technology', label: 'Technology' }
      ],
      readMore: 'Read More',
      viewMore: 'View More',
      showLess: 'Show Less',
      items: [
        {
          category: 'real estate',
          date: 'Feb 9, 2026',
          readTime: '3 min',
          title: 'Dubai Property Sales Shatter Records',
          excerpt: 'Dubai\'s real estate market has started 2026 with historic momentum, recording AED 72.4 billion in transactions.',
          tag: 'Breaking',
          stats: { value: '63%', label: 'YoY Growth' }
        },
        {
          category: 'construction',
          date: 'Jan 15, 2026',
          readTime: '4 min',
          title: 'UAE Construction Industry Enters Digital Era',
          excerpt: 'The UAE construction sector is undergoing a transformation with 37% of businesses now using AI and machine learning.',
          tag: 'Trends',
          stats: { value: '37%', label: 'Using AI/ML' }
        },
        {
          category: 'investment',
          date: 'Jan 27, 2026',
          readTime: '2 min',
          title: 'Property Finder Secures $170M Investment',
          excerpt: 'Property Finder announced a new $170 million investment from Mubadala Investment Company.',
          tag: 'Investment',
          stats: { value: '$170M', label: 'Funding' }
        },
        {
          category: 'real estate',
          date: 'Jan 12, 2026',
          readTime: '3 min',
          title: 'Abu Dhabi Real Estate Hits $44.6B',
          excerpt: 'Abu Dhabi recorded AED 163.7 billion in real estate transactions with prices rising across key districts.',
          tag: 'Report',
          stats: { value: '47%', label: 'Growth' }
        },
        {
          category: 'construction',
          date: 'Dec 29, 2025',
          readTime: '2 min',
          title: 'UAE Federal Budget Reaches $25 Billion',
          excerpt: 'The UAE Cabinet approved a federal budget of approximately $25 billion for 2026—the largest to date.',
          tag: 'Government',
          stats: { value: '$25B', label: 'Budget' }
        },
        {
          category: 'technology',
          date: 'Jan 6, 2026',
          readTime: '4 min',
          title: 'Property Tokenization Goes Live in Dubai',
          excerpt: 'Dubai Land Department has launched a tokenization pilot integrating blockchain-based property titles.',
          tag: 'Innovation',
          stats: { value: 'Live', label: 'Pilot' }
        },
        {
          category: 'investment',
          date: 'Jan 5, 2026',
          readTime: '3 min',
          title: 'Infrastructure Investment Reshaping Demand',
          excerpt: 'More than AED 143 billion in construction contracts awarded tied to energy and transport infrastructure.',
          tag: 'Infrastructure',
          stats: { value: 'AED 143B', label: 'Contracts' }
        },
        {
          category: 'construction',
          date: 'Jan 20, 2026',
          readTime: '3 min',
          title: 'Construction Output Projected to Grow 5.2%',
          excerpt: 'The UAE construction industry is forecast to grow by 5.2% in real terms during 2026.',
          tag: 'Forecast',
          stats: { value: '5.2%', label: 'Growth' }
        },
        {
          category: 'real estate',
          date: 'Dec 30, 2025',
          readTime: '5 min',
          title: 'Logic-Based Buying Returns to Dubai',
          excerpt: 'Dubai\'s property market is transitioning from momentum-driven decisions to logic-based buying.',
          tag: 'Analysis',
          stats: { value: '63%', label: 'Value-Focused' }
        },
        {
          category: 'technology',
          date: 'Jan 10, 2026',
          readTime: '4 min',
          title: 'Smart Building Systems Transform UAE',
          excerpt: 'IoT and AI-powered building management systems are becoming standard in new developments.',
          tag: 'Tech',
          stats: { value: '82%', label: 'Adoption' }
        },
        {
          category: 'investment',
          date: 'Jan 8, 2026',
          readTime: '3 min',
          title: 'Foreign Direct Investment Surges 24%',
          excerpt: 'UAE attracts record FDI inflows as international investors seek stable growth markets.',
          tag: 'FDI',
          stats: { value: '24%', label: 'Increase' }
        },
        {
          category: 'technology',
          date: 'Dec 28, 2025',
          readTime: '5 min',
          title: 'Virtual Property Tours See 300% Growth',
          excerpt: 'AR and VR technologies revolutionize property viewing experience for international buyers.',
          tag: 'PropTech',
          stats: { value: '300%', label: 'Growth' }
        }
      ]
    }
  },

  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      ventures: 'المشاريع',
      investorRelations: 'علاقات المستثمرين',
      contact: 'اتصل بنا',
      requestDemo: 'طلب عرض توضيحي',
      investments: 'الاستثمارات'
    },
    hero: {
      eyebrow: 'منصة استثمارية متكاملة',
      title: {
        line1: 'حيث تلتقي الاستراتيجية',
        line2: 'بالنمو المستدام'
      },
      description: 'نقوم بإدارة رأس المال برؤية طويلة المدى، وبناء القيمة من خلال الانضباط والتحليل والشراكات الاستراتيجية. تعمل مجموعة RSW للاستثمار كمنصة استثمارية متكاملة، لتخصيص رأس المال عبر قطاعات متنوعة مع التزام قوي بالحوكمة والشفافية.',
      cta: {
        explore: 'استكشف المشاريع',
        investor: 'علاقات المستثمرين'
      },
      verticalText: 'تخصيص رأس المال والشراكات الاستراتيجية',
      scroll: 'تمرير',
      ctaCard: {
        title: 'مذكرة استثمارية',
        subtitle: 'طلب معلومات'
      }
    },
    about: {
      eyebrow: 'عن مجموعة RSW',
      title: 'أربعة أقسام، رؤية واحدة',
      subtitle: 'منظومة موحدة من التميز في أبوظبي',
      tabs: [
        {
          label: 'قصتنا',
          title: 'تأسست على التميز',
          content: 'يقع مقرها الرئيسي في أبوظبي، وقد تطورت مجموعة RSW لتصبح مؤسسة متعددة الأوجه، تعمل من خلال أربعة أقسام متخصصة. يتميز مسيرتنا بالنمو الاستراتيجي والابتكار والالتزام الراسخ بالجودة في كل مشروع نقوم به.',
          stats: [
            { value: '+15', label: 'سنة' },
            { value: '+200', label: 'مشروع' },
            { value: '+5B', label: 'درهم' }
          ]
        },
        {
          label: 'رؤيتنا',
          title: 'بناء المستقبل',
          content: 'أن نكون المجموعة المتكاملة الأكثر ثقة في الشرق الأوسط، رائدة في التنمية المستدامة من خلال الابتكار والتكنولوجيا والجودة التي لا تقبل المساومة. نتصور مستقبلاً تضع فيه مشاريعنا معايير جديدة في التميز والمسؤولية البيئية.',
          stats: [
            { value: '4', label: 'أقسام' },
            { value: '100%', label: 'مرخصة' },
            { value: '98%', label: 'رضا العملاء' }
          ]
        },
        {
          label: 'فريقنا',
          title: 'خبراء محترفون',
          content: 'يقود نجاحنا فريق متنوع من خبراء الصناعة، يجمعون عقوداً من الخبرة المشتركة في العقارات والتكنولوجيا والبناء وتطوير البرمجيات. كل عضو ملتزم بتقديم نتائج استثنائية.',
          stats: [
            { value: '+150', label: 'خبير' },
            { value: '12', label: 'جنسية' },
            { value: '24/7', label: 'عمليات' }
          ]
        }
      ],
      divisionsTitle: 'أقسام أعمالنا',
      divisions: [
        { title: 'العقارات', description: 'حلول الاستثمار والتطوير والإدارة العقارية' },
        { title: 'التكنولوجيا', description: 'أبحاث الذكاء الاصطناعي والأمن السيبراني والحوسبة السحابية' },
        { title: 'البناء', description: 'خدمات البناء والمقاولات الشاملة' },
        { title: 'البرمجيات', description: 'التطوير المخصص وتكامل الأنظمة' }
      ],
      cta: {
        title: 'مستعد لبدء مشروعك؟',
        description: 'دعنا نناقش كيف يمكن لمجموعة RSW أن تحقق رؤيتك بخبراتنا المتكاملة',
        primary: 'حجز استشارة',
        secondary: 'عرض أعمالنا'
      },
      badges: ['مرخصة في الإمارات', 'حاصلة على ISO', 'متوافقة بالكامل', 'حائزة على جوائز']
    },
    investments: {
      eyebrow: 'المحفظة الاستراتيجية',
      title: 'استثماراتنا',
      description: 'تتوزع استثمارات RSW عبر قطاعات استراتيجية مختارة بعناية، مما يتيح التوازن بين العائدات والاستقرار، مع قابلية التوسع على المدى الطويل.',
      vision: {
        title: 'نكمل الرؤية',
        description: 'تمتد استثماراتنا عبر قطاعات استراتيجية بما في ذلك العقارات والبنية التحتية والتكنولوجيا. يتيح هذا التنويع نهجاً متوازناً للعائدات والاستقرار، مع الحفاظ على المرونة في ظروف السوق المتطورة.'
      },
      approachTitle: 'نهجنا الاستثماري',
      approach: {
        risk: {
          title: 'إدارة المخاطر وحماية رأس المال',
          description: 'نضع أهمية مركزية لإدارة المخاطر في جميع قراراتنا الاستثمارية، من خلال تنويع المحفظة والتقييم المستمر والالتزام بالأطر التشغيلية الواضحة التي تهدف إلى حماية رأس المال.'
        },
        operational: {
          title: 'الخبرة التشغيلية',
          description: 'لا يقتصر دور RSW على التمويل؛ بل يمتد إلى الإشراف الاستراتيجي والدعم التشغيلي، مما يعزز كفاءة الأصول ويزيد من قيمتها على المدى الطويل.'
        },
        partnerships: {
          title: 'الشراكات الاستراتيجية',
          description: 'نعمل مع شركاء محليين ودوليين يمتلكون خبرة متخصصة، مما يتيح تنفيذ المشاريع بكفاءة أكبر وتحقيق نتائج مستدامة.'
        },
        sustainable: {
          title: 'الاستثمار المستدام',
          description: 'ندمج مبادئ الاستدامة والمسؤولية في قراراتنا الاستثمارية، مع الأخذ في الاعتبار الأثر الاقتصادي والاجتماعي على المدى الطويل وتعزيز استمرارية الأعمال.'
        }
      },
      sectorsTitle: 'قطاعات الاستثمار',
      sectors: {
        realEstate: {
          title: 'العقارات',
          description: 'نستثمر في مشاريع عقارية مدروسة بعناية في مواقع استراتيجية، مع التركيز على القيمة التشغيلية والاستدامة طويلة الأجل.'
        },
        infrastructure: {
          title: 'البنية التحتية والبناء',
          description: 'نشارك في مشاريع البنية التحتية والبناء ذات الجدوى الاقتصادية الواضحة، مدعومة بالخبرة التشغيلية والإدارية.'
        },
        technology: {
          title: 'التكنولوجيا والابتكار',
          description: 'نوجه رأس المال نحو مشاريع التكنولوجيا ذات إمكانات النمو العالية، مع التركيز على الحلول القابلة للتوسع والتحول الرقمي.'
        }
      },
      learnMore: 'اعرف المزيد'
    },
    investorRelations: {
      eyebrow: 'علاقات المستثمرين',
      title: 'التواصل الشفاف',
      description: 'في مجموعة RSW للاستثمار، نلتزم بالتواصل الشفاف والمنظم مع مستثمرينا. توفر هذه الصفحة المعلومات الأساسية لدعم قرارات الاستثمار المدروسة.',
      sections: {
        governance: {
          title: 'إطار الحوكمة',
          description: 'تعمل مجموعة RSW للاستثمار ضمن إطار حوكمة مؤسسية يحدد بوضوح الأدوار والمسؤوليات، مما يضمن الإشراف الفعال على الأنشطة الاستثمارية وفقاً لأفضل الممارسات المعترف بها والمعايير التنظيمية.'
        },
        disclosure: {
          title: 'سياسة الإفصاح',
          description: 'نحافظ على التواصل الشفاف مع مستثمرينا من خلال الإفصاحات المنتظمة والتقارير المالية والتحديثات في الوقت المناسب حول التطورات الجوهرية التي قد تؤثر على قرارات الاستثمار.'
        },
        shareholder: {
          title: 'معلومات المساهمين',
          description: 'الوصول إلى معلومات شاملة حول حقوق المساهمين وإجراءات التصويت وسياسات توزيع الأرباح وجداول الاجتماعات العامة للبقاء على اطلاع دائم بشأن استثماراتك.'
        },
        performance: {
          title: 'الأداء المالي',
          description: 'راجع تقاريرنا المالية الفصلية والسنوية ومقاييس الأداء والنظرة الاستراتيجية لفهم مسار نمونا وعوائد الاستثمار.'
        }
      },
      documentsTitle: 'المستندات الرئيسية',
      documentsSubtitle: 'تنزيل المواد الأساسية للمستثمرين',
      documents: [
        { name: 'التقرير السنوي 2025', size: '2.4 ميجابايت', type: 'PDF' },
        { name: 'النتائج المالية للربع الرابع 2025', size: '1.8 ميجابايت', type: 'PDF' },
        { name: 'ميثاق الحوكمة', size: '890 كيلوبايت', type: 'PDF' },
        { name: 'عرض المستثمرين', size: '5.2 ميجابايت', type: 'PDF' }
      ],
      contact: {
        title: 'هل تحتاج إلى مزيد من المعلومات؟',
        description: 'فريق علاقات المستثمرين لدينا هنا لمساعدتك',
        button: 'اتصل بفريق علاقات المستثمرين'
      }
    },
    contact: {
      eyebrow: 'تواصل معنا',
      title: 'لنبدأ المحادثة',
      description: 'تواصل مع فريقنا لاستكشاف فرص الاستثمار المصممة خصيصاً لأهدافك',
      methods: {
        phone: {
          label: '٣٤٥٦ ٦١٢ ٢ ٩٧١+',
          sublabel: 'خط مباشر'
        },
        email: {
          label: 'invest@rswinvestment.ae',
          sublabel: 'راسلنا'
        },
        whatsapp: {
          label: 'واتساب',
          sublabel: 'استجابة سريعة'
        }
      },
      location: {
        title: 'مقر مجموعة RSW',
        address: 'جزيرة المارية، سوق أبوظبي العالمي\nأبوظبي، الإمارات العربية المتحدة'
      },
      form: {
        title: 'أرسل لنا رسالة',
        subtitle: 'سنرد خلال 24 ساعة',
        fields: {
          name: 'الاسم الكامل *',
          email: 'البريد الإلكتروني *',
          interest: 'مجال الاهتمام *',
          message: 'الرسالة'
        },
        placeholders: {
          name: 'أحمد محمد',
          email: 'ahmed@company.com',
          interest: 'اختر خياراً',
          message: 'أخبرنا عن أهدافك الاستثمارية...'
        },
        interests: [
          'الاستثمار العقاري',
          'الوساطة التجارية',
          'المشاريع التقنية',
          'مشاريع البناء',
          'استفسار شراكة',
          'استفسار عام'
        ],
        submit: 'إرسال الرسالة',
        submitting: 'جارٍ الإرسال...',
        privacy: 'بالإرسال، فإنك توافق على سياسة الخصوصية الخاصة بنا'
      },
      badges: {
        regulated: 'منظمة من قبل السلطات المالية الإماراتية',
        authorities: ['SCA', 'DFM', 'ADGM']
      }
    },
    footer: {
      tagline: 'مجموعة الاستثمار',
      description: 'بناء نجاح الغد من خلال الشراكات الاستراتيجية والاستثمارات الرؤيوية في قطاعات العقارات والتكنولوجيا والبناء.',
      sections: {
        company: 'الشركة',
        services: 'الخدمات',
        investors: 'المستثمرون',
        legal: 'قانوني'
      },
      links: {
        company: [
          { label: 'عن RSW', href: '#' },
          { label: 'قيادتنا', href: '#' },
          { label: 'الوظائف', href: '#' },
          { label: 'الأخبار والرؤى', href: '#' },
          { label: 'اتصل بنا', href: '#' },
        ],
        services: [
          { label: 'الاستثمار العقاري', href: '#' },
          { label: 'الوساطة التجارية', href: '#' },
          { label: 'إدارة المحافظ', href: '#' },
          { label: 'تقييم المخاطر', href: '#' },
          { label: 'تطوير الشراكات', href: '#' },
        ],
        investors: [
          { label: 'المحافظ الاستثمارية', href: '#portfolios' },
          { label: 'علاقات المستثمرين', href: '#investor-relations' },
          { label: 'الأخبار والتحديثات', href: '#news' },
          { label: 'مجلس الإدارة', href: '#board' },
          { label: 'الحوكمة', href: '#governance' },
        ],
        legal: [
          { label: 'سياسة الخصوصية', href: '#' },
          { label: 'شروط الخدمة', href: '#' },
          { label: 'سياسة ملفات تعريف الارتباط', href: '#' },
          { label: 'الإفصاحات التنظيمية', href: '#' },
        ]
      },
      copyright: '© {year} مجموعة RSW للاستثمار. جميع الحقوق محفوظة.',
      location: 'أبوظبي، الإمارات العربية المتحدة',
      regulated: 'منظمة من قبل:',
      backToTop: 'العودة إلى الأعلى'
    },
    socialPopup: {
      official: 'مجموعة RSW الرسمية',
      slides: {
        telegram: {
          platform: 'تيليجرام',
          title: 'انضم إلى +12 ألف عضو',
          subtitle: 'احصل على التحديثات الفورية',
          description: 'عروض حصرية، تحديثات المشاريع، ودعم مباشر من فريقنا',
          stats: {
            value: '+12 ألف',
            label: 'عضو نشط'
          }
        },
        instagram: {
          platform: 'إنستجرام',
          title: 'تابعنا @rsw.group',
          subtitle: 'إلهام يومي',
          description: 'محتوى من وراء الكواليس، عرض المشاريع، وإلهام التصميم',
          stats: {
            value: '+25 ألف',
            label: 'متابع'
          }
        },
        facebook: {
          platform: 'فيسبوك',
          title: 'أعجبني للصفحة',
          subtitle: 'المجتمع والفعاليات',
          description: 'آخر الأخبار، فعاليات المجتمع، ومناقشات جذابة مع الخبراء',
          stats: {
            value: '+18 ألف',
            label: 'إعجاب'
          }
        }
      },
      cta: 'انضم إلى {platform}',
      maybeLater: 'ربما لاحقاً',
      dontShowAgain: 'عدم الإظهار مرة أخرى',
      hint: 'اضغط يميناً أو يساراً للتنقل • اضغط X للإغلاق'
    },
    news: {
      eyebrow: 'معلومات السوق',
      title: 'آخر الأخبار',
      updated: 'محدّث فبراير 2026',
      categories: [
        { key: 'all', label: 'الكل' },
        { key: 'construction', label: 'البناء' },
        { key: 'real estate', label: 'العقارات' },
        { key: 'investment', label: 'الاستثمار' },
        { key: 'technology', label: 'التكنولوجيا' }
      ],
      readMore: 'اقرأ المزيد',
      viewMore: 'عرض المزيد',
      showLess: 'عرض أقل',
      items: [
        {
          category: 'real estate',
          date: '٩ فبراير ٢٠٢٦',
          readTime: '٣ دقائق',
          title: 'مبيعات عقارات دبي تحطم الأرقام القياسية',
          excerpt: 'بدأ سوق العقارات في دبي عام 2026 بزخم تاريخي، مسجلاً 72.4 مليار درهم في المعاملات.',
          tag: 'عاجل',
          stats: { value: '٦٣٪', label: 'نمو سنوي' }
        },
        {
          category: 'construction',
          date: '١٥ يناير ٢٠٢٦',
          readTime: '٤ دقائق',
          title: 'قطاع البناء الإماراتي يدخل العصر الرقمي',
          excerpt: 'يشهد قطاع البناء في الإمارات تحولاً حيث تستخدم 37% من الشركات الذكاء الاصطناعي والتعلم الآلي.',
          tag: 'اتجاهات',
          stats: { value: '٣٧٪', label: 'يستخدمون AI' }
        },
        {
          category: 'investment',
          date: '٢٧ يناير ٢٠٢٦',
          readTime: '٢ دقائق',
          title: 'بروبرتي فايندر تحصل على استثمار بقيمة 170 مليون دولار',
          excerpt: 'أعلنت بروبرتي فايندر عن استثمار جديد بقيمة 170 مليون دولار من شركة مبادلة للاستثمار.',
          tag: 'استثمار',
          stats: { value: '$170M', label: 'تمويل' }
        },
        {
          category: 'real estate',
          date: '١٢ يناير ٢٠٢٦',
          readTime: '٣ دقائق',
          title: 'عقارات أبوظبي تصل إلى 44.6 مليار دولار',
          excerpt: 'سجلت أبوظبي 163.7 مليار درهم في المعاملات العقارية مع ارتفاع الأسعار في المناطق الرئيسية.',
          tag: 'تقرير',
          stats: { value: '٤٧٪', label: 'نمو' }
        },
        {
          category: 'construction',
          date: '٢٩ ديسمبر ٢٠٢٥',
          readTime: '٢ دقائق',
          title: 'الميزانية الاتحادية للإمارات تصل إلى 25 مليار دولار',
          excerpt: 'وافق مجلس الوزراء الإماراتي على ميزانية اتحادية تقارب 25 مليار دولار لعام 2026 وهي الأكبر حتى الآن.',
          tag: 'حكومي',
          stats: { value: '$25B', label: 'ميزانية' }
        },
        {
          category: 'technology',
          date: '٦ يناير ٢٠٢٦',
          readTime: '٤ دقائق',
          title: 'ترميز العقارات ينطلق في دبي',
          excerpt: 'أطلقت دائرة الأراضي في دبي مشروعاً تجريبياً للترميز يدمج سندات الملكية القائمة على البلوكتشين.',
          tag: 'ابتكار',
          stats: { value: 'مباشر', label: 'تجريبي' }
        },
        {
          category: 'investment',
          date: '٥ يناير ٢٠٢٦',
          readTime: '٣ دقائق',
          title: 'استثمارات البنية التحتية تعيد تشكيل الطلب',
          excerpt: 'تم منح عقود بناء بأكثر من 143 مليار درهم مرتبطة بالبنية التحتية للطاقة والنقل.',
          tag: 'بنية تحتية',
          stats: { value: '143B AED', label: 'عقود' }
        },
        {
          category: 'construction',
          date: '٢٠ يناير ٢٠٢٦',
          readTime: '٣ دقائق',
          title: 'إنتاج البناء يُتوقع نموه بنسبة 5.2%',
          excerpt: 'من المتوقع أن تنمو صناعة البناء في الإمارات بنسبة 5.2% بالقيمة الحقيقية خلال 2026.',
          tag: 'توقعات',
          stats: { value: '٥.٢٪', label: 'نمو' }
        },
        {
          category: 'real estate',
          date: '٣٠ ديسمبر ٢٠٢٥',
          readTime: '٥ دقائق',
          title: 'عودة الشراء المبني على المنطق في دبي',
          excerpt: 'ينتقل سوق العقارات في دبي من القرارات المدفوعة بالزخم إلى الشراء القائم على التحليل.',
          tag: 'تحليل',
          stats: { value: '٦٣٪', label: 'تركيز على القيمة' }
        },
        {
          category: 'technology',
          date: '١٠ يناير ٢٠٢٦',
          readTime: '٤ دقائق',
          title: 'أنظمة المباني الذكية تغير الإمارات',
          excerpt: 'أصبحت أنظمة إدارة المباني المدعومة بإنترنت الأشياء والذكاء الاصطناعي معياراً في المشاريع الجديدة.',
          tag: 'تقنية',
          stats: { value: '٨٢٪', label: 'اعتماد' }
        },
        {
          category: 'investment',
          date: '٨ يناير ٢٠٢٦',
          readTime: '٣ دقائق',
          title: 'الاستثمار الأجنبي المباشر يرتفع 24%',
          excerpt: 'تجذب الإمارات تدفقات قياسية من الاستثمار الأجنبي المباشر مع بحث المستثمرين عن أسواق نمو مستقرة.',
          tag: 'استثمار أجنبي',
          stats: { value: '٢٤٪', label: 'زيادة' }
        },
        {
          category: 'technology',
          date: '٢٨ ديسمبر ٢٠٢٥',
          readTime: '٥ دقائق',
          title: 'جولات العقارات الافتراضية تنمو 300%',
          excerpt: 'تقنيات الواقع المعزز والافتراضي تحدث ثورة في تجربة مشاهدة العقارات للمشترين الدوليين.',
          tag: 'تقنية عقارية',
          stats: { value: '٣٠٠٪', label: 'نمو' }
        }
      ]
    }
  }
}