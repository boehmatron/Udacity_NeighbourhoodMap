// MODEL
//----------------
var myLocations = ko.observableArray([
  {
    name: "Hiltl",
    street: "Sihlstrasse 24",
    zip: "8001",
    city: "Zürich",
    latlng: new google.maps.LatLng(47.373399, 8.536846),
    marker: null
  },
  {
    name: "Yooji's",
    street: "Bahnhofstr. 102",
    zip: "8001",
    city: "Zürich",
    latlng: new google.maps.LatLng(47.376298, 8.539732),
    marker: null
  },
  {
    name: "Rio",
    street: "Gessnerallee 17",
    zip: "8001",
    city: "Zürich",
    latlng: new google.maps.LatLng(47.376233, 8.535823),
    marker: null
  },
  {
    name: "Les Halles",
    street: "Pfingstweidstrasse 6",
    zip: "8005",
    city: "Zürich",
    latlng: new google.maps.LatLng(47.387894, 8.518514),
    marker: null
  },
  {
    name: "Sphères",
    street: "Hardturmstrasse 66",
    zip: "8005",
    city: "Zürich",
    latlng: new google.maps.LatLng(47.391919, 8.518687),
    marker: null
  },
  {
    name: "Rosso",
    street: "Geroldstrasse 31",
    zip: "8005",
    city: "Zürich",
    latlng: new google.maps.LatLng(47.385513, 8.518312),
    marker: null
  }
  ]
);

var initialize = function(){

// GOOGLE MAP
//----------------
var mapOptions = {};
var map = new google.maps.Map(document.getElementById('map'), mapOptions);
var bounds = new google.maps.LatLngBounds();
var input = document.getElementById('searchTextField');
var autocomplete = new google.maps.places.Autocomplete(input);
var INFO_WINDOW = new google.maps.InfoWindow();
var marker, i;
// draw marker on map and attach infoWindow with corresponding information
// from myLocations() Array

for (i = 0; i < myLocations().length; i++) {

  marker = new google.maps.Marker({
    position: myLocations()[i].latlng,
    map: map
  });

  //extend the bounds to include each marker's position
  bounds.extend(marker.position);

  // Save this marker for later use 
  myLocations()[i].marker = marker;

  google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {

      var name = myLocations()[i].name;
      var street = myLocations()[i].street;
      var city = myLocations()[i].city;
      var address = street + "," + city;
      var streetviewURL = "http://maps.googleapis.com/maps/api/streetview?size=200x150&location=" + address + "";
      var infoWindowContent = "<div class='popup'><h1>" + myLocations()[i].name + "</h1><img src='" + streetviewURL + "'><div class='wikiLinks'></div></div>";

      // open infoWindow
      INFO_WINDOW.setContent(infoWindowContent);
      INFO_WINDOW.open(map, marker);

      // add animation
      bounceMarker(marker);
      // center map to marker
      map.setCenter(marker.getPosition());        

    };
  })(marker, i));

}

//fit the map to bounds
map.fitBounds(bounds);
autocomplete.bindTo('bounds', map);

}

google.maps.event.addDomListener(window, 'load', initialize);

// Animation for selected marker
function bounceMarker(marker) {
  if (marker.getAnimation() != null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ 
          marker.setAnimation(null); 
        }, 750);
    }
}

showListElement = function(event, location){
  google.maps.event.trigger(location.marker,'click');
};

// VIEW MODEL
//----------------
function ViewModel() {

}

ko.applyBindings( new ViewModel() );