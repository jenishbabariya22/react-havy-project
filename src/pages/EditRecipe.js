import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditRecipe = ({ recipes, updateRecipe }) => {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === parseInt(id));
  const [title, setTitle] = useState(recipe.title);
  const [ingredients, setIngredients] = useState(recipe.ingredients.join(',')); // Assuming comma-separated input
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [cuisine, setCuisine] = useState(recipe.cuisine);
  const [price, setPrice] = useState(recipe.price);
  const [imageUrl, setImageUrl] = useState(recipe.imageUrl);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRecipe = {
      ...recipe,
      title,
      ingredients: ingredients.split(','), // Convert back to array
      instructions,
      cuisine,
      price: parseFloat(price),
      imageUrl
    };
    updateRecipe(updatedRecipe);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>
      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="border p-2 w-full mb-4"
        placeholder="Ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
      />
      <textarea
        className="border p-2 w-full mb-4"
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        required
      />
      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="Cuisine"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        required
      />
      <input
        type="number"
        className="border p-2 w-full mb-4"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Update Recipe
      </button>
    </form>
  );
};

export default EditRecipe;
