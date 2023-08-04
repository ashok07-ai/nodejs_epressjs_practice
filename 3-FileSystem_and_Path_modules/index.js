const path = require("path");
const fs = require("fs");
const fsPromise = require("fs").promises


// assigning the path of the file
const filePath = "M:/nodejs_expressjs_course/3-FileSystem_and_Path_modules/file1.txt";

// reading dirName
console.log("The directory name is: ", path.dirname(filePath));

// reading baseName
console.log("The basename of a file is: ", path.basename(filePath))

// reading extensionName
console.log("The extension of a file name is: ", path.extname(filePath))

// Implementing file system modules
fs.readFile(filePath, "utf-8", (error, data) => {
    if (error) throw new Error("Something went wrong!!")
    console.log(data)
})

// async await for reading a file
const secondFilePath = "M:/nodejs_expressjs_course/3-FileSystem_and_Path_modules/file2.txt"
const fileReading = async () => {
    try {
        const data = await fsPromise.readFile(secondFilePath, { encoding: 'utf-8' });
        console.log("fs-promises", data)
    } catch (error) {
        console.log(error)
    }
}

fileReading()

// Writing in a file
const content_info = "Example of file system for writing in a file \nNodejs is a javascript library";
fs.writeFile("sampleFile.txt", content_info, (error) => {
    if (error) throw new Error("something went wrong");
    console.log("Write operation completed successfully!!");
})

// Reading and writing the file
const content = "Information about constructor. Constructor is a method that is automatically called when an object is created.s"
const readingAndWritingInFile = async () => {
    try {
        await fsPromise.writeFile("sampleFile.txt", content);
        await fsPromise.appendFile("sampleFile.txt", "\nImportance of constructor are: Inheritance, Encapsulation");
        const data = await fsPromise.readFile("sampleFile.txt");
        console.log(data.toString())
    } catch (error) {
        console.log(error)
    }
}

readingAndWritingInFile()