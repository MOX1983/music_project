import plug from "@/public/img/cat.jpg";
import logout from "@/public/img/Logout.svg";
import Search from "@/components/Search";
import styles from "@/app/styles.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {Header as HeaderType} from "@/type/header";
import {Track} from "@/type/tracks";


export default function Header({userPhoto, tracks, onLoading, onSearch}: HeaderType ) {

    const router = useRouter();

    const handleExit = () => {
        const token = localStorage.getItem("token");
        if (token) {
            localStorage.removeItem("token");
            router.push("/login");
            onLoading();
            return;
        }
    };

    const handleSearch = (filtered: Track[]) => {
        onSearch(filtered);
    };

    return (<header>
        <img
            className="logo"
            src={userPhoto || plug.src}
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
    </header>)
}