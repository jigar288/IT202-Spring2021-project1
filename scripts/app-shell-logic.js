function loadHomePage(){
    let currentLocation = document.location.pathname

    if(currentLocation == '/'){
        let homePage = document.querySelector('.home-tab')
        homePage.style.display = 'block'
    }
}

loadHomePage();


function hideAllElements(){
    const elements = document.querySelectorAll('.content');

    elements.forEach( (element) => {
        element.style.display = 'none'
    })    
}

function attachEventListener(){

    let navLinks = document.querySelectorAll('a');

    let link;
    for (link = 0; link < navLinks.length - 1; link++) {
        const tabElement = navLinks[link];

        tabElement.addEventListener('click', (event) => {
            hideAllElements();
            const tabName = event.target.getAttribute('tab-name');
            const tabContents = document.querySelector(`.${tabName}`);
            tabContents.style.display = 'block'
        })
    }

}

attachEventListener()


