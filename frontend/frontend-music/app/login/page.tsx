"use client";

import styles from "../../styles/styles.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import useUsersStore from "@/stores/User";


export default function Login() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const {login : loginAction, isAuthenticated} = useUsersStore();

  useEffect(() => {
    if(isAuthenticated){
      router.push('/');
    }
  }, [isAuthenticated, router])

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
