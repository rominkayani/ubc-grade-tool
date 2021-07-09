const request = require('request')

const gradefinder = (coursedetails, callback) => {
    // const url = 'https://ubcgrades.com/api/v1/grades/UBCV/2018W/MATH/100/101'
    const url = 'https://ubcgrades.com/api/v2/course-statistics/' 
    + coursedetails.location + '/' 
    + coursedetails.course  

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to UBC grade system!', undefined)
        } else if (body.error) {
            callback('Unable to find course', undefined)
        } else {
            var countKey = Object.keys(body).length
    
            var newbody = new Array();
            var index = 0;

            for (var i = 0; i < countKey; i++){
                if (body[i].average_past_5_yrs > parseInt(coursedetails.percentage) &&
                    body[i].course >= (coursedetails.year * 100) && body[i].course <= ((coursedetails.year * 100) + 100)) {
                    newbody[index] = body[i];
                    index++;
                }
            }
            
            var str = ''

            for (var i = 0; i < newbody.length; i++){
                str = str + 'The average for ' + newbody[i].subject + ' ' + newbody[i].course + ' is ' + newbody[i].average_past_5_yrs + '\n'
            }

            console.log(str)

            callback(undefined, str)
        }
    })
}

module.exports = gradefinder