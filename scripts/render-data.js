function cloneCard(dataElement){
    var cardReference = document.getElementsByClassName("card")
    
    var clonedCard = cardReference[0].cloneNode(true)
    clonedCard.getElementsByClassName("card-title")[0].innerText = `Community Area: ${dataElement.community_area_name}` 
    clonedCard.getElementsByClassName("card-subtitle")[0].innerText = `Address: ${dataElement.address}`

    let cardText = dataElement.pin;

    clonedCard.getElementsByClassName("card-text")[0].innerText = `Pin: ${cardText}`

    var rowRef = document.getElementsByClassName("row")
    rowRef[0].appendChild(clonedCard)
}

function renderLibraryData(apiURL){
    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(apiURL, requestOptions)
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            cloneCard(element)
        });

        var cardReference = document.getElementsByClassName("card")
        cardReference[0].style.display = "none"
    })
    .catch(error => console.log('error', error));        
    
}

var apiURL = "https://data.cityofchicago.org/resource/aksk-kvfp.json";

renderLibraryData(apiURL);




