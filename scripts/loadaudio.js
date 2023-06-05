var audio_file = new Audio('audio/ambientmusic/magic_forest.mp3')
audio_file.addEventListener('timeupdate', function () {
    var buffer = .44
    if (this.currentTime > this.duration - buffer) {
        this.currentTime = 0
        this.play()
    }
});

//https://stackoverflow.com/questions/7330023/gapless-looping-audio-html5