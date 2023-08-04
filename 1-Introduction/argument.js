// for running the srcipt file: node argument.js

console.log(process.argv)

process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`)
})