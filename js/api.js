const apikey = 'LLHHzP5rFGmRNN0PuPC5iRqhJqVBA6FN43mud1tz';

const getPhotos = async (rover, camera, date) => {
    const base = 'https://api.nasa.gov/mars-photos/api/v1/rovers/';
    const query = `${rover}/photos?api_key=${apikey}&earth_date=${date}&camera=${camera}`;

    response = await fetch(base + query)
    const data = await response.json();

    return data.photos
};

const getManifest = async (rover) => {
    const base = 'https://api.nasa.gov/mars-photos/api/v1/manifests/';
    const query = `${rover}?api_key=${apikey}`

    response = await fetch(base + query)
    const data = await response.json();

    return data.photo_manifest
};

const getLatestPhotos = async (rover) => {
    const base = 'https://api.nasa.gov/mars-photos/api/v1/rovers/';
    const query = `${rover}/latest_photos?api_key=${apikey}`;

    response = await fetch(base + query);
    const data = await response.json();

    return data.latest_photos
};