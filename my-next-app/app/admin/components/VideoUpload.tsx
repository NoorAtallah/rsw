'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, Loader2, Video } from 'lucide-react'

const gold = '#a79370'

interface Props {
  value: string
  onChange: (url: string) => void
}

export default function VideoUpload({ value, onChange }: Props) {
  const supabase = createClient()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('video/')) {
      setError('Please upload a video file (mp4, webm)')
      return
    }

    if (file.size > 100 * 1024 * 1024) {
      setError('Video must be less than 100MB')
      return
    }

    setUploading(true)
    setError('')
    setProgress(0)

    const fileName = `hero/${Date.now()}-${file.name.replace(/\s/g, '-')}`

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      setError('Upload failed: ' + uploadError.message)
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(fileName)

    onChange(publicUrl)
    setUploading(false)
    setProgress(100)
  }

  return (
    <div>
      {value ? (
        <div className="rounded-sm overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.3)' }}>
          <video
            src={value}
            className="w-full h-40 object-cover"
            muted
            loop
            autoPlay
            playsInline
          />
          <div className="flex items-center justify-between px-3 py-2" style={{ background: '#faf9f6' }}>
            <span className="text-xs truncate max-w-xs" style={{ color: '#999' }}>
              {value.split('/').pop()}
            </span>
            <button
              onClick={() => onChange('')}
              className="p-1 rounded hover:bg-red-50"
              style={{ color: '#ccc' }}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <label
          className="flex flex-col items-center justify-center h-32 rounded-sm cursor-pointer transition-all"
          style={{
            border: '2px dashed rgba(167,147,112,0.4)',
            background: 'rgba(167,147,112,0.03)',
          }}
        >
          <input
            type="file"
            accept="video/mp4,video/webm"
            onChange={handleUpload}
            className="hidden"
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin" style={{ color: gold }} />
              <span className="text-xs" style={{ color: gold }}>Uploading video...</span>
              <span className="text-[10px]" style={{ color: '#bbb' }}>This may take a moment</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Video className="w-6 h-6" style={{ color: gold }} />
              <span className="text-xs" style={{ color: gold }}>Click to upload video</span>
              <span className="text-[10px]" style={{ color: '#bbb' }}>MP4 or WebM up to 100MB</span>
            </div>
          )}
        </label>
      )}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}