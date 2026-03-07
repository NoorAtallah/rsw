'use client'

import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/i18n/I18nProvider'
import { createClient } from '@/lib/supabase/client'
import { X, MapPin, Building2, Cpu, Wrench, TrendingUp, Loader2 } from 'lucide-react'

// ─── sector mapping by keyword in title ──────────────────────────────────────
function inferSector(title: string): string {
  const t = title.toLowerCase()
  if (t.includes('tech') || t.includes('digital') || t.includes('ai') || t.includes('innov')) return 'technology'
  if (t.includes('construct') || t.includes('engineer') || t.includes('build')) return 'construction'
  if (t.includes('headquarter') || t.includes('hq') || t.includes('group')) return 'headquarters'
  return 'realEstate'
}

const sectorColors: Record<string, string> = {
  headquarters: '#a79370',
  realEstate:   '#8B7355',
  technology:   '#6B5B45',
  construction: '#7A6A55',
}

const sectorIcons: Record<string, any> = {
  headquarters: TrendingUp,
  realEstate:   Building2,
  technology:   Cpu,
  construction: Wrench,
}

const sectorIcons2: Record<string, string> = {
  headquarters: 'HQ',
  realEstate:   'RE',
  technology:   'TECH',
  construction: 'CON',
}

// ─── types ────────────────────────────────────────────────────────────────────
interface MapPin_ {
  id: string
  lat: number
  lng: number
  city: string
  cityAr: string
  country: string
  countryAr: string
  sector: string
  sectorAr: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  icon: string
  color: string
}

const sectorLabelsAr: Record<string, string> = {
  headquarters: 'المقر الرئيسي',
  realEstate:   'العقارات',
  technology:   'التكنولوجيا',
  construction: 'الإنشاءات',
}

export default function InvestmentMap() {
  const mapRef          = useRef<HTMLDivElement>(null)
  const mapInstanceRef  = useRef<any>(null)
  const markersRef      = useRef<any[]>([])
  const [pins, setPins] = useState<MapPin_[]>([])
  const [activePin, setActivePin]   = useState<MapPin_ | null>(null)
  const [mapLoaded, setMapLoaded]   = useState(false)
  const [dataLoading, setDataLoading] = useState(true)
  const { locale, direction } = useI18n()

  const gold      = '#a79370'
  const white     = '#ffffff'
  const black     = '#000000'
  const isRTL     = direction === 'rtl'
  const fontFamily = locale === 'ar' ? 'Tajawal, sans-serif' : 'Outfit, sans-serif'
  const monoFont   = locale === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Space Mono, monospace'

  // ── 1. Fetch projects ──────────────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('projects')
        .select('id, title_en, title_ar, description_en, description_ar, lat, lng, location_label_en, location_label_ar')
        .eq('status', 'published')
        .not('lat', 'is', null)
        .not('lng', 'is', null)
        .order('order_index')

      if (data) {
        const mapped: MapPin_[] = data.map(p => {
          const sector = inferSector(p.title_en)
          // Split "City, Country" from location_label_en
          const parts   = (p.location_label_en || '').split(',')
          const partsAr = (p.location_label_ar || '').split('،')
          return {
            id:           p.id,
            lat:          parseFloat(p.lat),
            lng:          parseFloat(p.lng),
            city:         parts[0]?.trim()   || p.location_label_en || '',
            cityAr:       partsAr[0]?.trim() || p.location_label_ar || '',
            country:      parts[1]?.trim()   || '',
            countryAr:    partsAr[1]?.trim() || '',
            sector,
            sectorAr:     sectorLabelsAr[sector],
            title:        p.title_en,
            titleAr:      p.title_ar || p.title_en,
            description:  p.description_en,
            descriptionAr: p.description_ar || p.description_en,
            icon:         sectorIcons2[sector],
            color:        sectorColors[sector],
          }
        })
        setPins(mapped)
      }
      setDataLoading(false)
    }
    load()
  }, [])

  // ── 2. Init map (once) ─────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined' || mapInstanceRef.current || dataLoading) return

    const link = document.createElement('link')
    link.rel   = 'stylesheet'
    link.href  = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)

    const script   = document.createElement('script')
    script.src     = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload  = () => {
      if (!mapRef.current) return
      const L = (window as any).L

      // Auto-center: average of all pins, or fallback UAE
      const centerLat = pins.length ? pins.reduce((s, p) => s + p.lat, 0) / pins.length : 24.7
      const centerLng = pins.length ? pins.reduce((s, p) => s + p.lng, 0) / pins.length : 54.8

      const map = L.map(mapRef.current, {
        center: [centerLat, centerLng],
        zoom:   pins.length === 1 ? 10 : 6,
        zoomControl: false,
        attributionControl: false,
      })

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map)

      L.control.zoom({ position: 'topright' }).addTo(map)

      // Add markers
      markersRef.current = pins.map(pin => {
        const html = `
          <div style="position:relative;width:52px;">
            <div style="
              width:52px;height:52px;
              background:${pin.color};
              border:2.5px solid #ffffff;
              border-radius:50%;
              display:flex;align-items:center;justify-content:center;
              font-family:'Space Mono',monospace;font-size:8px;font-weight:700;color:#fff;
              cursor:pointer;
              box-shadow:0 4px 20px rgba(167,147,112,0.5);
              transition:transform 0.2s;
            ">${pin.icon}</div>
            <div style="
              position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);
              width:0;height:0;
              border-left:6px solid transparent;border-right:6px solid transparent;
              border-top:7px solid ${pin.color};
            "></div>
          </div>
        `
        const icon   = L.divIcon({ html, className: '', iconSize: [52, 58], iconAnchor: [26, 56] })
        const marker = L.marker([pin.lat, pin.lng], { icon }).addTo(map)
        marker.on('click', () => {
          setActivePin(pin)
          map.flyTo([pin.lat, pin.lng], 10, { duration: 1 })
        })
        return marker
      })

      // Fit bounds if multiple pins
      if (pins.length > 1) {
        const bounds = L.latLngBounds(pins.map(p => [p.lat, p.lng]))
        map.fitBounds(bounds, { padding: [60, 60] })
      }

      // Zoom control styles
      const style = document.createElement('style')
      style.textContent = `
        .leaflet-control-zoom a { background:#fff !important; color:#000 !important; border-color:#a79370 !important; font-weight:600 !important; }
        .leaflet-control-zoom a:hover { background:#a79370 !important; color:#fff !important; }
        .leaflet-control-zoom { border:1px solid #a79370 !important; border-radius:8px !important; overflow:hidden; box-shadow:none !important; }
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
  }, [dataLoading, pins])

  // ── unique sectors present in pins ────────────────────────────────────────
  const presentSectors = [...new Set(pins.map(p => p.sector))]
  const SectorIcon = activePin ? sectorIcons[activePin.sector] : null

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
            <span className="text-xs tracking-[0.3em] uppercase" style={{ color: gold, fontFamily: monoFont }}>
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
              <><span className="font-bold" style={{ color: black }}>Our Regional Presence</span></>
            )}
          </h2>

          <p className="text-base font-light max-w-2xl mx-auto" style={{ color: 'rgba(0,0,0,0.5)', fontFamily }}>
            {locale === 'ar'
              ? 'نشاط استثماري متنوع عبر قطاعات متعددة. انقر على أي علامة لمعرفة المزيد.'
              : 'Diversified investment activity across multiple sectors. Click any marker to explore.'}
          </p>
        </div>

        {/* Map */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${gold}`, boxShadow: `0 20px 60px rgba(167,147,112,0.12)` }}
        >
          <div ref={mapRef} style={{ height: '520px', width: '100%', background: '#f5f5f5' }} />

          {/* Loading overlay */}
          {(!mapLoaded || dataLoading) && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: white }}>
              <div className="text-center">
                <Loader2
                  className="animate-spin mx-auto mb-4"
                  size={32}
                  style={{ color: gold }}
                />
                <p style={{ color: gold, fontFamily }}>
                  {locale === 'ar' ? 'جارٍ تحميل الخريطة...' : 'Loading map...'}
                </p>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!dataLoading && mapLoaded && pins.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p style={{ color: 'rgba(0,0,0,0.3)', fontFamily, fontSize: 14 }}>
                {locale === 'ar' ? 'لا توجد مشاريع بإحداثيات بعد' : 'No projects with coordinates yet'}
              </p>
            </div>
          )}

          {/* Detail Panel */}
          {activePin && (
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
              <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid rgba(167,147,112,0.2)` }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: activePin.color }}>
                    {SectorIcon && <SectorIcon className="w-4 h-4 text-white" strokeWidth={1.5} />}
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: gold, fontFamily: monoFont }}>
                      {isRTL ? activePin.cityAr : activePin.city}
                    </p>
                    <p className="text-xs" style={{ color: 'rgba(0,0,0,0.4)', fontFamily }}>
                      {isRTL ? activePin.countryAr : activePin.country}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActivePin(null)}
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ background: 'rgba(167,147,112,0.1)', border: `1px solid ${gold}` }}
                  onMouseEnter={e => { e.currentTarget.style.background = gold }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(167,147,112,0.1)' }}
                >
                  <X className="w-3.5 h-3.5" style={{ color: black }} strokeWidth={2} />
                </button>
              </div>

              <div className="px-5 py-4">
                <h4 className="text-base font-bold mb-2" style={{ color: black, fontFamily }}>
                  {isRTL ? activePin.titleAr : activePin.title}
                </h4>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(0,0,0,0.6)', fontFamily }}>
                  {isRTL ? activePin.descriptionAr : activePin.description}
                </p>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(167,147,112,0.08)', color: gold, fontFamily: monoFont, border: `1px solid ${gold}` }}
                >
                  <MapPin className="w-3 h-3" strokeWidth={2} />
                  {isRTL ? activePin.sectorAr : activePin.sector.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            </div>
          )}

          {/* Legend — only sectors that exist in data */}
          {presentSectors.length > 0 && (
            <div
              className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'} rounded-xl px-4 py-3`}
              style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', border: `1px solid ${gold}`, zIndex: 1000 }}
            >
              <p className="text-xs font-medium mb-2" style={{ color: gold, fontFamily: monoFont }}>
                {locale === 'ar' ? 'القطاعات' : 'SECTORS'}
              </p>
              {presentSectors.map(sector => (
                <div key={sector} className="flex items-center gap-2 mb-1 last:mb-0">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: sectorColors[sector] }} />
                  <span className="text-xs" style={{ color: 'rgba(0,0,0,0.6)', fontFamily }}>
                    {locale === 'ar' ? sectorLabelsAr[sector] : sector.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { value: String(pins.length),                                         label: locale === 'ar' ? 'مشاريع نشطة'   : 'Active Projects' },
            { value: String(presentSectors.length),                               label: locale === 'ar' ? 'قطاعات'        : 'Sectors' },
            { value: String(new Set(pins.map(p => p.country).filter(Boolean)).size || '—'), label: locale === 'ar' ? 'دول'           : 'Countries' },
            { value: '2026',                                                       label: locale === 'ar' ? 'توسع نشط'      : 'Active Expansion' },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center py-5 rounded-xl"
              style={{ background: white, border: `1px solid rgba(167,147,112,0.2)`, boxShadow: '0 2px 12px rgba(167,147,112,0.07)' }}
            >
              <p className="text-2xl font-bold mb-1" style={{ color: gold, fontFamily: monoFont }}>{stat.value}</p>
              <p className="text-xs" style={{ color: 'rgba(0,0,0,0.45)', fontFamily }}>{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}