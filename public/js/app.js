console.log('Client side js is loaded');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     console.log("response ",response)
//     response.json().then((data) => {
//         console.log("data ", data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#paragraph1')
const messageTwo = document.querySelector('#paragraph2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})