import Link from "next/link";
import Form from "@/components/Form";
import {PageProps} from "@/type/PageProps";
import styles from "@/styles/styles.module.css";

export default function PageLayout({ btnName, linkName, link }:PageProps) {
    return <div className={styles.body}>
        <div className={"main"}>
            <h1>{btnName}</h1>
            <Form btnName={btnName} ></Form>
            <Link href={link}>{linkName}</Link>
        </div>
    </div>
}