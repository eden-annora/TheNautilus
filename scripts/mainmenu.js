var menufadeout = 100
var mainmenu = true
var boxlength = 0
var signalstrength = 12
function menu(DT) {

    ctx_text.fillStyle = "#00ffc8"
    ctx_text.font = "20px Courier New"

    ctx.clearRect(0, 0, canvas.width, canvas.height) // clear the screen
    ctx_text.clearRect(0, 0, canvas.width, canvas.height)
    let X = centerOfCanvas.X - 420
    let Y = centerOfCanvas.Y + 50
    ctx.lineWidth = "6";
    ctx.strokeStyle = "#34ebba80"
    ctx.beginPath();
    ctx.rect(centerOfCanvas.X - 480, centerOfCanvas.Y - 500, 960, boxlength);
    ctx.stroke();
    ctx.strokeStyle = "#34ebba40"
    for (let i = 0; i < boxlength / 5; i++) {
        ctx.beginPath();
        ctx.rect(centerOfCanvas.X - 480, centerOfCanvas.Y - 500 + i * 5, 960, 2);
        ctx.stroke();
    }

    if (!mainmenu) {
        menufadeout -= 1
    } else {
        for (let i = 0; i < 2; i++) {
            if (i == 1) {
                ctx_text.fillStyle = "#00ffc850"
                ctx_text.font = "19.5px Courier New"
                X = X + 10
            }
            if (DT < 10000) { ctx_text.fillText("=== PLEASE WAIT == RECIEVING TRANSMISSION == SIGNAL STRENGTH:" + ((signalstrength * 999 + (Math.random() * 1000)) / 1000).toFixed(2) + " ===", X, Y - 500); boxlength = 100 }
            if (DT > 10000) { ctx_text.fillText("============================ [ COMPLETE ] ============================", X, Y - 500); boxlength = 100 }

            if (DT > 550) { ctx_text.fillText("                    THIS TRANSMISSION IS PROPERTY OF:", X, Y - 480); boxlength += 20 }
            if (DT > 600) { ctx_text.fillText("                   AURORA HAZARDOUS LIFE RESEARCH ORG.", X, Y - 460); boxlength += 20 }


            if (DT > 650) { ctx_text.fillText("         REDISTRIBUTION OUTSIDE OF THE INTENDED NETWORK IS ILLEGAL", X, Y - 420); boxlength += 20 }
            if (DT > 700) { ctx_text.fillText("               UNDER CLAUSE 2-B OF THE EMPLOYEE HANDBOOK", X, Y - 400); boxlength += 20 }
            if (DT > 750) { ctx_text.fillText("              AND PUNISHABLE AS STATED WITHIN THE SECTION", X, Y - 380); boxlength += 20 }

            if (DT > 800) { ctx_text.fillText("=======================================================================", X, Y - 360); boxlength += 20 }


            if (DT > 1100) { ctx_text.fillText("     _____   _____          ", X, Y - 308); boxlength += 80 }
            if (DT > 1100) { ctx_text.fillText("    .     . .     .         Attention team 8.", X, Y - 300) }
            if (DT > 1200) { ctx_text.fillText("    | ._. | | ._. |         You have been tasked with an ", X, Y - 280); boxlength += 20 }
            if (DT > 1300) { ctx_text.fillText("    | !_| |_|_|_! |         information extraction mission.", X, Y - 260); boxlength += 20 }
            if (DT > 1400) { ctx_text.fillText("    !___| |_______!         on derelict: NAU-0506, The Nautilus.", X, Y - 240); boxlength += 20 }
            if (DT > 1500) { ctx_text.fillText("    .___|_|_| |___.         ", X, Y - 220); boxlength += 20 }
            if (DT > 1600) { ctx_text.fillText("    | ._____| |_. |         Due to the ships location inside of a", X, Y - 200); boxlength += 20 }
            if (DT > 1700) { ctx_text.fillText("    | !_! | | !_! |         deadzone you will have to be within", X, Y - 180); boxlength += 20 }
            if (DT > 1800) { ctx_text.fillText("    !_____! !_____!         weapons range to get a good signal.", X, Y - 160); boxlength += 20 }


            if (DT > 2900) { ctx_text.fillText("MISSION BRIEFING:", X, Y - 90); boxlength += 70 }
            if (DT > 3000) { ctx_text.fillText("External scans show that what appears to be an organic material has ", X, Y - 75); boxlength += 20 }
            if (DT > 3100) { ctx_text.fillText("permeated the entireity of NAU-0506's superstructure.", X, Y - 60); boxlength += 20 }
            if (DT > 3200) { ctx_text.fillText("find out why they went radio silent.", X, Y - 45); boxlength += 20 }
            if (DT > 3300) { ctx_text.fillText("extract a sample of the biomaterial", X, Y - 30); boxlength += 20 }

            if (DT > 6000) { ctx_text.fillText("MISSION OBJECTIVES:", X, Y); boxlength += 20 }
            if (DT > 6500) { ctx_text.fillText("#0: AVOID CAUSING ANY DISTURBANCE AT ALL COSTS", X, Y + 20); boxlength += 40 }
            if (DT > 7000) { ctx_text.fillText("#1: ACQUIRE A BIOLOGICAL SAMPLE FROM THE PLANT MATTER WITHIN.", X, Y + 60); boxlength += 40 }
            if (DT > 7500) { ctx_text.fillText("#2: GAIN ACCESS TO THE SHIPS BLACKBOX LOGS AND DOWNLOAD THEM.", X, Y + 100); boxlength += 40 }
            if (DT > 8000) { ctx_text.fillText("#3: SCAN OBJECTS OF INTEREST WITH THE WIDEBAND MATERIAL ANALYZER.", X, Y + 140); boxlength += 40 }

            if (DT > 10000) {
                boxlength += 60
                ctx_text.fillText("           [TRANSMISSION HANDSHAKE COMPLETED SUCCESSFULLY]", X, Y + 200);

                if (Math.floor(DT / 8) % 2 == 0) {
                    ctx_text.fillStyle = "#00ffc880"
                }
                ctx_text.fillText("                          [ PRESS SPACE ]", X, Y + 240);
            }
        }
    }

    if (menufadeout < 100) { ctx_text.fillText("aw", X, Y - 500); }
    if (menufadeout < 95) { ctx_text.fillText("  ai", X, Y - 500); }
    if (menufadeout < 90) { ctx_text.fillText("    ti", X, Y - 500); }
    if (menufadeout < 85) { ctx_text.fillText("      ng ", X, Y - 500); }
    if (menufadeout < 80) { ctx_text.fillText("         ra", X, Y - 500); }
    if (menufadeout < 75) { ctx_text.fillText("           di", X, Y - 500); }
    if (menufadeout < 70) { ctx_text.fillText("             o l", X, Y - 500); }
    if (menufadeout < 65) { ctx_text.fillText("                ink", X, Y - 500); }
    if (menufadeout < 60) { ctx_text.fillText("                   .", X, Y - 500); }
    if (menufadeout < 55) { ctx_text.fillText("                    .", X, Y - 500); }
    if (menufadeout < 50) { ctx_text.fillText("                     .", X, Y - 500); }
    if (menufadeout < 30) { ctx_text.fillText("CONNECTING!", X, Y - 480); }
    if (menufadeout > 0) {
        window.requestAnimationFrame(menu);
    } else {
        console.log("the game should be running now")
        launch()
    }
}