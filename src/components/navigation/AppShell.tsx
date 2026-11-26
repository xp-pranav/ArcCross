import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNavigation } from './MobileNavigation';
import { ToastContainer } from '../common/ToastContainer';
import { AddDeviceModal } from '../modals/AddDeviceModal';
import { PairingApprovalModal } from '../modals/PairingApprovalModal';
import { SendFilesModal } from '../modals/SendFilesModal';
import { IncomingTransferModal } from '../modals/IncomingTransferModal';
import { TransferProgressModal } from '../modals/TransferProgressModal';
import { TransferCompletedModal } from '../modals/TransferCompletedModal';
import { DeviceDetailsModal } from '../modals/DeviceDetailsModal';
import { RenameDeviceModal } from '../modals/RenameDeviceModal';
import { ConfirmationDialog } from '../common/ConfirmationDialog';
import { useApp } from '../../context/AppContext';

export const AppShell: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { activeModal, closeModal, selectedDevice, removeDevice } = useApp();

  return (
    <div className="macos-window-frame">
      {/* Unified Window Toolbar */}
      <Header />

      {/* Main Window Body: Sidebar + Main Content */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          position: 'relative',
        }}
      >
        {/* Source List Sidebar */}
        <Sidebar />

        {/* Scrollable Content Viewport */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            paddingBottom: '80px', // Mobile clearance
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <main
            style={{
              flex: 1,
              width: '100%',
              maxWidth: '960px',
              margin: '0',
              padding: 'var(--space-6) var(--space-8)',
            }}
          >
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation />

      {/* Global Native Sheets & Modals */}
      <AddDeviceModal />
      <PairingApprovalModal />
      <SendFilesModal />
      <IncomingTransferModal />
      <TransferProgressModal />
      <TransferCompletedModal />
      <DeviceDetailsModal />
      <RenameDeviceModal />

      {/* Remove Device Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={activeModal === 'remove-device-confirm' && !!selectedDevice}
        onClose={closeModal}
        onConfirm={() => selectedDevice && removeDevice(selectedDevice.id)}
        title={`Remove "${selectedDevice?.name || 'Device'}"?`}
        message="This device will be disconnected from your local ecosystem. To re-link, you'll need to confirm a new pairing code."
        confirmLabel="Remove"
        isDestructive={true}
      />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};
