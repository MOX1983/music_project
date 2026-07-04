
export interface Track {
    track_id: number;
    title: string;
    author: string;
    path_file: string;
    duration: string;
    category?: string;
    picture?: string;
}

export interface TrackProps {
    track_id: number;
    title: string;
    author: string;
    path_file: string;
    duration: string;
    category?: string;
    picture?: string;
    onTrackClick?: (track: TrackProps) => void;
}