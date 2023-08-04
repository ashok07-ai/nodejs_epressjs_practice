// for running the srcipt file: node env.js

require("dotenv").config()

const name = process.env.NAME;
console.log("Hello! myself ", name)

const profession = process.env.PROFESSION
console.log(profession)