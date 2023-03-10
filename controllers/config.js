const { response } = require("express");

// use NODE_CONFIG_DIR to specify config directory e.g., ../etc
// process.env["NODE_CONFIG_DIR"] = __dirname + "/configDir/";
const config = require("config");

const getClientConfig = async (req, res = response) => {
    console.log("controllers/config.getClientConfig()");
    let hostConfig = "localhost"
    let portConfig = "8080"
    if (config.has("datastore.grpc.host")) {
        hostConfig = config.get("datastore.grpc.host");
    }
    if (config.has("datastore.grpc.port")) {
        portConfig = config.get("datastore.grpc.port");
    }
    const grpcUrl = "http://" + hostConfig + ":" + portConfig;
    console.log("grpcUrl: " + grpcUrl);
    res.json({
        hostname: grpcUrl,
    });
};

module.exports = {
    getClientConfig,
};

// Here is an api implementation that makes a web API request to an external service.
// from tutorial:https://medium.com/geekculture/build-and-deploy-a-web-application-with-react-and-node-js-express-bce2c3cfec32
//
// const fetch = require("cross-fetch");
// const { response } = require("express");
// const AIC_URL = "https://api.artic.edu/api/v1/artworks/search?q=";
//
// const getArtworks = async (req, res = response) => {
//     const { keyword } = req.params;
//
//     try {
//         const resp = await fetch(
//             `${AIC_URL}${keyword}&limit=15&fields=id,title,image_id,date_display,artist_display,place_of_origin,medium_display`,
//             {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             }
//         );
//
//         if (resp.status >= 400) {
//             throw new Error("Bad response from server");
//         }
//
//         const { data = [] } = await resp.json();
//         const dataWithUrls = data.map((image) => ({
//             ...image,
//             image_url: `https://www.artic.edu/iiif/2/${image.image_id}/full/843,/0/default.jpg`,
//         }));
//
//         res.json(dataWithUrls);
//     } catch (err) {
//         console.error(err);
//     }
// };
//
// module.exports = {
//     getArtworks,
// };