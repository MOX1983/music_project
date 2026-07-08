"use client"

import Input from "@/components/Input";
import {ChangeEvent, useState} from "react";
import {FormProps} from '@/type/formProps';
import useUsersStore from "@/stores/User";
import styles from "@/styles/styles.module.css";
import {useRouter} from "next/navigation";


export default function Form({btnName}: FormProps){

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const {login: loginAction, registration} = useUsersStore()

    const router = useRouter();

    const postLogin = async () => {
        let result;
        if (btnName == "LOGIN"){
             result = await loginAction(login, email, password);
        }
        else {
            result = await registration(login, email, password);
        }

    };

    const onLogin = (e:
                     ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setLogin(e.target.value)
    };
    const onEmail = (e:
                     ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setEmail(e.target.value)
    };
    const onPassword = (e:
                        ChangeEvent<HTMLInputElement, HTMLInputElement>) =>  {
        setPassword(e.target.value)
    };
    // если я использую form, меня не прекидывает на "/", но form -> method="post"
    return (
        <><Input key={1} placeholder={"login"} onChange={onLogin}  ></Input>
        <Input key={2} placeholder={"email"} onChange={onEmail}  ></Input>
        <Input key={3} type={"password"} placeholder={"password"} onChange={onPassword}  ></Input>
        <button id="btnLogin" onClick={postLogin}>{btnName}</button></>
    )
}