const express = require('express');
const { Router } = express;
const router = Router();

router.post('/', (req, res) => {
    console.log(req)
});


module.exports = router;