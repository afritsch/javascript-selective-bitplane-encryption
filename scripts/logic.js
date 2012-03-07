var imageData;
var imageToDrawWith = 'images/lenna.png';

$(document).ready(function(){
	canvas1 = document.getElementById("canvas1");
	context1 = canvas1.getContext("2d");
	canvas2 = document.getElementById("canvas2");
	context2 = canvas2.getContext("2d");
	canvas3 = document.getElementById("canvas3");
	context3 = canvas3.getContext("2d");
	
	img = new Image();
	$(img).attr('src', imageToDrawWith).load(function(){
		canvas1.width = canvas2.width = canvas3.width = img.width;
		canvas1.height = canvas2.height = canvas3.height = img.height;
		render();
	});
});

function render(){
	context1.drawImage(img, 0, 0);
	console.log('drawing image 1');
	
	context2.drawImage(img, 0, 0);
	context3.drawImage(img, 0, 0);
	
	imageData = context1.getImageData(0, 0, img.width, img.height);
  makeEncryption(1, "msb");
	context2.putImageData(imageData, 0, 0);
  console.log('drawing image 2');

	imageData = context1.getImageData(0, 0, img.width, img.height);
	makeEncryption(4, "msb");
	context3.putImageData(imageData, 0, 0);
	console.log('drawing image 3');
}

function makeEncryption(level, order){
	for(var i = 0; i < imageData.width*imageData.height*4; i += 4) {           
		var binaryR = imageData.data[i].toString(2).split('');	  
		var binaryG = imageData.data[i+1].toString(2).split('');	  
		var binaryB = imageData.data[i+2].toString(2).split('');	 
		
		if(order == "msb")
			for (var j = 0; j < level; j++)
				binaryR[j] = binaryG[j] = binaryB[j] = Math.round(Math.random());
	  else if(order == "lsb")
			for (var j = 7; j >= 8-level; j--)
				binaryR[j] = binaryG[j] = binaryB[j] = Math.round(Math.random());
		
		binaryR = binaryR.join('');
		binaryG = binaryG.join('');
		binaryB = binaryB.join('');
		
		imageData.data[i] = parseInt(binaryR, 2);
		imageData.data[i+1] = parseInt(binaryG, 2);
		imageData.data[i+2] = parseInt(binaryB, 2);
	}
}