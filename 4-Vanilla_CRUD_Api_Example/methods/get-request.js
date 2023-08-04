module.exports = (req, res) => {
    try {
        let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
        let movieId = req.url.split("/")[3];
        const regexV4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

        // fetch all data
        if (req.url === "/api/movies" || req.url === "/api/movies/") {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({
                data: req.movies
            }));
            res.end()
        }
        // fetch data through id
        else if (!regexV4.test(movieId)) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ title: "Validation Failed", message: "UUID is Not Valid!!" }))
        } else if (baseUrl === "/api/movies/" && regexV4.test(movieId)) {
            res.setHeader("Content-Type", "application/json");
            let filterdMoviesById = req.movies.filter((data) => {
                return data.id === movieId
            });
            if (filterdMoviesById.length > 0) {
                res.statusCode = 200;
                res.write(JSON.stringify({
                    data: filterdMoviesById
                }));
                res.end()
            } else {
                res.statusCode = 404;
                res.write(JSON.stringify({ title: "Not Found", message: "Movie Not Found!!" }));
                res.end()
            }
        }
        else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ title: "Not Found", message: "Route Not Found!!" }))
        }
    } catch (error) {
        console.log(error)
    }
}