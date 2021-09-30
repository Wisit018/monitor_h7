// JavaScript Document
var scale_y=10;
var margin=60;
function scaleLine(n,off)
{
	var gp=250/2;
	var sy;
	var nline=parseInt(canvas.width/gp)+1;
	//ctx_bg.globalAlpha=0.2;
	var y1,y2;
	for (nn=0;nn<n;nn++) // count total graph ** vertical
	{
		sy=(nn+1)*picY; //110
		for (i=0;i<7;i++) // draw 7 line by 1 graph
		{
			var nx=(nline-1)*gp;
			var scy;
			scy=sy-(scale_y*4)+scale_y*i+10;	
			//scy=sy-ecgScale/3;
			//var scy=6*(i+1)+(sy+picY/2)+6;

			if (i==0)
			{
				y1=scy;
				g_pos[nn].min_y=y1-off;
				//drawTxt(g_pos[nn].min_y,50,g_pos[nn].min_y,14,"#FFFFFF")
			}
			if (i==6)
			{
				y2=scy;
				g_pos[nn].max_y=y2-off;
				//drawTxt(g_pos[nn].max_y,50,g_pos[nn].max_y,14,"#FFFFFF")
			}
			ctx_line.beginPath();
			ctx_line.lineWidth = 1;
			ctx_line.strokeStyle = "rgba(207,255,199,0.2)";
			ctx_line.moveTo(margin,scy-off);
			ctx_line.lineTo(nx+margin,scy-off);
			ctx_line.stroke();
		}
		for (i=0;i<nline;i++)
		{
			var nx=i*gp;
			ctx_line.beginPath();
			ctx_line.lineWidth = 1;
			ctx_line.strokeStyle = "rgba(207,255,199,0.2)";
			ctx_line.moveTo(nx+margin,y1-off);
			ctx_line.lineTo(nx+margin,y2-off);
			ctx_line.stroke();
		}
	}
	
}