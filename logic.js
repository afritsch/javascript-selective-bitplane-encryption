$(document).ready(function(){
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	img = new Image();
	img.src = "lenna.png";
	canvas.width = img.width;
	canvas.height = img.height;

	context.drawImage(img,0,0);
	var imageData = context.getImageData(0,0, img.width, img.height);
	
	for (i=0; i<imageData.width*imageData.height*4; i+=4){        
        var red = imageData.data[i];	  
        var green = imageData.data[i+1];	  
        var blue = imageData.data[i+2];	 
        var alpha = imageData.data[i+3];
        
        var average = (red+green+blue)/3;
        
        imageData.data[i] = average;	  
        imageData.data[i+1] = average;	  
        imageData.data[i+2] = average;	 
        imageData.data[i+3] = alpha;
	}
	
	context.putImageData(imageData,0,0,0,0, imageData.width,   imageData.height); 
	
	//alert(alpha.toString(2));
}); 