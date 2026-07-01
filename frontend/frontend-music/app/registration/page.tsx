"use client";

import styles from "../../styles/styles.module.css";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";

const API_URL = "http://127.0.0.1:8000";

export default function Registration() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState();

    useEffect(() => {
        const lastTrack = typeof window !== "undefined" ? localStorage.getItem("lastTrack") : null;

        if(lastTrack){
            localStorage.removeItem('lastTrack');
        }
    }, [router])

  const postRegistration = () => {
    axios
      .post(`${API_URL}/sign-up`, {
        login: login,
        password_hash: password,
        email: email,
      })
      .then((response) => response.data)
      .then((data) => {
        setUser(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        setLoading(false);
        router.push("/");
      })
      .catch((error) => console.error("Error fetching users:", error));

    if (isLoading) {
      alert("Error fetching users");
    }
  };

  return (
    <div className={styles.body}>
      <div className="main">
        <h1>Registration</h1>
          <Input type={"text"} placeholder={"login"} onChange={(e => setLogin(e.target.value))}  ></Input>
          <Input type={"text"} placeholder={"email"} onChange={(e => setEmail(e.target.value))}  ></Input>
          <Input type={"text"} placeholder={"password"} onChange={(e => setPassword(e.target.value))}  ></Input>
        <button onClick={postRegistration}>Registration</button>
        <Link href={"/login"}>LOGIN</Link>
      </div>
    </div>
  );
}
