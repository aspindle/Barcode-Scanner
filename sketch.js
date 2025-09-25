function setup() { //setup needed for p5.js

    noCanvas();
    //const video = createCapture(VIDEO);
    //  const mynewvideo = document.getElementById('mynewvideo');
    //  mynewvideo = video;
    //video.size(480,320);
    //video.class('myvideo');
    //  console.log(video.id);
    //end of p5js code

    /*
    document.getElementById('geolocate').addEventListener('click', () => {

    if ('geolocation' in navigator) {
        console.log('location available');
        navigator.geolocation.getCurrentPosition( position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = lon;

            
        });

    } else {
        console.log('location not available');
    }
    });*/

    document.getElementById('save').addEventListener('click', () => {
    //console.log("saving");

    async function foo() {
        const barcode = document.getElementById('barcode').value;
        //const lat = document.getElementById("latitude").textContent;
        //const lon = document.getElementById("longitude").textContent;
        //video.loadPixels();
        //const image64 = video.canvas.toDataURL();
        const data = {barcode};
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/api', options);
        const data2 = await response.json();
        console.log(data2); 
    }
    foo();
                

    });



    var _scannerIsRunning = false;

    function startScanner() {
        console.log("initializing...");
        const quaggaConf = {
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#forquagga'),
                constraints: {
                    width: 480,
                    height: 320,
                    facingMode: "environment"
                },
            },
            decoder: {
                readers: [
                    "code_128_reader",
                    "ean_reader",
                    "ean_8_reader",
                    "code_39_reader",
                    "code_39_vin_reader",
                    "codabar_reader",
                    "upc_reader",
                    "upc_e_reader",
                    "i2of5_reader"
                ],
                debug: {
                    showCanvas: true,
                    showPatches: true,
                    showFoundPatches: true,
                    showSkeleton: true,
                    showLabels: true,
                    showPatchLabels: true,
                    showRemainingPatchLabels: true,
                    boxFromPatches: {
                        showTransformed: true,
                        showTransformedBox: true,
                        showBB: true
                    }
                }
            },

        };
        
        Quagga.init(quaggaConf, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("Initialization finished. Starting");
            Quagga.start();
            _scannerIsRunning = true;
        });
        

            

           
            
        
        /*
        Quagga.onProcessed(function (result) {
            var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    result.boxes.filter(function (box) {
                        return box !== result.box;
                    }).forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                    });
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
                }
            }
        });*/
        

        Quagga.onDetected(function (result) {
            document.getElementById('barcode').value = result.codeResult.code;
            alert("detected barcode: " + result.codeResult.code);
        });
    }



    // Start/stop scanner
    document.getElementById("btn").addEventListener("click", function () {
        if (_scannerIsRunning) {
            Quagga.stop();
            _scannerIsRunning = false;
        } else {
            startScanner();
        }
    }, false);


}