var game = {plurals: {}};

function sh(civ) {
    let array = civ.deck;
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array[0];
    }
    function refresh(){
        if(game.bg == undefined){
            document.body.style.backgroundImage = 'url("Img/Main.png")';
        }else{
            document.body.style.backgroundImage = 'url("Img/'+game.bg+'.png")';
        }
        refreshpop();
        refreshcoins();
        refreshlists();
        refreshterritory();
        refreshdeck();
        refreshaudio();
    }
    function refreshpop(){
        let nations = Object.keys(players);
        let t, np, fp;
        for(let x = 0;x<nations.length;x++){
            np = 0;
            fp = 0;
            t = 0;
            for(let y = 0;y<players[nations[x]].t.length;y++){
                t++;
                for(let z = 0;z<players[nations[x]].t[y].pop.length;z++){
                    if(players[nations[x]].t[y].pop[z] == players[nations[x]].nationality){
                        np++;
                    }else{
                        fp++;
                    }
                }
            }
            document.getElementById(nations[x]+"_terr").innerHTML = t;
            document.getElementById(nations[x]+"_natpop").innerHTML = np;
            document.getElementById(nations[x]+"_forpop").innerHTML = fp;
        }
        for(let i = 0;i<nations.length;i++){
            document.getElementById(nations[i]+"_name_one").innerHTML = players[nations[i]].nation;
            document.getElementById(nations[i]+"_name_two").innerHTML = players[nations[i]].nation;
        }
    }
    function refreshcoins(){
        let coins = ["iron", "gold", "jade", "marble", "inflation"];
        for(let x = 0; x<coins.length; x++){
            for(let i = 0;i < Object.keys(players).length;i++){
                document.getElementById(Object.keys(players)[i]+"_"+coins[x]).innerHTML = players[Object.keys(players)[i]][coins[x]] + ` <button onclick="players.${Object.keys(players)[i]}['${coins[x]}'] += parseInt(prompt('How much?'));refresh()">+</button>`;
            }
        }
        //stability
        for(let i = 0;i < Object.keys(players).length;i++){
            document.getElementById(Object.keys(players)[i]+"_stability").innerHTML = players[Object.keys(players)[i]].stability + ` <button onclick="let delta = parseInt(prompt('How much?'));players.${Object.keys(players)[i]}.stability += delta;if(delta > 0){audio.pstability.play();}else{audio.lstability.play();};refresh()">+</button>`;
        }
    }
    function refreshlists(){
        let coins = ["notes", "tech", "heri", "law", "achi","react"];
        for(let x = 0; x<coins.length; x++){
            for(let i = 0; i<Object.keys(players).length;i++){
                document.getElementById(Object.keys(players)[i]+"_"+coins[x]).innerHTML = list(players[Object.keys(players)[i]][coins[x]],"players."+Object.keys(players)[i]+"."+coins[x]);
            }
        }
        if(document.getElementById("select-nation").value == "blank"){}else{
            let nation = players[document.getElementById("select-nation").value];
            document.getElementById("deck-name").innerHTML = nation.nation;
            document.getElementById("deck-list").innerHTML = list(nation.deck, "players."+document.getElementById("select-nation").value+".deck");
        }
    }
    function list(array, arrayname){
        let r = "<ul>";
        for(let x = 0;x<array.length;x++){
            r = r + `<li>${array[x]} <button onclick="confirm('Delete ${array[x]}?')?${arrayname}.splice(${x},1)+refresh():print('deletion canceled')">X</button>`;
        }
        r = r + "</ul>";
        if(r == "<ul></ul>"){
            r = "none";
        }
        r = r + `<p style="display:block"></p><button onclick="${arrayname}.push(prompt('Name'));refresh()">+</button>`;
        return r;
    }
    function refreshterritory(){
        if(document.getElementById("select-nation").value == "blank"){
            document.getElementById("territory").innerHTML = `
                <tr><th colspan="5">Select a nation to see its territory.</th></tr>
            `;
        }else{
            let id = document.getElementById("select-nation").value;
            let nation = players[id];
            let t = `
                <tr>
                    <th colspan="5"><b>${nation.nation}</b></th>
                </tr>
                <tr>
                    <th><b>Population</b></th>
                    <th><b>Terrain</b></th>
                    <th><b>Generic building</b></th>
                    <th><b>Extractive building</b></th>
                    <th></th>
                </tr>
            `;
            for(let i = 0;i<nation.t.length;i++){
                t = t + `
                    <tr>
                        <th>${listpop(nation.t[i].pop, nation.nationality, "players."+id+".t["+i+"].pop")}</th>
                        <th>${nation.t[i].type} <button onclick="change('${id}', ${i}, 'type')">Change</button></th>
                        <th>${nation.t[i].b} <button onclick="change('${id}', ${i}, 'b')">Change</button></th>
                        <th>${nation.t[i].be} <button onclick="change('${id}', ${i}, 'be')">Change</button></th>
                        <th><button onclick="confirm('Delete territory?')?players.${id}.t.splice(${i},1):console.log('deletion cancelled');refresh();">X</button></th>
                    </tr>
                `;
            }
            t = t + `<tr><th colspan="5"><button onclick="players.${id}.t.push({pop:[],type:'none',b:'none',be:'none'});refresh();">+</button></th></tr>`;
            document.getElementById("territory").innerHTML = t;
        }
    }
    function listpop(pop, nationality, key){
        let list = [];
        for(let x = 0;x<pop.length;x++){
            let add = -1;
            for(let y = 0;y<list.length;y++){
                if(pop[x] == list[y][0]){
                    add = y;
                }
            }
            if(add == -1){
                list = list.concat([[pop[x],1]]);
            }else{
                list[add][1]++;
            }
        }
        list.sort();
        for(let y = 0;y<list.length;y++){
            if(list[y][0] == nationality){
                list = [list.pop(y)].concat(list);
            }
        }

        let r = "<ul>";
        for(let x = 0;x<list.length;x++){
            r = r + `<li>${list[x][1]} ${list[x][1] == 1?list[x][0]:plural(list[x][0])} <button onclick="deletepop(${key}, '${list[x][0]}');refresh();">X</button>`;
        }
        r = r + "</ul>";
        if(r == "<ul></ul>"){
            r = "none";
        }
        r = r + `<p title="Add a population of any nationality." style="display:block"></p><button onclick="${key}.push(prompt('Name'));refresh();">+</button>`;
        r = r + `<p title="Add a population of ${nationality} nationality." style="display:block"></p><button onclick="${key}.push('${nationality}');refresh();");refresh();">⊕</button>`;
        return r;
    }
    function deletepop(pop, nationality){
        let success = false;
        for(let x = 0;x<pop.length;x++){
            if(pop[x] == nationality){
                pop.pop(x);
                success = true;
            }
        }
        if(!success){
            alert("There is no "+nationality+" in this territory!");
        }
    }
    function plural(x){
        if(game.plurals[x] == undefined){
            return x+"s";
        }else{
            return game.plurals[x];
        }
    }
    function refreshaudio(){
        let buttons = document.getElementsByTagName("button");
        let audiomap = {
            iron: "iron",
            gold: "gold",
            jade: "jade",
            marble: "marble",
            pterritory: ".t.push",
            lterritory: ".t.splice",
            ppop: "pop.push",
            lpop: "pop.splice",
            building: "'b",
            heritage: "heri",
            tech: "tech",
            plaw: "law.push",
            llaw: "law.splice",
            achi: "achi",
            react: "react",
            deck: "deck",
            name: "nation"
        }
        for (let x = 0; x<buttons.length; x++){
            for(let y = 0; y<Object.keys(audiomap).length; y++){
                if(buttons[x].getAttribute("onclick").includes(audiomap[Object.keys(audiomap)[y]])){
                    buttons[x].setAttribute("onclick", buttons[x].getAttribute("onclick") + ";audio."+Object.keys(audiomap)[y]+".play()");
                }
            }
        }
    }
    function change(player, t, property){
        let territory = players[player].t[t];
        territory[property] = prompt("");
        refresh();
    }
    function select(card){
        if(card.getAttribute("style") == "backgroundColor: yellow"){
            card.setAttribute("style","");
        }else{
            card.setAttribute("style","backgroundColor: yellow");
        }
    }
    function refreshdeck(){
        let r = "<tr>";
        for(let i = 0;i<Object.keys(players).length;i++){
            r = r + "<th>"+game[Object.keys(players)[i]+"_deck"][game[Object.keys(players)[i]+"_card"]]+"</th>";
            if(i < Object.keys(players).length-1){
                r = r + "<th></th>";
            }
        }
        r = r + "</tr><tr>";
        for(let i = 0;i<Object.keys(players).length;i++){
            r = r + "<th>"+game[Object.keys(players)[i]+"_card"]+" unshuffled cards</th>";
            if(i < Object.keys(players).length-1){
                r = r + "<th></th>";
            }
        }
        document.getElementById("deck").innerHTML = r;
    }
    function draw(nation){
        game.bg = players[nation].nation;
        if(game[nation+"_card"]+1 < game[nation+"_deck"].length){
            game[nation+"_card"]++;
        }
        else{
            reshuffle(nation);
        }
        refresh();
    }
    function reshuffle(nation){
        game.bg = players[nation].nation;
        game[nation+"_card"] = 0;
        game[nation+"_deck"] = players[nation].deck.concat([]);
        shuffle(game[nation+"_deck"]);
        refresh();
    }
    function shuffle(array) {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex > 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }
    function start(age){
        if(age == "load"){
            players = JSON.parse(document.getElementById("load").value);
        }
        let names = Object.keys(players);

        if(age != "load"){
            let selectedP;
            let setToEmptySet = ["t", "tech", "heri", "law", "achi", "react", "deck", "notes"];
            let setToZero = ["iron", "gold", "jade", "marble", "stability", "inflation"];

            for(let i = 0;i < names.length;i++){
                selectedP = players[names[i]];
                selectedP.nation = selectedP.nation[age];
                selectedP.nationality = selectedP.nationality[age];
                selectedP.deck = selectedP[age+"_deck"];
                game[names[i]+"_card"] = 0;
                game[names[i]+"_deck"] = selectedP.deck;

                for(let x = 0; x<setToEmptySet.length; x++){
                    selectedP[setToEmptySet[x]] = [];
                }
                for(let x = 0; x<setToZero.length; x++){
                    selectedP[setToZero[x]] = 0;
                }

                if(selectedP.plurals != undefined){
                    for(let p = 0; p<Object.keys(selectedP.plurals).length;p++){
                        game.plurals[Object.keys(selectedP.plurals)[p]] = selectedP.plurals[Object.keys(selectedP.plurals)[p]];
                    }
                }
            }
        }

        let html = "";

        for(let x = 0; x<Object.keys(audio).length; x++){
            html = html + `
                <audio>
                    <source src="sound/${audio[Object.keys(audio)[x]]}" type="audio/wav">
                    Audio is incompatible with your browser.
                </audio>
            `;
        }

        html = html + `<button onclick="refresh();">Refresh</button><br><button onclick="save();">Save</button><br><br>`;
        html = html + `
                <table>
                    <thead>
                        <tr>
                            <th colspan="${names.length*2-1}"><b>Cards drawn</b></th>
                        </tr>
                        <tr>
            `;
        for(let i = 0;i < names.length;i++){
            html = html + `<th><b id="${names[i]}_name_one">${players[names[i]].nation}</b></th>`;
            if(i < names.length-1){
                html = html + "<th></th>";
            }
        }
        html = html + "</tr><tr>";
        for(let i = 0;i < names.length;i++){
            html = html + `<th><button onclick="draw('${names[i]}')">Draw card</th>`;
            if(i < names.length-1){
                html = html + "<th></th>";
            }
        }
        html = html + "</tr><tr>";
        for(let i = 0;i < names.length;i++){
            html = html + `<th><button onclick="reshuffle('${names[i]}')">Rushuffle</th>`;
            if(i < names.length-1){
                html = html + "<th></th>";
            }
        }
        html = html + "</thead><tbody id=\"deck\"></tbody></table> <br><br>";

        html = html + `
                <table>
                    <tr>
                        <th colspan="2"><b>Nation</b></th>
            `;
        for(let i = 0;i < names.length;i++){
            html = html + `<th><b id="${names[i]}_name_two">${players[names[i]].nation}</b></th>`;
        }
        html = html + "</tr><tr><th colspan=\"2\"><b></b></th>";
        for(let i = 0;i < names.length;i++){
            html = html + `<th><button onclick="players.${names[i]}.nation = prompt('Type the new name');refresh();">Change name</button></th>`;
        }
        html = html + "</tr><tr><th rowspan=\"2\"><b>Population</b></th><th><b>Nationals</b></th>";
        for(let i = 0;i < names.length;i++){
            html = html + `<th id="${names[i]}_natpop"></th>`;
        }
        html = html + "</tr><tr><th><b>Foreigners</b></th>";
        for(let i = 0;i < names.length;i++){
            html = html + `<th id="${names[i]}_forpop"></th>`;
        }
        html = html + "</tr><tr><th colspan=\"2\"><b>Territories</b></th>";
        for(let i = 0;i < names.length;i++){
            html = html + `<th id="${names[i]}_terr"></th>`;
        }
        html = html + "</tr><tr><th colspan=\"2\"><b>Notes</b></th>";
        for(let i = 0;i < names.length;i++){
            html = html + `<th id="${names[i]}_notes"></th>`;
        }
        html = html + "</tr><tr><th colspan=\"2\"><b>Stability</b></th>";
        for(let i = 0;i < names.length;i++){
            html = html + `<th id="${names[i]}_stability"></th>`;
        }
        html = html + "</tr><tr><th colspan=\"2\"><b>Inflation</b></th>";
        for(let i = 0;i < names.length;i++){
            html = html + `<th id="${names[i]}_inflation"></th>`;
        }
        html = html + "</tr><tr><th rowspan=\"4\"><b>Coins</b></th><th><b>Iron</b></th>";
        for(let i = 0;i < names.length;i++){
            html = html + `<th id="${names[i]}_iron"></th>`;
        }
        html = html + "</tr><tr><th><b>Gold</b></th>";
        for(let i = 0;i < names.length;i++){
            html = html + `<th id="${names[i]}_gold"></th>`;
        }
        html = html + "</tr><tr><th><b>Jade</b></th>";
        for(let i = 0;i < names.length;i++){
            html = html + `<th id="${names[i]}_jade"></th>`;
        }
        html = html + "</tr><tr><th><b>Marble</b></th>";
        for(let i = 0;i < names.length;i++){
            html = html + `<th id="${names[i]}_marble"></th>`;
        }

        let lists = [
            ["Technology","_tech"],
            ["Heritage","_heri"],
            ["Law","_law"],
            ["Achievements","_achi"],
            ["Reactions","_react"]
        ];
        for(let x = 0;x<lists.length;x++){
            html = html + "</tr><tr><th colspan=\"2\"><b>"+lists[x][0]+"</b></th>";
            for(let i = 0;i < names.length;i++){
                html = html + `<th id="${names[i]}${lists[x][1]}"></th>`;
            }
        }
        html = html + "</tr></table> <br><br> <select id=\"select-nation\" onchange=\"refresh();\"><option value=\"blank\" selected></option>";

        for(let i = 0;i<names.length;i++){
            html = html + `<option value="${names[i]}">${players[names[i]].nation}</option>`;
        }

        html = html + `
            </select>
            <table>
                <thead>
                    <tr>
                        <th colspan="5"><b>Territory</b></th>
                    </tr>
                <tbody id="territory"></tbody>
            </table> <br><br>`;

        html = html + `
            <table>
                <thead>
                    <tr>
                        <th><b>Deck</b></th>
                    </tr>
                    <tr>
                        <th><b id="deck-name"></b></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th id="deck-list"></th>
                    </tr>
                </tbody>
            </table>
            `;

        html = html + `<textarea>You may take notes here.\nPress 'm' to to revert the background to the default image.</textarea>`;

        document.body.innerHTML = html;

        for(let x = 0; x<Object.keys(audio).length; x++){
            audio[Object.keys(audio)[x]] = document.getElementsByTagName("audio")[x];
        }

        refresh();
    }
    function save(){
        document.getElementsByTagName("textarea")[0].value = JSON.stringify(players);
    }
addEventListener("keypress", function(e) {game.bg = e.key=="m"?undefined:game.bg; refresh();});
window.onload = function(){
    let list = "";
    let keys = Object.keys(players);
    for(let i = 0;i<keys.length;i++){
        list = list + `
            <li>${keys[i]} <button onclick="delete players.${keys[i]};window.onload();">X</button></li>
        `;
    }
    document.getElementById("playerlist").innerHTML = list;
}
