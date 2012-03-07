var modifiedImageData;
var rawImageData; 

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
	console.log('drawing image 1');
	
	context2.drawImage(img, 0, 0);
	context3.drawImage(img, 0, 0);
	
	rawImageData = modifiedImageData = context1.getImageData(0, 0, img.width, img.height);
  makeEncryption(1);
	context2.putImageData(modifiedImageData, 0, 0);
  console.log('drawing image 2');

	makeEncryption(4);
	context3.putImageData(modifiedImageData, 0, 0);
	console.log('drawing image 3');
});

function makeEncryption(level) {
	for(var i = 0; i < rawImageData.width*rawImageData.height*4; i += 4) {           
		var binaryR = rawImageData.data[i].toString(2).split('');	  
		var binaryG = rawImageData.data[i+1].toString(2).split('');	  
		var binaryB = rawImageData.data[i+2].toString(2).split('');	 
		
		for (var j = 0; j < level; j++)
			binaryR[j] = binaryG[j] = binaryB[j] = Math.round(Math.random());
		
		binaryR = binaryR.join('');
		binaryG = binaryG.join('');
		binaryB = binaryB.join('');
		
		modifiedImageData.data[i] = parseInt(binaryR, 2);
		modifiedImageData.data[i+1] = parseInt(binaryG, 2);
		modifiedImageData.data[i+2] = parseInt(binaryB, 2);
	}
}