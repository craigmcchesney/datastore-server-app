const express = require('express');
const path = require('path');

class Server {

    constructor() {
        this.app = express();
        this.port = 9000;
        this.middlewares();
        this.routes();
    }

    middlewares() {
        // pick up client app index.html file
        this.app.use(
            express.static(path.join(__dirname, '../client/build'))
        );
    }

    routes() {
        // catch all requests that don't match other routes
        this.app.get("*", (req, res) => {
            res.sendFile(
                path.join(__dirname, 'build', '../client/build/index.html')
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