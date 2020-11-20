/*
const fetch = require('node-fetch');

const headers = {
    'Content-Type': 'application/sparql-query',
    'Accept': 'application/sparql-results+json',
};


function queryToEndpoint(query){
    return new Promise((resolve, reject) => {
        let options = {
            url: 'http://localhost:3030/w3c-email/query',
            method: 'POST',
            headers: headers,
            body: query,
        };
        fetch(options, callback => {})
    }
}
*/

var fetch = require('node-fetch');

var headers = {
    'Content-Type': 'application/sparql-query',
    'Accept': 'application/sparql-results+json',
};

var dataString = 'SELECT * WHERE { ?s <http://www.w3.org/2000/01/rdf-schema#label> ?o . }LIMIT 10';

var options = {
    method: 'POST',
    headers: headers,
    body: dataString,
};

fetch('http://localhost:3030/w3c-email/query',options)
    .then(res2 => {if (!res2.ok) {
        // 200 系以外のレスポンスはエラーとして処理
        throw new Error(`${res2.status} ${res2.statusText}`);
      }
      return res2.json();
    })
    // これがレスポンス本文のテキスト
    .then(json => {
        console.log(json);
        return json})
    // エラーはここでまとめて処理
    .catch(err => console.error(err));
        //console.log(res));
    //.then(json => console.log(JSON.stringify(json)));

/*

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
        }
}

request(options, callback);

*/