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



var myLocations = ko.observableArray([
    { name: "Name1", latlng: new google.maps.LatLng(47.391404, 8.515527) },
    { name: "Name2", latlng: new google.maps.LatLng(47.377805, 8.516814) },
    { name: "Name3", latlng: new google.maps.LatLng(47.382579, 8.505524) }
]);

var mapOptions = {
    center: new google.maps.LatLng(47.391404, 8.515527),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 14
};     

var map = new google.maps.Map(document.getElementById("map"), mapOptions);

var input = document.getElementById('searchTextField');

var autocomplete = new google.maps.places.Autocomplete(input);


var initialize = function(){

	for(var i=0; i<myLocations().length; i++){
	  	var marker = new google.maps.Marker({
    	  position: myLocations()[i].latlng,
    	  map: map
  		});

	  	google.maps.event.addListener(marker, 'click', function() {
    		infowindow.open(map,marker);
  		});
	}
}


google.maps.event.addDomListener(window, 'load', initialize);

console.log(myLocations().length);

// infoWindow
  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });


