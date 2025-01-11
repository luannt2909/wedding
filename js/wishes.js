document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded');
    
    // Function to fetch wishes from API
    function fetchWishes() {
        $.ajax({
            url: 'https://api.luananh-wedding.com/wishes',
            method: 'GET',
            success: function(response) {
                console.log(response);
                // Assuming response contains wishes array
                displayWishes(response.wishes);
            },
            error: function(xhr, status, error) {
                console.log(xhr, status, error);
                console.error('Error fetching wishes:', error);
            }
        });
    }
    
    // Function to add a new wish via API
    function addWish(wish) {
        $.ajax({
            url: 'https://api.luananh-wedding.com/wishes',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(wish),
            success: function(response) {
                fetchWishes(); // Refresh wishes after successful addition
            },
            error: function(xhr, status, error) {
                console.error('Error adding wish:', error);
                alert('Failed to submit wish. Please try again.');
            }
        });
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // For relative time (e.g., "2 minutes ago", "1 hour ago")
    function formatRelativeDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffMinutes < 60) {
            return `${diffMinutes} phút trước`;
        } else if (diffHours < 24) {
            return `${diffHours} giờ trước`;
        } else {
            return `${diffDays} ngày trước`;
        }
    }
    // Function to display wishes
    function displayWishes(wishes) {
        const container = document.getElementById('wishes-container');
        container.innerHTML = ''; // Clear existing wishes

        wishes.forEach(wish => {
            const wishHTML = `
            <div class="item">
                <div class="wish-item">
                    <div class="wish-content">
                        <p class="wish-message">"${wish.message}"</p>
                        <div class="wish-footer">
                            <p class="wish-author">From: ${wish.name}</p>
                            <p class="wish-date">${formatRelativeDate(wish.created_at)}</p>
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
            message: document.getElementById('message').value,
            title: document.getElementById('name').value,
        };

        addWish(newWish);
        wishForm.reset();
    });

    // Initial fetch of wishes
    fetchWishes();
}); 