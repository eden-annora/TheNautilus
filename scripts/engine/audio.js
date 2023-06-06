var backgroundMusic = new Howl({
    src: ['https://eden-annora.github.io/TheNautilus/audio/ambientmusic/magic_forest.mp3'],
    loop:true
  });
  
  //both of these are required to start audio, annoyingly
  backgroundMusic.play();
  backgroundMusic.resume();