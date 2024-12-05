document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded');
    // Initialize wishes array from localStorage or empty array if none exists
    let wishes = JSON.parse(localStorage.getItem('wishes') || '[]');
    
    // Function to add a new wish
    function addWish(wish) {
        wishes.unshift(wish); // Add to beginning of array
        localStorage.setItem('wishes', JSON.stringify(wishes));
        displayWishes();
    }

    // Function to display wishes
    function displayWishes() {
        const container = document.getElementById('wishes-container');
        container.innerHTML = ''; // Clear existing wishes

        wishes.forEach(wish => {
            // const wishHTML = `
            //     <div class="item">
            //         <div class="wish-item">
            //             <!-- <h3>${wish.title}</h3> -->
            //             <p class="wish-author">- ${wish.name}</p>
            //             <p class="wish-message">${wish.message}</p>
            //         </div>
            //     </div>
            // `;
            const wishHTML = `
            <div class="item">
                <div class="wish-item">
                    <div class="wish-content">
                        <p class="wish-message">"${wish.message}"</p>
                        <div class="wish-footer">
                            <p class="wish-author">From: ${wish.name}</p>
                            <p class="wish-date">${new Date(wish.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="wish-decorations">
                            <span class="wish-icon">✨</span>
                    </div>
                </div>
            </div>
            `;
            container.innerHTML += wishHTML;
        });

         // Properly destroy and reinitialize the carousel
        const $carousel = $('.owl-carousel');
        if ($carousel.data('owlCarousel')) {
            $carousel.data('owlCarousel').destroy();
        }
    
        // Wait for DOM update before reinitializing
        setTimeout(() => {
            $carousel.owlCarousel({
                items: 1,
                loop: wishes.length > 1, // Only enable loop if there's more than one wish
                margin: 0,
                responsiveClass: true,
                nav: false,
                dots: true,
                autoplay: true,
                smartSpeed: 500,
                autoplayTimeout: 4000
            });
        }, 0);
    }

    // Handle form submission
    const wishForm = document.getElementById('wishForm');
    wishForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newWish = {
            name: document.getElementById('name').value,
            // title: document.getElementById('title').value,
            message: document.getElementById('message').value,
            date: new Date().toISOString()
        };

        addWish(newWish);
        wishForm.reset();
        
        // Show success message
        alert('Thank you for your wishes!');
    });

    // Initial display of wishes
    displayWishes();
}); 