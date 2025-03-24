import { createContext, useContext, useState } from "react";

// Create the context
const LoaderContext = createContext();

// Provider component to wrap your app
export const LoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoaderContext.Provider>
    );
};

// Custom hook to access the loader context
export const useLoader = () => useContext(LoaderContext);
