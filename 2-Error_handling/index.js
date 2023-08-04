// Four ways for handeling errors in nodejs

const { CustomError } = require("./customError");

// 1. Error Object
const error = new Error("Something went wrong!!");
console.log(error.stack)
console.log(error.message)
throw new Error("new error occured!!")


// 2. Creating a Custom Error in nodejs
// Custom Error is used in Forbidden, Bad request, Not found etc..
const { CustomError } = require("./customError");
throw new CustomError("This is a custom error")

// 3. Handling error using try, catch 
try {
    doSomething();
} catch (error) {
    console.log("Error Occured!!");
    console.log(error)
}

function doSomething() {
    const data = fetch("https://localhost/api")
}

// 4. Handeling Uncaught Exception
process.on("unCaughtException", (error) => {
    console.log("There was an uncaught excpetion", error);
    process.exit(1)
})

doSomething()


// 4. Handeling exceptions with promises
const addFunction = () => {
    const data = 8;
    return data;
}
const promise = new Promise((resolve, reject) => {
    if (true) {
        resolve(addFunction())
    } else {
        reject(addFunction())
    }
})

promise.then((value) => {
    console.log(value)
}).catch((error) => {
    console.log("Error Occured!!");
    console.log(error)
})


// 5. Exception Handeling using async await
const dummyFunc = () => {
    const data = fetch("localhost")
}
const someFunction = async () => {
    try {
        await (dummyFunc());
    } catch (error) {
        throw new CustomError(error.message)
    }
}

someFunction()