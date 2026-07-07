"use client";

import styles from "../../styles/styles.module.css";
import Link from "next/link";
import { useState } from "react";
import Input from "@/components/Input";
import useUsersStore from "@/stores/User";


export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const {login : loginAction} = useUsersStore();

  const postLogin = async () => {
    await loginAction(login, email, password);
  };

  return (
    <div className={styles.body}>
      <div className="main">
        <h1>LOGIN</h1>
        <Input type={"text"} placeholder={"login"} onChange={(e => setLogin(e.target.value))}  ></Input>
        <Input type={"text"} placeholder={"email"} onChange={(e => setEmail(e.target.value))}  ></Input>
        <Input type={"password"} placeholder={"password"} onChange={(e => setPassword(e.target.value))}  ></Input>
        <button id="btnLogin" onClick={postLogin}>
          LOGIN
        </button>
        <Link href={"/registration"}>Registration</Link>
      </div>
    </div>
  );
}
