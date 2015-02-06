// DODO -- Knockout MVVM integrieren

var myLocations = ko.observableArray();
myLocations.push( new google.maps.LatLng(47.391404, 8.515527) );
myLocations.push( new google.maps.LatLng(47.377805, 8.516814) );
myLocations.push( new google.maps.LatLng(47.382579, 8.505524) );
myLocations.push( new google.maps.LatLng(47.389494, 8.526681) );


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
    	  position: myLocations()[i],
    	  map: map,
    	  title: 'Hello World!'
  		});
	}
}

google.maps.event.addDomListener(window, 'load', initialize);

console.log(myLocations().length);
