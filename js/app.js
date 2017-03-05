var launchUrl = "https://launchlibrary.net/1.2/launch/next/20";

function getLaunchData (callBack){
    $.getJSON(launchUrl, callBack);
}

function displayResults (data) {
    var resultElement = '';
    var template = $('.scheduledLaunches');

    $.each(data.launches, function(key, launch){
        resultElement +=
                '<div class="card"' +
                '<h3>' + launch.name + '</h3>' +
                '<p><strong>Launch Date</strong>' + launch.net + '</p>'+
                '<p><strong>Launch Window</strong> ' + launch.windowstart + ' - ' + launch.windowend +  '</p>' +
                '</div>';
        // resultElement += Mustache.render(template, launch);
    });
    $('.scheduledLaunches').html(resultElement);
}



$(function () {

    getLaunchData(displayResults);
});