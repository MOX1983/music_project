"use client";

import styles from "../../styles/styles.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import useUsersStore from "@/stores/User";


export default function Registration() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const {registration, isAuthenticated} = useUsersStore();


  useEffect(() => {
      if (isAuthenticated) {
          router.push('/');
      }
  }, [isAuthenticated, router])

  const postRegistration = async () => {
      await registration(login, email, password);
  };

  return (
    <div className={styles.body}>
      <div className="main">
        <h1>Registration</h1>
          <Input type={"text"} placeholder={"login"} onChange={(e => setLogin(e.target.value))}  ></Input>
          <Input type={"text"} placeholder={"email"} onChange={(e => setEmail(e.target.value))}  ></Input>
          <Input type={"password"} placeholder={"password"} onChange={(e => setPassword(e.target.value))}  ></Input>
        <button onClick={postRegistration}>Registration</button>
        <Link href={"/login"}>LOGIN</Link>
      </div>
    </div>
  );
}
