const express = require('express');
const router = express.Router();
const ejs = require('ejs');

// 文書検索・文書絞り込みクエリ生成器
const documentSearchQueryGenerator = require('../my_modules/documentSearchQueryGenerator.js');
const filterDocumentByPeopleQueryGenerator = require('../my_modules/filterDocumentByPeopleQueryGenerator.js');
const filterDocumentByEntityQueryGenerator = require('../my_modules/filterDocumentByEntityQueryGenerator.js');
const filterDocumentByTripleQueryGenerator = require('../my_modules/filterDocumentByTripleQueryGenerator.js');

// 関連情報取得クエリ生成器
const personSearchQueryGenerator = require('../my_modules/personSearchQueryGenerator.js');
const entitySearchQueryGenerator = require('../my_modules/entitySearchQueryGenerator.js');
const tripleSearchQueryGenerator = require('../my_modules/tripleSearchQueryGenerator.js');

const fetch = require('node-fetch');

const headers = {
    'Content-Type': 'application/sparql-query',
    'Accept': 'application/sparql-results+json',
};

const endpoint = 'http://localhost:3030/w3c-email-q3/query';

router.get('/', (req, res, next) => {
    res.render('search');
});

router.post('/result', (req, res1, next) => {
    if (req.body['keyword']){
        let keyword = req.body['keyword'];
        let query = documentSearchQueryGenerator(keyword);
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
                // console.log(JSON.stringify(json));
                data = {
                    keyword: keyword,
                    head: json.head,
                    results: json.results,
                };
                res1.render('result', data)
            })
            .catch(err => console.error(err));
    }else if (req.body['keyword_plus_people']){
        let input = JSON.parse(req.body['keyword_plus_people']); // JSONにパースする必要ある
        let keyword = input["keyword"];
        let selected_cells = input['selected_cells'];
        let query = filterDocumentByPeopleQueryGenerator(keyword, selected_cells);
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
                // console.log(JSON.stringify(json));
                data = {
                    keyword: keyword,
                    head: json.head,
                    results: json.results,
                };
                res1.render('result', data)
            })
            .catch(err => console.error(err));
    }else if (req.body['keyword_plus_entity']){
        let input = JSON.parse(req.body['keyword_plus_entity']); // JSONにパースする必要ある
        let keyword = input["keyword"];
        let selected_cells = input['selected_cells'];
        let query = filterDocumentByEntityQueryGenerator(keyword, selected_cells);
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
                // console.log(JSON.stringify(json));
                data = {
                    keyword: keyword,
                    head: json.head,
                    results: json.results,
                };
                res1.render('result', data)
            })
            .catch(err => console.error(err));
    }else if (req.body['keyword_plus_triple']){
        let input = JSON.parse(req.body['keyword_plus_triple']); // JSONにパースする必要ある
        let keyword = input["keyword"];
        let selected_cells = input['selected_cells'];
        let query = filterDocumentByTripleQueryGenerator(keyword, selected_cells);
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
                // console.log(JSON.stringify(json));
                data = {
                    keyword: keyword,
                    head: json.head,
                    results: json.results,
                };
                res1.render('result', data)
            })
            .catch(err => console.error(err));
    }
});

router.post('/result/api/person', (req, res1, next) => {
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
            // console.log(JSON.stringify(json.head));
            // console.log(JSON.stringify(json.results));
            data = {
                head: json.head,
                results: json.results,
            };
            res1.json(data);
        })
        .catch(err => console.error(err));
});

router.post('/result/api/entity', (req, res1, next) => {
    let files = req.body['files'];
    let query = entitySearchQueryGenerator(files);
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
            // console.log(JSON.stringify(json.head));
            // console.log(JSON.stringify(json.results));
            data = {
                head: json.head,
                results: json.results,
            };
            res1.json(data);
        })
        .catch(err => console.error(err));
});

// 選択されたエンティティに関するトリプルを取得する
router.post('/result/api/entity/triple', (req, res1, next) => {
    let selected_cells = req.body['selected_cells'];
    console.log(selected_cells);
    let files = req.body['files'];
    console.log(files);
    let query = tripleSearchQueryGenerator(selected_cells, files);
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
            // console.log(JSON.stringify(json.head));
            // console.log(JSON.stringify(json.results));
            data = {
                head: json.head,
                results: json.results,
            };
            res1.json(data);
        })
        .catch(err => console.error(err));
});

module.exports = router;