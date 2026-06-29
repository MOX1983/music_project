import { useState, ChangeEvent  } from "react";

interface SearchProps{
    tracks: any[],
    onChanged: (track: any[]) => void;
}

export default function Search({tracks, onChanged}:SearchProps){
    const [items, setItems] = useState('')

    function onTextChanged(e: ChangeEvent<HTMLInputElement>) {
        const text = e.target.value.toLowerCase().trim();
        setItems(text);

        if(text === ""){
            onChanged(tracks);
            return;
        }

        const filtered = tracks.filter((track) => {
            const title = track.title?.toLowerCase();
            return title.includes(text);
        });

        onChanged(filtered);
    }

    return (<input onChange={onTextChanged} type="text" placeholder="search" />)
}