function filterDocumentByEntityQueryGenerator(keyword, selected_cells){ //selected_cellsはarray[{anchorText:~~,entity:~~},{...}]
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
                    SELECT distinct ?file ?headline (isLiteral(?anchorText) as ?keywordHitsEntity) ?entity ?entityLabel
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
                                ?mention itsrdf:taIdentRef ?entity.
                                ?entity rdfs:label ?entityLabel.}
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
        let selectedAnchorText = cell["anchorText"] ? `?email schema:mentions ?selectedAnchorText.
                                               ?selectedAnchorText nif:isString "` + cell["anchorText"] + `"@en.` : '';
        let selectedEntity = cell["entity"] ? `?selectedAnchorText itsrdf:taIdentRef <` + cell["entity"] + `> . ` : '';
        let union = where + filter.join('\n') + selectedAnchorText + selectedEntity + optional;
        unions.push(union);
        } 

    // すべてのクエリの節を結合し，一つの文書検索クエリを生成する
    let query = prefix + select + unions.join('UNION') + orderby;

    // console.log(query);
    return query;
};

module.exports = filterDocumentByEntityQueryGenerator;


// filterDocumentByPeopleQueryGenerator('google logo',[{fromWho: "http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Al_Gilman", toWho: "http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Dominique_Haza_l_Massieux"},{fromWho: "http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Charles_McCathieNevile", toWho: null},{fromWho: "http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Charles_McCathieNevile", toWho: "http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/David_Woolley"}]);