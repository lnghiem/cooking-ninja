import { useState, useRef, useEffect } from "react";
// import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

// styles
import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  // const { postData, data } = useFetch("http://localhost:3000/recipes", "POST");
  const navigate = useNavigate();

  // // redirect the user when we get data response
  // useEffect(() => {
  //   if (data.length != 0) {
  //     navigate("/");
  //   }
  // }, [data, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // postData({title, ingredients, method, cookingTime: cookingTime + " minutes",});
    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    };
    const ref = collection(db, "recipes"); //this gets us a reference to the recipes collection

    try {
      await addDoc(ref, doc);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim(); //remove all the white spaces

    // validate that entered new ingredient does NOT already exists/includes in the list of ingredients
    // (which is the ingrdients array)
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient(""); //to clear the "newIngredient" input field so user can enter another new ingredient
    ingredientInput.current.focus(); // set the focus on the "newIngredient" input field
  };

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn">
              add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:{" "}
          {ingredients.map((ing) => (
            <em key={ing}>{ing}, </em>
          ))}{" "}
        </p>
        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
