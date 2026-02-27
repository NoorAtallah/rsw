'use client'

import { useState } from 'react'
import {
  Building2, Cpu, HardHat, Shield, Award, Users, Globe, ArrowUpRight,
  Sparkles, Star, TrendingUp, BarChart2, Layers, Zap, Target, Eye,
  Heart, Briefcase, Home, MapPin, Phone, Mail, Clock, Calendar,
  CheckCircle, Lock, Settings, Search, Bell, MessageCircle,
  ChevronRight, ExternalLink, Download, FileText,
  Database, Server, Cloud, Code, Terminal, GitBranch, Package,
  Box, Truck, Factory, Wrench, Hammer, Ruler, Compass, Map, Navigation,
  Sun, Moon, Wind, Leaf, Flag, Crown, Diamond, Gem,
  Coins, DollarSign, PieChart, LineChart, Activity
} from 'lucide-react'

const gold = '#a79370'

export const iconMap: Record<string, any> = {
  Building2, Cpu, HardHat, Shield, Award, Users, Globe, ArrowUpRight,
  Sparkles, Star, TrendingUp, BarChart2, Layers, Zap, Target, Eye,
  Heart, Briefcase, Home, MapPin, Phone, Mail, Clock, Calendar,
  CheckCircle, Lock, Settings, Search, Bell, MessageCircle,
  ChevronRight, ExternalLink, Download, FileText,
  Database, Server, Cloud, Code, Terminal, GitBranch, Package,
  Box, Truck, Factory, Wrench, Hammer, Ruler, Compass, Map, Navigation,
  Sun, Moon, Wind, Leaf, Flag, Crown, Diamond, Gem,
  Coins, DollarSign, PieChart, LineChart, Activity
}

const iconNames = Object.keys(iconMap)

interface Props {
  value: string
  onChange: (name: string) => void
}

export default function IconPicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = iconNames.filter(name =>
    name.toLowerCase().includes(search.toLowerCase())
  )

  const SelectedIcon = value ? iconMap[value] : null

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-4 py-2.5 rounded-sm w-full text-left"
        style={{ border: '1px solid rgba(167,147,112,0.3)', background: '#faf9f6' }}
      >
        {SelectedIcon ? (
          <>
            <SelectedIcon className="w-4 h-4" style={{ color: gold }} />
            <span className="text-sm" style={{ color: '#000' }}>{value}</span>
          </>
        ) : (
          <span className="text-sm" style={{ color: '#bbb' }}>Select an icon...</span>
        )}
        <ChevronRight
          className="w-4 h-4 ml-auto transition-transform"
          style={{ color: '#ccc', transform: open ? 'rotate(90deg)' : 'none' }}
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 right-0 mt-1 rounded-sm z-50 overflow-hidden"
          style={{ border: '1px solid rgba(167,147,112,0.2)', background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
        >
          <div className="p-3" style={{ borderBottom: '1px solid rgba(167,147,112,0.1)' }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search icons..."
              autoFocus
              className="w-full px-3 py-2 text-xs rounded-sm outline-none"
              style={{ border: '1px solid rgba(167,147,112,0.3)', background: '#faf9f6' }}
            />
          </div>
          <div className="grid grid-cols-6 gap-1 p-3 max-h-48 overflow-y-auto">
            {filtered.map(name => {
              const Icon = iconMap[name]
              return (
                <button
                  key={name}
                  type="button"
                  title={name}
                  onClick={() => { onChange(name); setOpen(false); setSearch('') }}
                  className="flex flex-col items-center gap-1 p-2 rounded-sm transition-all hover:scale-110"
                  style={{
                    background: value === name ? 'rgba(167,147,112,0.15)' : 'transparent',
                    border: value === name ? `1px solid ${gold}` : '1px solid transparent',
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: value === name ? gold : '#888' }} strokeWidth={1.5} />
                  <span className="text-[8px] truncate w-full text-center" style={{ color: '#bbb' }}>{name}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}