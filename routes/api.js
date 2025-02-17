const express = require('express');
const router = express.Router();

const personSearchQueryGenerator = require('../my_modules/personSearchQueryGenerator.js');
const fetch = require('node-fetch');

const headers = {
    'Content-Type': 'application/sparql-query',
    'Accept': 'application/sparql-results+json',
};

const endpoint = 'http://localhost:3030/w3c-email/query';

router.post('/api/person', (req, res1, next) => {
    let files = req.body['files'];
    let query = personSearchQueryGenerator(files);
    let options = {
        method: 'POST',
        headers: headers,
        body: query,
    };
    fetch(endpoint,options)
        .then(res2 => {if (!res2.ok) {
        // 200 系以外のレスポンスはエラーとして処理
        throw new Error(`${res2.status} ${res2.statusText}`);
        }
        return res2.json();
        })
        .then(json => {
            console.log(JSON.stringify(json.head));
            console.log(JSON.stringify(json.results));
            data = {
                head: json.head,
                results: json.results,
            };
            res1.json(data);
        })
        .catch(err => console.error(err));
});

module.exports = router;