
import Link from 'next/dist/client/link'
import styles from '../styles/Home.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered By Company
      </Link>
    </footer>
  )
}
