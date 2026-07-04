"use client";

import styles from "../../styles/styles.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Input from "@/components/Input";

const API_URL = "http://127.0.0.1:8000";

export default function Login() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if(token){
      router.push('/');
    }
  }, [router])

  const postLogin = () => {
    try {
      axios
        .post(`${API_URL}/login`, {
          login: login,
          password_hash: password,
          email: email,
        })
        .then((response) => response.data)
        .then((data) => {
          setUser(data);
          if (data.access_token) {
            localStorage.setItem("token", data.access_token);
          }
          setLoading(false);
          router.push("/");
        })
        .catch((error) => console.error("Error fetching users:", error));

      if (isLoading) {
        alert("Error fetching users");
      }
    } catch (error: any) {
      console.error("Ошибка:", error);
    }
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
