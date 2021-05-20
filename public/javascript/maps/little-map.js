
    if(document.getElementById('map') !== null) {

        // The location of Uluru
        var uluru = {
          lat: Number(document.getElementById('map').dataset.lat),
          lng: Number(document.getElementById('map').dataset.lng)
        };
        // The map, centered at Uluru
        var map = new google.maps.Map(
          document.getElementById('map'), {
            zoom: 4,
            center: uluru
          });
        // The marker, positioned at Uluru
        var marker = new google.maps.Marker({
          position: uluru,
          map: map,
        });
    }
  
