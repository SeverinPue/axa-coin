import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import './stylesheets/themeswitcher.css'

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <label id="switch" className="switch">
            <input type="checkbox" onChange={toggleTheme} checked={theme === 'light' ? true : false} id="slider"></input>
            <span className="slider round"></span>
        </label>
  );
};

export default ThemeSwitcher;