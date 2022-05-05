import React, { useState, createContext, useContext, useEffect } from 'react';

const DataContext = createContext({});

export default function DataProvider(props: { children: JSX.Element }) {
  const [data, setData] = useState(localStorage.getItem('items'));

  useEffect(() => {
    console.log(data, 'data');
  }, [data]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {props.children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);

  if (context) {
    console.log(context, 'context');
  }
}
