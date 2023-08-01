const audio = document.getElementById("background-audio");

    // Pausar/reanudar el audio al hacer clic en cualquier lugar de la pantalla
    document.addEventListener("click", function() {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });