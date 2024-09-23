import React from 'react';
import { Link } from 'react-router-dom';
import RecipeList from '../components/RecipeList';

const Home = ({ recipes, deleteRecipe }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Recipe Management</h1>
      <Link
        to="/add"
        className="bg-green-500 text-white p-2 rounded mb-4 inline-block"
        style={{ marginRight: "20px" }}
      >
        Add Recipe
      </Link>
      <Link
        to="/cart"
        className="bg-blue-500 text-white p-2 rounded mb-4 inline-block"
      >
        View Cart
      </Link>
      <RecipeList recipes={recipes} deleteRecipe={deleteRecipe} />
    </div>
  );
};

export default Home;
