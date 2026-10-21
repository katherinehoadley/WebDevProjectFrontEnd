function populatePlayers(playerList){
     let playerTableBody = document.getElementById("playerTableBody");
     console.log(playerTableBody);
     playerTableBody.innerHTML="";
     for(player of playerList){
        console.log(player);
        let newRow = playerTableBody.insertRow(-1);
        newRow.setAttribute("id","player"+player.playerId);
        addTableCell(newRow,0,player.playerId);
        addTableCell(newRow,1,player.playerName);
        addTableCell(newRow,2,player.playerTeam);
        addTableCell(newRow,3,player.playerPosition);
        addTableCell(newRow, 4, `<img src="${player.playerImage}" alt="${player.playerName}" style="width:80px; height:auto;">`);
        addTableCell(
          newRow,
          5,
          '<button id="editButton" onClick="showPlayerPopup(' + player.playerId + ')">Edit</button>' +
          '<button id="deleteButton" onClick="deletePlayer(' + player.playerId + ')">Delete</button>',
          "actionItems"
        );
     }
}

function submitPlayer(){
    const formInputs = document.getElementById("playerForm").elements;
    const playerId = formInputs["playerId"].value;
    const playerName = formInputs["playerName"].value;
    const playerTeam = formInputs["playerTeam"].value;
    const playerPosition = formInputs["playerPosition"].value;
    const playerImage = formInputs["playerImage"].value;

    if(playerId){
        editPlayer(playerId, playerName,playerTeam,playerPosition,playerImage);
    }
    else{
        addPlayer(playerName,playerTeam,playerPosition,playerImage);
    }
}

function showPlayerPopup(playerId) {

    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    try {
        if (playerId) {
            setEditPlayer(playerId);
        } else {
            setNewPlayer();
        }
    } catch (e) {
        console.error("Popup setup failed:", e);
    }
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');

}

function hidePlayerPopup() {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");

    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

function addTableCell(rowElement, cellNum, cellValue, playerName){
    let newCell = rowElement.insertCell(cellNum);
    newCell.innerHTML = cellValue;
    if (playerName) {
        newCell.setAttribute("player",playerName);
    }
}

async function setEditPlayer(playerId){
    let popupTitle = document.getElementById("popupTitle");
    popupTitle.innerHTML="Edit Player";
    let player = await getPlayer(playerId);
    mapPlayer(player);
}
function setNewPlayer(){
    let popupTitle = document.getElementById("popupTitle");
    popupTitle.innerHTML="Create Player";

    let playerId = document.getElementById("playerId");
    playerId.value = "";

    let playerName =  document.getElementById("playerName");
    playerName.value = "";

    let playerTeam =  document.getElementById("playerTeam");
    playerTeam.value = "";

    let playerPosition =  document.getElementById("playerPosition");
    playerPosition.value = "";

    let playerImage = document.getElementById("playerImage");
    playerImage.value = "";
}
function mapPlayer(player){
    let playerId = document.getElementById("playerId");
    playerId.value = player.playerId;

    let playerName =  document.getElementById("playerName");
    playerName.value = player.playerName;

    let playerTeam =  document.getElementById("playerTeam");
    playerTeam.value = player.playerTeam;

    let playerPosition =  document.getElementById("playerPosition");
    playerPosition.value = player.playerPosition;

    let playerImage = document.getElementById("playerImage");
    playerImage.value = player.playerImage;
}

function removePlayer(playerId){
    let playerRow = document.getElementById("player"+playerId);
    playerRow.remove();
}