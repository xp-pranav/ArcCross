import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TransferRow } from '../../components/transfers/TransferRow';
import { EmptyState } from '../../components/common/EmptyState';
import {
  ArrowLeftRight,
  Share2,
  Search,
  BellRing,
  Activity,
  HardDrive,
  CheckCircle2,
} from 'lucide-react';

export const TransfersPage: React.FC = () => {
  const {
    transfers,
    openModal,
    simulateIncomingTransfer,
    clearTransferHistory,
  } = useApp();

  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const query = searchQuery.toLowerCase().trim();
  const filteredTransfers = transfers.filter((t) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'active'
        ? t.status === 'transferring' || t.status === 'waiting'
        : t.status === filter;

    const matchesSearch =
      query === '' ||
      t.peerName.toLowerCase().includes(query) ||
      t.files.some((f) => f.name.toLowerCase().includes(query));

    return matchesFilter && matchesSearch;
  });

  const activeCount = transfers.filter((t) => t.status === 'transferring' || t.status === 'waiting').length;
  const completedCount = transfers.filter((t) => t.status === 'completed').length;
  const failedCount = transfers.filter((t) => t.status === 'failed').length;
  const canceledCount = transfers.filter((t) => t.status === 'canceled').length;

  const totalBytesTransferred = transfers
    .filter((t) => t.status === 'completed')
    .reduce((acc, t) => acc + t.totalBytes, 0);

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const filterTabs: Array<{ id: string; label: string; count: number }> = [
    { id: 'all', label: 'All', count: transfers.length },
    { id: 'active', label: 'Active', count: activeCount },
    { id: 'completed', label: 'Completed', count: completedCount },
    { id: 'failed', label: 'Failed', count: failedCount },
    { id: 'canceled', label: 'Canceled', count: canceledCount },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Top Header & Toolbar Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 'var(--space-3)',
          paddingBottom: 'var(--space-4)',
          borderBottom: '1px solid var(--color-separator)',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-2xs)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-tertiary)',
              marginBottom: '4px',
            }}
          >
            WORKSPACE / TRANSFERS
          </div>

          <h1
            style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: 'var(--color-text-primary)',
              lineHeight: 1.15,
            }}
          >
            Transfers
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            Transfer activity and history.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <button
            className="macos-button"
            onClick={simulateIncomingTransfer}
            title="Simulate incoming transfer from a peer"
          >
            <BellRing size={12} color="var(--color-teal)" />
            <span>Simulate Incoming</span>
          </button>

          <button
            className="macos-button primary"
            onClick={() => openModal('send-files')}
          >
            <Share2 size={12} />
            <span>Send Files</span>
          </button>
        </div>
      </div>

      {/* Sample Activity Disclaimer Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--color-elevated)',
          border: '1px solid var(--color-border-subtle)',
          fontSize: 'var(--text-2xs)',
          color: 'var(--color-text-tertiary)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)' }}>
          Sample/demo activity · Local UI prototype (no real files transferred)
        </span>
        {transfers.length > 0 && (
          <button
            onClick={() => clearTransferHistory()}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              fontSize: 'var(--text-2xs)',
              textDecoration: 'underline',
            }}
          >
            Reset / View Empty State
          </button>
        )}
      </div>

      {/* Aggregate Overview Metrics (macOS Inset Group) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-3)',
        }}
      >
        <div className="macos-inset-group" style={{ padding: '12px 14px' }}>
          <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <HardDrive size={12} color="var(--color-teal)" />
            Total Payload Delivered
          </div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
            {formatSize(totalBytesTransferred)}
          </div>
          <div style={{ fontSize: '0.625rem', color: 'var(--color-teal)', marginTop: '1px' }}>
            TLS 1.3 direct stream
          </div>
        </div>

        <div className="macos-inset-group" style={{ padding: '12px 14px' }}>
          <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Activity size={12} color="var(--color-deep-blue)" />
            Active Subnet Streams
          </div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: activeCount > 0 ? 'var(--color-teal)' : 'var(--color-text-primary)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
            {activeCount} stream{activeCount === 1 ? '' : 's'}
          </div>
          <div style={{ fontSize: '0.625rem', color: 'var(--color-text-tertiary)', marginTop: '1px' }}>
            {activeCount > 0 ? 'Chunk delivery in progress' : 'Listening for peer beacons'}
          </div>
        </div>

        <div className="macos-inset-group" style={{ padding: '12px 14px' }}>
          <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <CheckCircle2 size={12} color="var(--color-teal)" />
            Verification Rate
          </div>
          <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
            {transfers.length > 0 ? `${Math.round((completedCount / transfers.length) * 100)}%` : '100%'}
          </div>
          <div style={{ fontSize: '0.625rem', color: 'var(--color-teal)', marginTop: '1px' }}>
            {completedCount} verified payloads
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
        }}
      >
        <div className="macos-segmented-control">
          {filterTabs.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`macos-segmented-button ${isActive ? 'active' : ''}`}
              >
                <span>{tab.label}</span>
                <span
                  style={{
                    fontSize: '0.625rem',
                    padding: '0 4px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: isActive ? 'var(--color-teal)' : 'var(--color-border)',
                    color: isActive ? 'var(--color-teal-contrast)' : 'var(--color-text-muted)',
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="macos-search-field" style={{ width: '220px' }}>
          <Search size={13} color="var(--color-text-tertiary)" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search peer or filename..."
          />
        </div>
      </div>

      {/* Transfers Inset Group List Table */}
      {filteredTransfers.length > 0 ? (
        <div className="macos-inset-group">
          {filteredTransfers.map((t) => (
            <TransferRow
              key={t.id}
              transfer={t}
              onSelect={() => {
                if (t.status === 'transferring' || t.status === 'waiting') {
                  openModal('transfer-progress');
                } else if (t.status === 'completed') {
                  openModal('transfer-completed');
                }
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<ArrowLeftRight size={22} />}
          title={query ? 'No matching transfers' : 'No transfers yet.'}
          description={
            query
              ? `No transfer logs matching "${query}".`
              : 'Choose a paired device to transmit documents, media, or archives directly across your subnet.'
          }
          actionLabel={query ? 'Clear Search' : 'Send Files'}
          onAction={query ? () => setSearchQuery('') : () => openModal('send-files')}
        />
      )}
    </div>
  );
};
