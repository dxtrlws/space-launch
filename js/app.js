var launchUrl = "https://launchlibrary.net/1.2/launch/next/100";

function getLaunchData(callBack) {
    $.getJSON(launchUrl, callBack);
}

function displayResults(data) {
    var scheduledLaunches = '';
    var unscheduledLaunches = '';
    
    
    $.each(data.launches, function (key, launch) {
        debugger;
        if (launch.tbddate != 0) {
            unscheduledLaunches +=
                '<div class="card" ' +
                '<p><strong>' + launch.name + '</strong></p>' +
                '<p><strong>Launch Date: </strong> TBD</p>' +
                getLaunchMissions(launch) +
                '<p><strong>Launch Window: </strong> ' + launch.windowstart + ' - ' + launch.windowend + '</p>' +
                '</div>';
        } else {

            var launchDate = lauch.net.split(" ", 3);
            scheduledLaunches += '' +
                '<div class="card" ' +
                '<p><strong>' + launch.name + '</strong></p>' +
                '<p><strong>Launch Date: </strong>' + launchDate + '</p>' +
                getLaunchMissions(launch) +
                '<p><strong>Launch Window: </strong> ' + launch.windowstart + ' - ' + launch.windowend + '</p>' +
                '</div>';
            // resultElement += Mustache.render(template, launch);
        }
    });

    $('.scheduledLaunches').html(scheduledLaunches);
    $('.unscheduledLaunches').html(unscheduledLaunches);
}

function getLaunchMissions(launch) {
    var returnElement = '';
    $.each(launch.missions, function (key, mission) {
        if (mission != null && mission.length === 0) {
            return 'No missions were found';

        } else {
            returnElement += '<p><strong>Primary Mission </strong>' + mission.name + '<br>' + '<strong>Description </strong>' + mission.description + '</p>';

        }
    });
    return returnElement;

}



$(function () {

    getLaunchData(displayResults);
});