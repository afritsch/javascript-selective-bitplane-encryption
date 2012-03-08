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
		
		context1.drawImage(img, 0, 0);
		console.log('drawing image 1');
		context2.drawImage(img, 0, 0);
		context3.drawImage(img, 0, 0);
		
		processImage(2, 1, "msb");
		processImage(3, 4, "msb");
	});
	
	$('input:button').click(function(){
		var number = parseInt(this.name[6]);
		var level = parseInt($('input[name="value' + number + '"]').val());
  	var order = $('input:radio[name="significantbit'+number+'"]:checked').val();
		processImage(number, level, order);
	});
});

function processImage(number, level, order) {  
	imageData = context1.getImageData(0, 0, img.width, img.height);
  makeEncryption(number, level, order);

  switch(number){
    case 2:
      context2.putImageData(imageData, 0, 0);
      console.log('drawing image 2');
      break;
    case 3:
      context3.putImageData(imageData, 0, 0);
      console.log('drawing image 3');
      break;
    default:
    	console.log('no case found');
      break;
  }
}

function makeEncryption(number, level, order){
  console.log('encryption start');
	var isBlackWhite = $('input[name="sw' + number + '"]').is(":checked") ? true : false;

	for(var i = 0; i < imageData.width*imageData.height*4; i += 4) {  
		if(isBlackWhite){
			var average = (imageData.data[i]+imageData.data[i+1]+imageData.data[i+2])/3;	 
			imageData.data[i] = imageData.data[i+1] = imageData.data[i+2] = average;
		}
		         
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
  console.log('encryption end');
}