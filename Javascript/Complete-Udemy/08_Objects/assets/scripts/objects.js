const addMovieBtn = document.querySelector("#add-movie-btn");
const searchBtn = document.querySelector("#search-btn");

const movies = [];

const addMovieHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (
    title.trim() === "" ||
    extraName.trim() === "" ||
    extraValue.trim() === ""
  ) {
    return;
  }

  const newMovie = {
    info: {
      title, // title: title와 같이 해당 변수 이름과 키 값이 동일한 경우.
      [extraName]: extraValue,
    },
    id: Math.random(),
  };

  movies.push(newMovie);
  console.log(newMovie);
};


addMovieBtn.addEventListener('click', addMovieHandler);