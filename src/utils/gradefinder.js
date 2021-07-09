const request = require('request')

const gradefinder = (coursedetails, callback) => {
    // const url = 'https://ubcgrades.com/api/v1/grades/UBCV/2018W/MATH/100/101'
    const url = 'https://ubcgrades.com/api/v2/grades/' 
    + coursedetails.location + '/' + coursedetails.year + '/'
    + coursedetails.course + '/' + coursedetails.coursenumber + '/'
    + coursedetails.coursesection





    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to UBC grade system!', undefined)
        } else if (body.error) {
            callback('Unable to find course', undefined)
        } else {
            callback(undefined, 'The average for ' + body.subject + ' ' + body.course + ' is ' + body.average)
        }
    })
}

module.exports = gradefinder