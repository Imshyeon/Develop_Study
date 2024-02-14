import { useState, useEffect } from "react";
import Movie from "../components/Movie";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    setLoading(true);
    async function fetchMovies() {
      const response = await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=9?sort_by=year"
      );
      if (!response.ok) {
        throw new Error("데이터를 가져오는데 실패했습니다.");
      }
      const resData = await response.json();
      console.log(resData.data.movies);
      return resData.data.movies;
    }

    try {
      fetchMovies().then((movies) => {
        setMovies(movies);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      {loading && <p>데이터를 가져오는 중...</p>}
      <div>
        {!loading &&
          movies &&
          movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title_long}
              coverImg={movie.medium_cover_image}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
      </div>
    </div>
  );
}
