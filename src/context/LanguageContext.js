import React, { createContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "fr";
    const [selectedLanguage, setSelectedLanguage] = useState(savedLanguage);

    useEffect(() => {
        localStorage.setItem("selectedLanguage", selectedLanguage);
    }, [selectedLanguage]);

    return (
        <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
