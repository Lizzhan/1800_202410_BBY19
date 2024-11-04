import arr from './fs.js'
import  addStation  from './database.js';
// const path = '../data/vancouver_skytrain_stations.txt';
const trains = [];
const stations = [];
const num = [];

// console.log(typeof arr.arr)
let i = 0;
arr.arr.forEach((ele) => {
    let trimmed = ele.split("-");
    if(trimmed[1] == null){
        let train = trimmed[0].split(":")[0];
        trains.push(train);
        num.push(i);
        i = 0;
    }else{
        stations.push(trimmed[1].trim());
        i++;
    }
})

console.log(trains);
console.log(stations);
console.log(num);
addStation("Expo", "A")
export {trains, stations, num};

