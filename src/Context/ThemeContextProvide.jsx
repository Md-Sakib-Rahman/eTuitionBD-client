import React, { createContext, useEffect, useState } from 'react';

// Create the context with null as default
export const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children }) => {
    // 1. Initialize: Check LocalStorage first, otherwise default to "black-purple"
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "black-purple"
    );

    // 2. The "Painter" Effect: 
    // Whenever 'theme' changes, paint the HTML tag and write to memory.
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    // 3. The Toggle Switch
    const toggleTheme = () => {
        setTheme(prevTheme => 
            prevTheme === "black-purple" ? "light-purple" : "black-purple"
        );
    };

    // 4. Packaging the data
    const themeInfo = {
        theme,
        toggleTheme,
        isDarkMode: theme === "black-purple" // Helper boolean for components that need it
    };

    return (
        <ThemeContext.Provider value={themeInfo}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;