var launchUrl = "https://launchlibrary.net/1.2/launch/next/50";


//get launch data from Launch Library
function getLaunchData(callBack) {
    $.getJSON(launchUrl, callBack);
}


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

        //check for video URL
        // if (thisLaunch.vidURLs.length) {          
        // } else {
        //     video = 'NA';
        // }

    
        $('.launches').append('<tr class="clickable-row"><td>' + thisLaunch.name + '</td>' +
            '<td>' + thisLaunch.launchDate + '</td>' +
            '<td>' + thisLaunch.agency + '</td>' +
            '</tr>'
        );

        $('.clickable-row').click( function(){
            // $('.modal').attr('id', thisLaunch.id);
           $('#myModalLabel').text(thisLaunch.name);
           $('.location').html('<a href="'+thisLaunch.URL+ ' ">' + thisLaunch.location + '</a>');
           $('.mission').html('<p>' + thisLaunch.missionName + '</p>' + '<p>'+ thisLaunch.missionDesc + '</p>');
           $('.webcast').html('<p><a href="' + thisLaunch.video + ' "> ' + thisLaunch.video + '</a></p>');
           $('.launchWindow').html('<p>' + thisLaunch.windowStart + '</p><p>' + thisLaunch.windowEnd+ '</p>');
           $('.launchImage').html('<img class="img-responsive"  src=" '+ thisLaunch.imageUrl + '">');
           $('#myModal').modal('show');
        });

        function showDetails () {
              $('#myModalLabel').text(thisLaunch.name);
           $('.location').html('<a href="'+thisLaunch.URL+ ' ">' + thisLaunch.location + '</a>');
           $('.mission').html('<p>' + thisLaunch.missionName + '</p>' + '<p>'+ thisLaunch.missionDesc + '</p>');
           $('.webcast').html('<p><a href="' + thisLaunch.video + ' "> ' + thisLaunch.video + '</a></p>');
           $('.launchWindow').html('<p>' + thisLaunch.windowStart + '</p><p>' + thisLaunch.windowEnd+ '</p>');
           $('.launchImage').html('<img class="img-responsive"  src=" '+ thisLaunch.imageUrl + '">');
           $('#myModal').modal('show');
        }
        

        //compile and append launch info
        // $('.launches').append('<tr > <td><a href="#" data-toggle="modal" data-target="#' + thisLaunch.id + '"> ' + thisLaunch.name + '</a></td>' +
        //     '<td>' + thisLaunch.launchDate + '</td>' +
        //     '<td>' + thisLaunch.agency + '</td>' +
        //     '</tr>'
        // );

        //modal formatting
        // $('.modalData').append('<div class="modal fade" id="' + thisLaunch.id + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
        //     '<div class="modal-dialog" role="document">' +
        //     '<div class="modal-content">' +
        //     '<div class="modal-header">' +
        //     '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        //     '<h4 class="modal-title" id="myModalLabel">' + thisLaunch.name + '</h4>' +
        //     '</div>' +
        //     '<div class="modal-body">' +

        //     '<div class="row">' +
        //     '<div class="col-sm-2">' +
        //     '<p><strong>Location:</strong> </p>' +
        //     '</div>' +
        //     '<div class="col-sm-10">' +
        //     '<a href="' + thisLaunch.locationURL + ' ">' +thisLaunch.location+ '</a>' +
        //     '</div>' +
        //     '</div>' +
        //     '<div class="row">' +
        //     '<div class="col-md-2">' +
        //     '<p><strong>Primary Mission:</strong></p>' +
        //     '</div>' +
        //     '<div class="col-md-10">' +
        //     '<p>' + thisLaunch.missionName + '</p>' + thisLaunch.missionDesc +'</p>' +
        //     '</div>' +

        //     '</div>' +
        //     '<div class="row">' +
        //     '<div class="col-md-2">' +
        //     '<p><strong>Webcast:</strong></p>' +
        //     '</div>' +
        //     '<div class="col-md-10">' +
        //     '<p><a href="' + thisLaunch.video + ' "> ' + thisLaunch.video + '</a></p>' +
        //     '</div>' +

        //     '</div>' +
        //     '<div class="row">' +
        //     '<div class="col-md-2">' +
        //     '<p><strong>Launch Window: </strong></p>' +
        //     '</div>' +
        //     '<div class="col-md-10">' +
        //     '<p>' + thisLaunch.windowStart + '</p>'+
        //     '<p>' + thisLaunch.windowEnd+ '</p>'+
        //     '</div>' +


        //     '</div>'   + //end row
        //     '<div class="row"> '+
        //     '<div class="col-md-2">' +
        //     '<p><strong>Image: </strong></p>' +
        //     '</div>' +
        //     '<div class="col-md-10">' +
        //     '<p> <img class="img-responsive"  src=" '+ thisLaunch.imageUrl + '">'  + '</p>'+

        //     '</div>' +
        //     '</div>'+ //end 






        //     '</div>' +
        //     '<div class="modal-footer">' +
        //     '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
        //     '</div>' +
        //     '</div>' +
        //     '</div>' +
        //     '</div>');


        //show details
        function showDetails () {

        }

    } // end for loop

} // end displayResults function


$(function () {

    getLaunchData(displayResults);
});
