const addMovieModalEl = document.querySelector("#add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdropEl = document.querySelector("#backdrop");
const cancelAddMovieButton =
  addMovieModalEl.querySelector(".modal__actions").children[0];

const toggleBackdrop = () => {
  backdropEl.classList.toggle("visible");
};

const toggleMovieModal = () => {
  addMovieModalEl.classList.toggle("visible");
  toggleBackdrop();
};

const cancelAddMovie = () => {
    toggleMovieModal();
};

const backdropClickHandler = () => {
  toggleMovieModal();
};

startAddMovieButton.addEventListener("click", toggleMovieModal);
backdropEl.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovie);
