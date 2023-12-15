const addMovieModalEl = document.querySelector("#add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdropEl = document.querySelector("#backdrop");
const cancelAddMovieButton = addMovieModalEl.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModalEl.querySelectorAll("input");
const movies = [];

const toggleBackdrop = () => {
  backdropEl.classList.toggle("visible");
};

const toggleMovieModal = () => {
  addMovieModalEl.classList.toggle("visible");
  toggleBackdrop();
};

const clearMovieInput = () => {
    for (const userInput of userInputs) {
        userInput.value = '';
    };
};

const cancelAddMovieHandler = () => {
  toggleMovieModal();
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
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };
    
    movies.push(newMovie);
    console.log(movies);
    toggleMovieModal();
    clearMovieInput();
};

const backdropClickHandler = () => {
  toggleMovieModal();
};

startAddMovieButton.addEventListener("click", toggleMovieModal);
backdropEl.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
