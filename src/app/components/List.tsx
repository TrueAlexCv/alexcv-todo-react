"use client";
import React, { useState, useEffect } from "react";
import Item from "../components/Item";
import { Button } from "@mui/material";
import { useList } from "../services/ListContext";

const List: React.FC = () => {
  const { items, removeItem, toggleFavorite, getItems } = useList();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'favorites'>('all');

  const [filteredItems, setItems] = useState(items);

  useEffect(() => {
    if (selectedFilter === 'favorites') {
      setItems(getItems().filter((item) => item.favorite));
    } else {
      setItems(getItems());
    }
  }, [selectedFilter, getItems]);

  const handleDelete = (id: number) => {
    removeItem(id);
    setItems(getItems());
  };

  const handleFavoriteChange = (id: number) => {
    toggleFavorite(id);
    setItems(getItems());
  };

  return (
    <div>
      <div>
        <Button
          variant="outlined"
          color={selectedFilter === 'all' ? 'primary' : 'inherit'}
          onClick={() => setSelectedFilter('all')}
        >
          TO-DO
        </Button>
        <Button
          variant="outlined"
          color={selectedFilter === 'favorites' ? 'primary' : 'inherit'}
          onClick={() => setSelectedFilter('favorites')}
        >
          Favoritos
        </Button>
      </div>

      <div>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Item
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onFavoriteChange={handleFavoriteChange}
            />
          ))
        ) : (
          <div>No items found</div>
        )}
      </div>
    </div>
  );
};

export default List;

