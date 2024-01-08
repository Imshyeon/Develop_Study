const fs = require('fs');

fs.readFile('Taemin.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data.toString());
})

// fs.writeFile('Taemin.txt', 'name=Taemin', err => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('Wrote to file')
//     }
// });