"use client";

import styles from "./styles.module.css";
import plug from "../public/img/cat.jpg";
import Track from "../components/Track";
import Playlist from "../components/Playlist";
import Image from "next/image";
import { useEffect, useState } from "react";
import { title } from "process";

const API_URL = 'http://127.0.0.1:8000';

interface User {
  user_id: number;
  login: string;
  email: string;
  photo?: string;
}

interface Track {
  track_id: number;
  title: string;
  author: string;
  path_file: string;
  duration: string;
  category?: string;
  picture?: string;
}


export default function Main() {
  const [user, setUsers] = useState<User | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [track, setTrack] = useState<Track | null>(null);


  useEffect(() => {
    fetch(`${API_URL}/me`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/tracks`)
      .then((response) => response.json())
      .then((data) => setTracks(data))
      .catch((error) => console.error("Error fetching tracks:", error));
  }, []);

  return (
    <div className={styles.body}>
      <header>
        <Image className="logo" src={user?.photo || plug.src} alt={""} width={50} height={50}></Image>
        <input type="text" placeholder="search" />
      </header>
      <div className={styles.mainBody}>
        <div className="left-panel">
          <Playlist name={"name playlist"}></Playlist>
          <Playlist name={"name playlist"}></Playlist>
        </div>
        <div className="main-panel">

          {tracks.map((track) =>(
            <Track title={track?.title} img={track.picture || plug.src}></Track>
          ))}
          
        </div>
      </div>

      <div className="player">
        <Image className="img-m" src={plug.src} alt={""} width={20} height={20}></Image>
        <audio controls src=""></audio>
      </div>
    </div>
  );
}
