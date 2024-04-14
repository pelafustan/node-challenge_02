import { useContext } from "react";
import { SongContext } from "../contexts/SongsProvider";

export default function useSongs() {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error('useSongsContext must be used within a SongsContextProvider');
  }
  return context;
}
