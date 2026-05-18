import React, { useState, useRef } from 'react';
import { Upload, X, Check, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  currentImage?: string;
  label?: string;
  className?: string;
}

export default function ImageUpload({ onUploadSuccess, currentImage, label, className = "" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size too large. Max 5MB');
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setPreview(data.url);
      onUploadSuccess(data.url);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onUploadSuccess('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="block text-xs font-bold text-gold-premium uppercase tracking-widest mb-2">{label}</label>}
      
      <div 
        onClick={triggerUpload}
        className={`relative group cursor-pointer border-2 border-dashed rounded-2xl transition-all duration-300 min-h-[160px] flex flex-col items-center justify-center p-4
          ${preview ? 'border-gold-premium/30 bg-gold-premium/5' : 'border-white/10 hover:border-gold-premium/40 hover:bg-white/5'}
          ${error ? 'border-red-500/50 bg-red-500/5' : ''}
        `}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />

        {preview ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-[140px] rounded-xl object-contain shadow-2xl"
            />
            <button 
              onClick={clearImage}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
            >
              <X size={14} />
            </button>
            <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1 rounded-full shadow-lg">
              <Check size={12} />
            </div>
          </div>
        ) : (
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-white/40 group-hover:text-gold-premium transition-colors">
              {isUploading ? <Loader2 size={24} className="animate-spin" /> : <Upload size={24} />}
            </div>
            <div>
              <p className="text-white font-medium text-sm">
                {isUploading ? 'Uploading...' : 'Click to upload image'}
              </p>
              <p className="text-white/30 text-xs mt-1">PNG, JPG, WebP up to 5MB</p>
            </div>
          </div>
        )}

        {error && (
          <p className="absolute -bottom-6 left-0 text-red-400 text-[10px] font-bold uppercase tracking-tight">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
