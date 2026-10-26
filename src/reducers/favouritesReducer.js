export const KEY = "favs";

export function loadFavs() {
  const stored = localStorage.getItem(KEY);
  return stored ? JSON.parse(stored) : [];
}

export function favReducer(state, action) {
  if (action.type === "toggle") {
    if (state.includes(action.id)) {
      return state.filter((id) => id !== action.id);
    }
    return [...state, action.id];
  }
  return state;
}