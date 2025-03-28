  "use client";
  import { createContext, useContext, useState, ReactNode } from "react";

  export type Item = {
    id: number;
    name: string;
    favorite: boolean;
  };

  type ListContextType = {
    items: Item[];
    getItems: () => Item[];
    addItem: (item: Item) => boolean;
    removeItem: (id: number) => boolean;
    toggleFavorite: (id: number) => boolean;
  };

  const ListContext = createContext<ListContextType | undefined>(undefined);

  export const ListProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<Item[]>([
      { id: 1, name: "item 1", favorite: true },
      { id: 2, name: "item 2", favorite: false },
      { id: 3, name: "item 3", favorite: false },
      { id: 4, name: "item 4", favorite: false },
      { id: 5, name: "item 5", favorite: false },
    ]);

    const getItems = () => items;

    const addItem = (item: Item): boolean => {
      const maxId = items.length > 0 ? Math.max(...items.map((i) => i.id)) : 0;
      const newItem = { ...item, id: maxId + 1 };
      setItems([...items, newItem]);
      return true;
    };

    const removeItem = (id: number): boolean => {
      const updatedItems = items.filter((i) => i.id !== id);
      if (updatedItems.length !== items.length) {
        setItems(updatedItems);
        return true;
      }
      return false;
    };

    const toggleFavorite = (id: number): boolean => {
      const updatedItems = items.map((i) =>
        i.id === id ? { ...i, favorite: !i.favorite } : i
      );
      setItems(updatedItems);
      return true;
    };

    return (
      <ListContext.Provider value={{ items, getItems, addItem, removeItem, toggleFavorite }}>
        {children}
      </ListContext.Provider>
    );
  };

  export const useList = () => {
    const context = useContext(ListContext);
    if (!context) {
      throw new Error("useList debe usarse dentro de un ListProvider");
    }
    return context;
  };
