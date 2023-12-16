const addMovieModalEl = document.querySelector("#add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdropEl = document.querySelector("#backdrop");
const cancelAddMovieButton = addMovieModalEl.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModalEl.querySelectorAll("input");
const entryTextSection = document.querySelector("#entry-text");
const deleteMovieModalEl = document.querySelector("#delete-modal");

const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModalEl.classList.remove("visible");
};

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.querySelector("#movie-list");
  listRoot.children[movieIndex].remove();
  closeMovieDeletionModal();
  updateUI();
};

const startDeleteMovieHandler = (movieId) => {
  deleteMovieModalEl.classList.add("visible");
  toggleBackdrop();
  const cancelDeletionBtn = deleteMovieModalEl.querySelector(".btn--passive");
  let confirmDeletionBtn = deleteMovieModalEl.querySelector(".btn--danger");

  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
  //   confirmAddMovieButton.removeEventListener(
  //     "click",
  //     deleteMovieHandler.bind(null, movieId)
  //   ); // 작동하지 않을 것.
  cancelDeletionBtn.removeEventListener("click", closeMovieDeletionModal);

  cancelDeletionBtn.addEventListener("click", closeMovieDeletionModal);
  confirmDeletionBtn.addEventListener(
    "click",
    deleteMovieHandler.bind(null, movieId)
  );
};

const renderNewMovieEl = (id, title, imageUrl, rating) => {
  const newMovieEl = document.createElement("li");
  newMovieEl.className = "movie-element";
  newMovieEl.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    `;
  newMovieEl.addEventListener("click", startDeleteMovieHandler.bind(null, id));
  const listRoot = document.querySelector("#movie-list");
  listRoot.append(newMovieEl);
};

const toggleBackdrop = () => {
  backdropEl.classList.toggle("visible");
};

const closeMovieModal = () => {
  addMovieModalEl.classList.remove("visible");
};

const showMovieModal = () => {
  addMovieModalEl.classList.add("visible");
  toggleBackdrop();
};

const clearMovieInput = () => {
  for (const userInput of userInputs) {
    userInput.value = "";
  }
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    parseInt(ratingValue) < 1 ||
    parseInt(ratingValue) > 5
  ) {
    alert("Please enter valid values (rating between 1 and 5).");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
  renderNewMovieEl(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInput();
};

startAddMovieButton.addEventListener("click", showMovieModal);
backdropEl.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
