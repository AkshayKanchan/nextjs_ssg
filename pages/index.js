import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import Footer from '../components/footer';
import { Context } from './_app';
export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState('')
  const userDetails = useContext(Context);
  const handleInput = function(e){
    setQuery(e.target.value);
  }

  const submitQuery = function(){
    let finalQuery = query.trim();
    if(finalQuery.length > 0){
      router.push(`/tv-shows/${finalQuery}`)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Movie App</title>
        <meta name="description" content="MovieApp is the world&#x27;s most popular and authoritative source for movie. Find ratings and reviews for the newest movie and TV shows." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        Hi, {userDetails.userName}
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link href="/">Movie App</Link>
        </h1>
        <div className={styles.wrap}>
          <div className={styles.search}>
            <input type="text"
            className={styles.searchTerm}
            placeholder="What movie are you looking for?"
            value={query}
            onChange={handleInput}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                e.preventDefault()
                submitQuery()
              }
            }}/>
            <button type="submit" className={styles.searchButton} onClick={submitQuery}>
              Search
            </button>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  )
}
