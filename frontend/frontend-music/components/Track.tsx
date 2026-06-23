import icon from "../../public/img/Icon.svg";
import plug from "../../public/img/cat.jpg";


export default function Track({title: string, img : string}) {
  return (
    <button className="componrnt">
      <div className="body-comp">
        <img className="img-m" src={plug.src} alt="" />
        <p>props.title</p>
      </div>
      <img src={icon.src} alt="" />
    </button>
  );
}
