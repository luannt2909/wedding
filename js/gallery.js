const remoteGalleryImages = [
    'https://cms.luciango.com/uploads/ANH_2646_9161be29d2.jpg',
    'https://cms.luciango.com/uploads/ANH_1602_4fb5443341.jpg',
    'https://cms.luciango.com/uploads/ANH_2697_05374d554c.jpg',
    'https://cms.luciango.com/uploads/ANH_1868_b96be9f332.jpg',
    'https://cms.luciango.com/uploads/ANH_2506_b13b7e6fba.jpg',
    'https://cms.luciango.com/uploads/ANH_1829_5062c52dc6.jpg',
    'https://cms.luciango.com/uploads/ANH_2676_bf3a9d79cc.jpg',
    'https://cms.luciango.com/uploads/ANH_1976_8b0c89af58.jpg',
    'https://cms.luciango.com/uploads/ANH_2703_941c5c7512.jpg',
    'https://cms.luciango.com/uploads/ANH_2955_c62ed0d6ed.jpg',
    'https://cms.luciango.com/uploads/ANH_3001_ad0d8ca358.jpg',
    'https://cms.luciango.com/uploads/ANH_2437_1_5fc02591b6.jpg',
    'https://cms.luciango.com/uploads/ANH_3007_705a50e9b5.jpg',
    'https://cms.luciango.com/uploads/P1664408_e0a2291856.JPG',
    'https://cms.luciango.com/uploads/P1664457_32e97bc396.JPG',
    'https://cms.luciango.com/uploads/P1664406_1465c4aad8.JPG',
    'https://cms.luciango.com/uploads/P1664420_4ed0b1c083.JPG',
    'https://cms.luciango.com/uploads/P1675186_36c120dc74.JPG'
];
const IMAGES_PER_LOAD = 6;
let currentLoadedIndex = 0;

function createGalleryItem(imageName) {
    return `
        <div class="gallery-item" data-animate-effect="fadeIn">
            <a href="${imageName}" class="gallery-popup">
                <img src="${imageName}" alt="Gallery Image">
            </a>
        </div>
    `;
}

const INITIAL_IMAGES_COUNT = 12; // Show first 12 images initially

function initializeGallery() {
    const container = document.getElementById('gallery-container');
    const initialImages = remoteGalleryImages.slice(0, INITIAL_IMAGES_COUNT);
    const galleryHTML = initialImages.map(createGalleryItem).join('');
    container.innerHTML = galleryHTML;
    currentLoadedIndex = INITIAL_IMAGES_COUNT;
    updateShowMoreButton();
}

function showMoreImages() {
    const container = document.getElementById('gallery-container');
    const nextImages = remoteGalleryImages.slice(currentLoadedIndex, currentLoadedIndex + IMAGES_PER_LOAD).map(createGalleryItem).join('');
    container.innerHTML += nextImages;
    currentLoadedIndex += IMAGES_PER_LOAD;
    updateShowMoreButton();
}

function updateShowMoreButton() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    if (currentLoadedIndex >= remoteGalleryImages.length) {
        showMoreBtn.style.display = 'none';
    }
}
// Add click handler to "Show More" button
document.getElementById('showMoreBtn').addEventListener('click', showMoreImages); 
document.addEventListener('DOMContentLoaded', initializeGallery);