import React, { useState } from 'react';

const RecipeForm = ({ initialRecipe, onSubmit }) => {
  const [recipe, setRecipe] = useState(initialRecipe || {
    title: '', ingredients: '', instructions: '', cuisine: '', imageUrl: ''
  });

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e)=> {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipe({ ...recipe, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(recipe);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={recipe.title}
        onChange={handleChange}
        placeholder="Title"
        className="border p-2 w-full"
      />
      <textarea
        name="ingredients"
        value={recipe.ingredients}
        onChange={handleChange}
        placeholder="Ingredients"
        className="border p-2 w-full"
      />
      <textarea
        name="instructions"
        value={recipe.instructions}
        onChange={handleChange}
        placeholder="Instructions"
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="cuisine"
        value={recipe.cuisine}
        onChange={handleChange}
        placeholder="Cuisine"
        className="border p-2 w-full"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 w-full mb-4"
      />
      {recipe.imageUrl && (
        <img src={recipe.imageUrl} alt="Preview" className="w-full h-48 object-cover mb-4" />
      )}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
