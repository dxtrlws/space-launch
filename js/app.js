var launchUrl = "https://launchlibrary.net/1.2/launch/next/50";


//get launch data from Launch Library
function getLaunchData(callBack) {
    $.getJSON(launchUrl, callBack);
}

//creates empty array to collect objects after each loop
var currentLaunches = [];

//call back to loop through the launch library api
function displayResults(data) {

    for (var i = 0; i < data.launches.length; i++) {
        
        //define variables from launch library data
        var thisLaunch = {};
        thisLaunch.agency = "";
        thisLaunch.id = data.launches[i].id;
        thisLaunch.launchDate = new Date(data.launches[i].net).toDateString();
        thisLaunch.name = data.launches[i].name;
        thisLaunch.missionDesc = "";
        thisLaunch.video = data.launches[i].vidURLs;
        thisLaunch.location = data.launches[i].location.pads[0].name;
        thisLaunch.locationURL = data.launches[i].location.pads[0].mapURL;
        thisLaunch.missionName = thisLaunch.name.split(" | ");
        thisLaunch.windowStart = data.launches[i].windowstart;
        thisLaunch.windowEnd = data.launches[i].windowend;
        thisLaunch.imageUrl = data.launches[i].rocket.imageURL;
        thisLaunch.rocket = thisLaunch.missionName[0].replace(/Full Thrust/g, 'FT');


        //checks for agencies
        if (data.launches[i].rocket.agencies.length) {
            thisLaunch.agency = data.launches[i].rocket.agencies[0].name;
        } else {
            thisLaunch.agency = 'NA';
        }

        //check missions
        if (data.launches[i].missions.length) {
            thisLaunch.missionDesc = data.launches[i].missions[0].description;
        } else {
            thisLaunch.missionDesc = 'NA';
        }

        //compiles and formats data and appends it to the table
        $('.launches').append("<tr class='clickable-row' onclick='showDetails(" + i + ")' ><td>" + thisLaunch.name + "</td>" +
            "<td>" + thisLaunch.launchDate + "</td>" +
            "<td>" + thisLaunch.agency + "</td>" +
            "</tr>"
        );

        //pushes the results of run throughh of the loop and adds it to the array
        currentLaunches.push(thisLaunch);

    } // end for loop



} // end displayResults function

//takes the data for each click of the row and displays it in modal
function showDetails(launchIndex) {
    var thisLaunch = currentLaunches[launchIndex];
    $('#myModalLabel').text(thisLaunch.name);
    $('.location').html('<a href="' + thisLaunch.URL + ' ">' + thisLaunch.location + '</a>');
    $('.mission').html('<p>' + thisLaunch.missionName + '</p>' + '<p>' + thisLaunch.missionDesc + '</p>');
    $('.webcast').html('<p><a href="' + thisLaunch.video + ' "> ' + thisLaunch.video + '</a></p>');
    $('.launchWindow').html('<p>' + thisLaunch.windowStart + '</p><p>' + thisLaunch.windowEnd + '</p>');
    $('.launchImage').html('<img class="img-responsive"  src=" ' + thisLaunch.imageUrl + '">');
    $('#myModal').modal('show');
}

$(function () {

    getLaunchData(displayResults);

});