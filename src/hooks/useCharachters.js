import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
function useCharachters(query) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
          { signal },
        );
        setCharacters(data.results.slice(0, 5));
      } catch (error) {
        if (!axios.isCancel(error)) {
          setCharacters([]);
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getData();

    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, [query]);

  return { characters, isLoading };
}

export default useCharachters;
