import { useReducer, useEffect, useState, useCallback, useMemo } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import { favReducer, loadFavs, KEY } from "../reducers/favouritesReducer";
import PhotoCard from "./PhotoCard";

function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [query, setQuery] = useState("");
  const [favs, dispatch] = useReducer(favReducer, [], loadFavs);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favs));
  }, [favs]);

  const handleChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const handleHeart = (id) => {
    dispatch({ type: "toggle", id });
  };

  const visiblePhotos = useMemo(() => {
    return photos.filter((p) =>
      p.author.toLowerCase().includes(query.toLowerCase())
    );
  }, [photos, query]);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by author..."
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {visiblePhotos.map((p) => (
          <PhotoCard
            key={p.id}
            photo={p}
            isFav={favs.includes(p.id)}
            onHeartClick={handleHeart}
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery;