import { useState, useEffect } from "react";

function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?limit=30")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load photos");
        return res.json();
      })
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { photos, loading, error };
}

export default useFetchPhotos;