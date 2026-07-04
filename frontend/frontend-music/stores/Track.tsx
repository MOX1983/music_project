import {Track as TrackType} from "@/type/tracks"
import {create} from "zustand";
import { persist } from 'zustand/middleware';
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

interface TrackState {
    tracks: TrackType[] | null;
    lastTrack: TrackType | null;
    displayedTracks: TrackType[] | null;
    getTracks: () => void;
    getLastTrack: () => void;
    setLastTrack: (track: TrackType) => void;
    searchTracks: (filtered: TrackType[] | null) => void;
}

const useTrackStore = create<TrackState>()(
    persist(
        (set => ({
            tracks: null,
            lastTrack: null,
            displayedTracks: null,

            getTracks: () => {
                axios
                    .get(`${API_URL}/tracks`)
                    .then((response) => response.data)
                    .then((data) => {
                        set({
                            tracks: data,
                            displayedTracks: data
                        })
                    })
                    .catch((error) => console.error("Error fetching tracks:", error));

                return
            },
            getLastTrack: () => {
                const saveTrack = localStorage.getItem("lastTrack");
                if (saveTrack) {
                    try {
                        const track = JSON.parse(saveTrack);
                        set({
                            lastTrack: track
                        })
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    return null;
                }
                return
            },
            setLastTrack: (track: TrackType) => {
                set({
                    lastTrack: track
                })
                localStorage.setItem("lastTrack", JSON.stringify(track))
            },
            searchTracks: (filtered: TrackType[] | null) => {
                set({
                    displayedTracks: filtered
                })
            }
        })),
        {
            name: "lastTrack",
            partialize: (state) => ({
                lastTrack: state.lastTrack
            }),
        }
    )
);

export default useTrackStore;

