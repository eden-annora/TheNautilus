//using howler.js library for audio: https://github.com/goldfire/howler.js#documentation

//source needs to be a web url, local files *do not work*. 
//Just grab the relative path and add it to the end of "https://eden-annora.github.io/TheNautilus/"



//Background music
var background_music = new Howl({
  src: ['https://eden-annora.github.io/TheNautilus/audio/ambientmusic/magic_forest.mp3'],
  loop: true,
  volume: .2
});

//will only play after you click something on the page
background_music.play();



//Thrusters
var thruster_loop = new Howl({
  src: ["https://eden-annora.github.io/TheNautilus/audio/player/thruster/thruster_loopable.mp3"],
  loop: true,
  volume: .7
});

var thruster_end = new Howl({
  src: ["https://eden-annora.github.io/TheNautilus/audio/player/thruster/thruster_end.mp3"],
  volume: .7
});



//Abilities
var ability_boost = new Howl({
  src: ["https://eden-annora.github.io/TheNautilus/audio/player/boost.mp3"],
  volume: .3
});

var ability_charge = new Howl({
  src: ["https://eden-annora.github.io/TheNautilus/audio/player/charge.mp3"],
  volume: .3
});



//Spore collision sounds
const sporeCollisions = ["https://eden-annora.github.io/TheNautilus/audio/collision/spore/1.mp3", "https://eden-annora.github.io/TheNautilus/audio/collision/spore/2.mp3", "https://eden-annora.github.io/TheNautilus/audio/collision/spore/3.mp3"];
var sporeHowls = {};

for (var i = 0; i < sporeCollisions.length; i++) {
  sporeHowls[sporeCollisions[i]] = new Howl({
    src: [sporeCollisions[i]],
    loop: false,
    volume: .1
  });
}