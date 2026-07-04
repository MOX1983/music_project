import plug from "@/public/img/cat.jpg";
import logoutImg from "@/public/img/Logout.svg";
import Search from "@/components/Search";
import styles from "@/app/styles.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {Header as HeaderType} from "@/type/header";
import {Track} from "@/type/tracks";
import useUsersStore from "@/stores/User";

export default function Header({userPhoto, tracks, onSearch}: HeaderType ) {

    const router = useRouter();
    const {logout, isAuthenticated} = useUsersStore();

    const handleExit = () => {
        if (isAuthenticated) {
            logout();
            router.push("/login");
            return;
        }
    };

    const handleSearch = (filtered: Track[] | null) => {
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
                src={logoutImg}
                alt={""}
                width={20}
                height={20}
            ></Image>
        </button>
    </header>)
}