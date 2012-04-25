var imageData;
var imageToDrawWith = 'images/lenna.png';

$(document).ready(function() {
  canvas1 = document.getElementById('canvas1');
  context1 = canvas1.getContext('2d');
  canvas2 = document.getElementById('canvas2');
  context2 = canvas2.getContext('2d');
  canvas3 = document.getElementById('canvas3');
  context3 = canvas3.getContext('2d');
  
  img = new Image();
  $(img).attr('src', imageToDrawWith).load(function() {
    canvas1.width = canvas2.width = canvas3.width = img.width;
    canvas1.height = canvas2.height = canvas3.height = img.height;
  
    context1.drawImage(img, 0, 0);
    console.log('drawing image 1');
    context2.drawImage(img, 0, 0);
    context3.drawImage(img, 0, 0);
  });
  
  $('input:button[name*="submit"]').click(function() {
    var numberOfCanvas = parseInt(this.name[6]);
    var selectedBits = new Array();
    for(var i = 0; i < 8 ; i++){
      if( $('input[name="' + numberOfCanvas + 'bit' + i + '"]').is(':checked') ){
        selectedBits.push(i);
      }
    }
    processImage(numberOfCanvas, selectedBits);
  });
  
  $('input:button[name*="bitplane"]').click(function() {
    var numberOfCanvas = parseInt(this.name[8]);
    var bitplaneNumber = parseInt($('input:radio[name="bitplane' + numberOfCanvas + '"]:checked').val());
    var colorMode = $('input:radio[name="colormode' + numberOfCanvas + '"]:checked').val();
    processImage(numberOfCanvas, [], true, bitplaneNumber, colorMode);
  });
  
  $('input:button[name*="replacementAttack"]').click(function() {
    var numberOfCanvas = parseInt(this.name[17]);
    var selectedBits = new Array();
    for(var i = 0; i < 8 ; i++){
      if( $('input[name="' + numberOfCanvas + 'replacementAttackBitplane' + i + '"]').is(':checked') ){
        selectedBits.push(i);
      }
    }
    
    if(!selectedBits.length){
    	alert("Please choose a bitplane to replace!");
    	return;
    }
    
    var replacementAttackMode = $('input:radio[name="replacementAttackMode' + numberOfCanvas + '"]:checked').val();
    replacementAttack(numberOfCanvas, selectedBits, replacementAttackMode);
   });
});

function replacementAttack(numberOfCanvas, selectedBits, replacementAttackMode) {
  switch(numberOfCanvas){
    case 2:
      imageData = context2.getImageData(0, 0, img.width, img.height);
      break;
    case 3:
      imageData = context3.getImageData(0, 0, img.width, img.height);
      break;
    default:
      console.log('Replacement Attack invalid canvas number!');
      break;
  }
	
  for( var i = 0; i < imageData.width * imageData.height * 4; i += 4) {
    var binaryR = make8Bit(imageData.data[i].toString(2)).split('');
    var binaryG = make8Bit(imageData.data[i + 1].toString(2)).split('');
    var binaryB = make8Bit(imageData.data[i + 2].toString(2)).split('');
		var average;
		var luminanceCorrection = 0;

		for(var j = 0; j < selectedBits.length; j++){
			var bitplane = 7-parseInt(selectedBits[j]);

	    switch(replacementAttackMode) {
	      case 'neighbour':
	      	if(i == 0){        													//top-left
	      		average = (imageData.data[i+4]+
	            imageData.data[i+imageData.width*4+4]+
	            imageData.data[i+imageData.width+4])/3;
	      	}
	      	else if(i <= imageData.width*4 - 4){      	//top
	        	average = (imageData.data[i-4]+
	            imageData.data[i+4]+
	            imageData.data[i+imageData.width*4]+
	            imageData.data[i+imageData.width*4-4]+
	            imageData.data[i+imageData.width*4+4])/5;
	      	}
	      	else if(bitplane == imageData.width*4){						//top-right
	        	average = (imageData.data[i-4]+
	            imageData.data[i+imageData.width*4]+
	            imageData.data[i+imageData.width*4-4])/3;
	      	}
	      	else if(i == imageData.width*imageData.height*4-imageData.width*4+4){     //bottom-left
	      		average = (imageData.data[i+4]+
	            imageData.data[i-imageData.width*4]+
	            imageData.data[i-imageData.width*4+4])/3;
	      	}
	      	else if(i == imageData.width*imageData.height*4-4){      									//bottom-right
	      		average = (imageData.data[i-4]+
	            imageData.data[i-imageData.width*4]+
	            imageData.data[i-imageData.width*4-4])/3;
	      	}
	      	else if(i > imageData.width*imageData.height*4-imageData.width*4){      	//bottom
	      		average = (imageData.data[i-4]+
	            imageData.data[i+4]+
	            imageData.data[i-imageData.width*4]+
	            imageData.data[i-imageData.width*4-4]+
	            imageData.data[i-imageData.width*4+4])/5;
	      	}
	      	else if(i%(imageData.width*4+4) == 0){      	//left
	        	average = (imageData.data[i+4]+
	            imageData.data[i-imageData.width*4]+
	            imageData.data[i+imageData.width*4*4]+
	            imageData.data[i+imageData.width*4+4]+
	            imageData.data[i-imageData.width*4+4])/5;
	      	}
	      	else if(i%(imageData.width*4) == 0){      		//right
	        	average = (imageData.data[i-4]+
	            imageData.data[i-imageData.width*4]+
	            imageData.data[i+imageData.width*4]+
	            imageData.data[i+imageData.width*4-4]+
	            imageData.data[i-imageData.width*4-4])/5;
	      	}
	      	else{          																//middle
	      		average = (imageData.data[i-4]+
	            imageData.data[i+4]+
	            imageData.data[i-imageData.width*4]+
	            imageData.data[i+imageData.width*4]+
	            imageData.data[i+imageData.width*4-4]+
	            imageData.data[i+imageData.width*4+4]+
	            imageData.data[i-imageData.width*4-4]+
	            imageData.data[i-imageData.width*4+4])/8;
	        }
	
	        average = make8Bit(Math.round(average).toString(2)).split("");
	        binaryR[bitplane] = binaryG[bitplane] = binaryB[bitplane] = average[bitplane]; 
	        break;
	      case '1':
	        binaryR[bitplane] = binaryG[bitplane] = binaryB[bitplane] = 1;
	        luminanceCorrection += Math.pow(2, bitplane)/2;
	        break;
	      case '0':
	        binaryR[bitplane] = binaryG[bitplane] = binaryB[bitplane] = 0;
	        luminanceCorrection += Math.pow(2, bitplane)/2;
	        break;
	      default:
	        console.log('Invalid Replacement Mode!');
	        return;
	    }
	  }
    
    binaryR = parseInt(binaryR.join(''), 2);
    binaryG = parseInt(binaryG.join(''), 2);
    binaryB = parseInt(binaryB.join(''), 2);

		//adding the lumiance value of the hole picture to the result of the replacementattack
    if(replacementAttackMode == 0 || replacementAttackMode == 1){
			if(!replacementAttackMode)
				luminanceCorrection*=-1;

			binaryR += luminanceCorrection; 
			binaryG += luminanceCorrection;
			binaryB += luminanceCorrection;
		}
		
    imageData.data[i] = binaryR;
    imageData.data[i + 1] = binaryG;
    imageData.data[i + 2] = binaryB;
  }
  
  switch(numberOfCanvas) {
    case 2:
      context2.putImageData(imageData, 0, 0);
      console.log('drawn image 2');
      break;
    case 3:
      context3.putImageData(imageData, 0, 0);
      console.log('drawn image 3');
      break;
    default:
      console.log('Can not find the right canvas!');
      break;
  }
}

function processImage(numberOfCanvas, selectedBits, isBitplane, bitplaneNumber, colorMode) {
  imageData = context1.getImageData(0, 0, img.width, img.height);
  isBitplane = isBitplane ? true : false;

  switch(isBitplane) {
    case true:
      makeBitplane(bitplaneNumber, colorMode);
      break;
    case false:
      makeEncryption(numberOfCanvas, selectedBits);
      break;
    default:
      console.log('Can not parse isBitplane: ' + isBitplane);
      break;
  }

  switch(numberOfCanvas) {
    case 2:
      context2.putImageData(imageData, 0, 0);
      console.log('drawn image 2');
      break;
    case 3:
      context3.putImageData(imageData, 0, 0);
      console.log('drawn image 3');
      break;
    default:
      console.log('Can not find the right canvas!');
      break;
  }
}

function make8Bit(binaryString) {
  for( var i = 0; 8 - binaryString.length; i++)
    binaryString = '0' + binaryString;
  return binaryString;
}

function makeEncryption(numberOfCanvas, selectedBits) {
  console.log('encryption start');

  // AES key generation
 // var key = new Array(128);
  //for( var i = 0; i < 32; i++)
    //key[i] = i;

  var isBlackWhite = $('input[name="sw' + numberOfCanvas + '"]').is(':checked') ? true : false;
  for( var i = 0; i < imageData.width * imageData.height * 4; i += 4) {
    if(isBlackWhite) {
      var average = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = average;
    }

    var binaryR = make8Bit(imageData.data[i].toString(2)).split('');
    var binaryG = make8Bit(imageData.data[i + 1].toString(2)).split('');
    var binaryB = make8Bit(imageData.data[i + 2].toString(2)).split('');

    for(var j = 0; j < selectedBits.length; j++){
      var bitplane = 7-parseInt(selectedBits[j]);
      binaryR[bitplane] = binaryG[bitplane] = binaryB[bitplane] = Math.round(Math.random());
    }

    binaryR = binaryR.join('');
    binaryG = binaryG.join('');
    binaryB = binaryB.join('');

    imageData.data[i] = parseInt(binaryR, 2);
    imageData.data[i + 1] = parseInt(binaryG, 2);
    imageData.data[i + 2] = parseInt(binaryB, 2);
  }
  console.log('encryption end');
}

function makeBitplane(bitplaneNumber, colorMode) {
  console.log('bitplane start');

  for( var i = 0; i < imageData.width * imageData.height * 4; i += 4) {
    if(colorMode == 'bw') {
      var average = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = average;
      // Because every channel gets the same value so it doesn't matter where we
      // get our bits out
      colorMode = 'red';
    }

    var binaryR = make8Bit(imageData.data[i].toString(2)).split("");
    var binaryG = make8Bit(imageData.data[i + 1].toString(2)).split("");
    var binaryB = make8Bit(imageData.data[i + 2].toString(2)).split("");

    switch(colorMode) {
      case 'red':
        for( var j = 0; j < 8; j++)
          binaryR[j] = binaryG[j] = binaryB[j] = binaryR[7-bitplaneNumber];
        break;
      case 'green':
        for( var j = 0; j < 8; j++)
          binaryR[j] = binaryG[j] = binaryB[j] = binaryG[7-bitplaneNumber];
        break;
      case 'blue':
        for( var j = 0; j < 8; j++)
          binaryR[j] = binaryG[j] = binaryB[j] = binaryB[7-bitplaneNumber];
        break;
      default:
        console.log('Can\'t find color!');
        break;
    }

    binaryR = binaryR.join('');
    binaryG = binaryG.join('');
    binaryB = binaryB.join('');

    imageData.data[i] = parseInt(binaryR, 2);
    imageData.data[i + 1] = parseInt(binaryG, 2);
    imageData.data[i + 2] = parseInt(binaryB, 2);
  }
  console.log('bitplane end');
}
