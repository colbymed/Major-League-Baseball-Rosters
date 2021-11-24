$("#years").on("change", getTeams);

$('#teams').css("display", "none");
$('#button').css("display", "none");

async function getTeams() {
    let year = $("#years").val();
    if (year != -1) {
        let url = `https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='${year}'&team_all_season.col_in=name_display_full&team_all_season.col_in=team_id`;
        let data = await fetchData(url);

        $("#teams").html(`<option value='-1'> Select a Team </option>`);
        for (i = 0; i < data.team_all_season.queryResults.row.length; i++) {
            let teamID = data.team_all_season.queryResults.row[i].team_id;
            let teamName = data.team_all_season.queryResults.row[i].name_display_full;
            $("#teams").append(`<option value="${teamID}"> ${teamName} </option>`);
        }
        $('#teams').css("display", "block");
        $('#button').css("display", "block");
    }
    else {
        $('#teams').css("display", "none");
        $('#button').css("display", "none");
    }
}
async function fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}