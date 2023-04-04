const { createContext, useContext } = require("react");

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  return <GlobalContext.Provider value={{}}></GlobalContext.Provider>;
};

export const useGlobalContext = () => useContext(GlobalContext);
