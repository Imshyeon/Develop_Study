const hobbies = ["swimming", "watching movies", "coding"];
console.log(hobbies[0]); // swimming

const index = hobbies.findIndex((item) => item === "swimming");
console.log(index);

const editedHobbies = hobbies.map((item) => item + "!");
console.log(editedHobbies);

const editedHobbies2 = hobbies.map((item) => ({ text: item }));
console.log(editedHobbies2);
