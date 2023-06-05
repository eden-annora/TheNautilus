var thruster_end = new Howl({src:["audio/player/thruster/thruster_end.ogg"]});


var menumusic = new Howl({
    src:["audio/ambientmusic/magic_forest.mp3"],
    loop:false,
    preload: true,
    html5:false,

    onplay: function () {
        menumusic._sounds[0]._node.addEventListener('timeupdate',function () {
            let buffer = .28
            if (this.currentTime > this.duration - buffer) {
              console.warn('timeupdate');
              this.currentTime = 0;
            }
          },
          false,
        );
    }
  }); 

var thruster_loop = new Howl({
    src:["audio/player/thruster/thruster_loopable.ogg"],
    loop:false,
    preload: true,
    html5:false,

    onplay: function () {
        thruster_loop._sounds[0]._node.addEventListener('timeupdate',function () {
            let buffer = .6
            if (this.currentTime > this.duration - buffer) {
              console.warn('timeupdate');
              this.currentTime = 0;
            }
          },
          false,
        );
    }
  });