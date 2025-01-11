const galleryImages = [
    'ANH_1829.jpg',
    'ANH_1868.jpg',
    'ANH_1918.jpg',
    'ANH_1934.jpg',
    'ANH_2703.jpg',
    'ANH_1990.jpg',
    'ANH_2347.jpg',
    'ANH_2437.jpg',
    'ANH_2703.jpg',
    'ANH_3007.jpg',
    'ANH_2871.jpg',
    'ANH_2955.jpg',
    'ANH_1829.jpg',
    'ANH_1868.jpg',
    'ANH_1918.jpg',
    'ANH_1934.jpg',
    'ANH_2703.jpg',
    'ANH_1990.jpg',
    'ANH_2347.jpg',
    'ANH_2437.jpg',
    'ANH_2703.jpg',
    'ANH_3007.jpg',
    'ANH_2871.jpg',
    'ANH_2955.jpg',
    'ANH_1829.jpg',
    'ANH_1868.jpg',
    'ANH_1918.jpg',
    'ANH_1934.jpg',
    'ANH_2703.jpg',
    'ANH_1990.jpg',
    'ANH_2347.jpg',
    'ANH_2437.jpg',
    'ANH_2703.jpg',
    'ANH_3007.jpg',
    'ANH_2871.jpg',
    'ANH_2955.jpg'
];
const IMAGES_PER_LOAD = Math.ceil(galleryImages.length / 3); // Split images into 3 parts
let currentLoadedIndex = 0;

function createGalleryItem(imageName) {
    return `
        <div class="gallery-item" data-animate-effect="fadeIn">
            <a href="images/gallery/${imageName}" class="gallery-popup">
                <img src="images/gallery/${imageName}" alt="Gallery Image">
            </a>
        </div>
    `;
}

const INITIAL_IMAGES_COUNT = 12; // Show first 12 images initially

function initializeGallery() {
    const container = document.getElementById('gallery-container');
    const initialImages = galleryImages.slice(0, IMAGES_PER_LOAD);
    const galleryHTML = initialImages.map(createGalleryItem).join('');
    container.innerHTML = galleryHTML;
    currentLoadedIndex = IMAGES_PER_LOAD;
    updateShowMoreButton();
}

function showMoreImages() {
    const container = document.getElementById('gallery-container');
    const nextImages = galleryImages.slice(currentLoadedIndex, currentLoadedIndex + IMAGES_PER_LOAD).map(createGalleryItem).join('');
    container.innerHTML += nextImages;
    currentLoadedIndex += IMAGES_PER_LOAD;
    updateShowMoreButton();
    // Hide the "Show More" button after showing all images
    // document.getElementById('showMoreBtn').style.display = 'none';
}
function updateShowMoreButton() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    if (currentLoadedIndex >= galleryImages.length) {
        showMoreBtn.style.display = 'none';
    }
}
// Add click handler to "Show More" button
document.getElementById('showMoreBtn').addEventListener('click', showMoreImages); 
document.addEventListener('DOMContentLoaded', initializeGallery);