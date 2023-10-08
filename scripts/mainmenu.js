var menufadeout = 1000
var menutimer = 0
var mainmenu = true
var skipintro = false
var diskvel = .001
var signalstrength = 12
var lastframe = 0
var shrink = 1
var irisdilation = 0
var diskpos = []

for (let i = 0; i < 5; i++) {
    diskpos[i] = 0
}

function menu(DT) {

    menutimer = (DT - lastframe) / 3
    lastframe = DT

    ctx.clearRect(0, 0, canvas.width, canvas.height) // clear the screen
    ctx_text.clearRect(0, 0, canvas.width, canvas.height)
    let X = centerOfCanvas.X
    let Y = centerOfCanvas.Y
    ctx.lineWidth = "6";
    ctx.strokeStyle = "#6f00ff80"
    ctx.beginPath();
    ctx.rect(5, 5, canvas.width - 10, canvas.height - 10);
    ctx.stroke();
    ctx.strokeStyle = "#6f00ff40"
    for (let i = 0; i < canvas.height / 5; i++) {
        ctx.beginPath();
        ctx.rect(10, 10 + i * 5, canvas.width - 20, 2);
        ctx.stroke();
    }
    let screenflicker = (Math.floor(Math.random() * 100) + 150).toString(16)


    if (!mainmenu) {
        if (menufadeout == 1000) {
            computer_boot_start.play();
        }
        ctx_text.fillStyle = "#e600ff" + screenflicker
        ctx_text.font = "20px Courier New"
        let scrolloffset = 0
        if (menufadeout > 700) {
            scrolloffset = Y + menufadeout - 700
        } else {
            scrolloffset = Y
        }



        if (menufadeout < 900) { ctx_text.fillText("ATTEMTING HANDSHAKE WITH MAINTENENCE NETWORK...", X - 800, scrolloffset); }
        if (menufadeout < 800) { ctx_text.fillText("HANDSHAKE FAILED: [NET_ERROR: INVALID CREDENTIALS. CHECKSUM NOT PASSED. LOCAL DATA CORRUPTION DETECTED.]", X - 800, scrolloffset + 25); }
        if (menufadeout < 700) { ctx_text.fillText("HANDSHAKE FAILED: [NET_ERROR: NETWORK QUARANTINE IS NOW IN EFFECT.]", X - 800, scrolloffset + 50); }
        if (menufadeout < 600) { ctx_text.fillText("ATTEMPTING BOOT WITHOUT NETWORK ========================================================================", X - 800, scrolloffset + 75); }
        if (menufadeout < 500) { ctx_text.fillText("Loading servo calibration file...............", X - 800, scrolloffset + 100); }
        if (menufadeout < 400) { ctx_text.fillText("Loading drivers for hive coordination........", X - 800, scrolloffset + 125); }
        if (menufadeout < 300) { ctx_text.fillText("Loading drivers for solo limb coordination...", X - 800, scrolloffset + 150); }
        if (menufadeout < 300) { ctx_text.fillText("Attempting to connect to hive coordinator....", X - 800, scrolloffset + 175); }
        if (menufadeout < 600) { ctx_text.fillText("Launching SensorSuite(110.5302.52215.4) - ", X - 800, scrolloffset + 225); }

        if (menufadeout < 600) { ctx_text.fillText("ATTEMPTING BOOT WITHOUT NETWORK ========================================================================", X - 800, scrolloffset + 250); }
        ctx_text.fillStyle = "#00ff91"
        if (menufadeout < 400) { ctx_text.fillText("                                              [COMPLETE: ALL SERVOS PASSED DIAGNOSTICS]", X - 800, scrolloffset + 100); }
        if (menufadeout < 350) { ctx_text.fillText("                                              [COMPLETE: HIVE MESH-NETWORK DRIVERS LOADED]", X - 800, scrolloffset + 125); }
        if (menufadeout < 300) { ctx_text.fillText("                                              [COMPLETE: LIMB COORDINATOR HAS PASSED DIAGNOSTICS]", X - 800, scrolloffset + 150); }

        if (menufadeout < 300) {
            if (menufadeout > 200) { ctx_text.fillText("                                              [WAITING FOR DRIVERS TO COME ONLINE... STATUS : OFFLINE]", X - 800, scrolloffset + 175); }
            else { ctx_text.fillStyle = "#fc034a"; ctx_text.fillText("                                              [FAILED: MODULE LOCKOUT IS IN EFFECT DUE TO CORRUPTED LOCAL DATA.]", X - 800, scrolloffset + 175); }
        }

        if (menufadeout < 600) {
            if (menufadeout > 100) { ctx_text.fillStyle = "#fc034a"; ctx_text.fillText("                                          [OFFLINE]", X - 800, scrolloffset + 225); }
            else { ctx_text.fillStyle = "#00ff91"; ctx_text.fillText("                                          [ONLINE]", X - 800, scrolloffset + 225); }
        }

        if (menufadeout < 1000) {
            ctx_text.font = "30px Courier New"
            ctx_text.fillStyle = "#00ff91"
            if (Math.floor(menufadeout / 8) % 2 == 0) { ctx_text.fillStyle = "#00ff9175" }
            ctx.lineWidth = "6";
            ctx.strokeStyle = "#6f00ff"
            ctx.beginPath();
            ctx.rect(X - 805, Y - 85, 1610, 400);
            ctx.stroke();
            ctx.fillStyle = "#00000099"
            ctx.fillRect(X - 805, Y - 85, 1610, 400);
            ctx_text.fillText("[CRITICAL: REPORT TO A HIVE REPAIR STATION NOW TO REPAIR SYSTEM FILES]", X - 800, Y - 50);
            ctx_text.fillText("[CRITICAL: REPORT TO A HIVE REPAIR STATION NOW TO REPAIR SYSTEM FILES]", X - 800, Y + 300);
        }

        if (menufadeout > 995) {
            X += (centerOfCanvas.X - 800) - Math.random() * 100
            Y += (centerOfCanvas.Y - 400) - Math.random() * 100
            shrink = Math.random()
        } else {
            X = centerOfCanvas.X
            Y = centerOfCanvas.Y - 300
            shrink = .9
        }


        menufadeout -= menutimer / 5
        if (menufadeout < 200) { diskvel += diskvel / (menutimer + (Math.random() - .5)) / 2500 } else { diskvel -= (menutimer) / 10000 }

    }
    ctx.fillStyle = "#00000099"

    ctx.beginPath();
    ctx.arc(X, Y, shrink * 225, 0, 2 * Math.PI);
    ctx.stroke()
    ctx.fill();

    for (let i = 0; i < 5; i++) {
        let radiusmodifier = 25 * i
        ctx.lineWidth = "1";

        diskpos[i] += (i / 50) + (diskvel * (menutimer))

        let radius = 225 - radiusmodifier


        ctx.beginPath();
        ctx.arc(X, Y, shrink * radius, (diskpos[i] - 2 / 3 * Math.PI), (diskpos[i] - 2 / 3 * Math.PI) - 5.2);
        ctx.stroke();
        ctx.fill()
        ctx.beginPath();
        ctx.arc(X, Y, shrink * radius, (diskpos[i] - 4 / 3 * Math.PI), (diskpos[i] - 4 / 3 * Math.PI) - 5.2);
        ctx.stroke();
        ctx.fill()
        ctx.beginPath();
        ctx.arc(X, Y, shrink * radius, (diskpos[i] - 2 * Math.PI), (diskpos[i] - 2 * Math.PI) - 5.2);
        ctx.stroke();
        ctx.fill()

        ctx.strokeStyle = "#00ff91"
        irisdilation += (Math.random() - .5)
        if (irisdilation > 65) { irisdilation = 65 }
        if (irisdilation < 55) { irisdilation = 55 }


        for (let b = 0; b < 50; b++) {
            ctx.beginPath();
            ctx.arc(X, Y, shrink * (100 + (i / 5) * 15), ((diskpos[i] * .05) + (b / (i * 20)) * Math.PI), ((diskpos[i] * .05) + (b / (i * 20)) * Math.PI));
            ctx.arc(X, Y, shrink * (100 + (i / 5) * 20), ((diskpos[i] * .05) + (b / (i * 20)) * Math.PI), ((diskpos[i] * .05) + (b / (i * 20)) * Math.PI));
            ctx.stroke()
        }

        for (let b = 0; b < 50; b++) {
            ctx.beginPath();
            ctx.arc(X, Y, shrink * (100 + (i / 5) * 15), ((diskpos[i] * .07) + (b / (i * 25)) * Math.PI), ((diskpos[i] * .07) + (b / (i * 25)) * Math.PI));
            ctx.arc(X, Y, shrink * (100 + (i / 5) * 20), ((diskpos[i] * .07) + (b / (i * 25)) * Math.PI), ((diskpos[i] * .07) + (b / (i * 25)) * Math.PI));
            ctx.stroke()
        }

        for (let b = 0; b < 25; b++) {
            ctx.beginPath();
            ctx.arc(X, Y, shrink * (60 + i * 10), (diskpos[i] * .05 + b / 25 * Math.PI), (diskpos[i] * .05 + b / 25 * Math.PI));
            ctx.arc(X, Y, shrink * (irisdilation + i * 10), (diskpos[i] * .05 + b / 25 * Math.PI), (diskpos[i] * .05 + b / 25 * Math.PI));
            ctx.stroke()
        }

        for (let b = 0; b < 25; b++) {
            ctx.beginPath();
            ctx.arc(X, Y, shrink * (70 + i * 5), (diskpos[i] * .05 + b / 20 * Math.PI), (diskpos[i] * .05 + b / 20 * Math.PI));
            ctx.arc(X, Y, shrink * (65 + i * 5), (diskpos[i] * .05 + b / 20 * Math.PI), (diskpos[i] * .05 + b / 20 * Math.PI));
            ctx.stroke()
        }

        for (let b = 0; b < 50; b++) {
            ctx.beginPath();
            ctx.arc(X, Y, shrink * (210 + (i / 5) * 15), ((diskpos[i] * .07) + (b / (i * 25)) * Math.PI), ((diskpos[i] * .07) + (b / (i * 25)) * Math.PI));
            ctx.arc(X, Y, shrink * (210 + (i / 5) * 20), ((diskpos[i] * .07) + (b / (i * 25)) * Math.PI), ((diskpos[i] * .07) + (b / (i * 25)) * Math.PI));
            ctx.stroke()
        }

        for (let b = 0; b < 50; b++) {
            ctx.beginPath();
            ctx.arc(X, Y, shrink * (210 + (i / 5) * 15), ((diskpos[i] * .1) + (b / (i * 15)) * Math.PI), ((diskpos[i] * .1) + (b / (i * 15)) * Math.PI));
            ctx.arc(X, Y, shrink * (210 + (i / 5) * 20), ((diskpos[i] * .1) + (b / (i * 15)) * Math.PI), ((diskpos[i] * .1) + (b / (i * 15)) * Math.PI));
            ctx.stroke()
        }




    }
    if (menufadeout < 0) {
        menufadeout = 0
    }



    if (mainmenu) {
        ctx_text.fillStyle = "#ff00a6" + screenflicker
        ctx_text.font = (shrink * 25).toString() + "px Courier New"

        ctx_text.fillText("[PLEASE REPORT TO AN UPDATE STATION ASAP] --- [PRESS SPACE TO CONTINUE BOOT PROCESS]", X - shrink * 600, Y + shrink * 500);
        ctx_text.fillText("AURORA Bio-Intellegence SUBSYSTEM PROTOCOL #33104 [MAINTENENCE]", X - shrink * 600, Y + shrink * 300);
        ctx_text.fillText("PHYSICAL SYSTEMS MAINTENENCE ROBOT PREBOOTLOADER", X - shrink * 600, Y + shrink * 350);
        ctx_text.fillText("[BIOS VER : 1.2.440023] [SWARM PROTOCOL: MK-3] [SER# : 37877489233]", X - shrink * 600, Y + shrink * 400);
        ctx_text.fillText("[WARNING: BIOS OUTDATED... NETWORK UPDATE FAILED: UPDATE REQ DENIED BY MESH NETWORK]", X - shrink * 600, Y + shrink * 450);
        ctx_text.font = "50px Courier New"
        ctx_text.fillText("AURORA BIO-COMPUTER SYSTEMS LTD.", X - 470, Y - 350);
        ctx_text.fillText("SYS ID: CC-001-MTNC", X - 470, Y - 300);
    } 

    if (!skipintro) {
        window.requestAnimationFrame(menu);
    } else {
        console.log("the game should be running now")
        launch()
    }
}