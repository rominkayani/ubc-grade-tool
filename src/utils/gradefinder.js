const request = require('request')
const quickSort = require('./quicksort')

const gradefinder = (coursedetails, callback) => {
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
                if (body[i].average_past_5_yrs > parseInt(coursedetails.percentage) && coursedetails.year === 'ALL'){
                    newbody[index] = body[i];
                    index++;
                } else if (body[i].average_past_5_yrs > parseInt(coursedetails.percentage) &&
                    body[i].course >= (coursedetails.year * 100) && body[i].course <= ((coursedetails.year * 100) + 100)) {
                    newbody[index] = body[i];
                    index++;
                }
            }

            var sortednewbody = quickSort(newbody, 0, newbody.length - 1).reverse()
            
            var str = ''

            for (var i = 0; i < sortednewbody.length; i++){
                // str = str + '| ' + newbody[i].subject + ' ' + newbody[i].course + ' ' + newbody[i].average_past_5_yrs.substring(0, 4) + ' | ' + '\n'
                str = str + sortednewbody[i].subject + ' ' + sortednewbody[i].course + ' - ' + Math.round(sortednewbody[i].average_past_5_yrs * 100) / 100 + '\n'                                     

            }


            callback(undefined, str)
        }
    })
}



module.exports = gradefinder