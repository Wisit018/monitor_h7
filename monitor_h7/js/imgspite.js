// JavaScript Document

function spImage(img,w,h,row,colum,context)
{
	this.posX=0;
	this.posY=0;

	this.row=row;
	this.colum=colum;
	this.sizeW=w;
	this.sizeH=h;
	this.keyframe=colum;
	this.enable=true;
	this.status=0;
		
	this.ctxP=context;

	this.im=new Image();
	this.im.src=img;
	


	spImage.prototype.changeImage=function(img)
	{
		this.im.src=img;

	}
	
	spImage.prototype.setBlink=function()
	{
		this.enable=!this.enable;
	}
	spImage.prototype.setEnable=function(status)
	{
		this.enable=status;
	}	
	spImage.prototype.setSize=function(sw,sh)
	{
		this.sizeW=sw;
		this.sizeH=sh;
	}
	
	spImage.prototype.setX=function(x){
		this.posX=x;
	}
	
	spImage.prototype.setY=function(y){
		this.posY=y;
	}
	
	spImage.prototype.setPos=function(x,y){
		this.posX=x;
		this.posY=y;
		
	}
	
	spImage.prototype.setFrame=function(f){
		this.keyframe=f;
	}
	
	spImage.prototype.draw=function(){
		var sx=this.colum,sy=this.row;
		if (this.row>1)
			sy=this.keyframe;
		if (this.colum>1)
			sx=this.keyframe;
			
		if (this.enable)
		{
			this.ctxP.drawImage(this.im,((sx-1)*this.sizeW),((sy-1)*this.sizeH),this.sizeW,this.sizeH,this.posX,this.posY,this.sizeW,this.sizeH);
			this.ctxP.restore();
		}
			
	}
	spImage.prototype.clearImg=function(){
			this.ctxP.clearRect(this.posX,this.posY,this.sizeW,this.sizeH);
			this.ctxP.restore();
	}
	spImage.prototype.rotate=function(angle)
	{
		this.ctxP.save();  
		this.ctxP.rotate(angle);
	}
	
	spImage.prototype.drawon=function(x,y,frame)
	{
		this.posX=x;
		this.posY=y;
		this.keyframe=frame;	
		this.draw();
	}
	
	spImage.prototype.onClick=function(mx,my)
	{
		if (mx>=this.posX && mx<=this.posX + this.sizeW)
		 if (my>=this.posY && my<=this.posY + this.sizeH)
				return true;
		
		return false;
	}
	
	// collision
	spImage.prototype.onHit=function(object)
	{

	}
	
	var TO_RADIANS = Math.PI/180; 
	 spImage.prototype.drawRotatedImage=function(angle)
	{ 
		// save the current co-ordinate system 
		// before we screw with it
		this.ctxP.save(); 
	
		// move to the middle of where we want to draw our image
		this.ctxP.translate(this.posX+(this.im.width/2), this.posY+(this.im.height/2));
	
		// rotate around that point, converting our 
		// angle from degrees to radians 
		this.ctxP.rotate(angle * TO_RADIANS);
	
		// draw it up and to the left by half the width
		// and height of the image 
		this.ctxP.drawImage(this.im, -(this.im.width/2), -(this.im.height/2));
	
		// and restore the co-ords to how they were when we began
		this.ctxP.restore(); 
	}

}

