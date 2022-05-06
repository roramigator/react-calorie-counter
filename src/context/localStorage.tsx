import React, { createContext, useContext } from 'react';

type Titem = { id: number; name: string; calories: number | string };

const localStorageControl = (() => {
  const LS = 'items';

  const getFromLS = () => {
    const items = localStorage.getItem(LS);
    return items ? JSON.parse(items) : [];
  };

  const setToLS = (items: Titem[]) => {
    localStorage.setItem(LS, JSON.stringify(items));
  };

  return {
    get: () => {
      const items = getFromLS();
      return items;
    },
    store: (item: Titem) => {
      const items = getFromLS();
      items.push(item);
      setToLS(items);
    },
    update: (item: Titem) => {
      const items = getFromLS();
      items[item.id] = item;
      setToLS(items);
    },
    remove: (item: Titem) => {
      const items = getFromLS();
      items.splice(item.id, 1);

      const sortItems = items.map((item: Titem, index: number) => {
        item.id = index;
        return item;
      });

      setToLS(sortItems);
    },
    clear: () => {
      localStorage.removeItem(LS);
    },
  };
})();

const LocalStorageContext =
  createContext<typeof localStorageControl>(localStorageControl);

export default function LocalStorageProvider(props: { children: JSX.Element }) {
  return (
    <LocalStorageContext.Provider value={localStorageControl}>
      {props.children}
    </LocalStorageContext.Provider>
  );
}

export function useLocalStorage() {
  const context = useContext(LocalStorageContext);
  return context;
}
