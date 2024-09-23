import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../pages/CartContext';

const RecipeList = ({ recipes, deleteRecipe }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearchTerm = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase());

    const recipePrice = parseFloat(recipe.price);
    const matchesPrice =
      (!minPrice || recipePrice >= parseFloat(minPrice)) &&
      (!maxPrice || recipePrice <= parseFloat(maxPrice));

    return matchesSearchTerm && matchesPrice;
  });

  const handleAddToCart = (recipe) => {
    addToCart(recipe);
    alert(`${recipe.title} has been added to your cart!`);
    // Optionally navigate to the cart
    navigate('/cart');
  };
  return (
    <div>
      <input
        type="text"
        className="border p-2 mb-4 w-full"
        placeholder="Search by title or cuisine..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex space-x-4 mb-4">
        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-white border rounded-lg shadow-md overflow-hidden">
            {recipe.imageUrl && (
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{recipe.title}</h2>
              <p className="text-gray-600">{recipe.cuisine}</p>
              <p className="text-lg font-bold text-green-600">Price: ₹{recipe.price}</p>
              <div className="flex justify-between items-center mt-3">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => handleAddToCart(recipe)}
                >
                  Add to Cart
                </button>
                <Link to={`/edit/${recipe.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Edit
                </Link>
                { <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => deleteRecipe(recipe.id)}
                >
                  Delete
                </button> }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
