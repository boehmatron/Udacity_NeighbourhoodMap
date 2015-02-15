// MODEL
//----------------
var myLocations = ko.observableArray([
  {
    name: "Hiltl",
    street: "Sihlstrasse 24",
    zip: "8001",
    city: "Zürich",
    latlng: new google.maps.LatLng(47.373399, 8.536846),
    showItem: function(event, marker){
      infoWindow.open(map, marker);
    } },
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

      var infoWindowContent = "<div class='popup'><h1>" + myLocations()[i].name + "</h1><img src='" + streetviewURL + "'><div class='wikiLinks'></div></div>";
      var infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
      }); 

      infoWindow.open(map, marker);
    }
  })(marker, i));
}

showListElement = function(event, marker){
    console.log(event, marker, map);

  }

// VIEW MODEL
//----------------
function ViewModel() {
  var self = this;
  var inputName = ko.observable(input);
}

ko.applyBindings( new ViewModel() );