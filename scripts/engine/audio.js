//using howler.js library for audio

//source needs to be a web url, local files *do not work*. 
//Just grab the relative path and add it to the end of "https://eden-annora.github.io/TheNautilus/"

var background_music = new Howl({
  src: ['https://eden-annora.github.io/TheNautilus/audio/ambientmusic/magic_forest.mp3'],
  loop: true
});

//will only play after you click something on the page
background_music.play();


var thruster_loop = new Howl({
  src: ["https://eden-annora.github.io/TheNautilus/audio/player/thruster/thruster_loopable.mp3"],
  loop: true
});

var thruster_end = new Howl({ src: ["https://eden-annora.github.io/TheNautilus/audio/player/thruster/thruster_end.mp3"] });


const sporeCollisions = ["https://eden-annora.github.io/TheNautilus/audio/collision/spore/1.mp3", "https://eden-annora.github.io/TheNautilus/audio/collision/spore/2.mp3", "https://eden-annora.github.io/TheNautilus/audio/collision/spore/3.mp3"];
var sporeHowls = {};

for (var i = 0; i < sporeCollisions.length; i++) {
  sporeHowls[sporeCollisions[i]] = new Howl({
    src: [sporeCollisions[i]],
    loop: false,
    volume: .15
  });
}