/**
 * Common types for Zustand stores
 */

import { StateCreator } from 'zustand';

/**
 * Helper type for creating slices with middleware
 * This type makes it easier to create store slices that work with immer and devtools
 */
export type ImmerStateCreator<T> = StateCreator<
  T,
  [['zustand/immer', never], ['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  T
>;

/**
 * Utility type to extract state from store
 */
export type StoreState<T> = T extends { getState: () => infer S } ? S : never;

/**
 * Utility type to extract actions from store (methods only)
 */
export type StoreActions<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : never;
};
