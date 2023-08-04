// for running the srcipt file: node input.js

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(`What is your name? `, (name) => {
    console.log(`Hi ${name}`);
    rl.close()
})
