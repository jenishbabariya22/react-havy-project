import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './pages/CartContext'; // Import CartProvider
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import RecipeDetail from './pages/RecipeDetail';
import RelatedRecipes from './pages/RelatedRecipes';
import Cart from './pages/Cart'; // Create a Cart page
import './App.css';

const loadRecipesFromStorage = () => {
  const storedRecipes = localStorage.getItem('recipes');
  return storedRecipes ? JSON.parse(storedRecipes) : [];
};

const saveRecipesToStorage = (recipes) => {
  localStorage.setItem('recipes', JSON.stringify(recipes));
};

function App() {
  const [recipes, setRecipes] = useState(loadRecipesFromStorage);

  useEffect(() => {
    saveRecipesToStorage(recipes);
  }, [recipes]);

  const addRecipe = (recipe) => {
    const newRecipe = { ...recipe, id: Date.now() };
    setRecipes([...recipes, newRecipe]);
  };

  const updateRecipe = (updatedRecipe) => {
    setRecipes(recipes.map(recipe => recipe.id === updatedRecipe.id ? updatedRecipe : recipe));
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  return (
    <CartProvider>
      <Router>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home recipes={recipes} deleteRecipe={deleteRecipe} />} />
            <Route path="/add" element={<AddRecipe addRecipe={addRecipe} />} />
            <Route path="/edit/:id" element={<EditRecipe recipes={recipes} updateRecipe={updateRecipe} />} />
            <Route path="/detail/:id" element={<RecipeDetail recipes={recipes} />} />
            <Route path="/related/:tag" element={<RelatedRecipes recipes={recipes} />} />
            <Route path="/cart" element={<Cart />} /> {/* Add Cart route */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
