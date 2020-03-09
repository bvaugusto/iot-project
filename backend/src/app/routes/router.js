const express = require('express');
const router = express.Router();

router.get('/students', async(req, res) => {
    return await req.container.resolve('studentController').get(req, res);
});

module.exports = router;