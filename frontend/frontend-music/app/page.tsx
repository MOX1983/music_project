import styles from "../styles/styles.module.css"

export default function Home() {
  return <div className={styles.body}>
    <div className="main" >
              <h1>LOGIN</h1>
              <input type="text" placeholder="login"></input>
              <input type="text" placeholder="password"></input>
              <button><a href="/main/index.html">LOGIN</a></button>
              <a href="/registration">Registration</a>
          </div>
  </div>
  
  
}
