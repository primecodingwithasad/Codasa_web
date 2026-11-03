import { useState, useEffect, useSyncExternalStore } from 'react';
import { Store } from '../services/store';

export function useStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    return Store.subscribe(() => {
      setTick(t => t + 1);
    });
  }, []);

  return {
    currentUser: Store.getCurrentUser(),
    users: Store.getUsers(),
    pins: Store.getPins(),
    boards: Store.getBoards(),
    notifications: Store.getNotifications(),
    messages: Store.getMessages(),
    reports: Store.getReports(),
    analytics: Store.getAnalytics(),
    actions: Store
  };
}
