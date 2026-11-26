import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  Device,
  Transfer,
  AppSettings,
  ToastMessage,
  PairingSession,
  PairingApprovalState,
  TransferStatus,
} from '../types';
import {
  INITIAL_CURRENT_DEVICE,
  INITIAL_PAIRED_DEVICES,
  INITIAL_AVAILABLE_DEVICES,
  INITIAL_TRANSFERS,
  INITIAL_SETTINGS,
} from '../data/mockData';

type ModalType =
  | 'none'
  | 'add-device'
  | 'pairing-approval'
  | 'send-files'
  | 'incoming-transfer'
  | 'transfer-progress'
  | 'transfer-completed'
  | 'device-details'
  | 'rename-device'
  | 'remove-device-confirm';

interface AppContextType {
  // Theme & Settings
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
  setTheme: (theme: 'system' | 'light' | 'dark') => void;

  // Devices
  currentDevice: Device;
  pairedDevices: Device[];
  availableDevices: Device[];
  selectedDevice: Device | null;
  setSelectedDevice: (device: Device | null) => void;
  updateDeviceName: (id: string, newName: string) => void;
  removeDevice: (id: string) => void;
  pairDevice: (device: Device) => void;

  // Modals & Navigation
  activeModal: ModalType;
  openModal: (modal: ModalType, targetDevice?: Device | null) => void;
  closeModal: () => void;

  // Pairing Flow
  pairingSession: PairingSession | null;
  setPairingState: (state: PairingApprovalState) => void;
  startPairingWithDevice: (peer: Device) => void;
  approvePairing: () => void;
  rejectPairing: () => void;

  // Transfers
  transfers: Transfer[];
  activeTransfer: Transfer | null;
  incomingTransfer: Transfer | null;
  startNewTransfer: (recipientDevice: Device, files: Array<{ name: string; size: number; type: string }>) => void;
  simulateIncomingTransfer: () => void;
  acceptIncomingTransfer: () => void;
  declineIncomingTransfer: () => void;
  updateActiveTransferStatus: (status: TransferStatus) => void;
  cancelActiveTransfer: () => void;
  clearTransferHistory: (id?: string) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load settings from localStorage if available
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('arccross_settings');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [currentDevice, setCurrentDevice] = useState<Device>(INITIAL_CURRENT_DEVICE);
  const [pairedDevices, setPairedDevices] = useState<Device[]>(INITIAL_PAIRED_DEVICES);
  const [availableDevices, setAvailableDevices] = useState<Device[]>(INITIAL_AVAILABLE_DEVICES);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [transfers, setTransfers] = useState<Transfer[]>(INITIAL_TRANSFERS);
  const [activeTransfer, setActiveTransfer] = useState<Transfer | null>(INITIAL_TRANSFERS[0]);
  const [incomingTransfer, setIncomingTransfer] = useState<Transfer | null>(null);

  // Pairing session state
  const [pairingSession, setPairingSession] = useState<PairingSession | null>({
    id: 'pair-sess-1',
    peerDevice: INITIAL_AVAILABLE_DEVICES[0],
    verificationCode: '482 913',
    qrPayload: 'arccross://pair?dev=pixel8&key=913&sec=direct',
    expiresInSeconds: 58,
    state: 'waiting',
  });

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', settings.theme);
    }
    localStorage.setItem('arccross_settings', JSON.stringify(settings));
  }, [settings]);

  // Toast manager
  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastMessage = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration || 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...updates };
      return next;
    });
    addToast({
      title: 'Preferences Updated',
      description: 'Your changes have been saved locally.',
      type: 'info',
    });
  }, [addToast]);

  const setTheme = useCallback((theme: 'system' | 'light' | 'dark') => {
    setSettings((prev) => ({ ...prev, theme }));
    addToast({
      title: `Theme changed to ${theme}`,
      type: 'info',
      duration: 2000,
    });
  }, [addToast]);

  const openModal = useCallback((modal: ModalType, targetDevice?: Device | null) => {
    if (targetDevice !== undefined) {
      setSelectedDevice(targetDevice);
    }
    setActiveModal(modal);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal('none');
  }, []);

  const updateDeviceName = useCallback((id: string, newName: string) => {
    if (!newName.trim()) return;

    if (id === currentDevice.id) {
      setCurrentDevice((prev) => ({ ...prev, name: newName.trim() }));
      setSettings((prev) => ({ ...prev, deviceName: newName.trim() }));
      addToast({
        title: 'Device Renamed',
        description: `This device is now "${newName.trim()}".`,
        type: 'success',
      });
      return;
    }

    setPairedDevices((prev) =>
      prev.map((dev) => (dev.id === id ? { ...dev, name: newName.trim() } : dev))
    );
    setSelectedDevice((prev) => (prev && prev.id === id ? { ...prev, name: newName.trim() } : prev));
    addToast({
      title: 'Device Renamed',
      description: `Device is now identified as "${newName.trim()}".`,
      type: 'success',
    });
  }, [currentDevice.id, addToast]);

  const removeDevice = useCallback((id: string) => {
    const dev = pairedDevices.find((d) => d.id === id);
    setPairedDevices((prev) => prev.filter((d) => d.id !== id));
    if (dev) {
      // Return to available list
      setAvailableDevices((prev) => [
        ...prev,
        { ...dev, pairingStatus: 'available', trustStatus: 'standard' },
      ]);
    }
    closeModal();
    setSelectedDevice(null);
    addToast({
      title: 'Device Removed',
      description: dev ? `"${dev.name}" has been disconnected.` : 'Device removed from ecosystem.',
      type: 'info',
    });
  }, [pairedDevices, closeModal, addToast]);

  const pairDevice = useCallback((device: Device) => {
    // Add to paired list
    setPairedDevices((prev) => [
      ...prev,
      { ...device, pairingStatus: 'paired', trustStatus: 'trusted', lastSeen: 'Active now', connectionStatus: 'online' },
    ]);
    setAvailableDevices((prev) => prev.filter((d) => d.id !== device.id));
    closeModal();
    addToast({
      title: 'Device Paired Successfully',
      description: `"${device.name}" is now part of your ecosystem.`,
      type: 'success',
    });
  }, [closeModal, addToast]);

  const startPairingWithDevice = useCallback((peer: Device) => {
    const session: PairingSession = {
      id: `pair-${Date.now()}`,
      peerDevice: peer,
      verificationCode: '482 913',
      qrPayload: `arccross://pair?id=${peer.id}&code=482913&v=1.0`,
      expiresInSeconds: 60,
      state: 'waiting',
    };
    setPairingSession(session);
    setActiveModal('pairing-approval');
  }, []);

  const setPairingState = useCallback((state: PairingApprovalState) => {
    setPairingSession((prev) => (prev ? { ...prev, state } : null));
    if (state === 'success' && pairingSession) {
      setTimeout(() => {
        pairDevice(pairingSession.peerDevice);
      }, 1200);
    }
  }, [pairingSession, pairDevice]);

  const approvePairing = useCallback(() => {
    setPairingState('success');
  }, [setPairingState]);

  const rejectPairing = useCallback(() => {
    setPairingState('rejected');
    setTimeout(() => {
      closeModal();
      addToast({
        title: 'Pairing Request Rejected',
        description: 'No permissions or keys were exchanged.',
        type: 'info',
      });
    }, 800);
  }, [setPairingState, closeModal, addToast]);

  // Transfers Management
  const startNewTransfer = useCallback((recipientDevice: Device, files: Array<{ name: string; size: number; type: string }>) => {
    const totalBytes = files.reduce((acc, f) => acc + f.size, 0);
    const newTransfer: Transfer = {
      id: `tr-${Date.now()}`,
      direction: 'outgoing',
      peerId: recipientDevice.id,
      peerName: recipientDevice.name,
      peerPlatform: recipientDevice.platform,
      files: files.map((f, i) => ({
        id: `f-${Date.now()}-${i}`,
        name: f.name,
        size: f.size,
        type: f.type,
        progress: 10,
      })),
      totalBytes,
      transferredBytes: Math.round(totalBytes * 0.1),
      speed: '14.2 MB/s',
      status: 'transferring',
      timestamp: 'Just now',
      savedLocation: `~/Downloads/ArcCross/${recipientDevice.name.replace(/\s+/g, '')}/`,
    };

    setTransfers((prev) => [newTransfer, ...prev]);
    setActiveTransfer(newTransfer);
    setActiveModal('transfer-progress');

    addToast({
      title: 'Transfer Started',
      description: `Sending ${files.length} file(s) to ${recipientDevice.name}.`,
      type: 'info',
    });
  }, [addToast]);

  const simulateIncomingTransfer = useCallback(() => {
    const sender = pairedDevices[0] || INITIAL_PAIRED_DEVICES[0];
    const incoming: Transfer = {
      id: `tr-inc-${Date.now()}`,
      direction: 'incoming',
      peerId: sender.id,
      peerName: sender.name,
      peerPlatform: sender.platform,
      files: [
        {
          id: 'inc-f1',
          name: 'Annual_Strategy_Presentation_2026.pdf',
          size: 14500000,
          type: 'pdf',
          progress: 0,
        },
        {
          id: 'inc-f2',
          name: 'Team_Whiteboard_Session.heic',
          size: 8200000,
          type: 'image',
          progress: 0,
        },
        {
          id: 'inc-f3',
          name: 'Audio_Interview_Segment.wav',
          size: 21100000,
          type: 'audio',
          progress: 0,
        },
      ],
      totalBytes: 43800000,
      transferredBytes: 0,
      speed: '16.8 MB/s',
      status: 'waiting',
      timestamp: 'Just now',
      savedLocation: `~/Downloads/ArcCross/${sender.name.replace(/\s+/g, '')}/`,
    };

    setIncomingTransfer(incoming);
    setActiveModal('incoming-transfer');
  }, [pairedDevices]);

  const acceptIncomingTransfer = useCallback(() => {
    if (!incomingTransfer) return;
    const accepted: Transfer = {
      ...incomingTransfer,
      status: 'transferring',
      transferredBytes: 2500000,
      files: incomingTransfer.files.map((f) => ({ ...f, progress: 15 })),
    };
    setTransfers((prev) => [accepted, ...prev]);
    setActiveTransfer(accepted);
    setIncomingTransfer(null);
    setActiveModal('transfer-progress');

    addToast({
      title: 'Incoming Transfer Accepted',
      description: `Receiving files from ${accepted.peerName}.`,
      type: 'info',
    });
  }, [incomingTransfer, addToast]);

  const declineIncomingTransfer = useCallback(() => {
    if (incomingTransfer) {
      addToast({
        title: 'Transfer Declined',
        description: `Declined files from ${incomingTransfer.peerName}.`,
        type: 'info',
      });
    }
    setIncomingTransfer(null);
    closeModal();
  }, [incomingTransfer, addToast, closeModal]);

  const updateActiveTransferStatus = useCallback((status: TransferStatus) => {
    if (!activeTransfer) return;
    const updated: Transfer = {
      ...activeTransfer,
      status,
      transferredBytes:
        status === 'completed'
          ? activeTransfer.totalBytes
          : status === 'waiting'
          ? 0
          : activeTransfer.transferredBytes,
      files: activeTransfer.files.map((f) => ({
        ...f,
        progress: status === 'completed' ? 100 : f.progress,
      })),
    };
    setActiveTransfer(updated);
    setTransfers((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));

    if (status === 'completed') {
      setActiveModal('transfer-completed');
    }
  }, [activeTransfer]);

  const cancelActiveTransfer = useCallback(() => {
    if (!activeTransfer) return;
    updateActiveTransferStatus('canceled');
    addToast({
      title: 'Transfer Canceled',
      description: 'The simulated file transfer was stopped.',
      type: 'warning',
    });
  }, [activeTransfer, updateActiveTransferStatus, addToast]);

  const clearTransferHistory = useCallback((id?: string) => {
    if (id) {
      setTransfers((prev) => prev.filter((t) => t.id !== id));
      addToast({
        title: 'Transfer Removed',
        description: 'Item removed from history.',
        type: 'info',
      });
    } else {
      setTransfers([]);
      addToast({
        title: 'History Cleared',
        description: 'All past transfer logs have been cleared.',
        type: 'info',
      });
    }
  }, [addToast]);

  // Active transfer simulated progress stepper
  useEffect(() => {
    if (!activeTransfer || activeTransfer.status !== 'transferring') return;

    const interval = setInterval(() => {
      setActiveTransfer((prev) => {
        if (!prev || prev.status !== 'transferring') return prev;
        const step = prev.totalBytes * 0.08;
        const nextBytes = Math.min(prev.totalBytes, prev.transferredBytes + step);

        const updatedFiles = prev.files.map((f) => {
          const fileProgress = Math.min(100, Math.round(f.progress + (100 - f.progress) * 0.15));
          return { ...f, progress: fileProgress };
        });

        if (nextBytes >= prev.totalBytes) {
          const completed: Transfer = {
            ...prev,
            transferredBytes: prev.totalBytes,
            files: updatedFiles.map((f) => ({ ...f, progress: 100 })),
            status: 'completed',
          };
          setTransfers((all) => all.map((t) => (t.id === completed.id ? completed : t)));
          setActiveModal('transfer-completed');
          return completed;
        }

        const nextTransfer: Transfer = {
          ...prev,
          transferredBytes: nextBytes,
          files: updatedFiles,
        };
        setTransfers((all) => all.map((t) => (t.id === nextTransfer.id ? nextTransfer : t)));
        return nextTransfer;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [activeTransfer?.status, activeTransfer?.id]);

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        setTheme,
        currentDevice,
        pairedDevices,
        availableDevices,
        selectedDevice,
        setSelectedDevice,
        updateDeviceName,
        removeDevice,
        pairDevice,
        activeModal,
        openModal,
        closeModal,
        pairingSession,
        setPairingState,
        startPairingWithDevice,
        approvePairing,
        rejectPairing,
        transfers,
        activeTransfer,
        incomingTransfer,
        startNewTransfer,
        simulateIncomingTransfer,
        acceptIncomingTransfer,
        declineIncomingTransfer,
        updateActiveTransferStatus,
        cancelActiveTransfer,
        clearTransferHistory,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
