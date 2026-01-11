# Redux DevTools Setup Guide

## ✅ Steps to See Redux DevTools Working

### 1. Start Your Development Server

Make sure your dev server is running:

```bash
cd frontend
yarn dev
```

### 2. Open the Application

Navigate to your app in the browser (usually `http://localhost:5173`)

### 3. Open Redux DevTools

**In Chrome/Edge:**
- Press `F12` to open Developer Tools
- Look for the **Redux** tab (it might be under the `>>` overflow menu)
- Click on it

**In Firefox:**
- Press `F12` to open Developer Tools
- Look for the **Redux** tab
- Click on it

### 4. Interact with the Counter

Go to the Home page and you should see the "Zustand Store Demo" section. Click the buttons:
- Click **+1** button
- Click **-1** button
- Click **+5** button
- Type in the input field

### 5. Watch Redux DevTools

In the Redux DevTools panel, you should now see:
- **Left panel**: List of actions (increment, decrement, incrementBy, setName)
- **Center panel**: State tree showing the current state
- **Right panel**: Diff showing what changed

## 🎯 What You Should See

### Actions List
```
⚡ persist/rehydrate
⚡ increment
⚡ increment
⚡ incrementBy/5
⚡ setName
```

### State Tree
```json
{
  "count": 7,
  "name": "Counter Store"
}
```

## 🔍 Troubleshooting

### Redux DevTools Tab Not Showing

**Problem**: The Redux tab doesn't appear in DevTools

**Solutions**:
1. **Verify the extension is installed**:
   - Chrome: Visit `chrome://extensions/`
   - Look for "Redux DevTools" and ensure it's enabled

2. **Refresh the page**:
   - Close DevTools
   - Refresh the browser page
   - Reopen DevTools

3. **Check if DevTools is detecting the app**:
   - The Redux icon in your browser toolbar should be colored (not gray)
   - If it's gray, no Redux store is detected

### No Actions Appearing

**Problem**: Redux tab is open but no actions show up

**Solutions**:
1. **Make sure you're on the Home page**
2. **Click the counter buttons** - actions only appear when you interact with the store
3. **Check browser console for errors** - there might be a JavaScript error preventing the store from initializing

### DevTools Says "No store found"

**Problem**: Redux DevTools shows "No store found"

**Solutions**:
1. **Verify you're in development mode**:
   - Check that `import.meta.env.DEV` is `true`
   - Run `yarn dev`, not `yarn build` + `yarn preview`

2. **Check the store is being used**:
   - The store needs to be called in a React component
   - We added it to the Home page, so make sure you're on `/`

3. **Clear browser cache and localStorage**:
   ```js
   // In browser console
   localStorage.clear();
   location.reload();
   ```

### Wrong Extension Installed

**Problem**: You might have the wrong extension

**Make sure you have one of these**:
- [Redux DevTools (Chrome)](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- [Redux DevTools (Firefox)](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)
- [Redux DevTools (Edge)](https://microsoftedge.microsoft.com/addons/detail/redux-devtools/nnkgneoiohoecpdiaponcejilbhhikei)

## 🧪 Testing the Store Outside Components

You can also test the store directly in the browser console:

```js
// Import is already available in the app
const store = window.__ZUSTAND_STORES__?.CounterStore;

// Or access via the useCounterStore hook
// (You'll need to expose it to window for testing)

// In your code, temporarily add:
// window.counterStore = useCounterStore;

// Then in console:
counterStore.getState();           // See current state
counterStore.getState().increment(); // Call action
counterStore.getState().count;     // See updated value
```

## 📊 DevTools Features to Try

Once it's working, explore these features:

### 1. **Action List**
- Click on any action to see its details
- See when each action was dispatched

### 2. **State Tree**
- Inspect the current state
- Navigate through nested objects

### 3. **Diff Tab**
- See exactly what changed with each action
- Shows before/after values

### 4. **Time Travel**
- Click on any previous action
- The app state will revert to that point
- Great for debugging!

### 5. **Chart View**
- See a visualization of your state tree
- Helpful for complex nested state

### 6. **Action Filtering**
- Filter actions by name
- Hide certain actions you don't care about

## 🎉 Success!

If you can see actions appearing and state updating in Redux DevTools, congratulations! Your Zustand store with Redux DevTools integration is working perfectly.

Now you can:
- Remove the CounterExample from the Home page
- Create your own stores for your stock manager app
- Use the same pattern for products, inventory, reports, etc.

## 📝 Next Steps

1. **Remove the demo** (when you're done testing):
   - Remove `<CounterExample />` from `pages/home/index.tsx`
   - Optionally delete `components/CounterExample.tsx`

2. **Create your real stores**:
   - Products store
   - Inventory store
   - User/Auth store
   - Settings store
   - etc.

3. **Read the store README**:
   - Check `src/store/README.md` for patterns and examples
