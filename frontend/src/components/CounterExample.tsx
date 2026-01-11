/**
 * Example component demonstrating Zustand store usage
 * You can delete this file once you understand the pattern
 */

import { useCounterStore } from '@/store';
import { Button } from '@/components/ui/button';

export function CounterExample() {
  // Subscribe to the entire store
  const { count, name, increment, decrement, incrementBy, setName, reset } = useCounterStore();

  return (
    <div className="p-8 max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-4xl font-mono">{count}</p>
      </div>

      <div className="flex gap-2 justify-center">
        <Button onClick={decrement} variant="outline">
          -1
        </Button>
        <Button onClick={increment}>
          +1
        </Button>
        <Button onClick={() => incrementBy(5)} variant="outline">
          +5
        </Button>
      </div>

      <div className="flex gap-2">
        <Button onClick={reset} variant="destructive" className="flex-1">
          Reset
        </Button>
      </div>

      <div className="pt-4 border-t space-y-2">
        <label className="text-sm font-medium">Store Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter store name"
        />
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <p>✓ State persists in localStorage</p>
        <p>✓ Open Redux DevTools to see actions</p>
        <p>✓ Refresh page to see persistence in action</p>
      </div>
    </div>
  );
}
