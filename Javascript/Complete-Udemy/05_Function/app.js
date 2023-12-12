const startGameBtn = document.querySelector('#start-game-btn')

function startGame() {
    console.log('Game is starting...')
};
console.dir(startGame);
startGameBtn.addEventListener('click', startGame);   // addEventListener는 startGameBtn이 객체의 메서드가 됨.