import { create, StateCreator } from 'zustand';
import { devtools, persist, PersistOptions } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

/**
 * Configuration options for creating a store
 */
interface CreateStoreOptions<T> {
  name: string;
  enablePersist?: boolean;
  persistOptions?: Omit<PersistOptions<T>, 'name'>;
  enableDevtools?: boolean;
}

/**
 * Factory function to create a Zustand store with standard middleware
 * 
 * @example
 * ```ts
 * interface UserState {
 *   user: User | null;
 *   setUser: (user: User) => void;
 * }
 * 
 * export const useUserStore = createStore<UserState>(
 *   (set) => ({
 *     user: null,
 *     setUser: (user) => set((state) => { state.user = user; }),
 *   }),
 *   {
 *     name: 'UserStore',
 *     enablePersist: true,
 *     enableDevtools: true,
 *   }
 * );
 * ```
 */
export function createStore<T>(
  stateCreator: StateCreator<T, [['zustand/immer', never]], [], T>,
  options: CreateStoreOptions<T>
) {
  const {
    name,
    enablePersist = false,
    persistOptions,
    enableDevtools = import.meta.env.DEV,
  } = options;

  // Build middleware chain based on options
  let store = immer(stateCreator);

  if (enablePersist) {
    store = persist(store, {
      name: `${name.toLowerCase()}-storage`,
      ...persistOptions,
    }) as any;
  }

  if (enableDevtools) {
    store = devtools(store, {
      name,
      enabled: import.meta.env.DEV,
    }) as any;
  }

  return create<T>()(store);
}
