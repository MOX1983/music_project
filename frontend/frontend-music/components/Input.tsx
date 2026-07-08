import {InputProps} from '@/type/inputProps'


export default function Input({type, placeholder, onChange}:InputProps){
    return (<input
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
    ></input>)
}