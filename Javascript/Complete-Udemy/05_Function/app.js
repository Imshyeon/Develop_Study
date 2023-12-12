const startGameBtn = document.querySelector('#start-game-btn')

const start = function () {
    console.log('Game is starting...')
};
startGameBtn.addEventListener('click', start);   // addEventListener는 startGameBtn이 객체의 메서드가 됨.