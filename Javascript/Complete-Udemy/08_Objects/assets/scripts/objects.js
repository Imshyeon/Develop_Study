const addMovieBtn = document.querySelector("#add-movie-btn");
const searchBtn = document.querySelector("#search-btn");

const movies = [];

const renderMovies = (filter = "") => {
  const movieList = document.getElementById("movie-list");

  if (movies.length === 0) {
    movieList.classList.remove("visible");
    return;
  } else {
    movieList.classList.add("visible");
  }

  movieList.innerHTML = ""; // 전체 목록 지우기

  const filteredMovies = !filter // 만약 필터가 ''라면 전에 Movies를 표현
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter)); // 필터에 뭐가 전달되면 그 필터에 맞는 movie를 출력.

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement("li");
    const { info, ...otherProps } = movie;
    console.log(otherProps);
    //   const { title:movieTitle } = info; // => title키를 movieTitle로 설정해서 쓸 수 있다.
    let { getFormattedTitle } = movie;
    // getFormattedTitle = getFormattedTitle.bind(movie); // 본 함수에서 this가 참조로 할 대상을 가리킨다.
    let text = getFormattedTitle.call(movie) + " - ";
    for (const key in info) {
      if (key !== "title" && key !== '_title') {
        text += `${key}: ${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (extraName.trim() === "" || extraValue.trim() === "") {
    return;
  }

  const newMovie = {
    info: {
      set title(val) {
        if (val.trim() === "") {
          this._title = "DEFAULT";
          return;
        }
        this._title = val; // internal value
      },
      get title() {
        return this._title;
      }, //getter 생성
      [extraName]: extraValue,
    },
    id: Math.random().toString(),
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    },
  };

  newMovie.info.title = title; // setter가 트리거
  console.log(newMovie.info.title); //getter가 트리거

  movies.push(newMovie);
  renderMovies();
};

const searchMovieHandler = () => {
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovieHandler);
