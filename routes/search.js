const express = require('express');
const router = express.Router();

const documentSearchQueryGenerator = require('../my_modules/documentSearchQueryGenerator.js');
const personSearchQueryGenerator = require('../my_modules/personSearchQueryGenerator.js');
const fetch = require('node-fetch');

const headers = {
    'Content-Type': 'application/sparql-query',
    'Accept': 'application/sparql-results+json',
};

const endpoint = 'http://localhost:3030/w3c-email/query';

router.get('/', (req, res, next) => {
    var data = {
        title: 'ML Search',
        content: "Input keywords",
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
            console.log(JSON.stringify(json.head));
            console.log(JSON.stringify(json.results));
            data = {
                title: 'ML Search',
                keyword: keyword,
                head: json.head,
                results: json.results,
            };
            res1.render('result', data)
        })
        .catch(err => console.error(err));
});

router.post('/result/api/person', (req, res1, next) => {
    let files = 'lists-078-12622907,lists-086-9170941';
    //let files = req.body.files;
    console.log(files);
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