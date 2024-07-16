import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import './themeswitcher.css'

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <label id="switch" class="switch">
            <input type="checkbox" onChange={toggleTheme} checked={theme === 'light' ? true : false} id="slider"></input>
            <span class="slider round"></span>
        </label>
  );
};

export default ThemeSwitcher;