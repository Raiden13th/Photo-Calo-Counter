import { create } from 'zustand';

interface AppState {
  isOnline: boolean;
  isProcessing: boolean;
  uploadProgress: number;
  notification: {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null;

  // Actions
  setOnline: (isOnline: boolean) => void;
  setProcessing: (isProcessing: boolean) => void;
  setUploadProgress: (progress: number) => void;
  showNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  hideNotification: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isOnline: true,
  isProcessing: false,
  uploadProgress: 0,
  notification: null,

  setOnline: (isOnline) => set({ isOnline }),
  setProcessing: (isProcessing) => set({ isProcessing }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),

  showNotification: (message, type) =>
    set({ notification: { message, type } }),

  hideNotification: () => set({ notification: null }),
}));

