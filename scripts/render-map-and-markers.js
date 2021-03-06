let map;

const initialMapViewCoordinates = { lat: 41.789722, lng: -87.599724 }

function createMaker(coordinates, infoWindowContent, map){
  
  const marker = new google.maps.Marker({
    position: coordinates,
    map,
    title: "Chicago Owned Land!",
  }); 

  const infoWindow = new google.maps.InfoWindow({
    content: infoWindowContent,
  });

  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });

}

function renderLandData(apiURL, map){
    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    console.log('in ')

    fetch(apiURL, requestOptions)
    .then(response => response.json())
    .then(result => {


        let i;
        for (i = 0; i < result.length ; i++) {
            const currentProperty = result[i]

            const infoWindowContent = `<p>community_area_name: ${currentProperty.community_area_name}</p>
                                       <p>address: ${currentProperty.address}</p>
                                       <p>squareFootage: ${currentProperty.sq_ft}</p>
                                       <p>pin: ${currentProperty.pin}</p>`

            if( currentProperty.location == undefined || currentProperty.location.latitude == undefined || currentProperty.location.longitude == undefined )
                continue            

            // casting from string values to floats
            const latitude = parseFloat(currentProperty.location.latitude)
            const longitude = parseFloat(currentProperty.location.longitude)   

            const locationCoordinates = { lat: latitude, lng: longitude }
            createMaker(locationCoordinates, infoWindowContent, map)
        }

    
    })
    .catch(error => console.log('error', error));        
    
}


function initMap() {

  console.info('calling init map')

  //create initial map
  map = new google.maps.Map(document.getElementById("map"), {
    center: initialMapViewCoordinates,
    zoom: 11,
  });

  var apiURL = "https://data.cityofchicago.org/resource/aksk-kvfp.json";

  renderLandData(apiURL, map);
  
  

}