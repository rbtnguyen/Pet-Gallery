var menuButton = document.querySelector('.action-button-menu');
var sideNavigation = document.querySelector('.side-navigation');
var documentBody = document.querySelector('body');
var photoGallery = document.querySelector('.photo-gallery');
var photoOverlay = document.querySelector('.photo-overlay');
var photoOverlayImage = document.querySelector('.photo-overlay img');
var loadMoreButton = document.querySelector('.action-button-load');

function openMenu() {
    var menuOpen = document.querySelector('.menu-open');
    if (!menuOpen) {
        menuButton.classList.add('menu-open');
        sideNavigation.classList.add('open');

    } else {
        menuButton.classList.remove('menu-open');
        sideNavigation.classList.remove('open');

    }
}

function alignImages(alignment) {
    photoGallery.style.textAlign = alignment;
}

function openDogPhotoOverlay(imageSource, alternateText) {
    photoOverlayImage.setAttribute('src', imageSource);
    photoOverlayImage.setAttribute('alt', alternateText);

    photoOverlay.classList.add('active');
    documentBody.classList.add('stop-scrolling');
}

function closeDogPhotoOverlay() {
    photoOverlay.classList.remove('active');
    documentBody.classList.remove('stop-scrolling');

}

function addDogsToGallery(dogImages) {
    for (var i = 0; i < dogImages.length; i++) {
        var imageSrc = dogImages[i].image.substring(1);
        var petImage = document.createElement("div");
        petImage.className = 'pet-thumbnail-container';
        petImage.innerHTML = '<img class= "pet-thumbnail-image" src = "' + imageSrc + '" alt = "dog description placeholder" >';
        photoGallery.insertAdjacentElement("beforeend", petImage);
    }

}

function loadMoreDogs() {
    /*
    Mocking a GET request for more dog photos.
    I would typically use fetch, XMLHttpRequest or some equivalent
    to request more pictures of dogs from an endpoint that ideally
    accepts options such as how many images I would like the API to
    return and the ID of the last image I received so I can proceed
    in a logical fashion of requesting images w/o receiving duplicates.
    If this were a real request I would also parse the JSON and 
    validate the results.
    */
    var dogImageArray = DOG_REQUEST_RESULTS.dogs;
    if (dogImageArray && dogImageArray.length) {
        addDogsToGallery(dogImageArray);
    } else {
        loadMoreButton.remove();
    }

}

photoGallery.addEventListener('click', function (event) {
    // In the future check for srcset too
    if (event.target && event.target.src) {
        openDogPhotoOverlay(event.target.src, event.target.alt);
    }
});

photoOverlay.addEventListener('click', function (event) {
    closeDogPhotoOverlay();
});

