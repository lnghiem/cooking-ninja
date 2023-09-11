import { useLocation } from "react-router-dom";
import RecipeList from "../../components/RecipeList";
import { useFetch } from "../../hooks/useFetch";
import "./Search.css";

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString); //create a URLSearchParams object
  const query = queryParams.get("q"); //get the value of the "q" param
  const url = "http://localhost:3000/recipes?q=" + query;
  const { error, isPending, data } = useFetch(url); //execute the useFetch() and pass in the url to get the recipes

  return (
    <div>
      <h2 className="page-title">Recipes include "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
