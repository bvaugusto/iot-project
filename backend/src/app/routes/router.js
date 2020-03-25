const express = require('express');
const router = express.Router();

router.post('/devices', async(req, res) => {
    return await req.container.resolve('deviceController').post(req, res);
});

module.exports = router;