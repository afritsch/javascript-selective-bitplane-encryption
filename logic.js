var imageData;

$(document).ready(function(){
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	img = new Image();
	img.src = "lenna.png";
	canvas.width = img.width;
	canvas.height = img.height;

	context.drawImage(img, 0, 0);
	imageData = context.getImageData(0, 0, img.width, img.height);
	
  makeEncryption(4);
	context.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
  
  console.log('fertig');
});

function makeEncryption(level) {
	for (i = 0; i < imageData.width*imageData.height*4; i += 4) {        
    
    var binaryR, binaryG, binaryB;
    
    binaryR = imageData.data[i].toString(2).split('');	  
    binaryG = imageData.data[i+1].toString(2).split('');	  
    binaryB = imageData.data[i+2].toString(2).split('');	 
    
    for (i = 0; i < level; i++) {
      binaryR[i] = binaryG[i] = binaryB[i] = Math.round(Math.random());
    }
    
    binaryR = binaryR.join('');
    binaryG = binaryG.join('');
    binaryB = binaryB.join('');
    
    imageData.data[i] = parseInt(binaryR, 2);
    imageData.data[i+1] = parseInt(binaryG, 2);
    imageData.data[i+2] = parseInt(binaryB, 2);
	}
}