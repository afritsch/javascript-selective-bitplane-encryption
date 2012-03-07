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
	}
}); 