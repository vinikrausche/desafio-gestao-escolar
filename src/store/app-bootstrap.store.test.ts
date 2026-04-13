import { useAppBootstrapStore } from './app-bootstrap.store';

describe('useAppBootstrapStore', () => {
  beforeEach(() => {
    useAppBootstrapStore.getState().reset();
  });

  it('tracks the bootstrap lifecycle', () => {
    const store = useAppBootstrapStore.getState();

    expect(store.status).toBe('idle');
    expect(store.errorMessage).toBeNull();

    store.markStarting();
    expect(useAppBootstrapStore.getState().status).toBe('starting');

    store.markReady();
    expect(useAppBootstrapStore.getState().status).toBe('ready');
    expect(useAppBootstrapStore.getState().errorMessage).toBeNull();

    store.markError('bootstrap failed');
    expect(useAppBootstrapStore.getState().status).toBe('error');
    expect(useAppBootstrapStore.getState().errorMessage).toBe(
      'bootstrap failed',
    );
  });
});
