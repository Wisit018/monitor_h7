class myCanvas{
    constructor(canvas_id,cv_width,cv_height,bg_color="#FFFFFF",cv_top=0){
        this.cv = document.getElementById(canvas_id);
        this.cv.width = cv_width;
        this.cv.height = cv_height;
        this.cv.style.backgroundColor = bg_color;
        this.cv.style.top = cv_top;
        this.ctx = this.cv.getContext("2d");
    }
    fillStyle = function(color){
        this.ctx.fillStyle = color;
    }
    box = function(left_x,top_y,width,height){
        this.ctx.fillRect(left_x, top_y, width, height);
    }
    line = function(x1,y1,x2,y2,color="#000000"){
        this.ctx.moveTo(x1,y1);
        this.ctx.lineTo(x2,y2);
        this.ctx.strokeStyle  = color;       
        this.ctx.stroke();
    }
    circle = function(left_x,top_y,size){
        this.ctx.beginPath();
        this.ctx.arc(left_x,top_y,size,0,2 * Math.PI);
        this.ctx.stroke();
    }
}