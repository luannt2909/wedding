document.addEventListener('DOMContentLoaded', function() {
    const pageSize = 50;
    const tabContainers = {
        'noi-bat': { page: 1, loading: false },
        'pre-wedding': { page: 1, loading: false },
        'vu-quy': { page: 1, loading: false },
        'tan-hon': { page: 1, loading: false },
        'bao-hy': { page: 1, loading: false }
    };

    // Handle tab switching
    document.querySelectorAll('.gallery-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            
            // Update active tab
            document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active content
            document.querySelectorAll('.gallery-content').forEach(content => {
                content.classList.remove('active');
                if (content.dataset.tab === tabId) {
                    content.classList.add('active');
                }
            });

            // Load initial images if not already loaded
            if (!document.querySelector(`#${tabId}-container`).children.length) {
                loadImages(tabId);
            }
        });
    });

    // Handle load more buttons
    document.querySelectorAll('.gallery-load-more button').forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            loadImages(tabId);
        });
    });

    function loadImages(tabId) {
        if (tabId === 'noi-bat') {
            return;
        }
        if (tabContainers[tabId].loading) return;
        
        tabContainers[tabId].loading = true;
        const container = document.querySelector(`#${tabId}-container`);
        const loadMoreBtn = document.querySelector(`.gallery-load-more button[data-tab="${tabId}"]`);
        loadMoreBtn.disabled = true;
        
        fetch(`https://api.luananh-wedding.com/gallery/${tabId}?page=${tabContainers[tabId].page}&pageSize=${pageSize}`)
            .then(response => response.json())
            .then(data => {
                data.images.forEach(image => {
                    const item = createGalleryItem(image, isChrome);
                    container.appendChild(item);
                });

                tabContainers[tabId].page++;
                tabContainers[tabId].loading = false;

                // Hide load more button if no more images
                if (data.images.length < pageSize) {
                    loadMoreBtn.style.display = 'none';
                }

                // Reinitialize Magnific Popup
                $('.gallery-masonry').magnificPopup({
                    delegate: 'a.gallery-popup',
                    type: 'image',
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0, 1]
                    }
                });
            })
            .catch(error => {
                console.error('Error loading images:', error);
                tabContainers[tabId].loading = false;
            })
            .finally(() => {
                loadMoreBtn.disabled = false;
            });
    }

    function createGalleryItem(image) {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `
            <a href="${image.url}" download="${image.caption || ''}" class="gallery-popup" title="${image.caption || ''}">
                <img src="${image.url}" alt="${image.caption || ''}" loading="lazy">
            </a>
        `;
        return div;
    }

    // Load initial images for pre-wedding tab
    // loadImages('pre-wedding');
});