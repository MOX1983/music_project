import styles from "../../styles/styles.module.css"
import Link from "next/link"
import { useEffect, useState } from "react";

export default function Login() {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    fetch("http://127.0.0.1:8000/login")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);


  return <div className={styles.body}>
    <div className="main" >
              <h1>LOGIN</h1>
              <input type="text" placeholder="login"></input>
              <input type="text" placeholder="password"></input>
              <button><Link href={"/"}>LOGIN</Link></button>
              <Link href={"/registration"}>Registration</Link>
          </div>
  </div>
  
  
}
