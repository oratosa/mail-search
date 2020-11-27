const ejs = require('ejs');

const head = {"vars":["fromWho","toWho"]};
const results = {"bindings":[{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Al_Gilman"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Al_Gilman"},"toWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Dominique_Haza_l_Massieux"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Charles_McCathieNevile"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Charles_McCathieNevile"},"toWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/David_Woolley"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Charles_McCathieNevile"},"toWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Judy_Schnitzer"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Charles_McCathieNevile"},"toWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Mike_Rundle"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Dan_Brickley"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Dan_Connolly"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Daniel_Dardailler"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Dominique_Haza_l_Massieux"},"toWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Al_Gilman"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Ian_B__Jacobs"},"toWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Paul_Pedersen"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Intro_Interactive"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Janet_Daly"},"toWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Ian_B__Jacobs"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/John_Foliot___WATS_ca"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Jonathan_Chetwynd"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Judy_Schnitzer"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Karl_Hebenstreit__Jr_"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Karl_Hebenstreit__Jr_"},"toWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Karl_Hebenstreit__Jr_"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Karl_Hebenstreit__Jr_"},"toWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Olle_Olsson"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Kathleen_Anderson"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Leslie_K__Yoder"},"toWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/John_Foliot___WATS_ca"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Michael_Mauch"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Mike_Rundle"},"toWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Leslie_K__Yoder"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Olle_Olsson"},"toWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Karl_Hebenstreit__Jr_"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Robert_Neff"},"toWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Wendy_A_Chisholm"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Roberto_Scano___IWA_HWG"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Sean_B__Palmer"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Surfer_s_Choice"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Susan_Lesch"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Tom_Croucher"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Wendy_A_Chisholm"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Wendy_A_Chisholm"},"toWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/karl_hebenstreit_gsa_gov"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/clip_image002_gif"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/danbri_fireball_danbri_org"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/email_packet"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/islamconvert_ummah_org"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/karl_hebenstreit_gsa_gov"}},{"fromWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/lynn_alford"},"toWho":{"type":"uri","value":"http://www.kde.cs.tsukuba.ac.jp/~aso/w3c-email/Jonathan_Chetwynd"}}]};
let template = `
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
console.info(html);