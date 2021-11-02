/**
 * Simple function that converts a plain SVG string or SVG DOM Node into an image with custom dimensions.
 * 
 * @param {Object} settings The configuration object to override the default settings.
 * @see https://ourcodeworld.com/articles/read/1456/how-to-convert-a-plain-svg-string-or-svg-node-to-an-image-png-or-jpeg-in-the-browser-with-javascript
 * @returns {Promise}
 */
 function SVGToPNG(settings){
    let _settings = {
        svg: null,
        // Usually all SVG have transparency, so PNG is the way to go by default
        mimetype: "image/png",
        quality: 0.92,
        width: "auto",
        height: "auto",
        outputFormat: "base64"
    };

    // Override default settings
    for (let key in settings) { _settings[key] = settings[key]; }

    return new Promise(function(resolve, reject){
        let svgNode;

        // Create SVG Node if a plain string has been provided
        if(typeof(_settings.svg) == "string"){
            // Create a non-visible node to render the SVG string
            let SVGContainer = document.createElement("div");
            SVGContainer.style.display = "none";
            SVGContainer.innerHTML = _settings.svg;
            svgNode = SVGContainer.firstElementChild;
        }else{
            svgNode = _settings.svg;
        }

        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d'); 

        let svgXml = new XMLSerializer().serializeToString(svgNode);
        let svgBase64 = "data:image/svg+xml;base64," + btoa(svgXml);

        const image = new Image();

        image.onload = function(){
            let finalWidth, finalHeight;

            // Calculate width if set to auto and the height is specified (to preserve aspect ratio)
            if(_settings.width === "auto" && _settings.height !== "auto"){
                finalWidth = (this.width / this.height) * _settings.height;
            // Use image original width
            }else if(_settings.width === "auto"){
                finalWidth = this.naturalWidth;
            // Use custom width
            }else{
                finalWidth = _settings.width;
            }

            // Calculate height if set to auto and the width is specified (to preserve aspect ratio)
            if(_settings.height === "auto" && _settings.width !== "auto"){
                finalHeight = (this.height / this.width) * _settings.width;
            // Use image original height
            }else if(_settings.height === "auto"){
                finalHeight = this.naturalHeight;
            // Use custom height
            }else{
                finalHeight = _settings.height;
            }

            // Define the canvas intrinsic size
            canvas.width = finalWidth;
            canvas.height = finalHeight;

            // Render image in the canvas
            context.drawImage(this, 0, 0, finalWidth, finalHeight);

            if(_settings.outputFormat == "blob"){
                // Fullfil and Return the Blob image
                canvas.toBlob(function(blob){
                    resolve(blob);
                }, _settings.mimetype, _settings.quality);
            }else{
                // Fullfil and Return the Base64 image
                resolve(canvas.toDataURL(_settings.mimetype, _settings.quality));
            }
        };

        // Load the SVG in Base64 to the image
        image.src = svgBase64;
    });
}

// SVGToPNG({
//     // 1. Provide the SVG
//     svg: `<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"> <path d="M1585 1215q-39 125-123 250-129 196-257 196-49 0-140-32-86-32-151-32-61 0-142 33-81 34-132 34-152 0-301-259-147-261-147-503 0-228 113-374 113-144 284-144 72 0 177 30 104 30 138 30 45 0 143-34 102-34 173-34 119 0 213 65 52 36 104 100-79 67-114 118-65 94-65 207 0 124 69 223t158 126zm-376-1173q0 61-29 136-30 75-93 138-54 54-108 72-37 11-104 17 3-149 78-257 74-107 250-148 1 3 2.5 11t2.5 11q0 4 .5 10t.5 10z"/> </svg>`,
//     // 2. Provide the format of the output image
//     mimetype: "image/png",
//     // 3. Provide the dimensions of the image if you want a specific size.
//     //  - if they remain in auto, the width and height attribute of the svg will be used
//     //  - You can provide a single dimension and the other one will be automatically calculated
//     // width: "auto",
//     // height: "auto",
//     width: 500,
//     height: 500,
//     // 4. Specify the quality of the image
//     quality: 1,
//     // 5. Define the format of the output (base64 or blob)
//     outputFormat: "base64"
// }).then(function(outputData){
//     // If using base64 (outputs a DataURL)
//     //  data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0...
//     // Or with Blob (Blob)
//     //  Blob {size: 14353, type: "image/png"}
//     console.log(outputData);
//     document.getElementById('img').src = outputData;
// }).catch(function(err){
//     // Log any error
//     console.log(err);
// });
export default SVGToPNG;