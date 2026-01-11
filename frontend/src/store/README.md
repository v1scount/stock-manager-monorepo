# Zustand Store Boilerplate

This directory contains the Zustand store configuration with immer, persist, and Redux DevTools middleware.

## Features

- **Immer**: Write mutating logic that gets converted to immutable updates
- **Persist**: Automatically save state to localStorage
- **Redux DevTools**: Debug state changes with Redux DevTools browser extension

## Structure

```
store/
├── index.ts          # Example counter store
├── types.ts          # Common TypeScript types
├── createStore.ts    # Factory function for creating stores
└── README.md         # This file
```

## Usage Examples

### Using the Example Counter Store

```tsx
import { useCounterStore, selectCount } from '@/store';

function Counter() {
  // Subscribe to specific state
  const count = useCounterStore(selectCount);
  
  // Get actions
  const { increment, decrement, reset } = useCounterStore(
    (state) => ({
      increment: state.increment,
      decrement: state.decrement,
      reset: state.reset,
    })
  );

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Creating a New Store (Manual Approach)

```tsx
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface TodoState {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>()(
  devtools(
    persist(
      immer((set) => ({
        todos: [],
        
        addTodo: (todo) =>
          set(
            (state) => {
              state.todos.push(todo);
            },
            false,
            { type: 'todo/addTodo', todo }
          ),
        
        removeTodo: (id) =>
          set(
            (state) => {
              state.todos = state.todos.filter(t => t.id !== id);
            },
            false,
            { type: 'todo/removeTodo', id }
          ),
        
        toggleTodo: (id) =>
          set(
            (state) => {
              const todo = state.todos.find(t => t.id === id);
              if (todo) {
                todo.completed = !todo.completed;
              }
            },
            false,
            { type: 'todo/toggleTodo', id }
          ),
      })),
      { name: 'todo-storage' }
    ),
    { name: 'TodoStore', enabled: import.meta.env.DEV }
  )
);
```

### Creating a New Store (Using Factory)

```tsx
import { createStore } from './createStore';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useUserStore = createStore<UserState>(
  (set) => ({
    user: null,
    isAuthenticated: false,
    
    login: (user) =>
      set((state) => {
        state.user = user;
        state.isAuthenticated = true;
      }),
    
    logout: () =>
      set((state) => {
        state.user = null;
        state.isAuthenticated = false;
      }),
  }),
  {
    name: 'UserStore',
    enablePersist: true,
    enableDevtools: true,
  }
);
```

## Best Practices

### 1. Separate State and Actions

```tsx
interface State {
  count: number;
  name: string;
}

interface Actions {
  increment: () => void;
  setName: (name: string) => void;
}

type Store = State & Actions;
```

### 2. Use Selectors

Selectors help optimize re-renders by allowing components to subscribe to specific parts of the state.

```tsx
// Define selectors
export const selectCount = (state: CounterStore) => state.count;
export const selectName = (state: CounterStore) => state.name;

// Use in components
const count = useCounterStore(selectCount);
```

### 3. Action Naming for DevTools

The third parameter in `set()` is the action name shown in Redux DevTools.

**Simple action name (string):**
```tsx
set(
  (state) => {
    state.count += 1;
  },
  false,
  'counter/increment'
)
```

**Action with metadata (object):**
```tsx
set(
  (state) => {
    state.count += value;
  },
  false,
  { type: 'counter/incrementBy', value }
)
```

This makes your actions appear properly named in Redux DevTools instead of "anonymous".

### 4. Conditional Persistence

You can choose which parts of the state to persist:

```tsx
persist(
  immer((set) => ({ /* ... */ })),
  {
    name: 'my-storage',
    partialize: (state) => ({
      // Only persist these fields
      user: state.user,
      settings: state.settings,
    }),
  }
)
```

### 5. Async Actions

```tsx
fetchTodos: async () => {
  set(
    (state) => {
      state.loading = true;
    },
    false,
    'todos/fetchTodos/pending'
  );
  
  try {
    const todos = await api.getTodos();
    set(
      (state) => {
        state.todos = todos;
        state.loading = false;
      },
      false,
      { type: 'todos/fetchTodos/fulfilled', count: todos.length }
    );
  } catch (error) {
    set(
      (state) => {
        state.error = error;
        state.loading = false;
      },
      false,
      { type: 'todos/fetchTodos/rejected', error: error.message }
    );
  }
}
```

## Middleware Order

The middleware order matters! The current order is:
1. **devtools** (outer)
2. **persist** (middle)
3. **immer** (inner)

This ensures:
- DevTools sees all state changes
- Persistence works with immutable updates
- Immer provides the mutating API

## TypeScript Tips

### Getting Store Type

```tsx
import { useCounterStore } from '@/store';

type CounterStore = ReturnType<typeof useCounterStore.getState>;
```

### Action-Only Hook

```tsx
const actions = useCounterStore(
  (state) => ({
    increment: state.increment,
    decrement: state.decrement,
  }),
  shallow // prevents re-renders
);
```

## Debugging

### Redux DevTools

Install the [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools) for your browser to inspect state changes.

### Clear Persisted State

```tsx
// In browser console or a dev utility
localStorage.removeItem('counter-storage');
```

### Accessing Store Outside React

```tsx
// Get current state
const state = useCounterStore.getState();

// Subscribe to changes
const unsubscribe = useCounterStore.subscribe((state, prevState) => {
  console.log('State changed:', state);
});

// Call actions
useCounterStore.getState().increment();
```

## Resources

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Immer Documentation](https://immerjs.github.io/immer/)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)
