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
  }
  ] // End array
);


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
    autocomplete.bindTo('bounds', map);


var INFO_WINDOW = new google.maps.InfoWindow();


// draw marker on map and attach infoWindow with corresponding information
// from myLocations() Array
var marker, i;

for (i = 0; i < myLocations().length; i++) {

  marker = new google.maps.Marker({
    position: myLocations()[i].latlng,
    map: map
  });

  /* Save this marker for later use */
  myLocations()[i].marker = marker;

  /* Recommend you create a new function that gets the new wikipedia article */
  /* Changed i to something more descriptive and meaningful such as location_index */
  google.maps.event.addListener(marker, 'click', (function(marker, location_index) {
    return function() {

      bounceMarker(marker);

      var name = myLocations()[location_index].name;
      var street = myLocations()[location_index].street;
      var city = myLocations()[location_index].city;
      var address = street + "," + city;
      var streetviewURL = "http://maps.googleapis.com/maps/api/streetview?size=200x150&location=" + address + "";

// Wikipedia search
      var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + name + ' ' + city +'&format=json&callback=wikiCallback';

      $.ajax({
        url: wikiURL,
        dataType: "jsonp",
        success: function(response) {

          var articleList = response[1];

          for (var i = 0; i < 1; i++){
            articleStr = articleList[i];
            var url = 'http://en.wikipedia.org/wiki/' + articleStr;
            $('.wikiLinks').append('<li><a href="' + url + '">' + articleStr + '</a></li>');
          }

          var infoWindowContent = "<div class='popup'><h1>" + myLocations()[location_index].name + "</h1><img src='" + streetviewURL + "'><div class='wikiLinks'></div></div>";

          INFO_WINDOW.setContent(infoWindowContent);
          INFO_WINDOW.open(map, marker);
        },
        error: function() {
          console.log("error");
          /* Make sure we let the user know if there is something wrong with getting data from Wikipedia */
        }
      });

      /* Remember that we need to wait for the Wikipedia article to load so we can then create our Info Window 
         Therefore we need to create the content string once everything has been loaded under the success function in our AJAX call
      */

    };
  })(marker, i));

}

var initialize = function(){

}

// Animation for selected marker
function bounceMarker(marker) {
  if (marker.getAnimation() != null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ marker.setAnimation(null); }, 750);
    }
}

google.maps.event.addDomListener(window, 'load', initialize);

showListElement = function(event, location){

  console.log(location.name);

  google.maps.event.trigger(location.marker,'click');

};

// VIEW MODEL
//----------------
function ViewModel() {
  var self = this;
  var inputName = ko.observable(input);
}

ko.applyBindings( new ViewModel() );