var launchUrl = "https://launchlibrary.net/1.2/launch/next/15";


//get launch data from Launch Library
function getLaunchData(callBack) {
    $.getJSON(launchUrl, callBack);
}


function displayResults(data) {
    for (var i = 0; i < data.launches.length; i++) {
        //define variables from launch library data
        var agency,
            id = data.launches[i].id,
            launchDate = new Date(data.launches[i].net).toDateString(),
            name = data.launches[i].name,
            missionDesc ,
            video = data.launches[i].vidURLs,
            location = data.launches[i].location.pads[0].name,
            locationURL = data.launches[i].location.pads[0].mapURL,
            missionName = name.split(" | "),
            windowStart = data.launches[i].windowstart,
            windowEnd = data.launches[i].windowend,
            imageUrl = data.launches[i].rocket.imageURL,
            rocket = missionName[0].replace(/Full Thrust/g, 'FT');


        //checks for agencies
        if (data.launches[i].rocket.agencies.length) {
            agency = data.launches[i].rocket.agencies[0].name;
        } else {
            agency = 'NA';
        }

        //check missions
        if (data.launches[i].missions.length) {
            missionDesc =  data.launches[i].missions[0].description;
        } else {
            missionDesc = 'NA';
        }

        //check for video URL
        if (data.launches[i].vidURLs) {
            video = data.launches[i].vidURLs;
        } else {
            video= 'NA';
        }

        //compile and append launch info
        $('.launches').append('<tr> <td><a href="#" data-toggle="modal" data-target="#' + id + '"> ' + name + '</a></td>' +
            '<td>' + launchDate + '</td>' +
            '<td>' + agency + '</td>' +
            '</tr>'
        );

        //modal formatting
        $('.modalData').append('<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<h4 class="modal-title" id="myModalLabel">' + name + '</h4>' +
            '</div>' +
            '<div class="modal-body">' +

            '<div class="row">' +
            '<div class="col-sm-2">' +
            '<p><strong>Location:</strong> </p>' +
            '</div>' +
            '<div class="col-sm-10">' +
            '<a href="' + locationURL + ' ">' +location+ '</a>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-md-2">' +
            '<p><strong>Primary Mission:</strong></p>' +
            '</div>' +
            '<div class="col-md-10">' +
            '<p>' + missionName + '</p>' + missionDesc +'</p>' +
            '</div>' +

            '</div>' +
            '<div class="row">' +
            '<div class="col-md-2">' +
            '<p><strong>Webcast:</strong></p>' +
            '</div>' +
            '<div class="col-md-10">' +
            '<p><a href="' + video + ' "> ' + video + '</a></p>' +
            '</div>' +

            '</div>' +
            '<div class="row">' +
            '<div class="col-md-2">' +
            '<p><strong>Launch Window: </strong></p>' +
            '</div>' +
            '<div class="col-md-10">' +
            '<p>' + windowStart + '</p>'+
            '<p>' + windowEnd+ '</p>'+
            '</div>' +


            '</div>'   + //end row
            '<div class="row"> '+
            '<div class="col-md-2">' +
            '<p><strong>Image: </strong></p>' +
            '</div>' +
            '<div class="col-md-10">' +
            '<p> <img class="img-responsive"  src=" '+ imageUrl + '">'  + '</p>'+

            '</div>' +
            '</div>'+ //end row






            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>');

    } // end for loop

} // end displayResults function


$(function () {

    getLaunchData(displayResults);
});
