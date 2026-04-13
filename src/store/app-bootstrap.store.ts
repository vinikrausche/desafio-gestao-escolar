import { create } from 'zustand';

export type AppBootstrapStatus = 'idle' | 'starting' | 'ready' | 'error';

type AppBootstrapStore = {
  errorMessage: string | null;
  markError: (message: string) => void;
  markReady: () => void;
  markStarting: () => void;
  reset: () => void;
  status: AppBootstrapStatus;
};

const initialState = {
  errorMessage: null,
  status: 'idle' as AppBootstrapStatus,
};

export const useAppBootstrapStore = create<AppBootstrapStore>((set) => ({
  ...initialState,
  markError: (message) => {
    set({
      errorMessage: message,
      status: 'error',
    });
  },
  markReady: () => {
    set({
      errorMessage: null,
      status: 'ready',
    });
  },
  markStarting: () => {
    set({
      errorMessage: null,
      status: 'starting',
    });
  },
  reset: () => {
    set(initialState);
  },
}));
