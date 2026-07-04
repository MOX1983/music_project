import {Track} from "@/type/tracks";

export interface SearchProps{
    tracks: Track[] | null,
    onChanged: (track: Track[] | null) => void;
}