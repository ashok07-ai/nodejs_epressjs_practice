const writeToFile = require("../utils/write-to-file");

module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    let movieId = req.url.split("/")[3];
    const regexV4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    if (!regexV4.test(movieId)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Validation Failed", message: "UUID is Not Valid!!" }))
    } else if (baseUrl === "/api/movies/" && regexV4.test(movieId)) {
        const indexOfMovie = req.movies.findIndex((movie) => {
            return movie.id === movieId
        })
        if (indexOfMovie === -1) {
            res.statusCode = 404;
            res.write(JSON.stringify({ title: "Not Found", message: "Movie Not Found!!" }));
            res.end()
        } else {
            req.movies.splice(indexOfMovie, 1);
            writeToFile(req.movies)
            res.writeHead(204, { "Content-Type": "application/json" });
            res.end(JSON.stringify(req.movies))
        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found", message: "Route Not Found!!" }))
    }
}