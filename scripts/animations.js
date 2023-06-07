const animations = new Object({
    "player_StoreMomentum": function (pos, framecounter) {
        ctx.strokeStyle = "#34ebba"
        ctx.lineWidth = 1;
        if (framecounter < 400) {

            let tpX = centerOfCanvas.X + (pos.X - camera.pos.X) // set transforms for the center of the canvas, the image width, and cameras relitave position to the player.
            let tpY = centerOfCanvas.Y + (pos.Y - camera.pos.Y)

            if (framecounter < 300) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 100, (framecounter / 60) * Math.PI, (framecounter / 30) * Math.PI);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(tpX, tpY, (framecounter * 2 / 30) * 100, 0, 2 * Math.PI);
                ctx.stroke();
            }
        }
    }
})