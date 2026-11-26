import React from 'react';
import { Transfer } from '../../types';
import { ArrowDownLeft, ArrowUpRight, FolderOpen } from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';
import { StatusBadge } from '../common/StatusBadge';
import { useApp } from '../../context/AppContext';

interface TransferRowProps {
  transfer: Transfer;
  onSelect?: () => void;
}

export const TransferRow: React.FC<TransferRowProps> = ({ transfer, onSelect }) => {
  const { addToast } = useApp();

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const getDirectionIcon = () => {
    if (transfer.direction === 'incoming') {
      return (
        <div
          title="Incoming transfer"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-teal-subtle)',
            color: 'var(--color-teal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <ArrowDownLeft size={18} />
        </div>
      );
    }
    return (
      <div
        title="Outgoing transfer"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--color-deep-blue-subtle)',
          color: 'var(--color-deep-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <ArrowUpRight size={18} />
      </div>
    );
  };

  const percent = Math.min(
    100,
    Math.round((transfer.transferredBytes / (transfer.totalBytes || 1)) * 100)
  );

  return (
    <div
      onClick={onSelect}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '14px 16px',
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-control)',
        border: '1px solid var(--color-border)',
        transition: 'all var(--duration-fast) ease',
        cursor: onSelect ? 'pointer' : 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-teal)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
          {getDirectionIcon()}
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>{transfer.peerName}</span>
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                  fontWeight: 400,
                }}
              >
                ({transfer.direction === 'incoming' ? 'Received from' : 'Sent to'})
              </span>
            </div>
            <div
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-secondary)',
                marginTop: '2px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {transfer.files.map((f) => f.name).join(', ')}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexShrink: 0 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {formatSize(transfer.totalBytes)}
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              {transfer.timestamp}
            </div>
          </div>

          <StatusBadge status={transfer.status} />

          {transfer.savedLocation && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToast({
                  title: 'Saved Location',
                  description: `Files stored in: ${transfer.savedLocation}`,
                  type: 'info',
                });
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                padding: '4px',
              }}
              title="Show in Folder"
            >
              <FolderOpen size={16} />
            </button>
          )}
        </div>
      </div>

      {transfer.status === 'transferring' && (
        <div style={{ marginTop: '2px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.6875rem',
              color: 'var(--color-text-muted)',
              marginBottom: '4px',
            }}
          >
            <span>{percent}% transferred • {transfer.speed || '12.4 MB/s'}</span>
            <span>{formatSize(transfer.transferredBytes)} of {formatSize(transfer.totalBytes)}</span>
          </div>
          <ProgressBar progress={percent} status="transferring" height={4} />
        </div>
      )}
    </div>
  );
};
