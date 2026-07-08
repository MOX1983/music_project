import {ChangeEvent} from "react";

export interface InputProps{
    type?: "text" |"password";
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
}