// JavaScript Document

var ecgScale=128;
var picY=80;
var client;
var lx,ly,spx;
var g_off=30;
var last_update;

var graph_empty=
"0x80808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080";
var g_pos=[
{ id:"G_I",db:"H25",name:"I",x:0,tm:0,min_y:0,max_y:0},
{ id:"G_II",db:"H25",name:"II",x:0,tm:0,min_y:0,max_y:0},
{ id:"G_III",db:"H23",name:"III",x:0,tm:0,min_y:0,max_y:0},
{ id:"G_aVR",db:"H23",name:"aVR",x:0,tm:0,min_y:0,max_y:0},
{ id:"G_aVL",db:"H23",name:"aVL",x:0,tm:0,min_y:0,max_y:0},
{ id:"G_aVF",db:"H23",name:"aVF",x:0,tm:0,min_y:0,max_y:0},
{ id:"G_V",db:"H23",name:"V",x:0,tm:0,min_y:0,max_y:0},
{ id:"G_V2",db:"H23",name:"V2",x:0,tm:0,min_y:0,max_y:0},
{ id:"G_V3",db:"H23",name:"V3",x:0,tm:0,min_y:0,max_y:0},
{ id:"G_V4",db:"H23",name:"V4",x:0,tm:0,min_y:0,max_y:0},
{ id:"G_V5",db:"H23",name:"V5",x:0,tm:0,min_y:0,max_y:0},
{ id:"G_V6",db:"H23",name:"V6",x:0,tm:0,min_y:0,max_y:0},
{ id:"G_SPO2",db:"SP",name:"SPO2",x:0,tm:0,min_y:0,max_y:0}
];

var _ecg=Array(g_pos.length);
var _ecg_tmp=Array(g_pos.length);



function ecg(id,type)
{
	this.id=id;
	var _type=type;
	var pos_y=0;
	var data;
	this.getType=function(){
		return _type;
	}
	this.getGraph=function(){
		//pos_y=0;		
		getGraphH7(client,_type,step,function(d){
			if (d.length<=0 || d==null || d==0){
			data=graph_empty;
			}else{
			data=d;
			}
		});

	}

	this.setData=function(d){
		data=d;
	}
	this.getAlldata=function(){
		return data;
	}

	this.getData=function(i){
		//alert(data[i]);
		pos_y=(data[i])-ecgScale;
		return data[i];
	}
        this.getLength=function(){
            return data.length;
        }
	this.posY=function()
	{
		return pos_y;
	}
}

/*.
 * 
 * Init 
 */
var step=0;
var laststep=0;
var distance=0;
var lasttime;
function getNewStep()
{
		getCurStep(client,function(d){
				//	step=d
				var jss = JSON.stringify(eval('(' + d + ')')); 
 				var arr=[];
				arr=$.parseJSON(jss);
				step=parseInt(arr["curstep"]);
		});
		getLasttime(client,step,"ecg_n",function(d){
			if (d)
			last_update=d;
	});
		if (step>=0)
			step-=10;
			
		if (step<0)
			step=0;
		//else
		//	step=parseInt(laststep);
		//alert(leadLasttime);
}
function init()
{
	initImage();

	scaleLine(g_pos.length-1,g_off);
	
	for (i=0;i<g_pos.length;i++)
	{
        var scy=picY*(i+1)-20;
		_ecg[i]=new ecg(g_pos[i].id,g_pos[i].name);
		_ecg_tmp[i]=new ecg(g_pos[i].id,g_pos[i].name);
		// Graph name
		ctx_txt.fillStyle = "white";
 		ctx_txt.font = "16px Arial";
		if (i<g_pos.length)
		ctx_txt.fillText(g_pos[i].name,5, scy-g_off);
		//ctx_txt.fillText("OK",5, scy-g_off);
		// Amplitude
	
	}
	getNewStep();
	//step=0;
	lx=0;
	//im_back.draw();
	drawAll();
	ecg_rate=60;

	play_ecg_rate();
	tmp_count=10;
	
	getLasttime(client,step,"ecg_n",function(d){
		if (d)
		last_update=d;
	});
}


var tmp_count;
var stepcount;
function native(str) {
  var decoded = atob(str);
  var i, il = decoded.length;
  var array = new Uint8Array(il);

  for (i = 0; i < il; ++i) {
    array[i] = decoded.charCodeAt(i);
  }

  return array;
}
function getNextEcg()
{

	// เรียกข้อมูล laststep ล่าสุด
	getCurStep(client,function(d){	
	if (d)
			{			//	step=d
				var jss = JSON.stringify(eval('(' + d + ')')); 
 				var arr=[];
				arr=$.parseJSON(jss);
				if (parseInt(arr["curstep"])>0){
				laststep=arr["curstep"];
				lasttime=arr["lastTime"];
				}
			}
	 });
	if (parseInt(laststep)>=step)
		distance=parseInt(laststep)-step;
	//		alert(step + " " + laststep);
	if (parseInt(laststep)-step>=30)
	{
		getNewStep();
	}
	// นับถอยหลัง หาก step ไปเร็วกว่า laststep
	if (step>=parseInt(laststep) || (tmp_count>0 && tmp_count<10))
	{
		//alert(step);
		//if (parseInt(laststep)>=step)
		if (tmp_count>0)
			tmp_count--;
		if (tmp_count==0 && step==parseInt(laststep))
		{
			tmp_count=9;
		}

		//step--;
	}else
	{
		step++;
		tmp_count=10;
	}
	// หาก step ช้ากว่า laststep มากกว่า 20 ให้เรียกข้อมูลใหม่
	if ((parseInt(laststep)-step>=20 && _fromstart==false) || tmp_count==0)
	{
		tmp_count=10;
		getNewStep();
	}
	
	if (step>parseInt(laststep)+10)
	{
		//alert(step);
		step=0;
	}

				
	if (step<laststep && tmp_count==10){
			getGraphH7lead(client,step,last_update,function(d){
				var jss = JSON.stringify(eval('(' + d + ')')); 
 				var arr=[];
				arr=$.parseJSON(jss);
				//if (arr["I"].length >249)
				// สลับ I กับ II
				_ecg_tmp[0].setData(native(arr["II"]));
				//if (arr["II"].length >249)
				_ecg_tmp[1].setData(native(arr["I"]));
				//if (arr["III"].length >249)
				_ecg_tmp[2].setData(native(arr["III"]));
				//if (arr["aVR"].length >249)
				_ecg_tmp[3].setData(native(arr["aVR"]));
				//if (arr["aVL"].length >249)
				_ecg_tmp[4].setData(native(arr["aVL"]));
				//if (arr["aVF"].length >249)
				_ecg_tmp[5].setData(native(arr["aVF"]));
				//if (arr["V"].length >249)
				_ecg_tmp[6].setData(native(arr["V"]));
				//if (arr["V2"].length >249)
				_ecg_tmp[7].setData(native(arr["V2"]));
				//if (arr["V3"].length >249)
				_ecg_tmp[8].setData(native(arr["V3"]));
				//if (arr["V4"].length >249)
				_ecg_tmp[9].setData(native(arr["V4"]));
				//if (arr["V5"].length >249)
				_ecg_tmp[10].setData(native(arr["V5"]));
				//if (arr["V6"].length >249)
				_ecg_tmp[11].setData(native(arr["V6"]));
				//if (arr["spo2"].length >249)
				_ecg_tmp[12].setData(native(arr["spo2"]));
				last_update=arr["lastTime"];

			});
		}		
		else
		{
			for(i=0;i<g_pos.length;i++)
				{
					_ecg_tmp[i].setData(graph_empty);
				}
		}


}

function swapECG()
{
	for(i=0;i<g_pos.length;i++)
	{
		_ecg[i].setData(_ecg_tmp[i].getAlldata());
	}	

	//drawAll();
}
function getEcgGraph()
{
		
	var sql;
	sql=" and PACKAGE_STEP=" + step;
	//alert(sql);
	getDataTXT("count(MAX_ADDR)","ECG_Dat",client,sql,function(d){
		stepcount=d
	});
	//alert(stepcount);
			getCurStep(client,function(d){	
				var jss = JSON.stringify(eval('(' + d + ')')); 
 				var arr=[];
				arr=$.parseJSON(jss);
				if (arr["curstep"]){
				laststep=arr["curstep"];
				lasttime=arr["lastTime"];
				}
			});
			

			getGraphH7lead(client,step,last_update,function(d){
				var jss = JSON.stringify(eval('(' + d + ')')); 
 				var arr=[];
				arr=$.parseJSON(jss);
				_ecg[0].setData(native(arr["II"]));
				_ecg[1].setData(native(arr["I"]));
				_ecg[2].setData(native(arr["III"]));
				_ecg[3].setData(native(arr["aVR"]));
				_ecg[4].setData(native(arr["aVL"]));
				_ecg[5].setData(native(arr["aVF"]));
				_ecg[6].setData(native(arr["V"]));
				_ecg[7].setData(native(arr["V2"]));
				_ecg[8].setData(native(arr["V3"]));
				_ecg[9].setData(native(arr["V4"]));
				_ecg[10].setData(native(arr["V5"]));
				_ecg[11].setData(native(arr["V6"]));
				_ecg[12].setData(native(arr["spo2"]));
				last_update=arr["lastTime"];
			});
		

}



var spi;
function drawing()
{

	var i;
    i=0;
	spi=0;
	ctx.beginPath();
	//ctx.moveTo(lx,_ecg[1].pos_y);
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#66FF66';
	getEcgGraph();
	ddl(0);
}

function ddl(i)
{
	var gp=250/2;
	var nline=parseInt(canvas.width/gp);
	var nx=nline*gp+margin;
	//var i;
	setTimeout(function(){

		//_ecg[i].pushGraph();
		if (lx+margin>=nx)
		{
			lx=0;
		}
		
		clearCanvas();
		var scy;
		var yy=0;
		var py;
		var yy;
		//iy=1;
		for (iy=0;iy<g_pos.length;iy++) // test -1
		{


		//ctx.beginPath();
		if (lx==0)
			g_pos[iy].x=0;
			
		if (spx==0)
			g_pos[g_pos.length].x=0;
			
			scy=picY*(iy+1);

		
			ctx.beginPath();
			ctx.lineWidth = 2.5;
			if (iy<g_pos.length-1)
			{
				py=parseInt(_ecg[iy].posY())/2;
			}else
			{
				py=parseInt(_ecg[iy].posY())/3;
			}
			yy=scy-py-g_off;
			if (iy<g_pos.length-1)
			{
			if (yy>g_pos[iy].max_y) yy=g_pos[iy].max_y;
			if (yy<g_pos[iy].min_y) yy=g_pos[iy].min_y;	
			}
			
			ctx.moveTo(g_pos[iy].x+margin,yy);
			// ECG lead
			if (iy<g_pos.length-1)
			{
				_ecg[iy].getData(i);
				g_pos[iy].x=lx;
			}else //SPO2
			{
				_ecg[iy].getData(spi);
				g_pos[iy].x=lx;
			}

			if (iy<g_pos.length-1)
			{
				py=parseInt(_ecg[iy].posY())/2;
			}else
			{
				py=parseInt(_ecg[iy].posY())/3;
			}
			yy=scy-py-g_off;
			
			if (iy<g_pos.length-1)
			{
			if (yy>g_pos[iy].max_y) yy=g_pos[iy].max_y;
			if (yy<g_pos[iy].min_y) yy=g_pos[iy].min_y;	
			}
			
			if (iy<g_pos.length)
			{
				ctx.lineTo(lx+margin,yy);
			}else
			{
				ctx.lineTo(spx+margin,yy);
			}					
			
			//drawTxt(yy,lx+margin,yy,14,"#FFFFFF")
		
			
			if (iy==g_pos.length-1)
			{
				//ctx.lineWidth = 3.5;
				ctx.strokeStyle = '#68CDFF';
			}
			else
			{
				ctx.strokeStyle = '#66FF66';
			}
			ctx.stroke();

			
		}
		// ECG
		i++;
		// SPO2
		if (spi>=125)
			spi=0;
		
		if (i<250)
		{
			if (i%2)
			{
				lx++;   
				spi++;
			}

			if (i==125)
			{
				//_ecg[6].getGraph();
				// for test
				getNextEcg();
			}
			//ddl(i);			
		}else
		{
                   // alert(_ecg[0].getLength());
            i=0;
			//getLine();
			swapECG();
			//drawAll();
			//break;
		}
		ddl(i);
		
	},(60/parseInt(speed))*4);
}
function clearCanvas()
{
	
	ctx.fillStyle="black";
	ctx.fillRect(lx+margin,0,15,canvas.height);	
}

function clearAllGraph()
{
	var x=0;
	var gp=250/2;
	var nline=parseInt(canvas.width/gp);
	var nx=nline*gp+margin;
	var tm;
	
	//alert(x+margin + " " + nx);
	if (x+margin<nx)
	{		
			tm=setInterval(function(){
				ctx.fillStyle="black";
				ctx.fillRect(x+margin,0,15,canvas.height);	
				x++;
				if (x+margin>=nx)
					{
						clearInterval(tm);
					}
			},0.5);
		
	}
lx=0;
			//x++;
		//},5);


}