'use client'

import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/i18n/I18nProvider'
import { X, MapPin, Building2, Cpu, Wrench, TrendingUp } from 'lucide-react'

const investments = [
  {
    id: 1,
    lat: 24.4539,
    lng: 54.3773,
    city: 'Abu Dhabi',
    cityAr: 'أبوظبي',
    country: 'UAE',
    countryAr: 'الإمارات',
    sector: 'headquarters',
    sectorAr: 'المقر الرئيسي',
    title: 'RSW Group Headquarters',
    titleAr: 'مقر مجموعة RSW',
    description: 'Our main hub for strategic investment decisions, portfolio oversight, and investor relations across all verticals.',
    descriptionAr: 'مركزنا الرئيسي لاتخاذ قرارات الاستثمار الاستراتيجية والإشراف على المحفظة وعلاقات المستثمرين.',
    icon: 'HQ',
    color: '#a79370',
  },
  {
    id: 2,
    lat: 25.2048,
    lng: 55.2708,
    city: 'Dubai',
    cityAr: 'دبي',
    country: 'UAE',
    countryAr: 'الإمارات',
    sector: 'realEstate',
    sectorAr: 'العقارات',
    title: 'Real Estate Division',
    titleAr: 'قطاع العقارات',
    description: 'Active portfolio spanning residential and commercial leasing, property development, and brokerage across Dubai.',
    descriptionAr: 'محفظة نشطة تشمل الإيجارات السكنية والتجارية وتطوير العقارات والوساطة في دبي.',
    icon: 'RE',
    color: '#8B7355',
  },
  {
    id: 3,
    lat: 24.47,
    lng: 54.37,
    city: 'Abu Dhabi',
    cityAr: 'أبوظبي',
    country: 'UAE',
    countryAr: 'الإمارات',
    sector: 'technology',
    sectorAr: 'التكنولوجيا',
    title: 'Technology & Innovation',
    titleAr: 'التكنولوجيا والابتكار',
    description: 'Investments in AI research, cybersecurity, cloud infrastructure, and IT consultancy services.',
    descriptionAr: 'استثمارات في أبحاث الذكاء الاصطناعي والأمن السيبراني والبنية السحابية وخدمات استشارات تكنولوجيا المعلومات.',
    icon: 'TECH',
    color: '#6B5B45',
  },
  {
    id: 4,
    lat: 24.38,
    lng: 54.52,
    city: 'Abu Dhabi',
    cityAr: 'أبوظبي',
    country: 'UAE',
    countryAr: 'الإمارات',
    sector: 'construction',
    sectorAr: 'الإنشاءات',
    title: 'Construction & Engineering',
    titleAr: 'الإنشاء والهندسة',
    description: 'End-to-end construction services including oil & gas facilities, mechanical & electrical contracting, and interior design.',
    descriptionAr: 'خدمات إنشائية متكاملة تشمل منشآت النفط والغاز والمقاولات الميكانيكية والكهربائية والديكور الداخلي.',
    icon: 'CON',
    color: '#7A6A55',
  },
]

const sectorIcons: Record<string, any> = {
  headquarters: TrendingUp,
  realEstate: Building2,
  technology: Cpu,
  construction: Wrench,
}

export default function InvestmentMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [activeMarker, setActiveMarker] = useState<typeof investments[0] | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const { locale, direction } = useI18n()

  const gold = '#a79370'
  const white = '#ffffff'
  const black = '#000000'
  const isRTL = direction === 'rtl'
  const fontFamily = locale === 'ar' ? 'Tajawal, sans-serif' : 'Outfit, sans-serif'
  const monoFont = locale === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Space Mono, monospace'

  useEffect(() => {
    if (typeof window === 'undefined' || mapInstanceRef.current) return

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => {
      if (!mapRef.current) return
      const L = (window as any).L

      const map = L.map(mapRef.current, {
        center: [24.7, 54.8],
        zoom: 8,
        zoomControl: false,
        attributionControl: false,
      })

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map)

      L.control.zoom({ position: 'topright' }).addTo(map)

      investments.forEach((inv) => {
        const html = `
          <div style="position:relative;width:52px;">
            <div style="
              width:52px;height:52px;
              background:${inv.color};
              border:2.5px solid #ffffff;
              border-radius:50%;
              display:flex;align-items:center;justify-content:center;
              font-family:'Space Mono',monospace;font-size:8px;font-weight:700;color:#fff;
              cursor:pointer;
              box-shadow:0 4px 20px rgba(167,147,112,0.5);
            ">${inv.icon}</div>
            <div style="
              position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);
              width:0;height:0;
              border-left:6px solid transparent;border-right:6px solid transparent;
              border-top:7px solid ${inv.color};
            "></div>
          </div>
        `

        const icon = L.divIcon({
          html,
          className: '',
          iconSize: [52, 58],
          iconAnchor: [26, 56],
        })

        const marker = L.marker([inv.lat, inv.lng], { icon }).addTo(map)
        marker.on('click', () => {
          setActiveMarker(inv)
          map.flyTo([inv.lat, inv.lng], 10, { duration: 1 })
        })
      })

      const style = document.createElement('style')
      style.textContent = `
        .leaflet-control-zoom a {
          background: #ffffff !important;
          color: #000000 !important;
          border-color: #a79370 !important;
          font-weight: 600 !important;
        }
        .leaflet-control-zoom a:hover {
          background: #a79370 !important;
          color: #ffffff !important;
        }
        .leaflet-control-zoom {
          border: 1px solid #a79370 !important;
          border-radius: 8px !important;
          overflow: hidden;
          box-shadow: none !important;
        }
      `
      document.head.appendChild(style)

      mapInstanceRef.current = map
      setMapLoaded(true)
    }
    document.head.appendChild(script)

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  const SectorIcon = activeMarker ? sectorIcons[activeMarker.sector] : null

  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: white }}
      dir={direction}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=Space+Mono:wght@400;700&family=Tajawal:wght@200;300;400;500;700;800&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');
      `}</style>

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[180px] pointer-events-none opacity-[0.04]"
        style={{ background: gold }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-12 h-px" style={{ background: gold }} />
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: gold, fontFamily: monoFont }}
            >
              {locale === 'ar' ? 'خريطة الاستثمارات' : 'Investment Map'}
            </span>
            <div className="w-12 h-px" style={{ background: gold }} />
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-4"
            style={{ color: black, fontFamily }}
          >
            {locale === 'ar' ? (
              <>مشاريعنا <span className="font-bold" style={{ color: gold }}>الإقليمية</span></>
            ) : (
              <>Our <span className="font-bold" style={{ color: gold }}>Regional</span> Presence</>
            )}
          </h2>

          <p
            className="text-base font-light max-w-2xl mx-auto"
            style={{ color: 'rgba(0,0,0,0.5)', fontFamily }}
          >
            {locale === 'ar'
              ? 'نشاط استثماري متنوع عبر قطاعات متعددة في الإمارات العربية المتحدة. انقر على أي علامة لمعرفة المزيد.'
              : 'Diversified investment activity across multiple sectors in the UAE. Click any marker to explore.'}
          </p>
        </div>

        {/* Map */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${gold}`, boxShadow: `0 20px 60px rgba(167,147,112,0.12)` }}
        >
          <div ref={mapRef} style={{ height: '520px', width: '100%', background: '#f5f5f5' }} />

          {/* Loading */}
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: white }}>
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-full border-2 animate-spin mx-auto mb-4"
                  style={{ borderColor: gold, borderTopColor: 'transparent' }}
                />
                <p style={{ color: gold, fontFamily }}>
                  {locale === 'ar' ? 'جارٍ تحميل الخريطة...' : 'Loading map...'}
                </p>
              </div>
            </div>
          )}

          {/* Detail Panel */}
          {activeMarker && (
            <div
              className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} w-72 rounded-xl overflow-hidden`}
              style={{
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(16px)',
                border: `1px solid ${gold}`,
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                zIndex: 1000,
              }}
            >
              <div
                className="px-5 py-4 flex items-center justify-between"
                style={{ borderBottom: `1px solid rgba(167,147,112,0.2)` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: activeMarker.color }}
                  >
                    {SectorIcon && <SectorIcon className="w-4 h-4 text-white" strokeWidth={1.5} />}
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: gold, fontFamily: monoFont }}>
                      {isRTL ? activeMarker.cityAr : activeMarker.city}
                    </p>
                    <p className="text-xs" style={{ color: 'rgba(0,0,0,0.4)', fontFamily }}>
                      {isRTL ? activeMarker.countryAr : activeMarker.country}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveMarker(null)}
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ background: 'rgba(167,147,112,0.1)', border: `1px solid ${gold}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = gold }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(167,147,112,0.1)' }}
                >
                  <X className="w-3.5 h-3.5" style={{ color: black }} strokeWidth={2} />
                </button>
              </div>

              <div className="px-5 py-4">
                <h4 className="text-base font-bold mb-2" style={{ color: black, fontFamily }}>
                  {isRTL ? activeMarker.titleAr : activeMarker.title}
                </h4>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(0,0,0,0.6)', fontFamily }}>
                  {isRTL ? activeMarker.descriptionAr : activeMarker.description}
                </p>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: 'rgba(167,147,112,0.08)',
                    color: gold,
                    fontFamily: monoFont,
                    border: `1px solid ${gold}`,
                  }}
                >
                  <MapPin className="w-3 h-3" strokeWidth={2} />
                  {isRTL ? activeMarker.sectorAr : activeMarker.sector.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div
            className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'} rounded-xl px-4 py-3`}
            style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${gold}`,
              zIndex: 1000,
            }}
          >
            <p className="text-xs font-medium mb-2" style={{ color: gold, fontFamily: monoFont }}>
              {locale === 'ar' ? 'القطاعات' : 'SECTORS'}
            </p>
            {[
              { label: locale === 'ar' ? 'المقر الرئيسي' : 'Headquarters', color: '#a79370' },
              { label: locale === 'ar' ? 'العقارات' : 'Real Estate', color: '#8B7355' },
              { label: locale === 'ar' ? 'التكنولوجيا' : 'Technology', color: '#6B5B45' },
              { label: locale === 'ar' ? 'الإنشاءات' : 'Construction', color: '#7A6A55' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 mb-1 last:mb-0">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: item.color }} />
                <span className="text-xs" style={{ color: 'rgba(0,0,0,0.6)', fontFamily }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { value: '4', label: locale === 'ar' ? 'قطاعات نشطة' : 'Active Sectors' },
            { value: '2', label: locale === 'ar' ? 'إمارات' : 'Emirates' },
            { value: 'UAE', label: locale === 'ar' ? 'مرخّص' : 'Licensed' },
            { value: '2026', label: locale === 'ar' ? 'توسع نشط' : 'Active Expansion' },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center py-5 rounded-xl"
              style={{
                background: white,
                border: `1px solid rgba(167,147,112,0.2)`,
                boxShadow: '0 2px 12px rgba(167,147,112,0.07)',
              }}
            >
              <p className="text-2xl font-bold mb-1" style={{ color: gold, fontFamily: monoFont }}>
                {stat.value}
              </p>
              <p className="text-xs" style={{ color: 'rgba(0,0,0,0.45)', fontFamily }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}