const express = require("express");
const app = express();
const router = express.Router();
const path = require("path")
const logger = require("morgan");
// multer is a package used to uplaod files to the server
const multer = require("multer")
const uploadFiles = multer({ dest: "./public/assets/uploads" })

const PORT = 3001;

// 1. Built In Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// built in middleware for displaying static files such as images, css, js 
app.use("/static", express.static(path.join(__dirname, "public")))

// 2. Third Party Middleware
app.use(logger("combined"))
app.use(logger("dev"))
app.use(logger("common"))
app.use(logger("short"))
app.use(logger("tiny"))

// 3. Application Level Middleware
const loggerMiddleware = (req, res, next) => {
    console.log(`${new Date()} --- Request [${req.method}] [${req.url}]`)
    next()
}
app.use(loggerMiddleware)


// 4. Router Level Middleware
app.use("/api/users", router);
const fakeAuth = (req, res, next) => {
    const fakeAuthStatus = true
    // const fakeAuthStatus = false;
    if (fakeAuthStatus) {
        console.log("User is Authorized", fakeAuthStatus)
        next();
    } else {
        res.status(401)
        throw new Error("Unauthorized User!!")
    }
}
const getUsers = (req, res) => {
    res.json({ message: "Get All Users" })
}
const createUsers = (req, res) => {
    res.json({ message: "Create Users" })
}
router.use(fakeAuth)
router.route("/").get(getUsers).post(createUsers)

// 5. Error Handeling Middleware
const errorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    switch (statusCode) {
        case 401:
            res.json({
                title: "Unauthorized",
                message: err.message
            });
            break;
        case 404:
            res.json({
                title: "Not Found",
                message: err.message
            });
            break;

        case 500:
            res.json({
                title: "Internal Server Error",
                message: err.message
            });
            break;

        default:
            break;
    }
}

// route for uploading image
app.post("/upload", uploadFiles.single("image"), (req, res, next) => {
    console.log(req.file, req.body)
    res.send(req.file)
}, (err, req, res, next) => {
    res.status(400).send({ err: err.message })
})
// invalid routes
app.all("*", (req, res) => {
    res.status(404);
    throw new Error("Not Found!!")
})
app.use(errorHandlerMiddleware)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})