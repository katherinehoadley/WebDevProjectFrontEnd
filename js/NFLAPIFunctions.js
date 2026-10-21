function callAPIWithFetch(){
    const responseObject = fetch("https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams?displayName");
    console.log(responseObject);

    responseObject.then((responseObject) =>{
        console.log("Response Object", responseObject);
        const jsonResponse = responseObject.json();
        console.log(jsonResponse);
        return jsonResponse;
    })
    .then ((jsonData) => {
        console.log(jsonData);
        addTeams(jsonData.sports[0].leagues[0].teams);
    })

    .catch((error) => {
        console.log("You got an error");
        console.log(error);
    });
}

function populateTeams(){
    callAPIWithFetch();
}

function addTeams(teamsList){
    const teamContainerClass = document.querySelector(".teamCardsContainer");
    for (team of teamsList){
        const teamCard = buildTeamCard(team.team);
        teamContainerClass.append(teamCard);
    }
}

function buildTeamCard(team){
    const teamCardDiv = document.createElement("div");
    teamCardDiv.className = "teamContainer"

    const teamImageDiv = buildTeamImageDiv(team);
    const teamNameDiv = buildTeamNameDiv(team);

    teamCardDiv.append(teamImageDiv);
    teamCardDiv.append(teamNameDiv);

    return teamCardDiv;
}

function buildTeamImageDiv(team){
    const teamImageDiv = document.createElement("div");
    teamImageDiv.className = "teamImageContainer";

    const teamImageContainer = document.createElement("img");

    if(team.logos && team.logos.length >0){
        teamImageContainer.setAttribute("src", team.logos[0].href);
    }

    teamImageDiv.append(teamImageContainer);
    return teamImageDiv;
}

function buildTeamNameDiv(team){
    const teamNameDiv = document.createElement("div");
    teamNameDiv.className = "teamNameContainer";
    const teamNameContainer = document.createElement("h2");
    teamNameContainer.innerHTML = team.name;
    teamNameDiv.append(teamNameContainer);

    return teamNameDiv;
}