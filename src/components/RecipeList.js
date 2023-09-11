import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import trashcanIcon from "../assets/trashcan-icon.svg";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

// styles
import "./RecipeList.css";

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();
  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>;
  }

  const handleClick = (id) => {
    console.log("you click handleClick function!!!");
    const ref = doc(db, "recipes", id); //this gets us a reference to a specific document id from the recipes collection
    deleteDoc(ref);
  };
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img
            className="delete"
            src={trashcanIcon}
            onClick={() => handleClick(recipe.id)}
            alt=""
          />
        </div>
      ))}
    </div>
  );
}
