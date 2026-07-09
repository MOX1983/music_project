"use client"

import styles from "./styles.module.css";
import plug from "../public/img/cat.jpg";
import Track from "../components/Track";
import Header from "@/components/Header";
import Playlist from "../components/Playlist";
import Image from "next/image";
import {Track as TrackType} from "../type/tracks";
import useTrackStore from "@/stores/Track";
import useUsersStore from "@/stores/User";
import {useEffect} from "react";

const API_URL = "http://127.0.0.1:8000";

export default function Main() {
  const { lastTrack, setLastTrack, displayedTracks, getTracks, getLastTrack} = useTrackStore();

  const handleTrack = (track: TrackType) => {
    setLastTrack(track);
  };

  return (
    <div className={styles.body}>
      <Header></Header>
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
        {lastTrack ? ( (() => {
          const {picture, title, author, path_file} = lastTrack;
          return (<>
            <img
                className="img-m"
                src={picture || plug.src}
                alt={title}
                width={50}
                height={50}
            />
            <div className="track-info">
              <p className="track-title">{title}</p>
              <p className="track-author">{author}</p>
            </div>
            <audio controls src={path_file} />
          </>);
            })()
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
