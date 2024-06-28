import React, { createContext, useState, ReactNode } from 'react';

interface AppContextProps {
  selectedCompetion: string;
  setSelectedCompetion: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCompetion, setSelectedCompetion] = useState<string>('');

  return (
    <AppContext.Provider value={{ selectedCompetion, setSelectedCompetion }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };