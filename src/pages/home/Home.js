import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";

// styles
import "./Home.css";

// components
import RecipeList from "../../components/RecipeList";

export default function Home() {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState();
  const { mode } = useTheme();

  useEffect(() => {
    const ref = collection(db, "recipes"); //this gets us a reference to the recipes collection
    setIsPending(true);

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.empty) {
          // no documents in the snapshot, so set the error
          setError("No recipes to load.");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
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

  return (
    <div className="home">
      {error && <p className="error ${mode}">{error}</p>}
      {isPending && <p className="loading ${mode}">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
