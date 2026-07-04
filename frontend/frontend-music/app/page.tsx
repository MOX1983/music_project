"use client";

import styles from "./styles.module.css";
import plug from "../public/img/cat.jpg";
import Track from "../components/Track";
import Header from "@/components/Header";
import Playlist from "../components/Playlist";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {User} from "@/type/user";
import {Track as TrackType} from "@/type/tracks";

const API_URL = "http://127.0.0.1:8000";


export default function Main() {
  const router = useRouter();
  const [user, setUsers] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [searchTracks, setSearchTracks] = useState<TrackType[]>([]);
  const [lastTrack, setLastTrack] = useState<TrackType | null>(null);

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

  const handleTrack = (track: TrackType) => {
    setLastTrack(track);
  };

  const handleSearch = (filtered: TrackType[]) => {
    setSearchTracks(filtered);
  };

  const userPhoto = API_URL + "" + user?.photo;

  return (
    <div className={styles.body}>
      <Header userPhoto={userPhoto} tracks={tracks} onLoading={() => setLoading(false)} onSearch={handleSearch} ></Header>
      <div className={styles.mainBody}>
        <div className="left-panel">
          <Playlist key={1} name={"name playlist"}></Playlist>
          <Playlist key={2} name={"name playlist"}></Playlist>
        </div>
        <div className="main-panel">
          {searchTracks.map(({track_id, title, picture, author, path_file, duration}) => (
            <Track
              key={track_id}
              track_id={track_id}
              title={title}
              picture={API_URL + "" + picture}
              author={author}
              path_file={API_URL + "" + path_file}
              duration={duration}
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
