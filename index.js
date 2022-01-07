const express = require('express');
const app = express();
const fetch = require('node-fetch');
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
    let url = `http://lookup-service-prod.mlb.com/json/named.leader_pitching_repeater.bam?sport_code='mlb'&results=1&game_type='R'&season='${new Date().getFullYear()}'&sort_column='era'&leader_pitching_repeater.col_in=era`;
    let stat = await fetchData(url);
    let currentSeasonStarted = stat.leader_pitching_repeater.leader_pitching_mux.queryResults.totalSize > 0;

    res.render('home', {'currentSeasonStarted': currentSeasonStarted});
});
app.get('/team/info', async (req, res) => {
    let teamID = req.query.teamID;
    let year = req.query.year;
    let teamURL = `https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='${year}'&team_all_season.col_in=name_display_full&team_all_season.col_in=team_id`;
    let teamData = await fetchData(teamURL);
    teamData = teamData.team_all_season.queryResults.row;
    let teamName = "";
    for (i = 0; i < teamData.length; i++) {
        if (teamData[i].team_id == teamID) {
            teamName = teamData[i].name_display_full;
        }
    }
    let url = `https://lookup-service-prod.mlb.com/json/named.roster_team_alltime.bam?start_season='${year}'&end_season='${year}'&team_id='${teamID}'`;
    let rows = await fetchData(url);

    if (typeof rows.roster_team_alltime.queryResults.row == "undefined") {
        res.redirect('/');
    }
    else {
        //console.log(rows.roster_team_alltime.queryResults.row[0]);
        res.render('roster', { "players": rows.roster_team_alltime.queryResults.row, "year": year, "teamName": teamName });
    }
});
app.listen(3000, () => {
    console.log('server started');
});
async function fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}