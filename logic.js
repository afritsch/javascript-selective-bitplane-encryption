var imageData;

$(document).ready(function(){
	canvas1 = document.getElementById("canvas1");
	context1 = canvas1.getContext("2d");	
	canvas2 = document.getElementById("canvas2");
	context2 = canvas2.getContext("2d");	
	canvas3 = document.getElementById("canvas3");
	context3 = canvas3.getContext("2d");	
	
	img = new Image();
	img.src = "lenna.png";
	canvas1.width = canvas2.width = canvas3.width = img.width;
	canvas1.height = canvas2.height = canvas3.height = img.height;

	context1.drawImage(img, 0, 0);
	context2.drawImage(img, 0, 0);
	context3.drawImage(img, 0, 0);
	
	imageData = context1.getImageData(0, 0, img.width, img.height);
  	makeEncryption(1);
	context2.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
  	console.log('bild 2 fertig');
	
	imageData = context1.getImageData(0, 0, img.width, img.height);
	makeEncryption(4);
	context3.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
	console.log('bild 3 fertig');
});

function makeEncryption(level) {
	for (var i = 0; i < imageData.width*imageData.height*4; i += 4) {        
	    var binaryR, binaryG, binaryB;
	    
	    binaryR = imageData.data[i].toString(2).split('');	  
	    binaryG = imageData.data[i+1].toString(2).split('');	  
	    binaryB = imageData.data[i+2].toString(2).split('');	 
	    
	    for (var j = 0; j < level; j++) {
	      binaryR[j] = binaryG[j] = binaryB[j] = Math.round(Math.random());
	    }
    
	    binaryR = binaryR.join('');
	    binaryG = binaryG.join('');
	    binaryB = binaryB.join('');
	    
	    imageData.data[i] = parseInt(binaryR, 2);
	    imageData.data[i+1] = parseInt(binaryG, 2);
	    imageData.data[i+2] = parseInt(binaryB, 2);
	}
}