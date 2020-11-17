const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    var data = {
        title: 'ML Search',
        content: "Input keyword"
    };
    res.render('search', data);
});

router.post('/result', (req, res, next) => {
    var keyword_str = req.body['keyword'];
    var keyword_list = keyword_str.split('\s');
    var data = {
        title: 'ML Search',
        content: 'Search result about [' + keyword_list + '].' 
    };
    res.render('search', data)
});

module.exports = router;