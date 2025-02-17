function personSearchQueryGenerator(files){
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
                    SELECT distinct ?fromWho ?toWho
                    WHERE{
                    ?email1 schema:sender ?fromWho.
                    # document
                    ?email1 schema:alternateName ?file.    
                `;
    let optional = `
                    OPTIONAL{
                    ?email1 email:References ?email2.
                    ?email2 schema:sender ?toWho.
                    }
                    }ORDER BY ?fromWho
                    `;
    // 検索キーワードを分解して単語ごとにテキスト検索をする節をつくる
    let files_array = files.split(',');
    let files_strings = files_array.join('\',\'');
    //let files_strings = files.join('\',\'');

    // すべてのクエリの節を結合し，一つの文書検索クエリを生成する
    let query = prefix + select + 'FILTER(?file IN (\'' + files_strings + '\'))' + optional;
    
    console.log(query);
    return query;
}

module.exports = personSearchQueryGenerator;

/////test/////
//let test_files = 'lists-078-4010637,lists-076-13704190';
//personSearchQueryGenerator(test_files);
