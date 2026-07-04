import {Track as TrackType} from "@/type/tracks";

export interface Header {
    userPhoto: string;
    tracks: TrackType[] | null;
    onSearch: (filtered: TrackType[] | null) => void;
}