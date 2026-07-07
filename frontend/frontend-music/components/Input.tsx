import {ChangeEvent} from "react";

interface InputProps{
    type: "text" |"password",
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
}

export default function Input({type, placeholder, onChange}:InputProps){
    return (<input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
    ></input>)
}