const weatherForm = document.querySelector('form')
// const search = document.querySelector('input[name="pwd"]')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const searchlocation = document.querySelector('input[name="Location"]') 
const searchcourse = document.querySelector('input[name="Course"]') 
const searchyear = document.querySelector('input[name="Year"]') 
const searchpercentage = document.querySelector('input[name="Percentage"]') 


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // const location = search.value
    const location = searchlocation.value
    const course = searchcourse.value
    const year = searchyear.value
    const percentage = searchpercentage.value


    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?location=' + location + '&course=' + course + '&year=' + year + '&percentage=' + percentage).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                if (year === "ALL"){
                    messageOne.textContent = course + ' ' + "Course Averages above " + percentage + "% at " + location
                } else {
                    messageOne.textContent = course + ' (Year ' + year + ') ' + "Course Averages above " + percentage + "%, at " + location
                }
                messageTwo.textContent = data.forecast
            }
        })
    })
})