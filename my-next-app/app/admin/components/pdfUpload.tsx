'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, Loader2, FileText, ExternalLink } from 'lucide-react'

const gold = '#a79370'

interface Props {
  value: string
  onChange: (url: string) => void
  label?: string
}

export default function PdfUpload({ value, onChange, label = 'PDF' }: Props) {
  const supabase = createClient()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file')
      return
    }
    if (file.size > 20 * 1024 * 1024) {
      setError('PDF must be less than 20MB')
      return
    }

    setUploading(true)
    setError('')

    const fileName = `pdfs/${Date.now()}-${file.name.replace(/\s/g, '-')}`

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(fileName, file, { contentType: 'application/pdf' })

    if (uploadError) {
      setError('Upload failed, try again')
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(fileName)

    onChange(publicUrl)
    setUploading(false)
  }

  // Extract a readable filename from the URL
  const fileName = value
    ? decodeURIComponent(value.split('/').pop()?.replace(/^\d+-/, '') || 'document.pdf')
    : ''

  return (
    <div>
      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>{label}</label>

      {value ? (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-sm"
          style={{ border: '1px solid rgba(167,147,112,0.3)', background: 'rgba(167,147,112,0.04)' }}
        >
          <div
            className="flex items-center justify-center rounded flex-shrink-0"
            style={{ width: 36, height: 36, background: 'rgba(167,147,112,0.12)' }}
          >
            <FileText size={16} color={gold} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: '#333' }}>{fileName}</p>
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] mt-0.5"
              style={{ color: gold }}
            >
              Preview <ExternalLink size={9} />
            </a>
          </div>

          <button
            onClick={() => onChange('')}
            className="flex-shrink-0 p-1.5 rounded-full transition-colors hover:bg-red-50"
            style={{ color: '#ccc' }}
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label
          className="flex flex-col items-center justify-center h-24 rounded-sm cursor-pointer transition-all"
          style={{
            border: '2px dashed rgba(167,147,112,0.4)',
            background: 'rgba(167,147,112,0.03)',
          }}
        >
          <input
            type="file"
            accept="application/pdf"
            onChange={handleUpload}
            className="hidden"
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 size={20} className="animate-spin" style={{ color: gold }} />
              <span className="text-xs" style={{ color: gold }}>Uploading…</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5">
              <Upload size={18} style={{ color: gold }} />
              <span className="text-xs" style={{ color: gold }}>Click to upload PDF</span>
              <span className="text-[10px]" style={{ color: '#bbb' }}>PDF up to 20MB</span>
            </div>
          )}
        </label>
      )}

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}