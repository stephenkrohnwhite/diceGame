"use strict"
function getRandomNumber(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max-min)) + min;
}
function generateRandomDice(array, limit) {
	let diceArray = [];
	let diceValue = array
	for(let i = 0; diceArray.length < diceValue.length; i++) {
		diceArray.push(getRandomNumber(1,(1 + diceValue[i])));
	}
	return diceArray;
}
function arrayToString(array) {
	for(let i = 0; i < array.length; i++) {
		array[i] += '';
	}
	return array;
}
function compareNumbers(a, b)
{
    return a - b;
}
function parseArray (array) {
	for(let i = 0; i < array.length; i++) {
		array[i] = parseInt(array[i]);
	}
	return array;
}
function sortArray(array) {
	let sortedArray = array.sort();
	return sortedArray;
}
function sixOfAKind(array) {
	for (let i = 0; i < array.length; i++) {
		if(array[i] !== array[0]) {
			return false;
		}
	}
		return true;
}
function twoTriplets(array) {
	let tempArray = chunkArray(array, 3);
	let tempArrayTwo = tempArray[0];
	let tempArrayThree = tempArray[1];
	for(let i =0; i < tempArrayTwo.length - 1; i++) {
		if(tempArrayTwo[i] !== tempArrayTwo[i+1]) {
			return false;
		} else if(tempArrayThree[i] !== tempArrayThree[i+1]) {
			return false;
		}
	} return true;
}
function threePairs(array) {
	let tempArray = chunkArray(array, 2);
	for(let i = 0; i < tempArray.length; i++) {
		if(arrayMultipleValidator(tempArray[i]) === false) {
			return false;
		}
	}
	for(let p = 0; p < tempArray.length - 1; p++) {
	if(arrayMultipleValidator(tempArray[p]) === false) {
		return false;
		}
	} return true;
}
function straight (array) {
	for(let i = 0; i < (array.length - 1); i++) {
		if(array[i] !== (array[i + 1] - 1)) {
			return false;
		}
	}
	return true;
}
function arraySplicer (array, limit, spliceLength) {
	let tempArray = array;
	while(tempArray.length > limit) {
		for(let p = 0; p < tempArray.length; p++) {
			if(tempArray[p + spliceLength] !== array[p]) {
				tempArray.splice(spliceLength);
			} else {
				tempArray.splice(0, tempArray.length - spliceLength);
			}
		}
	} return tempArray;
}
function arrayMultipleValidator(array) {
	for(let i = 0; i < array.length - 1; i++) {
		if(array[i] !== array[i+1]) {
			return false;
		}
	}	return true;
}
function chunkArray(array, chunkSize){
	let i = 0;
	let tempArray = array;
    let newArray = []; 
    for (i = 0; i < tempArray.length; i += chunkSize) {
        let myChunk = tempArray.slice(i, i + chunkSize);
        newArray.push(myChunk);
    }
    return newArray;
}
function fourAndTwo (array) {
	let tempArray = chunkArray(array, 2);
	for(let i = 0; i < tempArray.length - 1; i++) {
		if(arrayMultipleValidator(tempArray[i]) === false) {
			return false;
		}
	}
	if(arrayInArrayEqualityCheck(tempArray) === true) {
		return true;
	} return false;
}
function arrayInArrayEqualityCheck (array) {
	let tempArray = array;
	for(let i = 0; i < tempArray.length - 1; i++) {
		if(tempArray[i].sort().join(',') === tempArray[i+1].sort().join(',')){
			return true;
		}
	} return false;
}
function sumOfArray (array) {
	let sum = 0;
	for(let i =0; i < array.length; i++) {
		sum += array[i]
	}
	return sum;
}
//this is the bread and butter of this program. It checks for multiples and scores occurences of multiples using the folling equation where n = dice value, x = score, and z = number of occurences: x = (n+2)*z*100. This value is put into scoreArray as an index value. If there are more than one occurence of multiples, each score for multiples will be added to the array. The sum of this array will be the total score from pairs. The original array is then modified to return only the remaining dice and the score (the score will be the last index)
function scoreMultiples (indexValue, multiplier) {
	let result = multiplier*1000 + (indexValue*100);
	return result;
}
function ofAKind (array, scoreArray = []) {
	let occurence = 0;
	let counter = 0;
	let score = 0;
	let tempArray = array;
	for(let i = 0; i < array.length; i++) {
		if(array[i] === array[i+1]) {
			occurence = array[i];
			for(let j = i; array[j] === occurence; j++) {
				counter ++;
				scoreArray.push(scoreMultiples(occurence, (counter)));
			}
			tempArray.splice(i, counter);
			return ofAKind(tempArray, scoreArray);
		}
		
	}
	score = sumOfArray(scoreArray);
	array.push(score);
	return array;
}
function diceMultiplier (value) {
	let result = value*20;
	return result;
}
function diceRemainder (array, limit) {
	let tempArray = array;
	let score = 0;
	for(let i = 0; i < tempArray.length; i++) {
		if(array[i] < limit) {
			tempArray[i] = diceMultiplier(tempArray[i]);
		}
	} score = sumOfArray(tempArray);
	return score;
}
function sixStackChecker (callback, array, value, string) {
	let tempArray = array;
	let score = 0;
	if(callback(tempArray) === true) {
		alert("You rolled " + string);
		console.log("You have scored " + value + " points!");
		score = value;
		return score;
	}
	else {
		return score;
	}
}
function useAllDice (array) {
	let tempArray = array;
	let score = 0
	while(score === 0) {
		score = sixStackChecker(sixOfAKind, tempArray, 20000, "SIX OF A KIND");
		if(score > 0) {
			break;
		}
		score = sixStackChecker(straight, tempArray, 25000, "A STRAIGHT");
		if(score > 0) {
			break;
		}
		score = sixStackChecker(twoTriplets, tempArray, 17500, "TWO TRIPLES");
		if(score > 0) {
			break;
		}
		score = sixStackChecker(fourAndTwo, tempArray, 15000, "FOUR AND TWO");
		if(score > 0) {
			break;
		}
		score = sixStackChecker(threePairs, tempArray, 12500, "THREE PAIRS");
		if (score === 0) {
			return score;
		}
	} return score;
}
function roll () {
	let roll = generateRandomDice([4,6,8,10,12,14], 6);
	let stringArray = arrayToString(roll);
	stringArray.sort(compareNumbers);
	let result = parseArray(stringArray);
	return result;
}
function scoreCalculator (array) {
	let score = 0;
	let remainderArray = [];
	score = useAllDice(array);
	if(score === 0) { 
		remainderArray = ofAKind(array);
		score += diceRemainder(remainderArray, 15);
	}
	return score;
}
function getUserInteger(message, validator) {
	let input = prompt(message);
	if (validator(input)=== false) {
		alert("You have not entered a valid number");
		return getUserInteger(message, validator);
	}
	else {
		let num = validator(input)
		return num;
	}
}
function validatePositiveInteger(input) {
	let num = parseInt(input);
	if (Number.isInteger(num) && num > 0) {
	return num;
	} else {
		return false;
	}
}
function getMaxValue(array) {
	let tempArray = array;
	let maxArray = [];
	let maxValue = Math.max(...tempArray);
	for(let i = 0; i < tempArray.length; i++) {
		if(tempArray[i] === maxValue) {
			maxArray.push(i);
			maxArray.push(tempArray[i]);
		}
	} return maxArray;
}
function logAndAlert(message) {
	alert(message);
	console.log(message);
}
function playerTurn(input) {
	logAndAlert("Ready player " + input);
	let score = 0;
	let round = 1
	while(round < 11) {
		let rollScore = 0;
		let dice = roll();
		logAndAlert("You have rolled the following: " + dice.toString());
		rollScore = scoreCalculator(dice);
		console.log("Your round " + round + " score is " + rollScore + "!");
		score += rollScore;
		logAndAlert("You have scored " + rollScore + " points! Your current score is " + score + "!");
		round++;
	}
	logAndAlert("Your final score is " + score + "!");
	return score;
}
function runProgram() {
	logAndAlert("You are about to play MODfarkle");
	let playerNumber = getUserInteger("Plese enter number of players", validatePositiveInteger);
	let player = 1;
	let playerScoreKeeper = [];
	let highScore = [];
	while(player <= playerNumber) {
		let playerScore = playerTurn(player);
		playerScoreKeeper.push(playerScore);
		player++
	}
	highScore = getMaxValue(playerScoreKeeper);
	logAndAlert("Congratulations player " + (highScore[0]+1) + ", you WIN with your score of " + highScore[1] + "!");
}
