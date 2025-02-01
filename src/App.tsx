import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { Provider } from 'react-redux';
import store from './store';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dir = direction;
  }, [theme, direction]);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
        <header className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">داشبورد</h1>
          <div className="flex space-x-4">
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            >
              تغییر قالب
            </button>
            <button
              onClick={() => setDirection(direction === 'ltr' ? 'rtl' : 'ltr')}
              className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
            >
              تغییر زبان
            </button>
          </div>
        </header>
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;
