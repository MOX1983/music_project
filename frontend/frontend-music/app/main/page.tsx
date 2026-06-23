import styles from "./styles.module.css"
import plug from "../../public/img/cat.jpg"
import "../../components/Track"
import Track from "../../components/Track"

export default function Main(){
    return <div className={styles.body}>
        <header>
      <img className="logo" src={plug.src}alt="" />
      <input type="text" placeholder="search" />
    </header>
    <div className={styles.mainBody}>
      <div className="left-panel">
        <div className="playlist">Name playlist</div>
      </div>
      <div className="main-panel">

        {/* не знаю как вызывать компоненты с пропсами ))) */}
        <Track title="sd"></Track>
        
      </div>
    </div>

    <div className="player">
      <img className="img-m" src={plug.src} alt="" />
      <audio controls src="/mp3/Husky_Rescue-Sound_of_Love.mp3"></audio>
    </div>
    </div>
}