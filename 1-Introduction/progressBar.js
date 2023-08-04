// for running the srcipt file: node progressBar.js

const ProgressBar = require("progress");
const chalk = require("chalk")

const progressBar = new ProgressBar("downloading [:bar] :rate/bps :percent :etas", {
    total: 20
})

const timer = setInterval(() => {
    progressBar.tick();
    if (progressBar.complete) {
        clearInterval(timer)
    }
}, 100)
console.log(chalk.green("Welcome"))