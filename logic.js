$(document).ready(function() {

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	img = new Image();
	img.src = "lenna.png";
	canvas.width = img.width;
	canvas.height = img.height;

	context.drawImage(img, 0, 0);
	var imageData = context.getImageData(0, 0, img.width, img.height);
	
	for (i = 0; i < imageData.width*imageData.height*4; i += 4) {        
    
    var binaryR, binaryG, binaryB;
    
    binaryR = imageData.data[i].toString(2).split('');	  
    binaryG = imageData.data[i+1].toString(2).split('');	  
    binaryB = imageData.data[i+2].toString(2).split('');	 
    
    binaryR[0] = binaryG[0] = binaryB[0] = '0';
    binaryR[1] = binaryG[1] = binaryB[1] = '0';
    
    binaryR = binaryR.join('');
    binaryG = binaryG.join('');
    binaryB = binaryB.join('');
    
    imageData.data[i] = parseInt(binaryR, 2);
    imageData.data[i+1] = parseInt(binaryG, 2);
    imageData.data[i+2] = parseInt(binaryB, 2);
	}
	
	context.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
  
  console.log('fertig');
}); 