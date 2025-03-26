import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const LoaderContext = createContext();

// Provider component to manage loading and store fetched data
export const LoaderProvider = ({ children, fetchInitialData }) => {
  const [loading, setLoading] = useState(true);
  const [appData, setAppData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchInitialData(); // Fetch all necessary data
        setAppData(data); // Store data globally
        // console.log(data);
      } catch (error) {
        console.error("Error loading initial data:", error);
        setError("Failed to load required data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchInitialData]);
  if (error) return <div className="error">{error}</div>;

  return (
    <LoaderContext.Provider value={{ loading, appData, setLoading }}>
      {loading ? <GlobalLoader /> : children}
    </LoaderContext.Provider>
  );
};

// Custom hook to access the loader and data context
export const useLoader = () => useContext(LoaderContext);

// Loader component
const GlobalLoader = () => (
  <div className="loader-overlay">
    <div className="loader"></div>
  </div>
);
