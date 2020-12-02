function tripleSearchQueryGenerator(selected_cells, files){
    let prefix = `
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
                `;
    let select = `
                    SELECT distinct ?subject ?predicate ?object
                    WHERE{
                 `
    let where = `   {
                    ?email1 schema:mentions ?mention.
                    # document
                    ?email1 schema:alternateName ?file.    
                `;
    let optional = `
                    ?triple marl:describesObject ?mention.
                    ?triple rdf:subject ?subject.
                    ?triple rdf:predicate ?predicate.
                    ?triple rdf:object ?object.
                    }
                    `;
    let end = `}`;

    // 検索キーワードを分解して単語ごとにテキスト検索をする節をつくる
    let files_array = files.split(',');
    let files_strings = files_array.join('\',\'');

    // UNION句をリクエストされたセルの数だけ作る
    let unions = [];
    for (let cell of selected_cells){
        let selectedAnchorText = cell["anchorText"] ? `?mention nif:isString "` + cell["anchorText"] + `"@en.` : '';
        let selectedEntity = cell["entity"] ? `?mention itsrdf:taIdentRef <` + cell["entity"] + `> . ` : '';
        let union = where + 'FILTER(?file IN (\'' + files_strings + '\'))' + selectedAnchorText + selectedEntity + optional;
        unions.push(union);
        } 

    // すべてのクエリの節を結合し，一つの文書検索クエリを生成する
    let query = prefix + select + unions.join('UNION') + end;
    
    console.log(query);
    return query;
}

module.exports = tripleSearchQueryGenerator;

/////test/////
/*
let test_selected_cells = [
    {
      anchorText: 'Altavista',
      entity: 'http://www.wikidata.org/entity/Q433505'
    },
    {
      anchorText: 'Compaq',
      entity: 'http://www.wikidata.org/entity/Q324603'
    }
  ]
let test_files = 'lists-028-12380087,lists-080-7872290,lists-028-5292801,lists-028-5308480,lists-028-5308480,lists-002-7747530,lists-002-7903543,lists-021-12214534,lists-028-10053008,lists-028-12371715,lists-028-13571171,lists-028-13602823,lists-028-14516107,lists-028-14772761,lists-028-15747631,lists-028-3731823,lists-029-3660181,lists-061-1327449,lists-061-1370142,lists-061-1378038,lists-061-8559481,lists-062-16401949,lists-062-16411041,lists-062-16438544,lists-062-8414896,lists-064-15477083,lists-068-11529682,lists-071-13575166,lists-071-7421619,lists-075-14260922,lists-075-14273376,lists-076-13662450,lists-076-13704190,lists-078-4010637,lists-079-5694628,lists-079-5725942,lists-079-5754655,lists-079-5785477,lists-080-7831855,lists-091-12826107,lists-091-12851661,lists-091-12870728,lists-091-6375345,lists-098-10218087,lists-098-10352636';
tripleSearchQueryGenerator(test_selected_cells,test_files);
*/
