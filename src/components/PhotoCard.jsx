function PhotoCard({ photo, isFav, onHeartClick }) {
  return (
    <div className="bg-white rounded shadow">
      <img
        src={`https://picsum.photos/id/${photo.id}/400/300`}
        alt={photo.author}
        className="w-full h-48 object-cover rounded-t"
      />
      <div className="flex justify-between items-center p-3">
        <p className="text-gray-700">{photo.author}</p>
        <button
          onClick={() => onHeartClick(photo.id)}
          className={`text-2xl ${isFav ? "text-red-500" : "text-gray-300"}`}
        >
          ♥
        </button>
      </div>
    </div>
  );
}

export default PhotoCard;