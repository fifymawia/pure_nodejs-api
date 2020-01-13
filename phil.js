//the array of numbers
const array = ["Wine", "brandy", "Whisky", "Wine", "Alomo" ];

//for loop, so long i is less than array.length, the loop continues and for each loop i increments
// i represents any of the words in the array
// The forloop loops through the array the first time
for ( var i = 0; i < array.length; i++){

//iterate through the array	
// the second forloop loops through the array the seoond time
// with j representing the items in the array this time

for (var j = i+1; j< array.length; j++){

//finds the duplicates	
// this checks if an item represented as i the first time is the same as the item
// represented as j the second time

if (array [i] === array [j]){

// prints out the duplicates
// That is, the time is printed out.

console.log(array[i]);
}
}

}