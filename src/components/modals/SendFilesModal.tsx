import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { FileDropzone } from '../transfers/FileDropzone';
import { FileItem } from '../transfers/FileItem';
import { PlatformIcon } from '../common/PlatformIcon';
import { useApp } from '../../context/AppContext';
import { Device } from '../../types';
import { Send, CheckCircle2 } from 'lucide-react';

export const SendFilesModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    pairedDevices,
    selectedDevice,
    startNewTransfer,
    addToast,
  } = useApp();

  const isOpen = activeModal === 'send-files';
  const onlineDevices = pairedDevices.filter((d) => d.connectionStatus === 'online');
  const [recipient, setRecipient] = useState<Device>(
    selectedDevice || onlineDevices[0] || pairedDevices[0]
  );

  const [files, setFiles] = useState<Array<{ name: string; size: number; type: string }>>([
    { name: 'Architecture_Plan_2026.pdf', size: 12500000, type: 'pdf' },
    { name: 'Brand_Assets_Master.fig', size: 28400000, type: 'figma' },
  ]);

  if (!isOpen) return null;

  const handleAddFiles = (newFiles: Array<{ name: string; size: number; type: string }>) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const totalBytes = files.reduce((acc, f) => acc + f.size, 0);

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const handleSend = () => {
    if (!recipient) {
      addToast({
        title: 'Select Destination',
        description: 'Please pick an online destination device.',
        type: 'warning',
      });
      return;
    }
    if (files.length === 0) {
      addToast({
        title: 'No Files Selected',
        description: 'Please add at least one file to transfer.',
        type: 'warning',
      });
      return;
    }

    startNewTransfer(recipient, files);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Send Files"
      subtitle="Transmit files directly to an authenticated endpoint."
      maxWidth="500px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {/* Destination Device Selector (macOS Inset Group) */}
        <div>
          <div style={{ fontSize: 'var(--text-2xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
            Destination Endpoint
          </div>
          <div className="macos-inset-group">
            {pairedDevices.map((dev) => {
              const isSelected = recipient?.id === dev.id;
              const isOnline = dev.connectionStatus === 'online';
              return (
                <div
                  key={dev.id}
                  onClick={() => isOnline && setRecipient(dev)}
                  className="macos-inset-row interactive"
                  style={{
                    cursor: isOnline ? 'pointer' : 'not-allowed',
                    opacity: isOnline ? 1 : 0.45,
                    backgroundColor: isSelected ? 'var(--color-teal-subtle)' : 'transparent',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PlatformIcon platform={dev.platform} size={16} />
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: isSelected ? 600 : 500, color: 'var(--color-text-primary)' }}>
                      {dev.name}
                    </span>
                    <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>
                      ({dev.model})
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: 'var(--text-2xs)', color: isOnline ? 'var(--color-teal)' : 'var(--color-text-tertiary)' }}>
                      {isOnline ? 'Online' : 'Offline'}
                    </span>
                    {isSelected && <CheckCircle2 size={13} color="var(--color-teal)" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* File Dropzone */}
        <FileDropzone onFilesSelected={handleAddFiles} />

        {/* Selected Files List */}
        {files.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-2xs)', color: 'var(--color-text-muted)' }}>
              <span>Payload: {files.length} file(s)</span>
              <button
                type="button"
                onClick={() => setFiles([])}
                style={{ background: 'none', border: 'none', color: 'var(--color-text-tertiary)', cursor: 'pointer', fontSize: 'var(--text-2xs)' }}
              >
                Clear all
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '160px', overflowY: 'auto' }}>
              {files.map((file, idx) => (
                <FileItem
                  key={idx}
                  name={file.name}
                  size={file.size}
                  type={file.type}
                  onRemove={() => handleRemoveFile(idx)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Footer & macOS Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 'var(--space-3)',
            borderTop: '0.5px solid var(--color-separator)',
          }}
        >
          <div>
            <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-text-tertiary)' }}>Total Size</div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
              {formatSize(totalBytes)}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="button" className="macos-button" onClick={closeModal}>
              Cancel
            </button>
            <button
              type="button"
              className="macos-button primary"
              disabled={files.length === 0 || !recipient || recipient.connectionStatus !== 'online'}
              onClick={handleSend}
            >
              <Send size={12} />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
