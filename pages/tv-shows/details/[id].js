import Head from 'next/head';
import styles from '../../../styles/Home.module.css';
import { useRouter } from 'next/dist/client/router';
import MovieCard from '../../../components/movie-card';
import Error from 'next/error';
import Footer from '../../../components/footer';

export default function Home(props) {
  const router = useRouter();
  const { errorCode } = props;

  if(errorCode){
    return <Error statusCode={errorCode} />
  }

  const { moveDetails } = props;

  return (
    <div className={styles.container}>
      <Head>
        <title>{moveDetails.name} - MovieApp</title>
        <meta name="title" content={moveDetails.name} />
        <meta name="description" content={moveDetails.summary} />
        <meta name="keywords" content={moveDetails.genres && moveDetails.genres.join(', ')} />
        {/* Use brand favicon here */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {moveDetails.name} Movie Details.
        </h1>
        <MovieCard movie={moveDetails}/>
        <button className={styles.back_button} onClick={()=> router.back()}>&larr; Go Back</button>
      </main>

      <Footer />
    </div>
  )
}

//Does same as getServerSideProps but is specifically used for build time site generation.
export async function getStaticProps(context){
  const { params } = context;
  if(!params.id || isNaN(params.id)){
    return { props: { errorCode: 500 } }
  }

  const response = await fetch(`https://api.tvmaze.com/shows/${params.id}`)
  console.log('API call made!', params.id);
  const data = await response.json();
  return {
    props: {
      errorCode: null,
      moveDetails: data
    },
    revalidate: 60 // defines cache expiry
  }
}

// Specify dynamic routes to pre-render pages based on data.
export async function getStaticPaths(){
  const apiResponse = await fetch('https://api.tvmaze.com/search/shows?q=avangers');
  const data = await apiResponse.json();
  console.log(data);
  const paths = data.map((item)=>({
    params:{
      id: item.show.id.toString()
    }
  }));
  return { paths, fallback: 'blocking' }
}

// Fetch data on each request.
// Backend nodejs logic for hidrating data required by page
/* export async function getServerSideProps(context){
  const { params } = context;
  if(!params.id || isNaN(params.id)){
    return { props: { errorCode: 500 } }
  }

  const response = await fetch(`https://api.tvmaze.com/shows/${params.id}`)
  const data = await response.json();
  return {
    props: {
      errorCode: null,
      moveDetails: data
    }
  }
} */