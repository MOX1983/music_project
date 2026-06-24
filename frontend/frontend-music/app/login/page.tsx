import styles from "../../styles/styles.module.css"
import Link from "next/link"

export default function Login() {
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
