"use client";

import styles from "./styles.module.css";
import plug from "../public/img/cat.jpg";
import logout from "../public/img/Logout.svg";
import Track from "../components/Track";
import Search from "@/components/Search";
import Playlist from "../components/Playlist";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { isDynamicPostpone } from "next/dist/server/app-render/dynamic-rendering";

const API_URL = "http://127.0.0.1:8000";

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
  const router = useRouter();
  const [user, setUsers] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [searchTracks, setSearchTracks] = useState<Track[]>([]);
  const [lastTrack, setLastTrack] = useState<Track | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.push("/login");
      setLoading(false);
      return;
    }

    axios
      .get(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching users:", error));

    axios
      .get(`${API_URL}/tracks`)
      .then((response) => response.data)
      .then((data) => {
        setTracks(data);
        setSearchTracks(data);
      })
      .catch((error) => console.error("Error fetching tracks:", error));

    const saveTrack = localStorage.getItem("lastTrack");
    if (saveTrack) {
      try {
        const track = JSON.parse(saveTrack);
        setLastTrack(track);
      } catch (e) {
        console.log(e);
      }
    } else {
      setLastTrack(null);
    }
  }, []);

  if (!user && !isLoading) {
    router.push("/login");
    return null;
  }

  const handleTrack = (track: Track) => {
    setLastTrack(track);
  };

  const handleExit = () => {
    if (token) {
      localStorage.removeItem("token");
      router.push("/login");
      setLoading(false);
      return;
    }
  };

  const handleSearch = (filtered: any[]) => {
    setSearchTracks(filtered);
  };

  const usePhoto = API_URL + "" + user?.photo;

  return (
    <div className={styles.body}>
      <header>
        <img
          className="logo"
          src={usePhoto || plug.src}
          alt={""}
          width={50}
          height={50}
        ></img>
        <Search tracks={tracks} onChanged={handleSearch}></Search>
        <button className={styles.logout} onClick={handleExit}>
          <Image
            className={styles.logout_ing}
            src={logout}
            alt={""}
            width={20}
            height={20}
          ></Image>
        </button>
      </header>
      <div className={styles.mainBody}>
        <div className="left-panel">
          <Playlist name={"name playlist"}></Playlist>
          <Playlist name={"name playlist"}></Playlist>
        </div>
        <div className="main-panel">
          {searchTracks.map((track) => (
            <Track
              key={track.track_id}
              track_id={track.track_id}
              title={track.title}
              picture={API_URL + "" + track.picture}
              author={track.author}
              path_file={API_URL + "" + track.path_file}
              duration={track.duration}
              onTrackClick={handleTrack}
            ></Track>
          ))}
        </div>
      </div>

      <div className="player">
        {lastTrack ? (
          <>
            <img
              className="img-m"
              src={lastTrack.picture || plug.src}
              alt={lastTrack.title}
              width={50}
              height={50}
            />
            <div className="track-info">
              <p className="track-title">{lastTrack.title}</p>
              <p className="track-author">{lastTrack.author}</p>
            </div>
            <audio controls src={lastTrack.path_file} />
          </>
        ) : (
          <>
            <Image
              className="img-m"
              src={plug.src}
              alt="No track"
              width={50}
              height={50}
            ></Image>
            <p>Выберите трек</p>
          </>
        )}
      </div>
    </div>
  );
}
