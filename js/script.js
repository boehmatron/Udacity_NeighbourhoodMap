/* PROJECT GOALS

1.  Write code required to add a full-screen map to your page using the Google Maps API.
      — DONE
2.  Write code required to add map markers identifying a number of locations your are interested in within this neighborhood.
      — DONE
3.  Implement the search bar functionality to search your map markers.
      - try it with jQuery autocomplete
4.  Implement a list view of the identified locations.
      - 
5.  Add additional functionality using third-party APIs when a map marker, search result, or list view entry is clicked 
    (ex. Yelp reviews, Wikipedia, StreetView/Flickr images, etc). If you need a refresher on making AJAX requests to third-party 
    servers, check out our Intro to AJAX course.



/* TODOs
- Knockout MVVM integrieren
*/

var mapOptions = {
    center: new google.maps.LatLng(47.391404, 8.515527),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 14
};     

var map = new google.maps.Map(document.getElementById("map"), mapOptions);
var input = document.getElementById('searchTextField');
var autocomplete = new google.maps.places.Autocomplete(input);

var myLocations = ko.observableArray([
    { name: "Name1", latlng: new google.maps.LatLng(47.391404, 8.515527) },
    { name: "Name2", latlng: new google.maps.LatLng(47.377805, 8.516814) },
    { name: "Name3", latlng: new google.maps.LatLng(47.382579, 8.505524) }
]);

ko.applyBindings(myLocations);

var initialize = function(){

  for(var i=0; i<myLocations().length; i++){
      var marker = new google.maps.Marker({
        position: myLocations()[i].latlng,
        map: map
      });

      attachInfoWindow(marker, i);
  }
}

google.maps.event.addDomListener(window, 'load', initialize);

// The five markers show a secret message when clicked but that message is not within the marker's instance data
function attachInfoWindow(marker, num) {

  var infowindow = new google.maps.InfoWindow({
    content: myLocations()[num].name
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(marker.get('map'), marker);
  });
}


console.log( myLocations().length );
