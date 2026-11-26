import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

export const RenameDeviceModal: React.FC = () => {
  const { activeModal, closeModal, selectedDevice, updateDeviceName } = useApp();
  const [name, setName] = useState('');

  const isOpen = activeModal === 'rename-device' && !!selectedDevice;

  useEffect(() => {
    if (selectedDevice) {
      setName(selectedDevice.name);
    }
  }, [selectedDevice]);

  if (!isOpen || !selectedDevice) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      updateDeviceName(selectedDevice.id, name.trim());
      closeModal();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Rename Device"
      subtitle="Update the name broadcast to other ecosystem endpoints."
      maxWidth="380px"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div>
          <label
            htmlFor="device-name-input"
            style={{
              display: 'block',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              marginBottom: '6px',
            }}
          >
            Name
          </label>
          <input
            id="device-name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
            style={{
              width: '100%',
              height: '30px',
              padding: '0 10px',
              borderRadius: 'var(--radius-control)',
              backgroundColor: 'var(--color-elevated)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
              fontSize: 'var(--text-xs)',
              outline: 'none',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
            paddingTop: 'var(--space-3)',
            borderTop: '0.5px solid var(--color-separator)',
          }}
        >
          <button type="button" className="macos-button" onClick={closeModal}>
            Cancel
          </button>
          <button
            type="submit"
            className="macos-button primary"
            disabled={!name.trim() || name === selectedDevice.name}
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};
