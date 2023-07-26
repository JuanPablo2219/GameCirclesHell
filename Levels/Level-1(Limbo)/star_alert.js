function closeAlert() {
    var alert = document.querySelector('.custom-alert');
    alert.style.display = 'none';
}

window.addEventListener('load', function() {
    var alert = document.querySelector('.custom-alert');
    var audioPlayer = document.getElementById('audio-player');

    function closeAlert() {
        alert.style.display = 'none';
        audioPlayer.play();
    }

    var closeButton = document.querySelector('.custom-alert-close button');
    closeButton.addEventListener('click', closeAlert);
});/*Audio https://www.youtube.com/watch?v=JzVIkY5tKcE */