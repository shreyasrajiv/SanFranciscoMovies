// callback function for Map API
function initMap(address, zoom) {

    // default address and zoom
    if (typeof address === "undefined" || address === null){
      address = "San Francisco";
    }
    if (typeof zoom === "undefined" || zoom === null){
      zoom = 12;
    }

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: zoom
    });

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        }
    });
}

// function for search textbox autocomplete feature
(function () {
    var availableTags = [],
        i,
        j,
        len = response.data.length;

    for (i = 0; i<len; i++) {
      availableTags.push(response.data[i][8]);

      // delete duplicate entries
      if (i > 0 && response.data[i][8] === response.data[i-1][8]) {
          availableTags.pop();
      }
    }

    $("#search").autocomplete({
      source: function(request, response) {
          var results = $.ui.autocomplete.filter(availableTags, request.term);
          response(results.slice(0, 10));
      }
    });
})();

// function to search selected movie details
function selectMovie () {
    var address = "",
        filmName = $("#search").val();

    for (var i = 0; i<response.data.length; i++) {

      if (response.data[i][8] === filmName) {
          address = response.data[i][10];
          break;
      }
    }

    // load map with film address and zoom value
    initMap(address, 14);

    // get other details regarding the film
    var title = response.data[i][8] === null ? "N/A" : response.data[i][8];
    var year = response.data[i][9] === null ? "N/A" : response.data[i][9];
    var actor1 = response.data[i][16] === null ? "N/A" : response.data[i][16];
    var actor2 = response.data[i][17] === null ? "N/A" : response.data[i][17];
    var director = response.data[i][17] === null ? "N/A" : response.data[i][14];    
    var production = response.data[i][12] === null ? "N/A" : response.data[i][12];
    var location = response.data[i][10] === null ? "N/A" : response.data[i][10];
    var facts = response.data[i][11] === null ? "N/A" : response.data[i][11];

    // update film description
    $("#movieDetails").html(
      '<ul class="list-group">'+
          '<li class="list-group-item"><b>Title:</b> '+ title +'</li>'+
          '<li class="list-group-item"><b>Year:</b> '+ year +'</li>'+
          '<li class="list-group-item"><b>Actor 1:</b> '+ actor1 +'</li>'+
          '<li class="list-group-item"><b>Actor 2:</b> '+ actor2 +'</li>'+   
          '<li class="list-group-item"><b>Director:</b> '+ director +'</li>'+          
          '<li class="list-group-item"><b>Production:</b> '+ production +'</li>'+
          '<li class="list-group-item"><b>Location:</b> '+ location +'</li>'+
          '<li class="list-group-item"><b>Fun facts:</b> '+ facts +'</li>'+  
      '</ul>');
}

// function for binding on-change event listener
(function () {
    var input = document.getElementById('search');
    input.addEventListener('change', function()
    {
        selectMovie();
    });
})();