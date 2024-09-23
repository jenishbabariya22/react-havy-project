import React from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = ({ recipes }) => {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === parseInt(id));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
      <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover mb-4" />
      <h3 className="font-semibold">Cuisine: {recipe.cuisine}</h3>
      <h3 className="font-semibold">Ingredients:</h3>
      <ul className="list-disc ml-5 mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.trim()}</li>
        ))}
      </ul>
      <h3 className="font-semibold">Instructions:</h3>
      <p>{recipe.instructions}</p>
      <p className="font-bold text-green-600">Price: ${parseFloat(recipe.price).toFixed(2)}</p>
    </div>
  );
};

export default RecipeDetail;
