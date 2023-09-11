import { unstable_useBlocker, useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";

// styles
import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams(); // extract the "id" from the route parameter and stores the value in the id constant
  const { mode } = useTheme(); //grab the mode property from the useTheme hook
  // const url = "http://localhost:3000/recipes/" + id; // url constant to get a specific recipe using the id
  // const { data: recipe, isPending, error } = useFetch(url); //execute the fetch to get the recipe by using the url constant
  const [recipe, setRecipe] = useState();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState();
  const ref = doc(db, "recipes", id); //this gets us a reference to a specific document id from the recipes collection

  useEffect(() => {
    setIsPending(true);
    const unsub = onSnapshot(
      ref,
      (doc) => {
        if (!doc.exists()) {
          // no document, so set the error
          setError("No recipe found.");
          setIsPending(false);
        } else {
          console.log(doc.exists());
          setRecipe(doc.data());
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );
    return () => unsub();
  }, []);

  const handleClick = () => {
    updateDoc(ref, {
      // pass in only the property we want to udpate
      title: "new recipe",
    });
  };
  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}>Update me</button>
        </>
      )}
    </div>
  );
}
