'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, Loader2 } from 'lucide-react'

const gold = '#a79370'

interface Props {
  value: string
  onChange: (url: string) => void
  label?: string
}

export default function ImageUpload({ value, onChange, label = 'Image' }: Props) {
  const supabase = createClient()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB')
      return
    }

    setUploading(true)
    setError('')

    const fileName = `news/${Date.now()}-${file.name.replace(/\s/g, '-')}`

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(fileName, file)

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

  async function handleRemove() {
    onChange('')
  }

  return (
    <div>
      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>{label}</label>

      {value ? (
        <div className="relative rounded-sm overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.3)' }}>
          <img src={value} alt="Preview" className="w-full h-40 object-cover" />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 rounded-full"
            style={{ background: 'rgba(0,0,0,0.6)' }}
          >
            <X className="w-3.5 h-3.5 text-white" />
          </button>
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
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin" style={{ color: gold }} />
              <span className="text-xs" style={{ color: gold }}>Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-6 h-6" style={{ color: gold }} />
              <span className="text-xs" style={{ color: gold }}>Click to upload image</span>
              <span className="text-[10px]" style={{ color: '#bbb' }}>PNG, JPG up to 5MB</span>
            </div>
          )}
        </label>
      )}

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}