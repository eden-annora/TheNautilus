const animations = new Object({

    "player_ReleaseMomentum": function (pos, framecounter) {
        ctx.strokeStyle = "#34ebba"
        ctx.lineWidth = 1;

        if (framecounter < 100) {

            let tpX = centerOfCanvas.X + (pos.X - camera.pos.X) // set transforms for the center of the canvas, the image width, and cameras relitave position to the player.
            let tpY = centerOfCanvas.Y + (pos.Y - camera.pos.Y)

            if (framecounter < 30) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 100, (framecounter / 10) * Math.PI, (framecounter / 5) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 35) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 105, (framecounter / 15) * Math.PI, (-framecounter / 10) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 40) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 110, (framecounter / 20) * Math.PI, (framecounter / 15) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 43) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 115, (framecounter / 25) * Math.PI, (-framecounter / 19.8) * Math.PI);
                ctx.stroke();
            }
            ctx.beginPath();
            ctx.arc(tpX, tpY, (framecounter * 8 / 30) * 100, 0, 2 * Math.PI);
            ctx.stroke();

            ctx.strokeStyle = "#34ebba15"
            ctx.lineWidth = 30;

            if (framecounter < 30) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 100, (framecounter / 10) * Math.PI, (framecounter / 5) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 35) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 105, (framecounter / 15) * Math.PI, (-framecounter / 10) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 40) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 110, (framecounter / 20) * Math.PI, (framecounter / 15) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 43) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 115, (framecounter / 25) * Math.PI, (-framecounter / 19.8) * Math.PI);
                ctx.stroke();
            }
            ctx.beginPath();
            ctx.arc(tpX, tpY, (framecounter * 8 / 30) * 100, 0, 2 * Math.PI);
            ctx.stroke();

        }
    },

    "player_StoreMomentum": function (pos, framecounter) {
        ctx.strokeStyle = "#e06fff"
        ctx.lineWidth = 1;

        let tpX = centerOfCanvas.X + (pos.X - camera.pos.X) // set transforms for the center of the canvas, the image width, and cameras relitave position to the player.
        let tpY = centerOfCanvas.Y + (pos.Y - camera.pos.Y)

        if (framecounter < 50) {

            if (framecounter < 30) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 100, (framecounter / 10) * Math.PI, (framecounter / 5) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 35) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 105, (framecounter / 15) * Math.PI, (-framecounter / 10) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 40) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 110, (framecounter / 20) * Math.PI, (framecounter / 15) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 43) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 115, (framecounter / 25) * Math.PI, (-framecounter / 20) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 25) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, Math.abs(((500 - framecounter * 16))), 0, 2 * Math.PI);
                ctx.stroke();
            }

            ctx.strokeStyle = "#e06fff15"
            ctx.lineWidth = 30;
            if (framecounter < 30) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 100, (framecounter / 10) * Math.PI, (framecounter / 5) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 35) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 105, (framecounter / 15) * Math.PI, (-framecounter / 10) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 40) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 110, (framecounter / 20) * Math.PI, (framecounter / 15) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 43) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 115, (framecounter / 25) * Math.PI, (-framecounter / 20) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 25) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, Math.abs(((500 - framecounter * 16))), 0, 2 * Math.PI);
                ctx.stroke();
            }

        }
    },

    "spore_soundwave": function (pos, framecounter) {
        ctx.strokeStyle = "#ff3d6780"
        ctx.lineWidth = 10;
        if (framecounter < 100) {

            let tpX = centerOfCanvas.X + (pos.X - camera.pos.X) // set transforms for the center of the canvas, the image width, and cameras relitave position to the player.
            let tpY = centerOfCanvas.Y + (pos.Y - camera.pos.Y)
            if (framecounter < 100) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 5, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.strokeStyle = "#ff3d6760"
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(tpX, tpY, 50, (framecounter / 20) * Math.PI, (framecounter / 10) * Math.PI);
                ctx.stroke();
                ctx.strokeStyle = "#ff3d6715"
                ctx.lineWidth = 25;
                ctx.beginPath();
                ctx.arc(tpX, tpY, 50, (framecounter / 20) * Math.PI, (framecounter / 10) * Math.PI);
                ctx.stroke();
                ctx_text.fillStyle = "#ff3d67"
                if (Math.floor(framecounter / 8) % 2 == 0) { ctx_text.fillStyle = "#ff3d6775" }
                ctx_text.fillText("[ SONAR DETECTED ]", tpX - 65, tpY + 65);
                ctx_text.fillStyle = "#34ebba"
            }
        }
    },

    "player_die": function (pos, framecounter) {
        ctx.strokeStyle = "#ff3d6780"
        ctx.lineWidth = 10;
        if (framecounter < 100) {

            let tpX = centerOfCanvas.X + (pos.X - camera.pos.X) // set transforms for the center of the canvas, the image width, and cameras relitave position to the player.
            let tpY = centerOfCanvas.Y + (pos.Y - camera.pos.Y)
            if (framecounter < 100) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 5, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.strokeStyle = "#ff3d6760"
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(tpX, tpY, 50, (framecounter / 20) * Math.PI, (framecounter / 10) * Math.PI);
                ctx.stroke();
                ctx.strokeStyle = "#ff3d6715"
                ctx.lineWidth = 25;
                ctx.beginPath();
                ctx.arc(tpX, tpY, 50, (framecounter / 20) * Math.PI, (framecounter / 10) * Math.PI);
                ctx.stroke();
                ctx_text.fillStyle = "#ff3d67"
                if (Math.floor(framecounter / 8) % 2 == 0) { ctx_text.fillStyle = "#ff3d6775" }
                ctx_text.fillText("[    YOU DIED    ]", tpX - 65, tpY + 65);
            }
            ctx.strokeStyle = "#ff3d67"
            ctx.lineWidth = 1;
            if (framecounter < 30) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 100, (framecounter / 10) * Math.PI, (framecounter / 5) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 35) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 105, (framecounter / 15) * Math.PI, (-framecounter / 10) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 40) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 110, (framecounter / 20) * Math.PI, (framecounter / 15) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 43) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 115, (framecounter / 25) * Math.PI, (-framecounter / 20) * Math.PI);
                ctx.stroke();
            }

            ctx.strokeStyle = "#ff3d6715"
            ctx.lineWidth = 30;
            if (framecounter < 30) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 100, (framecounter / 10) * Math.PI, (framecounter / 5) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 35) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 105, (framecounter / 15) * Math.PI, (-framecounter / 10) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 40) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 110, (framecounter / 20) * Math.PI, (framecounter / 15) * Math.PI);
                ctx.stroke();
            }
            if (framecounter < 43) {
                ctx.beginPath();
                ctx.arc(tpX, tpY, 115, (framecounter / 25) * Math.PI, (-framecounter / 20) * Math.PI);
                ctx.stroke();
            }

        }
    }
})
