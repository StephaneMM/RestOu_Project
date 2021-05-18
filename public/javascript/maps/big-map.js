console.log("BIGMAP")
let restaurants = document.querySelectorAll(".card-restaurant")
let locations = []

restaurants.forEach((restou) => {

    let singleRestou = [restou.dataset.name, restou.dataset.coordinates.split(",")].flat()
   



    locations.push(singleRestou)
})


var map = new google.maps.Map(document.getElementById('big-map'), {
    zoom: 5,
    center: new google.maps.LatLng(48.8518094, 2.3541315),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for (i = 0; i < locations.length; i++) {  
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }