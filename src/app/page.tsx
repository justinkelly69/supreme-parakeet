import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <h1>Welcome to SnapTrip</h1>
        <nav>
          <ul>
            <li><Link href="/auth/login">Login</Link></li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        
      </main>
      <footer className={styles.footer}>
       
      </footer>
    </div>
  );
}
