import {create} from "zustand";
import { persist } from 'zustand/middleware';
import axios from "axios";
import {User} from "@/type/user";

const API_URL = "http://127.0.0.1:8000";

interface UserState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (login: string, email: string, password: string) => Promise<void>;
    registration: (login: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    me: (token: string) => void;
}

const useUsersStore = create<UserState>()(
    persist(
    (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,

        login: async (login, email, password) => {
            try {
                axios
                    .post(`${API_URL}/login`, {
                        login: login,
                        password_hash: password,
                        email: email,
                    })
                    .then((response) => response.data)
                    .then((data) => {
                        if (data.access_token) {
                            localStorage.setItem("token", data.access_token);
                        }
                        set({
                            token: data.access_token,
                            isAuthenticated: true
                        })
                    })
                    .catch((error) => console.error("Error fetching users:", error));

            } catch (error) {
                console.error("Ошибка:", error);
            }

        },
        registration: async (login: string, email: string, password: string) => {
            try{
                axios
                    .post(`${API_URL}/sign-up`, {
                        login: login,
                        password_hash: password,
                        email: email,
                    })
                    .then((response) => response.data)
                    .then((data) => {
                        if (data.token) {
                            localStorage.setItem("token", data.token);
                            set({
                                token: data.token,
                                isAuthenticated: true
                            })
                        }

                    })
                    .catch((error) => console.error("Error fetching users:", error));
            }catch(error){
                console.error("Error fetching user:", error);
            }
        },
        logout: () => {
            const token = localStorage.getItem("token");
            if (token) {
                localStorage.removeItem("auth-storage");
                localStorage.removeItem("lastTrack");
                set({
                    token: null,
                    isAuthenticated: false,
                })
            }
        },
        me: (token: string) => {
            axios
                .get(`${API_URL}/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => response.data)
                .then((data) => {
                    set({
                        user:data
                    })
                })
                .catch((error) => console.error("Error fetching users:", error));

        }
    }), {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

export default useUsersStore;