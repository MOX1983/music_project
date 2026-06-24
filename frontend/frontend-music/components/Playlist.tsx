

export interface PlaylistProps{
    name: string;
}

export default function Playlist({name}:PlaylistProps){
    return <div className="playlist">{name}</div>
}