"use strict"
//need to pull out multiple seperate values in array
function identifyMultiples (array) {
	let tempArray = array;
	let newArray = [];
	for(let i = 0; i < array.length; i++) {
			if(array[i] !== array[i + 1] || i !== array.length - 1) {
				newArray = array.slice(0, i+1);
				array.splice(0, i+1);
			}
		}
		console.log(array);
	return newArray;
}

console.log(identifyMultiples([2,2,2,3,3,4]));