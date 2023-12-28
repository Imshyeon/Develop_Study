const buttons = document.querySelectorAll('button')

const buttonClickHandler = e => {
    e.target.disabled = true;
    console.log(e);
}

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', buttonClickHandler)
});
// button.addEventListener('click', buttonClickHandler)
// setTimeout(() => {
//     button.removeEventListener('click', buttonClickHandler);
// }, 2000);

window.addEventListener('scroll', e => {
    console.log(scrollY)
})