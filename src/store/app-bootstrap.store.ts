import { create } from 'zustand';

import type {
  AppBootstrapStatus,
  AppBootstrapStore,
} from '../types/store/app-bootstrap.types';

export type { AppBootstrapStatus } from '../types/store/app-bootstrap.types';

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
