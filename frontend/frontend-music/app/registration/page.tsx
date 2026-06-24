import styles from "../../styles/styles.module.css" 
import Link from "next/link"

export default function Registration(){
    return <div className={styles.body}>
        <div className="main">
            <h1>Registration</h1>
            <input type="text" placeholder="login"></input>
            <input type="text" placeholder="email"></input>
            <input type="text" placeholder="password"></input>
            <button>Registration</button>
            <Link href={"/login"}>LOGIN</Link>
        </div>
    </div>
}