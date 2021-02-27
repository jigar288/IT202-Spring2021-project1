function cloneCard(dataElement){
    let cardReference = document.getElementsByClassName("card")
    let clonedCard = cardReference[0].cloneNode(true)

    clonedCard.getElementsByClassName("card-title")[0].innerText = `Community Area: ${dataElement.community_area_name}` 
    clonedCard.getElementsByClassName("card-subtitle")[0].innerText = `Address: ${dataElement.address}`

    let cardText = `Pin: ${dataElement.pin} \n Square Footage ${dataElement.sq_ft} \n Ward Number: ${dataElement.ward}`

    clonedCard.getElementsByClassName("card-text")[0].innerText = cardText

    let rowRef = document.getElementsByClassName("row")
    rowRef[0].appendChild(clonedCard)
}

function removePreviousCards(){
    let cardReference = document.getElementsByClassName("card")

    let i;
    for(i = 1; i < cardReference.length; i++){
        console.log('removing ' + i  )
        const card = cardReference[i]
        card.style.display = 'none'
    }
    
}

function renderListViewData(apiURL){
    
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(apiURL, requestOptions)
    .then(response => response.json())
    .then(result => {

        removePreviousCards()
        
        result.forEach(element => {
            console.log('cloning loop')
            cloneCard(element)
        });

        var cardReference = document.getElementsByClassName("card")
        cardReference[0].remove()      

    })
    .catch(error => 
        console.log('error', error)
    );        
    
}

let apiURL = 'https://data.cityofchicago.org/resource/aksk-kvfp.json';

renderListViewData(apiURL);

document.querySelector('#searchBtn').addEventListener('click', (event) => {
    event.preventDefault()
    const wardNumberInput = document.querySelector('input').value;
    const wardNumber = parseInt(wardNumberInput)
    const apiUrlWithWard = `https://data.cityofchicago.org/resource/aksk-kvfp.json?ward=${wardNumber}`;
    renderListViewData(apiUrlWithWard)

    hideAllElements();
    const tabContents = document.querySelector(`.data-tab`);
    tabContents.style.display = 'block'

})


