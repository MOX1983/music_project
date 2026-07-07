import {Track as TrackType} from "@/type/tracks";

export interface Header {
    tracks: TrackType[] | null;
    onSearch: (filtered: TrackType[] | null) => void;
}