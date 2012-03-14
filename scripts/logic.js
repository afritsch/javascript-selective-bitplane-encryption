var imageData;
var imageToDrawWith = 'images/lenna.png';

$(document).ready(
    function() {
      canvas1 = document.getElementById("canvas1");
      context1 = canvas1.getContext("2d");
      canvas2 = document.getElementById("canvas2");
      context2 = canvas2.getContext("2d");
      canvas3 = document.getElementById("canvas3");
      context3 = canvas3.getContext("2d");

      img = new Image();
      $(img).attr('src', imageToDrawWith).load(function() {
        canvas1.width = canvas2.width = canvas3.width = img.width;
        canvas1.height = canvas2.height = canvas3.height = img.height;

        context1.drawImage(img, 0, 0);
        console.log('drawing image 1');
        context2.drawImage(img, 0, 0);
        context3.drawImage(img, 0, 0);

        // processImage(2, 1, "msb");
        // processImage(3, 4, "msb");
      });

      $('input:button[name*="submit"]').click(
          function() {
            var numberOfCanvas = parseInt(this.name[6]);
            var level = parseInt($('input[name="value' + numberOfCanvas + '"]')
                .val());
            var order = $(
                'input:radio[name="significantbit' + numberOfCanvas
                    + '"]:checked').val();
            processImage(numberOfCanvas, level, order);
          });

      $('input:button[name*="bitplane"]').click(
          function() {
            var numberOfCanvas = parseInt(this.name[8]);
            var bitplaneNumber = parseInt($(
                'input:radio[name="bitplane' + numberOfCanvas + '"]:checked')
                .val());
            processImage(numberOfCanvas, 0, 0, true, bitplaneNumber,
                colorChannel);
          });
    });

function processImage(numberOfCanvas, level, order, isBitplane, bitplaneNumber,
    colorChannel) {
  imageData = context1.getImageData(0, 0, img.width, img.height);
  isBitplane = isBitplane ? true : false;

  switch(isBitplane) {
    case true:
      makeBitplane(bitplaneNumber, colorChannel);
      break;
    case false:
      makeEncryption(numberOfCanvas, level, order);
      break;
    default:
      console.log("Can not parse isBitplane: " + isBitplane);
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
    binaryString = "0" + binaryString;
  return binaryString;
}

function makeEncryption(numberOfCanvas, level, order) {
  console.log('encryption start');
  var isBlackWhite = $('input[name="sw' + numberOfCanvas + '"]').is(":checked") ? true
      : false;

  for( var i = 0; i < imageData.width * imageData.height * 4; i += 4) {
    if(isBlackWhite) {
      var average = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = average;
    }

    var binaryR = make8Bit(imageData.data[i].toString(2)).split("");
    var binaryG = make8Bit(imageData.data[i + 1].toString(2)).split("");
    var binaryB = make8Bit(imageData.data[i + 2].toString(2)).split("");

    if(order == "msb")
      for( var j = 0; j < level; j++)
        binaryR[j] = binaryG[j] = binaryB[j] = Math.round(Math.random());
    else if(order == "lsb")
      for( var j = 7; j >= 8 - level; j--)
        binaryR[j] = binaryG[j] = binaryB[j] = Math.round(Math.random());

    binaryR = binaryR.join('');
    binaryG = binaryG.join('');
    binaryB = binaryB.join('');

    imageData.data[i] = parseInt(binaryR, 2);
    imageData.data[i + 1] = parseInt(binaryG, 2);
    imageData.data[i + 2] = parseInt(binaryB, 2);
  }
  console.log('encryption end');
}
function makeBitplane(bitplaneNumber, colorChannel) {
  console.log('bitplane start');
  // var isBlackWhite = $('input[name="sw' + numberOfCanvas +
  // '"]').is(":checked") ? true : false;

  isBlackWhite = true;
  for( var i = 0; i < imageData.width * imageData.height * 4; i += 4) {
    if(isBlackWhite) {
      var average = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = average;
    }

    var binaryR = make8Bit(imageData.data[i].toString(2)).split("");
    var binaryG = make8Bit(imageData.data[i + 1].toString(2)).split("");
    var binaryB = make8Bit(imageData.data[i + 2].toString(2)).split("");

    // only when having black/white

    switch(colorChannel) {
      case "red":
        for( var j = 0; j < 8; j++)
          binaryR[j] = binaryG[j] = binaryB[j] = binaryR[bitplaneNumber];
        break;
      case "green":
        for( var j = 0; j < 8; j++)
          binaryR[j] = binaryG[j] = binaryB[j] = binaryG[bitplaneNumber];
        break;
      case "blue":
        for( var j = 0; j < 8; j++)
          binaryR[j] = binaryG[j] = binaryB[j] = binaryB[bitplaneNumber];
        break;
      default:
        console.log("Can't find color!");
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
