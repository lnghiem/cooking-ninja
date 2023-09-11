import { useState, useEffect, useRef } from "react";

export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState([null]);
  const [options, setOptions] = useState(null);

  //use useRef to wrap an object/array argument
  //which is a useEffect dependency
  // const options = useRef(_options).current;

  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //stringify convert JavaScript postData object into a JSON object
      body: JSON.stringify(postData),
    });
  };
  useEffect(() => {
    // console.log(options);
    const controller = new AbortController();

    const fetchData = async (fetchOptions) => {
      setIsPending(true);
      try {
        const res = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        console.log(res);
        const json = await res.json();
        setIsPending(false);
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted");
        } else {
          setIsPending(false);
          setError("Could not fetch the data");
        }
      }
    };
    if (method === "GET") {
      fetchData();
    }
    if (method === "POST" && options) {
      fetchData(options);
    }

    return () => {
      controller.abort();
    };
  }, [url, options, method]);
  return { data, isPending, error, postData };
};
