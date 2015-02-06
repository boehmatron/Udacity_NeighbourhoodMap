// DODO -- Knockout MVVM integrieren

var mapOptions = {
        center: new google.maps.LatLng(40.435833800555567, -78.44189453125),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 11
      };     

var map = new google.maps.Map(document.getElementById("map"), mapOptions);

var input = document.getElementById('searchTextField');

var autocomplete = new google.maps.places.Autocomplete(input);



var initialize = function(){

}


//Event Listeners
google.maps.event.addListener(marker, 'click', function() {
    map.setZoom(8);
    map.setCenter(marker.getPosition());
  });
}

google.maps.event.addDomListener(window, 'load', initialize);


console.log("test");