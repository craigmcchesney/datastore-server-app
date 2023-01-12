const express = require('express');
const path = require('path');

class Server {

    constructor() {
        this.app = express();
        this.port = 9000;
        this.paths = {
            auth: "/api/auth",
            config: "/api/config",
        };
        this.middlewares();
        this.routes();
    }

    middlewares() {

        this.app.use(express.json());

        // pick up client app index.html file
        this.app.use(
            express.static(path.join(__dirname, '../client/build'))
        );
    }

    routes() {

        // auth routes
        this.app.use(this.paths.auth, require("../routes/auth"));

        // config routes
        this.app.use(this.paths.config, require("../routes/config"));

        // catch all requests that don't match other routes
        this.app.get("*", (req, res) => {
            res.sendFile(
                path.join(__dirname, '../client/build/index.html')
            );
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running on port: ", this.port);
        });
    }
}

module.exports = Server;