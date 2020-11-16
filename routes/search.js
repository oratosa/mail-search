const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    var data = {
        title: 'Search',
        content: "Input keyword"
    };
    res.render('search', data);
});

router.post('/post', (req, res, next) => {
    var keyword = req.body['keyword'];
    var data = {
        title: 'Search',
        content: keyword
    };
    res.render('search', data)
});

module.exports = router;