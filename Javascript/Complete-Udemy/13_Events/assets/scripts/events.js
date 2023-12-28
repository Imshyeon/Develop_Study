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

let curElementNumber = 0;

function scrollHandler() {
    const pageBottom = document.body.getBoundingClientRect().bottom;
    
    if (pageBottom < document.documentElement.clientHeight + 150) {
        const newDataElement = document.createElement('div')
        curElementNumber++;
        newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
        document.body.append(newDataElement);
    }
}

window.addEventListener('scroll', scrollHandler)