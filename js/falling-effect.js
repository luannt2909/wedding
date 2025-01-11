function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('falling-item');
    
    // Randomly choose between heart and flower symbols
    const symbols = ['🌸'];
    heart.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    
    // Random starting position
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's'; // Between 2-5s
    heart.style.opacity = Math.random() * 0.5 + 0.3; // Between 0.3-0.8
    heart.style.fontSize = Math.random() * 15 + 10 + 'px'; // Between 10-25px
    
    document.body.appendChild(heart);
    
    // Remove the heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Create hearts periodically
setInterval(createHeart, 300); // Adjust timing by changing 300 to desired milliseconds 