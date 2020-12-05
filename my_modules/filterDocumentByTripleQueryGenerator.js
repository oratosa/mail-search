function filterDocumentByTripleQueryGenerator(keyword, selected_cells){ //selected_cellsはarray[{subject:~,predicate:~,object:~},{...}]
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
                `
    let select =`
                    SELECT distinct ?file ?headline (isLiteral(?anchorText) as ?keywordHitsEntity) ?entity
                    WHERE{
                `;

    let where =`    {?email schema:alternateName ?file;
                            schema:headline ?headline;
                            schema:text ?text.
                `;

    let optional = `
                    OPTIONAL{?email schema:mentions ?mention.
                                ?mention nif:isString ?anchorText.
                                FILTER regex(?anchorText,'`+ keyword +`', 'i')
                                ?mention itsrdf:taIdentRef ?entity.}
                    }
                    `
    let orderby = `
                    }ORDER BY DESC (?anchorText)
                    `
    // 検索キーワードを分解して単語ごとにテキスト検索をする節をつくる
    let keyword_list = keyword.split(/\s/);
    let filter = [];
    for (let word of keyword_list){
        filter.push(`FILTER regex(?text,'`+ word +`','i')`)
    };

    // UNION句をリクエストされたセルの数だけ作る
    let unions = [];
    for (let cell of selected_cells){
        let mention = ` ?email schema:mentions ?selectedMention. `;
        let triple = ` ?triple marl:describesObject ?selectedMention. `;
        let subject = cell["subject"] ? `?triple rdf:subject <` + cell["subject"] + `>.`: '';
        let predicate = cell["predicate"] ? `?triple rdf:predicate <` + cell["predicate"] + `>.`: '';
        let object = cell["object"] ? cell["object"] : ''; // null check
        if (object != ''){ // URIかリテラルかチェック
            try {
                object = new URL(object);
                object = `?triple rdf:object <` + object + `>.`
            }catch(ERR_INVALID_URL){
                object = `?triple rdf:object "` + object + `"@en.`;
            }          
        };
        let union = where + filter.join('\n') + mention + triple + subject + predicate + object + optional;
        unions.push(union);
        }

    // すべてのクエリの節を結合し，一つの文書検索クエリを生成する
    let query = prefix + select + unions.join('UNION') + orderby;

    console.log(query);
    return query;
};

module.exports = filterDocumentByTripleQueryGenerator;

/*
test_selected_cells = [{object: "yet",
                        predicate: "http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/display_SVG_animations_as",
                        subject: "http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Batik"}];
filterDocumentByTripleQueryGenerator('google logo',test_selected_cells);
*/