// Audio Control
document.addEventListener('DOMContentLoaded', function() {
    const audioButton = document.getElementById('audioButton');
    const audioElement = document.getElementById('audioElement');
    let isPlaying = false;

    // Add classes for styling
    audioButton.classList.add('audio-btn-play');

    audioButton.addEventListener('click', function() {
        if (isPlaying) {
            audioElement.pause();
            audioButton.classList.remove('audio-btn-pause');
            audioButton.classList.add('audio-btn-play');
        } else {
            audioElement.play();
            audioButton.classList.remove('audio-btn-play');
            audioButton.classList.add('audio-btn-pause');
        }
        isPlaying = !isPlaying;
    });
});