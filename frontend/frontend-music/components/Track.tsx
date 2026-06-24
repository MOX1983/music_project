import icon from "../public/img/Icon.svg";
import Image from "next/image";

export interface TrackProps{
  title: string;
  img: string;
}

export default function Track({title, img}: TrackProps) {
  return (
    <button className="componrnt">
      <div className="body-comp">
        <Image className="img-m" width={50} height={50} src={img} alt={""} ></Image>
        <p>{title}</p>
      </div>
      <Image width={20} height={20} src={icon} alt={""} ></Image>
    </button>
  );
}
