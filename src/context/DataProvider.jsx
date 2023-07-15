/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const _data = {};
  return (
    <DataContext.Provider value={{ ..._data }}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
