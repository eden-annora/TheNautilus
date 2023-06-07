const animations = new Object({
    "player_StoreMomentum": function (pos, framecounter) {
        ctx.strokeStyle = "#34ebba"
        ctx.lineWidth = 1;
        if (framecounter < 300) {

            let tpX = centerOfCanvas.X + (pos.X - camera.pos.X) // set transforms for the center of the canvas, the image width, and cameras relitave position to the player.
            let tpY = centerOfCanvas.Y + (pos.Y - camera.pos.Y)

            if (framecounter < 210) {
            
                if (framecounter < 180) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 100, (framecounter / 10) * Math.PI, (framecounter / 5) * Math.PI);
                ctx.stroke();
                }
                if (framecounter < 185) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 105, (framecounter / 15) * Math.PI, (-framecounter / 10) * Math.PI);
                ctx.stroke();
                 }
                if (framecounter < 190) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 110, (framecounter / 20) * Math.PI, (framecounter / 15) * Math.PI);
                ctx.stroke();
                }
                if (framecounter < 195) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 115, (framecounter / 25) * Math.PI, (-framecounter / 19.8) * Math.PI);
                ctx.stroke();   
                }
                ctx.beginPath();
                ctx.arc(tpX, tpY, (framecounter * 4 / 30) * 100, 0, 2 * Math.PI);
                ctx.stroke();
            }
        }
    }
})