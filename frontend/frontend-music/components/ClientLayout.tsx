"use client"

import {useEffect} from "react";
import { useRouter } from "next/navigation";
import useUsersStore from "@/stores/User";


export default function ClientLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    const router = useRouter();
    const { isAuthenticated} = useUsersStore();

    useEffect(() => {
        if(isAuthenticated){
            router.push('/');
        }
    }, [isAuthenticated])

    return <>{children}</>
}


