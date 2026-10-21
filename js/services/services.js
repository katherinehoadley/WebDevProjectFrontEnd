function buildFetchOptions(method,bodyObject) {
    let fetchOptions = {};
    fetchOptions.method = method.toLowerCase();
    if (fetchOptions.method == 'post' || fetchOptions.method == 'put') {
        fetchOptions.body = JSON.stringify(bodyObject);
        fetchOptions.headers = {"Content-Type":"application/json"};
    }
    return fetchOptions;
}

async function makeAPICall(url,method,idParam,bodyObject) {
    let fetchOptions = buildFetchOptions(method,bodyObject);
    if (idParam && idParam != null) {
        url += "/"+idParam;
    }
    let apiResponse = await fetch(url,fetchOptions);
    if (apiResponse.status != 200) return undefined;
    let apiResponseJSON = await apiResponse.json();
    return apiResponseJSON;
}

async function getPlayerList(){
    let playerList = await makeAPICall(getPlayersURL, "get");
    return playerList;
}

async function loadPlayers(){
    let playerList = await getPlayerList();
    console.log(playerList);
    populatePlayers(playerList);
}

async function getPlayer(playerName){
    let player = await makeAPICall(getPlayerURL,"get",playerName);
    return player;
}

async function addPlayer(playerName, playerTeam, playerPosition, playerImage){
    let newPlayer = new Player(null, playerName, playerTeam, playerPosition, playerImage);
    console.log("createPlayerURL =", createPlayerURL);
    let playerResponse = await makeAPICall(createPlayerURL, "post", undefined, newPlayer);
    if (playerResponse){
        loadPlayers();
        hidePlayerPopup();
    }
}
async function editPlayer(playerId, playerName, playerTeam, playerPosition, playerImage){
    let editPlayer = new Player(playerId, playerName, playerTeam, playerPosition, playerImage);
    let playerResponse = await makeAPICall(editPlayerURL, "put",playerId,editPlayer);
    if (playerResponse) {
        loadPlayers();
        hidePlayerPopup();
    }

}

async function deletePlayer(playerId){
    let deleteResponse = await makeAPICall(deletePlayerURL, "delete", playerId);
    if(deleteResponse){
        removePlayer(playerId);
    }


}