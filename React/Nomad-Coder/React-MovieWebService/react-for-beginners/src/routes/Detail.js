import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  const [loading, setLoading] = useState(false);
  const [movieDetail, setMovieDetail] = useState([]);
  const { id } = useParams();

  async function fetchMovieDetail(id) {
    console.log(id);
    const response = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    if (!response.ok) {
      throw new Error("해당 영화 정보를 불러오는데 실패했습니다.");
    }
    const resData = await response.json();

    return resData;
  }

  useEffect(() => {
    try {
      setLoading(true);
      fetchMovieDetail(id).then((resData) => {
        const movieDetailData = resData.data.movie;
        setMovieDetail(movieDetailData);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  console.log(movieDetail);
  return (
    <div>
      {loading && <p>데이터를 불러오는 중입니다.</p>}
      {!loading && <p>{movieDetail.title}</p>}
    </div>
  );
}
