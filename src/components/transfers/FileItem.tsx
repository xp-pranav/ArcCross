import React from 'react';
import { FileText, Image, Film, Music, Archive, FileCode, File, Trash2 } from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';

interface FileItemProps {
  name: string;
  size: number;
  type?: string;
  progress?: number;
  onRemove?: () => void;
  showProgress?: boolean;
}

export const FileItem: React.FC<FileItemProps> = ({
  name,
  size,
  type = '',
  progress = 0,
  onRemove,
  showProgress = false,
}) => {
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const getFileIcon = () => {
    const ext = name.split('.').pop()?.toLowerCase() || '';
    if (['jpg', 'jpeg', 'png', 'heic', 'webp', 'svg', 'gif'].includes(ext) || type.includes('image')) {
      return <Image size={18} color="var(--color-teal)" />;
    }
    if (['mp4', 'mov', 'mkv', 'webm'].includes(ext) || type.includes('video')) {
      return <Film size={18} color="var(--color-deep-blue)" />;
    }
    if (['mp3', 'wav', 'm4a', 'flac'].includes(ext) || type.includes('audio')) {
      return <Music size={18} color="var(--color-warning)" />;
    }
    if (['zip', 'tar', 'gz', 'rar', '7z'].includes(ext) || type.includes('archive')) {
      return <Archive size={18} color="var(--color-text-secondary)" />;
    }
    if (['js', 'ts', 'tsx', 'jsx', 'json', 'py', 'rs', 'go', 'html', 'css'].includes(ext)) {
      return <FileCode size={18} color="var(--color-teal)" />;
    }
    if (['pdf', 'doc', 'docx', 'txt', 'md'].includes(ext) || type.includes('pdf')) {
      return <FileText size={18} color="var(--color-deep-blue)" />;
    }
    return <File size={18} color="var(--color-text-muted)" />;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        padding: '10px 12px',
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-control)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-elevated)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {getFileIcon()}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {name}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              {formatSize(size)}
            </div>
          </div>
        </div>

        {onRemove && (
          <button
            onClick={onRemove}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Remove file"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {showProgress && (
        <div style={{ marginTop: '2px' }}>
          <ProgressBar progress={progress} height={4} />
        </div>
      )}
    </div>
  );
};
