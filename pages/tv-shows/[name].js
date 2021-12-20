import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/dist/client/router';
import MovieCard from '../../components/movie-card';
import Footer from '../../components/footer';
export default function Home(props) {
  const { movieList } = props;
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Find Movies - MovieApp</title>
        <meta name="title" content={"Find Movies - MovieApp"} />
        <meta name="description" content={"Find all movie details here | MovieApp"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Showing results for &quot;{router.query.name}&quot;
        </h1>
        {movieList.length > 0 ?
        (
          <div className={styles.grid}>
            {
              movieList.map((movie, idx) => {
                const {show} = movie;
                return (
                  (show && idx < 20) &&
                    <MovieCard movie={show} key={idx}/>
                )
              })
            }
          </div>
        ):
        (
          <h1> No Movies Found!!!</h1>
        )
        }
        <button className={styles.back_button} onClick={()=> router.back()}>&larr; Go Back</button>
      </main>

      <Footer />
    </div>
  )
}


export async function getServerSideProps(context){
  const { params } = context;

  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${params.name}`)
  const data = await response.json();
  return {
    props: {
      movieList: data
    }
  }
}