let map;

const initialMapZoomCoordinates = { lat: 41.789722, lng: -87.599724 }

function createMaker(coordinates){
  new google.maps.Marker({
    position: coordinates,
    map,
    title: "Chicago Owned Land!",
  }); 
}

function renderLibraryData(apiURL){
    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(apiURL, requestOptions)
    .then(response => response.json())
    .then(result => {

        let i;
        for (i = 0; i < result.length ; i++) {
            const currentProperty = result[i]

            if(currentProperty.location.latitude == undefined || currentProperty.location.longitude == undefined)
                continue            

            // casting from string values to floats
            const latitude = parseFloat(currentProperty.location.latitude)
            const longitude = parseFloat(currentProperty.location.longitude)   

            const locationCoordinates = { lat: latitude, lng: longitude }
            createMaker(locationCoordinates)
        }

    
    })
    .catch(error => console.log('error', error));        
    
}


function initMap() {

  //create initial map
  map = new google.maps.Map(document.getElementById("map"), {
    center: initialMapZoomCoordinates,
    zoom: 11,
  });

  var apiURL = "https://data.cityofchicago.org/resource/aksk-kvfp.json";

  renderLibraryData(apiURL);
  
  

}