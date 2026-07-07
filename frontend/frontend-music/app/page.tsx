"use client";

import styles from "./styles.module.css";
import plug from "../public/img/cat.jpg";
import Track from "../components/Track";
import Header from "@/components/Header";
import Playlist from "../components/Playlist";
import Image from "next/image";
import { useEffect } from "react";
import {Track as TrackType} from "../type/tracks";
import useUsersStore from "@/stores/User";
import useTrackStore from "@/stores/Track";

const API_URL = "http://127.0.0.1:8000";

export default function Main() {
  const {me, token} = useUsersStore();
  const {tracks, lastTrack, getLastTrack, getTracks, setLastTrack, searchTracks, displayedTracks} = useTrackStore();

  useEffect(() => {

    me(token || '');
    getTracks();
    getLastTrack();

  }, []);


  const handleTrack = (track: TrackType) => {
    setLastTrack(track);
  };

  const handleSearch = (filtered: TrackType[] | null) => {
    searchTracks(filtered);
  };

  return (
    <div className={styles.body}>
      <Header tracks={tracks}  onSearch={handleSearch} ></Header>
      <div className={styles.mainBody}>
        <div className="left-panel">
          <Playlist key={1} name={"name playlist"}></Playlist>
          <Playlist key={2} name={"name playlist"}></Playlist>
        </div>
        <div className="main-panel">
          {displayedTracks?.map(({track_id, title, picture, author, path_file, duration}) => (
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
