// This code was adapted from https://www.guru99.com/quicksort-in-javascript.html

var items = [5,3,7,6,2,9];
function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex].average_past_5_yrs;
    items[leftIndex].average_past_5_yrs = items[rightIndex].average_past_5_yrs;
    items[rightIndex].average_past_5_yrs = temp;
}
function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)].average_past_5_yrs, //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i].average_past_5_yrs < pivot) {
            i++;
        }
        while (items[j].average_past_5_yrs > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(items, index, right);
        }
    }
    return items;
}


// var sortedArray = quickSort(items, 0, items.length - 1);
// console.log(sortedArray); //prints [2,3,5,6,7,9]

module.exports = quickSort