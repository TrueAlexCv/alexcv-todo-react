"use client";
import React, { useState } from "react";
import { useList } from "../services/ListContext";
import { Button, Checkbox, TextField, FormControlLabel } from "@mui/material";

type Item = {
  id: number;
  name: string;
  favorite: boolean;
};

const AddItem: React.FC = () => {
  const { addItem } = useList();
  const [name, setName] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [error, setError] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleFavoriteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFavorite(event.target.checked);
  };

  const validateForm = () => {
    if (!name.trim()) {
      setError("El nombre es obligatorio");
      return false;
    }
    if (name.length < 3) {
      setError("El nombre debe tener al menos 3 caracteres");
      return false;
    }
    if (name.length > 50) {
      setError("El nombre no puede tener más de 50 caracteres");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      const newItem: Item = { id: 0, name, favorite };
      addItem(newItem);
      setName(""); 
      setFavorite(false);
    }
  };

  return (
    <div>
      <h3>Agregar nuevo item</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          variant="filled"
          fullWidth
          value={name}
          onChange={handleNameChange}
          error={!!error}
          helperText={error}
          inputProps={{ maxLength: 50 }}
        />
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={favorite}
                onChange={handleFavoriteChange}
                color="primary"
              />
            }
            label="Marcar como favorito"
          />
        </div>
        <Button type="submit" variant="contained" color="primary" disabled={!name || !!error}>
          Guardar
        </Button>
      </form>
    </div>
  );
};

export default AddItem;
