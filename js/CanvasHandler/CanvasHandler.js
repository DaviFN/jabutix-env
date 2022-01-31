class CanvasHandler {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.simulationWidth = 1920;
        this.simulationHeight = 1200;
        this.setCanvasResolutionToSimulation();
        this.canvas2DCtx = canvas.getContext("2d");
        this.simulation = new Simulation(this);

        this.gamification = new Gamification(this);

        //this.cameraVideoElement = document.getElementById('cameraVideoElement');

        this.usingCamera = false;

        this.viewModeSelectionElement = document.getElementById('viewSelection-jabuti-mode');

        this.viewModeSelectionElement.addEventListener('change', () => {
          var valueSelected = this.viewModeSelectionElement.options[this.viewModeSelectionElement.selectedIndex].value;
          this.usingCamera = valueSelected === "Câmera do jabuti físico";
          if(this.usingCamera) {
            //enableCamera();
          }
          else {
            this.setCanvasResolutionToSimulation();
            //disableCamera();
          }
        });

        let silence = () => {
            let ctx = new AudioContext(), oscillator = ctx.createOscillator();
            let dst = oscillator.connect(ctx.createMediaStreamDestination());
            oscillator.start();
            return Object.assign(dst.stream.getAudioTracks()[0], {enabled: false});
          }
          
          let black = ({width = 640, height = 480} = {}) => {
            let canvas = Object.assign(document.createElement("canvas"), {width, height});
            canvas.getContext('2d').fillRect(0, 0, width, height);
            let stream = canvas.captureStream();
            return Object.assign(stream.getVideoTracks()[0], {enabled: false});
          }
          
          let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
          
          //video.srcObject = blackSilence();
        
        this.cameraTrack = this.getCanvasTrack();
        //this.cameraTrack = blackSilence.stream;
        this.processor = new MediaStreamTrackProcessor(this.cameraTrack);
        this.reader = this.processor.readable.getReader();
        //this.cameraVideoElement.srcObject = this.getCanvasTrack();
        //var self = this
        //this.cameraVideoElement.addEventListener('loadeddata', () => {
        //    console.log("on canplay");
        //    //self.cameraVideoElement.play();
        //});
        //this.cameraVideoElement = document.createElement("video");
        //this.cameraVideoElement.autoplay = true
        //this.video = document.createElement("video");
        //this.video.src = "http://techslides.com/demos/sample-videos/small.mp4";
        //var self = this;
        //this.video.addEventListener('loadeddata', function() {
        //    //self.video.play();  // start playing
        //    self.startAnimationLoop(); //Start rendering
        //});

        this.startAnimationLoop();

    }
    setCanvasResolutionToSimulation() {
      this.canvas.width = this.simulationWidth;
      this.canvas.height = this.simulationHeight;
    }
    setCameraStream(stream) {
        console.log("on setCameraStream(stream)");
        //this.cameraVideoElement.srcObject = stream[0];
        this.processor = new MediaStreamTrackProcessor(stream.getVideoTracks()[0]);
        this.reader = this.processor.readable.getReader();
        //this.cameraTrackValid = true;
    }
    //enableCamera() {
    //  this.cameraTrackValid = true;
    //}
    //disableCamera() {
    //  this.cameraTrackValid = false;
    //}
    startAnimationLoop() {

        console.log("on startAnimationLoop");

        var self = this;

        //this.cameraVideoElement.addEventListener('play', () => {
        //    console.log("on event play from cameraVideoElement");
        //    function step() {
        //        console.log("on step");
        //        self.canvas2DCtx.drawImage(self.cameraVideoElement, 0, 0, self.canvas.width, self.canvas.height);
        //      requestAnimationFrame(step)
        //      //setTimeout(step, 1000 / 30); // drawing at 30fps
        //    }
        //    requestAnimationFrame(step)
        //    //setTimeout(step, 1000 / 30); // drawing at 30fps
        //  })


        

        //readChunk();
        //function readChunk() {
          
        //}

        var lastTimeStamp = 0;
        
        function drawFrame(timestamp) {
          //console.log("drawFrame called")

          var dt = timestamp - lastTimeStamp;

          //console.log("usingCamera: " + self.usingCamera)
          if(self.usingCamera) {
            self.reader.read().then( ({ done, value }) => {
                  // the MediaStream video can have dynamic size
                  if(self.canvas.width !== value.displayWidth || self.canvas.height !== value.displayHeight) {
                    if(self.usingCamera) {
                      self.canvas.width = value.displayWidth;
                      self.canvas.height = value.displayHeight;
                    }
                  }
                  //self.canvas.width = 2;
                  //self.canvas.height = 2;

                  //self.canvas2DCtx.clearRect(0, 0, self.canvas.width, self.canvas.height);
                  // value is a VideoFrame

                  //console.log("in self.reader")

                  self.canvas2DCtx.drawImage(value, 0, 0);
                  value.close(); // close the VideoFrame when we're done with it
                  if(!done) {
                    drawFrame();
                  }
                });
            }
            else {
              //console.log(dt);
              self.simulation.draw(dt);
              //self.gamification.draw(dt);
            }

              //self.canvas2DCtx.drawImage(self.cameraVideoElement, 0, 0, self.canvas.width, self.canvas.height);

            requestAnimationFrame(drawFrame);
            //setTimeout(drawFrame, 1000 / 30); // drawing at 30fps
            lastTimeStamp = timestamp;

            }
        ////<video id="cameraVideoElement" autoplay muted playsinline></video>
////
        //setTimeout(drawFrame, 1000 / 30); // drawing at 30fps
        requestAnimationFrame(drawFrame);
        //console.log("calling drawFrame for the first time")
        //drawFrame();
    }

    inputCallback(event) {
      switch(event.keyCode)
        {
            case 37: // left
                this.simulation.map.virtualJabuti.move('left', dummyMovementCallback);
                break;
            case 38: // up
                this.simulation.map.virtualJabuti.move('forward', dummyMovementCallback);
                break;
            case 39: // right
                this.simulation.map.virtualJabuti.move('right', dummyMovementCallback);
                break;
            case 40: // down
                break;
            default:
                break;
        }
    }

    moveJabutiLeft(callback) {

      if(isConnectedToPhysicalJabutiViaWebsockets()) {
          sendCommand_moveLeft(callback);
      }
      else {
          this.simulation.map.virtualJabuti.move('left', callback);
      }

    }

    moveJabutiRight(callback) {

      if(isConnectedToPhysicalJabutiViaWebsockets()) {
        sendCommand_moveRight(callback);
    }
    else {
        this.simulation.map.virtualJabuti.move('right', callback);
    }

    }

    moveJabutiForward(callback) {

      if(isConnectedToPhysicalJabutiViaWebsockets()) {
        sendCommand_moveForward(callback);
    }
    else {
        this.simulation.map.virtualJabuti.move('forward', callback);
    }

    }

    getCanvasTrack() {
        // just some noise...
        const canvas = this.canvas;
        const ctx = this.canvas2DCtx;
        const img = new ImageData(600, 600);
        const data = new Uint32Array(img.data.buffer);
        const track = canvas.captureStream().getVideoTracks()[0];
      
        anim();
        
        return track;
        
        function anim() {
          for(let i=0; i<data.length;i++) {
            data[i] = Math.random() * 0xFFFFFF + 0xFF000000;
          }
          //ctx.putImageData(img, 0, 0);
          if( track.readyState === "live" ) {
            requestAnimationFrame(anim);
          }
        }
        
      }

}