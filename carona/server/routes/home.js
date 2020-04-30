const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json("At home");
})

module.exports = router;