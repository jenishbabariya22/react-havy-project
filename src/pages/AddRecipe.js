import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipe = ({ addRecipe }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Set the image URL to the reader result
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      title,
      ingredients: ingredients.split(',').map(item => item.trim()), // Clean up ingredients
      instructions,
      cuisine,
      price: parseFloat(price),
      imageUrl,
    };
    addRecipe(newRecipe);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Recipe</h2>
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
        type="file"
        className="border p-2 w-full mb-4"
        accept="image/*"
        onChange={handleImageChange} // Handle image file input
        required
      />
      {imageUrl && ( // Display the image preview
        <img src={imageUrl} alt="Preview" className="w-full h-48 object-cover mb-4" />
      )}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipe;
