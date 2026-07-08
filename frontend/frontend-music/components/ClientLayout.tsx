"use client"

import {useEffect} from "react";
import { useRouter } from "next/navigation";
import useUsersStore from "@/stores/User";
import useTrackStore from "@/stores/Track";


export default function ClientLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    const router = useRouter();
    const { isAuthenticated} = useUsersStore();
    const { getLastTrack, getTracks} = useTrackStore();

    useEffect(() => {
        if(isAuthenticated){
            router.push('/');
        }
    }, [isAuthenticated])

    useEffect(() => {
        getTracks();
        getLastTrack();

    }, []);

    return <>{children}</>
}


