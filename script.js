// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }  
}

// check if all images were loaded
function imageLoaded() {
  console.log("image loaded");
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}


// create Elements for links & photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // create <a></a> to link to unplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // put img inside <a></a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item); 
  });
}

const  imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready =false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// UnsplashAPI
const count = 30;
const apiKey = 'ab00IubGDB4L5oTSVVc1Hh2jmwC15Iwqh-T4-qv91HY';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;



// Get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
  console.log("scrolled");
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    getPhotos();
ready = false;
  }
});


// on load
getPhotos();