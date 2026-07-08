'use client';

import plug from "@/public/img/cat.jpg";
import logoutImg from "@/public/img/Logout.svg";
import Search from "@/components/Search";
import styles from "@/app/styles.module.css";
import Image from "next/image";
import {Track} from "@/type/tracks";
import useUsersStore from "@/stores/User";
import {useRouter} from "next/navigation";
import useTrackStore from "@/stores/Track";

const API_URL = "http://127.0.0.1:8000";

export default function Header() {

    const router = useRouter();

    const {logout, isAuthenticated, user} = useUsersStore();
    const {tracks, searchTracks} = useTrackStore();

    const handleExit = () => {
        logout();
        router.push("/login")
        return;
    };

    const handleSearch = (filtered: Track[] | null) => {
        searchTracks(filtered);
    };


    const userPhoto = isAuthenticated ? API_URL + "" + user?.photo : plug.src;

    return (<header>
        <img
            className="logo"
            src={userPhoto}
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