const requestBodyParser = require("../utils/body-parser");
const writeToFile = require("../utils/write-to-file");

module.exports = async (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    let movieId = req.url.split("/")[3];
    const regexV4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    if (!regexV4.test(movieId)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Validation Failed", message: "UUID is Not Valid!!" }))
    } else if (baseUrl === "/api/movies/" && regexV4.test(movieId)) {
        try {
            let body = await requestBodyParser(req)
            const indexOfMovie = req.movies.findIndex((movie) => {
                return movie.id === movieId
            })
            if (indexOfMovie === -1) {
                res.statusCode = 404;
                res.write(JSON.stringify({ title: "Not Found", message: "Movie Not Found!!" }));
                res.end()
            } else {
                req.movies[indexOfMovie] = { movieId, ...body }
                writeToFile(req.movies)
                res.writeHead(200, { "Content-Type": "application/json" })
                res.end(JSON.stringify(req.movies[indexOfMovie]))
            }
        } catch (error) {
            console.log(error);
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ title: "Validation Failed", message: "Request Body is Not Valid!!" }));
        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found", message: "Route Not Found!!" }))
    }
}