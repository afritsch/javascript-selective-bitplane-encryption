$(document).ready(function(){
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	context.b
	
	img = new Image();
	img.src = "lenna.png";
	canvas.width = img.width;
	canvas.height =img.height;
	
	context.drawImage(img,0,0);
});