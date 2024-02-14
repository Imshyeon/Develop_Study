import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Movie({ id, title, coverImg, summary, genres }) {
  return (
    <div>
      <h2>
        <Link to={`movie/${id}`}>{title}</Link>
      </h2>
      <img src={coverImg} alt="movie background img" />
      <p>{summary}</p>
      <ul>
        {genres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  coverImg: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
