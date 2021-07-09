const request = require('request')

const coursefinder = () => {
    // const url = 'https://ubcgrades.com/api/v1/grades/UBCV/2018W/MATH/100/101'
    const url = 'https://ubcgrades.com/api/v2/course-statistics/UBCV/ENGL'
    // + coursedetails.location + '/' + coursedetails.year + '/'
    // + coursedetails.course + '/' + coursedetails.coursenumber + '/'
    // + coursedetails.coursesection

    request({ url, json: true }, (error, { body }) => {
        var countKey = Object.keys(body).length
        console.log(countKey)

        var newbody = new Array();
        var index = 0;

        for (var i = 0; i < countKey; i++){
            if (body[i].average_past_5_yrs > 80) {
                newbody[index] = body[i];
                index++;
            }
        }

        console.log(newbody)
    })
}

coursefinder();


module.exports = coursefinder