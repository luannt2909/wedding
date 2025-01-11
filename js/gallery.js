const galleryImages = [
    'ANH_2364.jpg',
    'ANH_2376.jpg',
    'ANH_2437_1.jpg',
    'ANH_2448.jpg',
    'ANH_2506.jpg',
    'ANH_2515.jpg',
    'ANH_2566.jpg',
    'ANH_2616.jpg',
    'ANH_2620.jpg',
    'ANH_2622.jpg',
    'ANH_2627.jpg',
    'ANH_2633.jpg',
    'ANH_2637.jpg',
    'ANH_2646.jpg',
    'ANH_2676.jpg',
    'ANH_2697.jpg',
    'ANH_2703.jpg',
    'ANH_2871.jpg',
    'ANH_2955.jpg',
    'ANH_3001.jpg',
    'ANH_3007.jpg',
    'P1664406.JPG',
    'P1664408.JPG',
    'P1664420.JPG',
    'P1664437.JPG',
    'P1664457.JPG',
    'P1664503.JPG',
    'P1675006.JPG',
    'P1675011.JPG',
    'P1675030.JPG',
    'P1675040.JPG',
    'P1675063.JPG',
    'P1675089.JPG',
    'P1675095.JPG',
    'P1675129.JPG',
    'P1675155.JPG',
    'P1675171.JPG',
    'P1675179.JPG',
    'P1675186.JPG',
];
const IMAGES_PER_LOAD = 12;
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
    const initialImages = galleryImages.slice(0, INITIAL_IMAGES_COUNT);
    const galleryHTML = initialImages.map(createGalleryItem).join('');
    container.innerHTML = galleryHTML;
    currentLoadedIndex = INITIAL_IMAGES_COUNT;
    updateShowMoreButton();
}

function showMoreImages() {
    const container = document.getElementById('gallery-container');
    const nextImages = galleryImages.slice(currentLoadedIndex, currentLoadedIndex + IMAGES_PER_LOAD).map(createGalleryItem).join('');
    container.innerHTML += nextImages;
    currentLoadedIndex += IMAGES_PER_LOAD;
    updateShowMoreButton();
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