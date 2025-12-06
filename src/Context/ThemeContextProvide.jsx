import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children }) => {
    
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "black-purple"
    );

  
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    
    const toggleTheme = () => {
        setTheme(prevTheme => 
            prevTheme === "black-purple" ? "light-purple" : "black-purple"
        );
    };

    
    const themeInfo = {
        theme,
        toggleTheme,
        isDarkMode: theme === "black-purple" 
    };

    return (
        <ThemeContext.Provider value={themeInfo}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;