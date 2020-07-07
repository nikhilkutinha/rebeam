const searchForm = document.querySelector('form');
const cardsSection = document.querySelector('.cards');

const roverMap = new Map([
    [ '1', 'curiosity' ],  
    [ '2', 'opportunity' ],
    [ '3', 'spirit' ] 
])

const cameraMap = new Map([
    [ '1', 'FHAZ' ],  
    [ '2', 'RHAZ' ],
    [ '3', 'MAST' ],
    [ '4', 'CHEMCAM' ],
    [ '5', 'MAHLI' ],
    [ '6', 'MARDI' ],
    [ '7', 'NAVCAM' ],
    [ '8', 'PANCAM' ],
    [ '9', 'MINITES' ]
])

window.onload = function() {
    searchForm.rover.value = '';
}

datepicker = $('#calender').datepicker({
    language: 'en',
    autoClose: true,
    dateFormat: "M d, yyyy"
}).data('datepicker');


// Optimizes the search form based on data retrived from manifest

const updateForm = (data) => {

    minDate = moment(data.landing_date, 'YYYY-MM-DD')
    maxDate = moment(data.max_date, 'YYYY-MM-DD')
    
    let cameraHTML = `<option value="" disabled selected>Select Camera</option>`;
    
    switch(rover) {
        case 'curiosity':
            cameras = ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"]
            break;

        case 'opportunity':
        case 'spirit':
            cameras = ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"]
            break;

    }

    datepicker.update({
        minDate: new Date(minDate.format('YYYY, MM, DD')),
        maxDate: new Date(maxDate.format('YYYY, MM, DD')),
    })

    cameraMap.forEach(
        (camera, key) => {
            if(cameras.includes(camera)) {   
                cameraHTML += `<option value="${key}">${camera}</option>`
        }
    });
    
    searchForm.camera.disabled = false
    searchForm.date.disabled = false
    searchForm.camera.innerHTML = cameraHTML
};


// Looks for changes in the search form

searchForm.rover.addEventListener('change', event => {

    datepicker.clear()

    searchForm.camera.value = "";
    searchForm.camera.disabled = true;
    searchForm.date.disabled = true;

    rover = roverMap.get(event.target.value);
    getManifest(rover)
        .then(data => updateForm(data))
        .catch(err => console.log(err));
});


// Updates the card when photos are passed into the function

const updateCards = photos => {
    let cardsHTML = ``

    if(photos.length == 0) {
        cardsHTML += `
        <div class='empty'>
            <div class="heading">Whatcha Lookin At Willis?</div><br>
            <div class="lead">Please select a different Date or Camera</div>
        <div>
        `
    } else {
        photos.forEach((photo, index) => {
            cardsHTML += `<div class="card">
            <div class="card-image">
                <a data-fancybox="gallery" href="${photo.img_src}">
                    <img src="${photo.img_src}" alt="">
                </a>
            </div>
            <div class="card-content">
                <p class="card-title font-weight-bold">
                    ${photo.camera.name}
                </p>
                <p class="card-info">
                    Sol ${photo.sol} / ${photo.earth_date}
                </p>
            </div>
            </div>`
        });
    }
    

    cardsSection.innerHTML = cardsHTML
};


// Triggered when the search button is pressed

searchForm.addEventListener('submit', event => {
    
    event.preventDefault();

    const rover = roverMap.get(searchForm.rover.value);
    const camera = cameraMap.get(searchForm.camera.value);
    let date = searchForm.date.value.trim();

    date = moment(date, "MMM D, YYYY").format('YYYY-MM-DD');

    cardsSection.innerHTML = `<div class="loading">
                                    <img src="./img/loading.svg" alt="">
                                </div>`;
    
    getPhotos(rover, camera, date)
        .then(data => updateCards(data))
        .catch(err => console.log(err));
});


// Latest photos will be displayed by default

cardsSection.innerHTML = `<div class="loading">
                                <img src="./img/loading.svg" alt="">
                          </div>`;
getLatestPhotos('curiosity')
    .then(data => updateCards(data))
    .catch(err => console.log(err))