'use client'

import { useState } from 'react'
import ContentEditor from '../components/ContentEditor'
import AboutEditor from '../components/AboutEditor'
import InvestmentsEditor from '../components/InvestmentsEditor'
import InvestorRelationsEditor from '../components/InvestorRelationsEditor'

const sections = [
  { key: 'hero', label: 'Hero' },
  { key: 'about', label: 'About (Text)' },
  { key: 'about-arrays', label: 'About (Tabs & Divisions)' },
  { key: 'investments', label: 'Investments (Text)' },
  { key: 'investments-arrays', label: 'Investments (Cards & Sectors)' },
  { key: 'investorRelations', label: 'Investor Relations (Text)' },
  { key: 'investorRelations-arrays', label: 'Investor Relations (Sections & Docs)' },
  { key: 'contact', label: 'Contact' },
  { key: 'footer', label: 'Footer' },
  { key: 'news', label: 'News Labels' },
]

const gold = '#a79370'

export default function ContentPage() {
  const [active, setActive] = useState('hero')

  return (
    <div className="flex gap-8 min-h-screen">

      {/* Sub-nav */}
      <div className="w-52 flex-shrink-0">
        <p className="text-[10px] uppercase tracking-widest mb-4" style={{ color: '#bbb', fontFamily: 'Space Mono, monospace' }}>
          Sections
        </p>
        <div className="space-y-1">
          {sections.map(s => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className="w-full text-left px-3 py-2.5 rounded-sm text-xs transition-all"
              style={{
                background: active === s.key ? 'rgba(167,147,112,0.1)' : 'transparent',
                color: active === s.key ? gold : '#666',
                borderLeft: active === s.key ? `2px solid ${gold}` : '2px solid transparent',
                fontWeight: active === s.key ? 500 : 400,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 pb-20">
        {active === 'about-arrays' ? <AboutEditor /> :
         active === 'investments-arrays' ? <InvestmentsEditor /> :
         active === 'investorRelations-arrays' ? <InvestorRelationsEditor /> :
         <ContentEditor section={active} />}
      </div>

    </div>
  )
}