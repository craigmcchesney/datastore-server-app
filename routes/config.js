const { Router } = require("express");
const router = Router();

const { getClientConfig } = require("../controllers/config");

router.get("/getClientConfig", getClientConfig);

module.exports = router;