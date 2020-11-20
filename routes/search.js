const express = require('express')
const router = express.Router()

const documentSearchQueryGenerator = require('../my_modules/documentSearchQueryGenerator.js')
const fetch = require('node-fetch');

const headers = {
    'Content-Type': 'application/sparql-query',
    'Accept': 'application/sparql-results+json',
};

const endpoint = 'http://localhost:3030/w3c-email/query';

router.get('/', (req, res, next) => {
    var data = {
        title: 'ML Search',
        content: "Input keyword",
    };
    res.render('search', data);
});

router.post('/result', (req, res1, next) => {
    let keyword = req.body['keyword'];
    let query = documentSearchQueryGenerator(keyword);
    let options = {
        method: 'POST',
        headers: headers,
        body: query,
    };
    let data;
    fetch(endpoint,options)
        .then(res2 => {if (!res2.ok) {
        // 200 系以外のレスポンスはエラーとして処理
        throw new Error(`${res2.status} ${res2.statusText}`);
        }
        return res2.json();
        })
        .then(json => {
            console.log(JSON.stringify(json));
            data = {
                title: 'ML Search',
                content: 'Search result about [' + keyword + '].' ,
                results: JSON.stringify(json),
            };
            res1.render('result', data)
        })
        .catch(err => console.error(err));
});

module.exports = router;