import icon from "../public/img/Icon.svg";
import Image from "next/image";
import plug from "../public/img/cat.jpg";
import {TrackProps} from "@/type/tracks";


export default function Track({
  track_id,
  title,
  picture,
  author,
  path_file,
  duration,
  onTrackClick,
}: TrackProps) {
  function handelClick(track_id: number) {
    const trackData = {
      track_id,
      title,
      picture,
      author,
      path_file,
      duration,
    };
    localStorage.setItem("lastTrack", JSON.stringify(trackData));

    if (onTrackClick) {
      onTrackClick(trackData);
    }
  }

  return (
    <button
      key={track_id}
      className="componrnt"
      onClick={() => handelClick(track_id)}
    >
      <div className="body-comp">
        <img
          className="img-m"
          width={50}
          height={50}
          src={picture || plug.src}
          alt={""}
        ></img>
        <p>{title}</p>
      </div>
      <Image width={20} height={20} src={icon} alt={""}></Image>
    </button>
  );
}
