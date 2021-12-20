import Image from 'next/image'
import Link from 'next/dist/client/link'
import styles from '../styles/Home.module.css'
import { getFormatedDateObj, getOrdinal } from '../utils/date';

export default function MovieCard({ movie }){
  const placeholderImage = 'https://via.placeholder.com/210x295';

  const createMarkup = function (content) {
    return {__html: content};
  }

  const renderPremieredDate = function(dateStr){
    const dateObj = getFormatedDateObj(dateStr);
    if(dateObj){
      const {day, month, year} = dateObj
      return (
        <p>Premiered: {day}<sup>{getOrdinal(day)}</sup> {month}, {year}</p>
        )
    }
    return ;
  }

  return (
    <div className={styles.card}>
      <div className={styles.movie_image}>
        {movie.image && movie.image.medium ? (
        <Image src={movie.image.medium} alt={movie.name} width={210} height={295} /> ):(
        <Image src={placeholderImage} alt={movie.name} width={210} height={295} /> ) }
      </div>

      <div className={styles.pad_top_10}>
        <h2>
            <Link href={ "/tv-shows/details/" + movie.id}><a>{movie.name} &rarr;</a></Link>
        </h2>
        <div className={styles.genres_container}>
            {movie.genres && movie.genres.length > 0 &&
              movie.genres.map((item, idx)=><span key={idx} className={styles.chip}> {item} </span>)
            }
        </div>
        <div className={styles.summary} dangerouslySetInnerHTML={createMarkup(movie.summary)} />
        {movie.language &&
          <p>language: {movie.language}</p>
        }
        {movie.runtime &&
          <p>Runtime: {movie.runtime} min</p>
        }
        {renderPremieredDate(movie.premiered)}
        <div className={styles.rating}>Rating:
          {movie.rating && movie.rating.average &&
            <>
              <Image src={"/star-48.png"} className={styles.starimg} alt={movie.rating.average} width={25} height={25} /> {movie.rating.average}
            </>
          }
        </div>
        {movie.network && movie.network.country.name && <p>Country: {movie.network && movie.network.country.name}</p>}
      </div>

    </div>
  )
}