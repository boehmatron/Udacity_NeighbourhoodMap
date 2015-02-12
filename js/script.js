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
- Model mit Locations definieren
- View Model aufsetzen
- html Liste erstellen mit den Locations aus dem Model
- Locations aus der Liste Klickbar machen udn unterschiedliche Nachricht anzeigen
- google maps anzeigen
- location marker aus den model auf der karte anzeigen
- show window auf pins implementieren
- show window auf click bei listen elementen implementierne
- suchergebnisse aus dem textfeld nach markern filtern

*/

// MODEL
//----------------
var myLocations = ko.observableArray([
  {
    name: "Name1",
    street: "Hardturmstrasse 3",
    city: "Zürich",
    latlng: new google.maps.LatLng(47.391404, 8.515527) },
  { 
    name: "Name2",
    street: "Bahnhofstr. 10",
    city: "Zürich", 
    latlng: new google.maps.LatLng(47.377805, 8.516814) },
  { 
    name: "Name3",
    street: "Badenerstrasse 234",
    city: "Zürich", 
    latlng: new google.maps.LatLng(47.382579, 8.505524) }
]);

ko.applyBindings(myLocations);

/////////////////////////



/////////////////////////



// VIEW MODEL
//----------------
function ViewModel() {
  var self = this;

  //aktuell geklickter Pin
  this.currentPOI = ko.observable(0);
  //input vom textfield
  this.input = ko.observable( document.getElementById('searchTextField') );
  // define google map

  //populate locations as markers

  //populate locations as hmtl list elements

  //show infoWindow
  this.showInfoWindow = function(){

  }

}

// Activates knockout.js
ko.applyBindings( new ViewModel() );




