class SPARQLQueryDispatcher {
	constructor( endpoint ) {
		this.endpoint = endpoint;
	}

	query( sparqlQuery ) {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/json' };

		return fetch( fullUrl, { headers } ).then( body => body.json() );
	}
}
const fetch = require('isomorphic-fetch')

const endpointUrl = 'http://localhost:3030/w3c-email/query';
const sparqlQuery = `
PREFIX base: <http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/>
PREFIX schema: <https://schema.org/>
PREFIX email: <http://www.w3.org/2000/10/swap/pim/email#>
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX itsrdf: <https://www.w3.org/2005/11/its/rdf#>
PREFIX olia: <http://purl.org/olia/olia.owl#>
PREFIX nif: <http://persistence.uni-leipzig.org/nlp2rdf/ontologies/nif-core#>
PREFIX nerd: <http://nerd.eurecom.fr/ontology#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX marl: <http://www.gsi.dit.upm.es/ontologies/marl/ns#>
PREFIX its: <http://www.w3.org/2005/11/its/rdf#>

SELECT distinct ?file ?headline ?anchorText ?entity
WHERE{
  {?email schema:alternateName ?file;
          schema:headline ?headline;
          schema:text ?text.
    FILTER regex(?text, 'Google','i')
    FILTER regex(?text, 'logo','i')
    OPTIONAL{?email schema:mentions ?mention.
      ?mention nif:isString ?anchorText.
      FILTER regex(?anchorText, 'google logo', 'i')
      ?mention itsrdf:taIdentRef ?entity.}
  }
}ORDER BY DESC (?anchorText)
#LIMIT 10
`;

const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
let result = queryDispatcher.query( sparqlQuery );

/*
const fetch = require('isomorphic-fetch')
const SparqlClient = require('sparql-http-client')

SparqlClient.fetch = fetch

// SPARQLエンドポイントを指定（localhost）
const endpointUrl = 'http://localhost:3030/w3c-email/query'

// SPARQLクエリを記述
const query = `
PREFIX base: <http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/>
PREFIX schema: <https://schema.org/>
PREFIX email: <http://www.w3.org/2000/10/swap/pim/email#>
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX itsrdf: <https://www.w3.org/2005/11/its/rdf#>
PREFIX olia: <http://purl.org/olia/olia.owl#>
PREFIX nif: <http://persistence.uni-leipzig.org/nlp2rdf/ontologies/nif-core#>
PREFIX nerd: <http://nerd.eurecom.fr/ontology#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX marl: <http://www.gsi.dit.upm.es/ontologies/marl/ns#>
PREFIX its: <http://www.w3.org/2005/11/its/rdf#>

SELECT distinct ?file ?headline ?anchorText ?entity
WHERE{
  {?email schema:alternateName ?file;
          schema:headline ?headline;
          schema:text ?text.
    FILTER regex(?text, 'Google','i')
    FILTER regex(?text, 'logo','i')
    OPTIONAL{?email schema:mentions ?mention.
      ?mention nif:isString ?anchorText.
      FILTER regex(?anchorText, 'google logo', 'i')
      ?mention itsrdf:taIdentRef ?entity.}
  }
}ORDER BY DESC (?anchorText)
LIMIT 10
`

// Promise形式でデータを取得
async function main () {
    const client = new SparqlClient({ endpointUrl })
    const stream = await client.query.select(query)
   
    stream.on('data', row => {
      Object.entries(row).forEach(([key, value]) => {
        console.log(`${key}: ${value.value} (${value.termType})`)
      })
    })
   
    stream.on('error', err => {
      console.error(err)
    })
  }

main();
*/