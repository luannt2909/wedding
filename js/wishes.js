document.addEventListener('DOMContentLoaded', function() {
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
            const wishHTML = `
                <div class="item">
                    <div class="wish-item">
                        <h3>${wish.title}</h3>
                        <p class="wish-author">- ${wish.name}</p>
                        <p class="wish-message">${wish.message}</p>
                    </div>
                </div>
            `;
            container.innerHTML += wishHTML;
        });

        // Initialize or refresh the carousel
        if($('.owl-carousel').data('owlCarousel')) {
            $('.owl-carousel').data('owlCarousel').destroy();
        }
        $('.owl-carousel').owlCarousel({
            items: 1,
            loop: true,
            margin: 0,
            responsiveClass: true,
            nav: false,
            dots: true,
            autoplay: true,
            smartSpeed: 500,
            autoplayTimeout: 4000,
        });
    }

    // Handle form submission
    const wishForm = document.getElementById('wishForm');
    wishForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newWish = {
            name: document.getElementById('name').value,
            title: document.getElementById('title').value,
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