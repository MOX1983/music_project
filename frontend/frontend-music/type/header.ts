import {Track} from "@/type/tracks";

export interface Header {
    userPhoto: string;
    tracks: Track[];
    onLoading: () => void;
    onSearch: (filtred: Track[]) => void;
}