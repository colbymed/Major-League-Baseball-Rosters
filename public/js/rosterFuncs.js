$("a").on("click", displayPlayerStats);
async function displayPlayerStats() {
    var myModal = new bootstrap.Modal(document.getElementById('authorModal'));

    let playerID = $(this).attr("id");
    let bioURL = `https://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='${playerID}'`;
    let data = await fetchData(bioURL);
    let bioData = data.player_info.queryResults.row;
    console.log(bioData);
    $(".modal-title").html(bioData.name_display_first_last);
    $("#playerInfo").html(`Age: ${bioData.age} Years Old<br>`);
    let dateNums = bioData.birth_date.substring(0,10).split('-');
    $("#playerInfo").append(`Born: ${betterDateString(bioData.birth_date)}`);
    $("#playerInfo").append(`in ${bioData.birth_city}, ${bioData.birth_state}, ${bioData.birth_country}<br>`);
    $("#playerInfo").append(`Debut: ${betterDateString(bioData.pro_debut_date)}<br>`)
    $("#playerInfo").append(`Active: ${bioData.active_sw == "Y" ? "Yes" : "No"}<br>`);
    if (bioData.active_sw == "N") {
        $("#playerInfo").append(`Final Game: ${betterDateString(bioData.end_date)}<br>`);
    }
    if (bioData.high_school != "") {
        $("#playerInfo").append(`High School: ${bioData.high_school}<br>`);
    }
    if (bioData.college != "") {
        $("#playerInfo").append(`College: ${bioData.college}<br>`);
    }
    if (bioData.primary_stat_type == "pitching") {
        fillPitchingData();
    }
    else {
        fillHittingData();
    }
    myModal.show();
}
async function fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
const months = {
    '01' : "January",
    '02' : "February",
    '03' : "March",
    '04' : "April",
    '05' : "May",
    '06' : "June",
    '07' : "July",
    '08' : "August",
    '09' : "September",
    '10' : "October",
    '11' : "November",
    '12' : "December"
};
function betterDateString(s) {
    if (s.length == 0) {
        return "";
    }
    else {
        s = s.substring(0,10).split('-');
        output = "";
        output += months[s[1]] + " " + parseInt(s[2]) + ", " + s[0] + " ";
        return output;
    }
}
async function fillHittingData() {
    let url = ``;
}
async function fillPitchingData() {
    let url = ``;
}