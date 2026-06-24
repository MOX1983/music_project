import styles from "./styles.module.css";
import plug from "../public/img/cat.jpg";
import Track from "../components/Track";
import Playlist from "../components/Playlist";
import Image from "next/image";

export default function Main() {
  return (
    <div className={styles.body}>
      <header>
        <Image className="logo" src={plug.src} alt={""} width={50} height={50}></Image>
        <input type="text" placeholder="search" />
      </header>
      <div className={styles.mainBody}>
        <div className="left-panel">
          <Playlist name={"name playlist"}></Playlist>
          <Playlist name={"name playlist"}></Playlist>
        </div>
        <div className="main-panel">
          <Track title="test" img={plug.src}></Track>

          <Track title="test" img={plug.src}></Track>
          <Track title="test" img={plug.src}></Track>
        </div>
      </div>

      <div className="player">
        <Image className="img-m" src={plug.src} alt={""} width={20} height={20}></Image>
        <audio controls src="/mp3/Husky_Rescue-Sound_of_Love.mp3"></audio>
      </div>
    </div>
  );
}
