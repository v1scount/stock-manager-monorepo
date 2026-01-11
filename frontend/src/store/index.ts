import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

/**
 * Example store demonstrating Zustand with immer, persist, and devtools
 * 
 * Usage:
 * - immer: allows you to write mutating logic that will be converted to immutable updates
 * - persist: automatically saves state to localStorage
 * - devtools: enables Redux DevTools integration for debugging
 */

// Define the state interface
interface CounterState {
  count: number;
  name: string;
}

// Define the actions interface
interface CounterActions {
  increment: () => void;
  decrement: () => void;
  incrementBy: (value: number) => void;
  setName: (name: string) => void;
  reset: () => void;
}

// Combine state and actions
type CounterStore = CounterState & CounterActions;

// Initial state
const initialState: CounterState = {
  count: 0,
  name: 'Counter Store',
};

/**
 * Example counter store with all middleware enabled
 */
export const useCounterStore = create<CounterStore>()(
  devtools(
    persist(
      immer((set) => ({
        // Initial state
        ...initialState,

        // Actions using immer - you can mutate the draft state directly
        increment: () =>
          set(
            (state) => {
              state.count += 1;
            },
            false,
            'counter/increment'
          ),

        decrement: () =>
          set(
            (state) => {
              state.count -= 1;
            },
            false,
            'counter/decrement'
          ),

        incrementBy: (value: number) =>
          set(
            (state) => {
              state.count += value;
            },
            false,
            { type: 'counter/incrementBy', value }
          ),

        setName: (name: string) =>
          set(
            (state) => {
              state.name = name;
            },
            false,
            { type: 'counter/setName', name }
          ),

        reset: () =>
          set(initialState, false, 'counter/reset'),
      })),
      {
        name: 'counter-storage', // unique name for localStorage key
        // Optional: specify which parts to persist
        // partialize: (state) => ({ count: state.count }),
      }
    ),
    {
      name: 'CounterStore', // name shown in Redux DevTools
      enabled: import.meta.env.DEV, // only enable devtools in development
    }
  )
);

// Selectors - optional but recommended for performance
export const selectCount = (state: CounterStore) => state.count;
export const selectName = (state: CounterStore) => state.name;
export const selectActions = (state: CounterStore) => ({
  increment: state.increment,
  decrement: state.decrement,
  incrementBy: state.incrementBy,
  setName: state.setName,
  reset: state.reset,
});
