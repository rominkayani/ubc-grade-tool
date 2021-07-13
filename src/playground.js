const request = require('request')

const coursefinder = () => {
    const url = 'https://ubcgrades.com/api/v2/subjects/UBCV'
    // + coursedetails.location + '/' + coursedetails.year + '/'
    // + coursedetails.course + '/' + coursedetails.coursenumber + '/'
    // + coursedetails.coursesection

    request({ url, json: true }, (error, { body }) => {
        var countKey = Object.keys(body).length
        console.log(countKey)


        var str = ''

        for (var i = 0; i < countKey; i++){
            str = str + '<option value=' + '"' + body[i].subject +  '"' + '></option>' + '\n'
        }

        console.log(str)
    })
}

coursefinder();


module.exports = coursefinder