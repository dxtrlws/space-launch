var launchUrl = "https://launchlibrary.net/1.2/launch/next/100";

function getLaunchData(callBack) {
    $.getJSON(launchUrl, callBack);
}

function displayResults(data) {
    var scheduledLaunches = '';
    var unscheduledLaunches = '';

    // var launchDate = data.launches.net.

    $.each(data.launches, function (key, launch) {

        var launchDate = new Date(launch.net);
        var windowStart = new Date(launch.windowstart);
        var windowEnd = new Date(launch.windowend);
        if (launch.tbddate != 0) {
            unscheduledLaunches +=
                '<div class="card" ' +
                '<p><strong>' + launch.name + '</strong></p>' +
                '<p><strong>Launch Date: </strong> TBD</p>' +
                getLaunchMissions(launch) +

                '</div>';
        } else {


            scheduledLaunches += '' +
                '<div class="card" ' +
                '<p><strong>' + launch.name + '</strong></p>' +
                '<p><strong>Launch Date: </strong>' + launchDate.toDateString() + '</p>' +
                getLaunchMissions(launch) +
                '<p><strong>Launch Window: </strong><br>' +
                '<i>Window Start: </i>' + windowStart + '<br>' +
                '<i>Window End:</i>' + windowEnd + '</p>' +
                '</div>';
            // resultElement += Mustache.render(template, launch);
            console.log(launchDate);
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
