import React, { useRef, useState } from 'react';
import { UploadCloud, FolderPlus, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

interface FileDropzoneProps {
  onFilesSelected: (files: Array<{ name: string; size: number; type: string }>) => void;
  className?: string;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({ onFilesSelected, className = '' }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const dropped = Array.from(e.dataTransfer.files).map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type || 'document',
      }));
      onFilesSelected(dropped);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = Array.from(e.target.files).map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type || 'document',
      }));
      onFilesSelected(selected);
    }
  };

  // Quick sample assets for instant demo testing
  const loadDemoAssets = () => {
    const demoFiles = [
      { name: 'ArcCross_Whitepaper_2026.pdf', size: 14200000, type: 'pdf' },
      { name: 'Hardware_Architecture_CAD.step', size: 38400000, type: 'cad' },
      { name: 'Interface_Prototype_Recording.mov', size: 28900000, type: 'video' },
      { name: 'Cryptographic_Keyset.pem', size: 4096, type: 'key' },
    ];
    onFilesSelected(demoFiles);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`arccross-dropzone ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-8) var(--space-6)',
        borderRadius: 'var(--radius-card)',
        border: `2px dashed ${isDragOver ? 'var(--color-teal)' : 'var(--color-border)'}`,
        backgroundColor: isDragOver ? 'var(--color-teal-subtle)' : 'var(--color-elevated)',
        transition: 'all var(--duration-fast) var(--ease-apple)',
        textAlign: 'center',
        cursor: 'pointer',
      }}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isDragOver ? 'var(--color-teal)' : 'var(--color-text-secondary)',
          border: '1px solid var(--color-border)',
          marginBottom: 'var(--space-4)',
        }}
      >
        <UploadCloud size={24} />
      </div>

      <h4
        style={{
          fontSize: 'var(--text-base)',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: '4px',
        }}
      >
        Drop files here or click to browse
      </h4>
      <p
        style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-muted)',
          maxWidth: '320px',
          marginBottom: 'var(--space-4)',
        }}
      >
        Support for any file format with end-to-end direct local device streaming.
      </p>

      <div style={{ display: 'flex', gap: 'var(--space-2)' }} onClick={(e) => e.stopPropagation()}>
        <Button
          variant="secondary"
          size="sm"
          icon={<FolderPlus size={14} />}
          onClick={() => fileInputRef.current?.click()}
        >
          Browse Files
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={<Sparkles size={14} color="var(--color-teal)" />}
          onClick={loadDemoAssets}
        >
          Add Demo Assets
        </Button>
      </div>
    </div>
  );
};
