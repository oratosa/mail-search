const express = require('express');
const router = express.Router();
const ejs = require('ejs');

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
    // let data;
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
            // test //
            const head = json.head;
            const results = json.results;
            let template = `
            <script>
            jQuery(function($){
                $("#relevant-people").DataTable({
                    order: [],
                });
            });
            </script>
            <div>
            <h2 class="text text-success"> 
                Relevant People
            </h2>
                <table id="relevant-people" class="table table-bordered">
                    <thead> 
                        <tr> 
                            <th data-field="fromWho"> 
                                <% let fromWho = head.vars[0] %>
                                <%= fromWho %> 
                            </th> 
                            <th data-field="toWho"> 
                                <% let toWho = head.vars[1] %>
                                <%= toWho %> 
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <% let rows = results.bindings; %>
                        <% for(let i = 0; i < rows.length; i++){ %>
                            <% let row = rows[i]; %>
                            <% let fromWho = row.fromWho ?row.fromWho["value"] : null ; %>
                            <% let toWho = row.toWho ? row.toWho["value"] : null ; %>
                            <tr>
                                <td><%= fromWho %></td>
                                <td><%= toWho %></td>
                            </tr>
                        <% } %>
                    </tbody> 
                </table>
            </div>
            `;
            const html = ejs.render(template, { head: head, results: results });
            res1.send(html);
            /* testのためコメントアウト
            data = {
                head: json.head,
                results: json.results,
            };
            res1.json(data);
            */
        })
        .catch(err => console.error(err));
});

module.exports = router;