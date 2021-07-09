const weatherForm = document.querySelector('form')
// const search = document.querySelector('input[name="pwd"]')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const searchlocation = document.querySelector('input[name="Location"]') 
const searchyear = document.querySelector('input[name="Year"]') 
const searchcourse = document.querySelector('input[name="Course"]') 
const searchcoursenumber = document.querySelector('input[name="Course Number"]') 
const searchcoursesection = document.querySelector('input[name="Course Section"]') 


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // const location = search.value
    const location = searchlocation.value
    const year = searchyear.value
    const course = searchcourse.value
    const coursenumber = searchcoursenumber.value
    const coursesection = searchcoursesection.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?location=' + location + '&year=' + year + '&course=' + course + '&coursenumber=' + coursenumber + '&coursesection=' + coursesection).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

    // fetch('/weather?address=' + location).then((response) => {
    //     response.json().then((data) => {
    //         if (data.error) {
    //             messageOne.textContent = data.error
    //         } else {
    //             messageOne.textContent = data.location
    //             messageTwo.textContent = data.forecast
    //         }
    //     })
    // })
})