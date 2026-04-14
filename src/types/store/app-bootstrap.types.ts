export type AppBootstrapStatus = 'idle' | 'starting' | 'ready' | 'error';

export type AppBootstrapStore = {
  errorMessage: string | null;
  markError: (message: string) => void;
  markReady: () => void;
  markStarting: () => void;
  reset: () => void;
  status: AppBootstrapStatus;
};
