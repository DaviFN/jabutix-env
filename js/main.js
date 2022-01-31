msgType_commandMoveForward = 'c';
msgType_commandMoveLeft = 'd';
msgType_commandMoveRight = 'e';

msgtype_callbackMovedForward = 'h';
msgtype_callbackMovedLeft = 'i';
msgtype_callbackMovedRight = 'j';

// get matrix of zeros
//const matrixOfZeros = (m, n) => [...Array(m)].map(e => Array(n).fill(0));
function matrixOfZeros(rows, cols){

  var arr = [];

  // Creates all lines:
  for(var i = 0; i < rows; i++){

      // Creates an empty line
      arr.push([]);

      // Adds cols to the empty line:
      arr[i].push(new Array(cols));

      for(var j = 0; j < cols; j++){
        // Initializes:
        arr[i][j] = 0;
      }
  }

  return arr;
}

function getRandomIntBetween(min, max) {
  var range = max - min;
  if(range < 0) return 0;
  return getRandomIntNotExceeding(range + 1) + min;
}

function getRandomIntNotExceeding(n) {
  return Math.floor(Math.random() * n);
}

var canvasHandler = new CanvasHandler();
var simulation = canvasHandler.simulation;
var gamification = canvasHandler.gamification;


// sets up a input handler, for debugging purposes
document.addEventListener("keyleft", inputCallback);
document.addEventListener("keyright", inputCallback);
document.addEventListener("keyup", inputCallback);
document.addEventListener("keydown", inputCallback);
function inputCallback(event)
{
    canvasHandler.inputCallback(event);
}

function relativeDirectionOfAbsoluteDirectionBasedOnRelativeDirection(absoluteDirection, referenceRelativeDirection) {
  //alert("on relativeDirectionOfAbsoluteDirectionBasedOnRelativeDirection, " + absoluteDirection + " " + referenceRelativeDirection)
  switch(referenceRelativeDirection) {
    case 'right':
      if(absoluteDirection == 'right') {
        return 'up';
      }
      if(absoluteDirection == 'up') {
        return 'left';
      }
      if(absoluteDirection == 'left') {
        return 'down';
      }
      if(absoluteDirection == 'down') {
        return 'right';
      }
    case 'up':
      if(absoluteDirection == 'right') {
        return 'right';
      }
      if(absoluteDirection == 'up') {
        return 'up';
      }
      if(absoluteDirection == 'left') {
        return 'left';
      }
      if(absoluteDirection == 'down') {
        return 'down';
      }
    case 'left':
      if(absoluteDirection == 'right') {
        return 'down';
      }
      if(absoluteDirection == 'up') {
        return 'right';
      }
      if(absoluteDirection == 'left') {
        return 'up';
      }
      if(absoluteDirection == 'down') {
        return 'left';
      }
    case 'down':
      if(absoluteDirection == 'right') {
        return 'left';
      }
      if(absoluteDirection == 'up') {
        return 'down';
      }
      if(absoluteDirection == 'left') {
        return 'right';
      }
      if(absoluteDirection == 'down') {
        return 'up';
      }
  }
  return 'none';
}

function dummyMovementCallback() {
  //alert("jabuti moved (on dummyMovementCallback)");
}

function jabutiBlockCallback_moveForward(callback) {
  printToOutputArea("Movendo o jabuti à frente...");
  canvasHandler.moveJabutiForward(callback);
  gamification.checkGameOver();
}

function jabutiBlockCallback_moveLeft(callback) {
  printToOutputArea("Movendo o jabuti à esquerda...");
  canvasHandler.moveJabutiLeft(callback);
  gamification.checkGameOver();
}

function jabutiBlockCallback_moveRight(callback) {
  printToOutputArea("Movendo o jabuti à direita...");
  canvasHandler.moveJabutiRight(callback);
  gamification.checkGameOver();
}

function jabutiBlockCallback_jabuti_sees_left_sign_ahead() {
  return simulation.map.jabutiFacesLeftSign();
}

function jabutiBlockCallback_jabuti_sees_right_sign_ahead() {
  return simulation.map.jabutiFacesRightSign();
}

function normalModeButtonCallback() {
  canvasHandler.simulation.resetToNormal();
}

function loopChallengeButtonCallback() {
  canvasHandler.gamification.startLoopChallenge();
}

function conditionalsChallengeButtonCallback() {
  canvasHandler.gamification.startConditionalsChallenge();
}



viewSelectionElement_level = document.getElementById('viewSelection-level');

levelSelected = 0;

viewSelectionElement_level.addEventListener('change', () => {
  levelSelected = viewSelectionElement_level.selectedIndex;
});


function gameLevelButton_callback() {
  gamification.initializeLevelChallenge(levelSelected);
}







serverURL = "ws://localhost:8080/k8";
stunServers = [
    "stun:stun.l.google.com:19302",
];

//stunServers = [
//    "stun:stun.l.google.com:19302",
//    "stun:stun1.l.google.com:19302",
//    "stun:stun2.l.google.com:19302",
//    "stun:stun3.l.google.com:19302",
//    "stun:stun4.l.google.com:19302",
//    "stun:stun01.sipphone.com",
//    "stun:stun.ekiga.net",
//    "stun:stun.fwdnet.net",
//    "stun:stun.ideasip.com",
//    "stun:stun.iptel.org",
//    "stun:stun.rixtelecom.se",
//    "stun:stun.schlund.de",
//    "stun:stunserver.org",
//    "stun:stun.softjoys.com",
//    "stun:stun.voiparound.com",
//    "stun:stun.voipbuster.com",
//    "stun:stun.voipstunt.com",
//    "stun:stun.voxgratia.org",
//    "stun:stun.xten.com",
//];
    
rtcConfiguration = {
    iceServers: [ {
            urls: this.stunServers
        }
    ]
};

const msgtype_sdpOffer = 'a';
const msgtype_sdpAnswer = 'b';

const pc = new RTCPeerConnection(rtcConfiguration)

pc.oniceconnectionstatechange = e => {
    console.log("on pc.oniceconnectionstatechange");
    //log(pc.iceConnectionState);
}

pc.onicecandidate = event => {
    console.log("on pc.onicecandidate")
  //if (event.candidate === null) {
  //  document.getElementById('localSessionDescription').value = btoa(JSON.stringify(pc.localDescription));
  //}

}

// Offer to receive 1 audio, and 1 video tracks
//pc.addTransceiver('audio', {
//    'direction': 'recvonly'
//})
pc.addTransceiver('video', {
    'direction': 'recvonly'
})

pc.ontrack = event => {
    //console.log("on pc.ontrack");
    const stream = event.streams[0];
    canvasHandler.setCameraStream(stream);

    //var canvas = document.getElementById('canvas');
    //var ctx    = canvas.getContext('2d');

    //const processor = new MediaStreamTrackProcessor(stream.getVideoTracks()[0]);
    //const reader = processor.readable.getReader();
//
    //readChunk();
    //function readChunk() {
    //    reader.read().then( ({ done, value }) => {
    //        // the MediaStream video can have dynamic size
    //        //if(canvas.width !== value.displayWidth || canvas.height !== value.displayHeight ) {
    //        //  canvas.width = value.displayWidth;
    //        //  canvas.height = value.displayHeight;
    //        //  }
//
    //        ctx.clearRect( 0, 0, ctx.width, ctx.height );
    //        // value is a VideoFrame
    //        ctx.drawImage( value, 0, 0 );
    //        value.close(); // close the VideoFrame when we're done with it
    //        if( !done ) {
    //          readChunk();
    //        }
    //      });
    //}
        
        //function drawFrame(timestamp) {
//
        //    
//
        //    //self.canvas2DCtx.drawImage(self.cameraVideoElement, 0, 0, self.canvas.width, self.canvas.height);
//
        //    //requestAnimationFrame(drawFrame);
        //    //setTimeout(drawFrame, 1000 / 30); // drawing at 30fps
        //}

    //console.log(stream);
    //canvasHandler.startAnimationLoop();
    //const el = document.createElement(event.track.kind)
    //el.srcObject = event.streams[0]

    //document.getElementById('video').appendChild(el)
    //const video = document.getElementById('cameraVideoElement');
    //////const videoTracks = stream.getVideoTracks();
    //const stream = event.streams[0]
    //////console.log('Got stream with constraints:', constraints);
    //////console.log(`Using video device: ${videoTracks[0].label}`);
    //window.stream = stream; // make variable available to browser console
    //video.srcObject = stream;
    //video.autoplay = true
//  //  
    //var canvas = document.getElementById('canvas');
    //var ctx    = canvas.getContext('2d');
//
//
//
    //video.addEventListener('play', () => {
    //    console.log("on video.addEventListener (not on canvasHandler)");
    //    function step() {
    //        console.log("on step (not on canvasHandler)");
    //      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    //      requestAnimationFrame(step)
    //      //setTimeout(step, 1000 / 30); // drawing at 30fps
    //    }
    //    requestAnimationFrame(step)
    //    //setTimeout(step, 1000 / 30); // drawing at 30fps
    //  })

}

window.startSession = () => {
    //const sd = document.getElementById('remoteSessionDescription').value
    //if (sd === '') {
    //  return alert('Session Description must not be empty')
    //}
    try {
      pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(sd))))
    } catch (e) {
      alert(e)
    }
}

socket = new WebSocket("ws://raspberrypi:3000/api");

function isConnectedToPhysicalJabutiViaWebsockets() {
  return canvasHandler.usingCamera && socket.readyState === WebSocket.OPEN
}

socket.onopen = function(e) {
    console.log("[socket.onopen] Connection to server stablished");

    pc.createOffer().then(d => {
        pc.setLocalDescription(d)
        //console.log("sending message: " + JSON.stringify(d))
        console.log("sending 'a' message")
        socket.send(msgtype_sdpOffer + JSON.stringify(d))
    }).catch(console.log)

};

socket.onmessage = function(event) {
    //console.log("[socket.onmessage]");
    //console.log(`Data received from server: ${event.data}`);

    message = event.data
    msgtype = message[0]

    if(msgtype == msgtype_sdpAnswer) {
        //console.log("msgtype_sdpAnswer detected")
        console.log("message 'b' received")

        answer = message.substring(1)

        console.log("setting remote description")

        pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(answer)))

    }

    if(msgtype == msgtype_callbackMovedForward) {
      setTimeout(callbackFunctionToResumeCodeExecution, 0);
    }

    if(msgtype == msgtype_callbackMovedLeft) {
      setTimeout(callbackFunctionToResumeCodeExecution, 0);
    }

    if(msgtype == msgtype_callbackMovedRight) {
      setTimeout(callbackFunctionToResumeCodeExecution, 0);
    }

};

socket.onclose = function(event) {
    if(event.wasClean) {
        console.log(`[socket.onclose] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log(`[socket.onclose] Connection died, code=${event.code} reason=${event.reason}`);
    }
};

socket.onerror = function(error) {
    console.log("[socket.onerror]: " + error.message);
};

callbackFunctionToResumeCodeExecution = undefined

function sendCommand_moveForward(callback) {
  socket.send(msgType_commandMoveForward);

  callbackFunctionToResumeCodeExecution = callback;
}

function sendCommand_moveLeft(callback) {
  socket.send(msgType_commandMoveLeft);

  callbackFunctionToResumeCodeExecution = callback;
}

function sendCommand_moveRight(callback) {
  socket.send(msgType_commandMoveRight);

  callbackFunctionToResumeCodeExecution = callback;
}