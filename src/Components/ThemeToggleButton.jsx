import { useContext } from 'react';

import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'; 
import { ThemeContext } from '../contexts/ThemeContext';
const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-indigo-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-6 w-6" />
      ) : (
        <SunIcon className="h-6 w-6 text-yellow-500" />
      )}
    </button>
  );
};

export default ThemeToggleButton;