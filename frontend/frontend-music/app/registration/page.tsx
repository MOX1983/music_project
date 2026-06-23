import styles from "../../styles/styles.module.css" 

export default function Registration(){
    return <div className={styles.body}>
        <div className="main">
            <h1>Registration</h1>
            <input type="text" placeholder="login"></input>
            <input type="text" placeholder="email"></input>
            <input type="text" placeholder="password"></input>
            <button>Registration</button>
            <a href="/">LOGIN</a>
        </div>
    </div>
}