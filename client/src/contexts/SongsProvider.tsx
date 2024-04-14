import { createContext, useEffect, useState } from "react";

const url = 'http://localhost:8089/songs';

type Song = {
  id: string;
  title: string;
  artist: string;
  key: string;
};

type SongContext = {
  songList: Song[];
  submitted: boolean;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SongContext = createContext({} as SongContext);

export const SongsProvider = ({ children }: { children: React.ReactNode }) => {
  const [songList, setSongs] = useState([] as Song[]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const getSongs = async () => {
      const songs = await fetch(url)
        .then(res => res.json())
      setSongs(songs);
    };

    getSongs();
  }, [submitted]);

  return (
    <SongContext.Provider
      value={{
        songList,
        submitted,
        setSubmitted,
      }}
    >
      {children}
    </SongContext.Provider>
  )
};
