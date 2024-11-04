import fs from 'fs'
const path = '../data/vancouver_skytrain_stations.txt';
let arr = fs.readFileSync(path).toString().split("\n");
// console.log(arr);
export default {arr};