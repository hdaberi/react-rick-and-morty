import { useState, useEffect } from "react";
export default function useLocalstorage() {
  const [favourite, setFavourite] = useState(
    () => JSON.parse(localStorage.getItem("FAVOURITS")) || [],
  );
  useEffect(() => {
    localStorage.setItem("FAVOURITS", JSON.stringify(favourite));
  }, [favourite]);
  return { favourite, setFavourite };
}
