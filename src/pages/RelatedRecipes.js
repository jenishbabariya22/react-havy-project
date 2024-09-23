import React from 'react';
import { useParams } from 'react-router-dom';
import RecipeList from '../components/RecipeList';

const RelatedRecipes = ({ recipes }) => {
  const { tag } = useParams();
  const relatedRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(tag) || recipe.cuisine.toLowerCase().includes(tag)
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Related Recipes</h1>
      <RecipeList recipes={relatedRecipes} />
    </div>
  );
};

export default RelatedRecipes;
