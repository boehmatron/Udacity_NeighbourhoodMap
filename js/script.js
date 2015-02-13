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
    name: "Hiltl",
    street: "Sihlstrasse 24",
    zip: "8001",
    city: "Zürich",
    latlng: new google.maps.LatLng(47.373399, 8.536846) },
  { 
    name: "Yooji's",
    street: "Bahnhofstr. 102",
    zip: "8001",
    city: "Zürich", 
    latlng: new google.maps.LatLng(47.376298, 8.539732) },
  { 
    name: "Rio",
    street: "Gessnerallee 17",
    zip: "8001",    
    city: "Zürich", 
    latlng: new google.maps.LatLng(47.376233, 8.535823) }
]);



// GOOGLE MAP
//----------------
var startingPoint = new google.maps.LatLng(47.368620, 8.538775);
var mapOptions = {
    center: startingPoint,
    zoom: 14
};

var map = new google.maps.Map(document.getElementById('map'), mapOptions);

var input = document.getElementById('searchTextField');
var autocomplete = new google.maps.places.Autocomplete(input);


// draw marker on map and attach infoWindow with corresponding information 
// from myLocations() Array
var marker, i;

for (i = 0; i < myLocations().length; i++) {  
  marker = new google.maps.Marker({
    position: myLocations()[i].latlng,
    map: map
  });

  google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      var name = myLocations()[i].name;
      var street = myLocations()[i].street;
      var city = myLocations()[i].city;
      var address = street + "," + city;
      var streetviewURL = "http://maps.googleapis.com/maps/api/streetview?size=200x150&location=" + address + "";

// Wikipedia search
      var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + name + ' ' + city +'&format=json&callback=wikiCallback'; 

      $.ajax({
        url: wikiURL,
        dataType: "jsonp",
        success: function(response){
            
          var articleList = response[1];

          for (var i = 0; i < 1; i++){
            articleStr = articleList[i];
            var url = 'http://en.wikipedia.org/wiki/' + articleStr;
            $('.wikiLinks').append('<li><a href="' + url + '">' + articleStr + '</a></li>');
          }
      }
    });

// Yelp search
/*
  var yelpConsumerKey = "-7YvC2J88bRwvoQ9xFPw7Q";
  var yelpConsumerSecret = "C8lVVq_73NHu5HUyCXWeZ_iZx8Q";
  var yelpToken = "p-YWs-DhLU3-sWFzKBhTkEpUxfWpy0j3";
  var yelpSecret = "BgjRpzZ4NJYfmLfTukCwPfvVok0";

  var yelpURL = "http://api.yelp.com/v2/search?term=german+food&location=Hayes&cll=37.77493,-122.419415";
  console.log(yelpURL);
  $.ajay({
    url: yelpURL,
    dataType: "jsonp",
    success : function(respone){

    }
  });
*/

      var infoWindowContent = "<div class='popup'><h1>" + myLocations()[i].name + "</h1><img src='" + streetviewURL + "'><div class='wikiLinks'></div></div>";
      var infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
      }); 

      infoWindow.open(map, marker);
    }
  })(marker, i));
}

showListElement = function(){
    console.log("test");
    infoWindow.open(map, marker);
  }

// VIEW MODEL
//----------------
function ViewModel() {
  var self = this;

  //aktuell geklickter Pin
  //this.currentPOI = ko.observable(0);
  var inputName = ko.observable(input);







}

ko.applyBindings( new ViewModel() );




