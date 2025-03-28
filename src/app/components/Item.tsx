"use client";
import React from "react";
import { Checkbox, Button, Toolbar } from "@mui/material";

export type Item = {
  id: number;
  name: string;
  favorite: boolean;
};

interface ItemProps {
  item: Item;
  onDelete: (id: number) => void;
  onFavoriteChange: (id: number) => void;
}

const Item: React.FC<ItemProps> = ({ item, onDelete, onFavoriteChange }) => {
  return (
    <div>
      <Toolbar>{item.name}</Toolbar>

      <div>
        <Checkbox
          checked={item.favorite}
          onChange={() => onFavoriteChange(item.id)}
          color="primary"
        />
        <span>Favorito</span>
      </div>

      <div>
        <Button variant="contained" color="secondary" onClick={() => onDelete(item.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Item;
