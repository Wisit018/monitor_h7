// JavaScript Document
//var offset=70;
var offset= 0;
// Image
var im_back;
var im_heart;
var im_status;
var st_light;

function initImage()
{	
		var x=max_graph;
		var y=370-offset;
		
		im_back=new spImage("image/monitor_black.png",1024,700,1,1,ctx_bg_img);
		im_back.setPos(0,0);
		//im_back.draw();
		
		im_heart=new spImage("image/ecg.png",30,25,1,1,ctx_infob);
		im_heart.setPos(x+50,y);
		im_heart.setEnable(true);
		
		im_status=new spImage("image/status.png",940,10,4,1,ctx_bg_img);
		im_status.setPos(7,5);
		im_status.setEnable(true);
		st_light=1;
		im_status.setFrame(st_light);
		im_status.draw();
}

function switchStatus()
{
	setTimeout(function(){
	if (alarm_lead!="" || alarm_arr!="")
	{
		
		if (alarm_lead!="" && alarm_arr=="")
		{ 
			if (st_light!=3)
			st_light=3;
			else
			st_light=2;
		}

			
		if (alarm_lead=="" && alarm_arr!="")
		{ 
			if (st_light!=4)
				st_light=4;
				else
				st_light=2;
		}
			
					
		if (alarm_lead!="" && alarm_arr!="")
		{
			if (st_light!=4)
				st_light=4;
			else
				st_light=3;
		}

	}else
	{
		if (st_light>=2)
			st_light=1;
		else
			st_light=2;
	}
		im_status.setFrame(st_light);
	},500);
}

// sound
var ad_alert = new Howl({
 volume: 0.2,
  urls: ["sound/alert.mp3"]
});
var ad_beep = new Howl({
 volume: 0.1,
  urls: ["sound/ekg_beep.mp3"]
});
var ecg_rate;

function play_ecg_rate()
{
	var tm=1000*(60/ecg_rate);
	var itime;
	setTimeout(function(){
		//clearTxtb();
		im_heart.clearImg();
		//alert(ecg_rate + " " + tmp_count);
		if (ecg_rate!=null && ecg_rate>0 && tmp_count==10){

		
			//im_heart.setBlink();
		setTimeout(function(){
				ad_beep.play();
				im_heart.draw();
			
				},tm/2);	

			}
		play_ecg_rate();
			//alert(tm);
		},tm);	
}

///
function drawTxt(txt,x,y,size,color)
{
	ctx_info.fillStyle = color;
 	ctx_info.font = size + "px Arial";
	ctx_info.fillText(txt,x, y);
}
function drawTxtWithBack(txt,x,y,size,color,bgcolor)
{
	//if (alarm_ecg){

 	ctx_infob.font = size + "px Arial";
	var sx=ctx_infob.measureText(txt).width;
	var sy=size*1.5;
	setTimeout(function(){
		ctx_infob.clearRect(x-1,y-sy/2-1,sx+5,sy/2+5);
	},500);	

	ctx_infob.fillStyle = bgcolor;
	ctx_infob.fillRect(x,y-sy/2,sx,sy/2+3);
	ctx_infob.stroke(); 
	
	ctx_infob.fillStyle = color;;		
	ctx_infob.fillText(txt,x, y);
	ad_alert.play();
	//}
}
function drawTxtalign(txt,x,y,size,color,max_x,align)
{
	ctx_info.fillStyle = color;
 	ctx_info.font = size + "px Arial";
	var lx=max_x-ctx_info.measureText(txt).width;
	if (align=="l")
	{
		lx=x;
	}
	else if (align=="c")
	{
		lx=x+lx/2;
	}
	else
	{
		lx=lx+x;
	}

	ctx_info.fillText(txt,lx, y);
}
function drawTxtb(txt,x,y,size,color)
{
	ctx_infob.fillStyle = color;;
 	ctx_infob.font = size + "px Arial";
	ctx_infob.fillText(txt,x, y);
}
function clearTxt()
{
    ctx_info.clearRect(0,0,screen_w,screen_h);
}
function clearTxtb()
{
//setTimeout(function(){
    ctx_infob.clearRect(0,0,screen_w,screen_h);
//,700);
}


var _scale;
var _scale_gain;
var _scale1mv=50;

function myTime(dt)
{
	var parts = dt.split(' ');
	return parts[1];
}
function convDateTime(dt)
{
	var parts = dt.split(' ');
	return parts[0]+"T"+parts[1];
}
function convDate(dt)
{
	var parts = dt.split(' ');
	var d=parts[0].split('-');
	return d[2]+"/"+d[1]+"/"+d[0];
}
function jsTimeDiff(strDateTime1,strDateTime2){
			var startDate = new Date(strDateTime1);
			var endDate = new Date(strDateTime2);
			var timeDiff = Math.abs(startDate - endDate);
			
			var hh = Math.floor(timeDiff / 1000 / 60 / 60);
			if(hh < 10) {
				hh = '0' + hh;
			}
			timeDiff -= hh * 1000 * 60 * 60;
			var mm = Math.floor(timeDiff / 1000 / 60);
			if(mm < 10) {
				mm = '0' + mm;
			}
			timeDiff -= mm * 1000 * 60;
			var ss = Math.floor(timeDiff / 1000);
			if(ss < 10) {
				ss = '0' + ss;
			}

			return hh + ":" + mm + ":" + ss;
		}
function drawAll()
{

	setInterval(function(){
	clearTxt();
	//im_back.draw();
		//clearTxtb();
	drawTxt("OnDate  : " + convDate(last_update),max_graph, 660-offset,12,"#cccccc"); 
	drawTxt("CurStep :" + step,max_graph, 680-offset,12,"#aaffaa"); 
	drawTxt("Time:"+myTime(last_update),max_graph+120, 680-offset,12,"#aaffaa"); 
	drawTxt("LastStep:"+laststep,max_graph, 700-offset,12,"#aaaaff"); 
	drawTxt("Time:"+myTime(lasttime),max_graph+120, 700-offset,12,"#aaaaff"); 
	drawTxt("Distance:"+ (laststep-step),max_graph, 720-offset,12,"#bbddff"); 
	drawTxt("Time:"+jsTimeDiff(convDateTime(last_update),convDateTime(lasttime)),max_graph+120, 720-offset,12,"#bbddff"); 
	
	if (tmp_count<10)
		drawTxt("Lost: " + tmp_count,max_graph, 760-offset,12,"#ffaaaa"); 
		
	if (step<laststep)
		getECGNumber(offset);		

		
        drawScale();


		alarm_draw();
		switchStatus();
		im_status.draw();

		},1000);
}

var alarm_lead,alarm_arr,alarm_ecg;
function getECGNumber(off)
{
	   var I,II,III,avr,avl,avf,nibp,nibp_up,nibp_low,hr,resp,ecg,ecg_up,ecg_low;
	   var v,v2,v3,v4,v5,v6;
	   var dia,dia_up,dia_low,hr_up,hr_low,resp_up,resp_low,spo2,spo2_up,spo2_low,T1,T2,TD;
	   var mean,mean_up,mean_low,pr,pr_up,pr_low,pi;
	   alarm_lead="";
	   alarm_arr="";
	   alarm_ecg=0;
	   //alert("getnum");
	  // alert(last_update);
	   if (step<laststep && tmp_count==10){
	          getNumber(client,step,last_update,function(d){    
			  	var jss = JSON.stringify(eval('(' + d + ')')); 
 				var arr=[];
				arr=$.parseJSON(jss);
				I=arr["I"];
				II=arr["II"];
				III=arr["III"];
				aVR=arr["aVR"];
				aVL=arr["aVL"];
				aVF=arr["aVF"];
		
				v=arr["V"];
				v2=arr["V2"];
				v3=arr["V3"];
				v4=arr["V4"];
				v5=arr["V5"];
				v6=arr["V6"];
				
				//last_update=arr["lastTime"];
				_scale=arr["wavegain"];
				_scale_gain=arr["gain"];
				nibp=arr["Nibp"];
		
				nibp_up=arr["Nibp_up"];
				nibp_low=arr["Nibp_low"];
				hr=arr["HR"];
				hr_up=arr["HR_UPPER"];
				hr_low=arr["HR_LOWER"];
				resp=arr["RESP"];
				resp_up=arr["RESP_UP"];
				resp_low=arr["RESP_LOW"];
				spo2=arr["SPO2"];
				spo2_up=arr["SPO2_UP"];	
				spo2_low=arr["SPO2_LOW"];
				
				ecg=arr["ECG"];
				ecg_up=arr["ECG_UPPER"];
				ecg_low=arr["ECG_LOWER"];	
	
	
				mean=arr["mean"];	
				mean_up=arr["mean_up"];
				mean_low=arr["mean_low"];
				dia=arr["dia"];
				dia_up=arr["dia_up"];	
				dia_low=arr["dia_low"];
				pr=arr["PR"];	
				pr_up=arr["PR_UP"];
				pr_low=arr["PR_LOW"];		
				pi=arr["PI"];	
				laststep=arr["package_count"];	
				alarm_lead=arr["alarm_lead"];
				alarm_arr=arr["alarm_arrhytsmia"];	

				T1=arr["T1"];
				T2=arr["T2"];
				TD=arr["TD"];

			});			
	   }
	   else
	   {
		   	   I=II=III=v=v2=v3=v4=v5=v6=pi=avr=avl=avf=nibp=hr=resp=ecg=dia=spo2=mean=pr="--";		   
	   }
				
			//alert(ecg_up + " " + ecg_low);

				if (I==null || I=="") i=0;
				if (II==null || II=="") II=0;
				if (III==null || III=="") III=0;
				if (avr==null || avr=="") avr=0;
				if (avl==null || avl=="") avl=0;
				if (avf==null || avf=="") avf=0;
				
				if (v==null || v=="") v=0;
				if (v2==null || v2=="") v2=0;
				if (v3==null || v3=="") v3=0;
				if (v4==null || v4=="") v4=0;
				if (v5==null || v5=="") v5=0;
				if (v6==null || v6=="") v6=0;
				drawTxtalign(I/100,max_graph+130,400-off,14,"#66FF66",50,"r");
				drawTxtalign(II/100,max_graph+130,420-off,14,"#66FF66",50,"r");
				drawTxtalign(III/100,max_graph+130,440-off,14,"#66FF66",50,"r");
				drawTxtalign(avr/100,max_graph+130,460-off,14,"#66FF66",50,"r");
				drawTxtalign(avl/100,max_graph+130,480-off,14,"#66FF66",50,"r");
				drawTxtalign(avf/100,max_graph+130,500-off,14,"#66FF66",50,"r");
				
				drawTxtalign(v/100,max_graph+130,520-off,14,"#66FF66",50,"r");
				drawTxtalign(v2/100,max_graph+130,540-off,14,"#66FF66",50,"r");
				drawTxtalign(v3/100,max_graph+130,560-off,14,"#66FF66",50,"r");
				drawTxtalign(v4/100,max_graph+130,580-off,14,"#66FF66",50,"r");
				drawTxtalign(v5/100,max_graph+130,600-off,14,"#66FF66",50,"r");
				drawTxtalign(v6/100,max_graph+130,620-off,14,"#66FF66",50,"r");								

				
				ecg_rate=parseInt(ecg);
				
	            if (ecg==-100 || ecg==null)
				{
                        ecg="---";
						ecg_rate=0;
				}
				
				drawTxt(ecg,max_graph, 440-off,40,"#66FF66");
				if (parseInt(ecg)<=parseInt(ecg_low) || parseInt(ecg)>=parseInt(ecg_up))
				{
					alarm_ecg=1;
					drawTxtWithBack(ecg,max_graph, 440-off,40,"#000000","#FFFF00");
				}else
				{
					alarm_ecg=0;			
				}
	
				if (spo2==-100 || spo2==null)
					spo2="---";
				drawTxt(spo2,max_graph, 90,40,"#68CDFF");
				if (parseInt(spo2)<=parseInt(spo2_low) || parseInt(spo2)>=parseInt(spo2_up))
					drawTxtWithBack(spo2,max_graph, 90,40,"#000000","#FFFF00");

				if (pi==-100 || pi==null)
					pi="---";
				drawTxt(pi,max_graph+70, 90,30,"#68CDFF");

					
				if (pr==-100 || pr==null)
					pr="---";
				drawTxt(pr,max_graph+120, 90,40,"#68CDFF");  
				if (parseInt(pr)<=parseInt(pr_low) || parseInt(pr)>=parseInt(pr_up))
					drawTxtWithBack(pr,max_graph+120, 90,40,"#000000","#FFFF00");

		        if (nibp==-100 || nibp_up==null)
                      nibp="---";
				//drawTxt(nibp,max_graph, 300-off,40,"#FF0000");
				drawTxt(nibp,max_graph, 300-off,40,"#FF0000");
				if (parseInt(nibp)<=parseInt(nibp_low) || parseInt(nibp)>=parseInt(nibp_up))
					drawTxtWithBack(nibp,max_graph, 300-off,40,"#000000","#FFFF00");				
					
					
		        if (mean==-100 || mean==null)
                      mean="---";
				drawTxt(mean,max_graph+140, 300-off,30,"#FF0000");	

				if (parseInt(mean)<=parseInt(mean_low) || parseInt(mean)>=parseInt(mean_up))
					drawTxtWithBack(mean,max_graph+140, 300-off,30,"#000000","#FFFF00");
				
				drawTxt("/",max_graph+65, 300-off,40,"#FF0000");	
					
			    if (dia==-100 || dia==null)
                      dia="---";				
				drawTxt(dia,max_graph+75, 300-off,40,"#FF0000");	
				if (parseInt(dia)<=parseInt(dia_low) || parseInt(dia)>=parseInt(dia_up))
					drawTxtWithBack(dia,max_graph+75, 300-off,40,"#000000","#FFFF00");
							
																				
				//hr=1;
				if (hr==-100 || hr==null)
                       hr="---";
				drawTxt(hr,max_graph+40, 330-off,16,"#FF0000");  
				if (parseInt(hr)<parseInt(hr_low) || parseInt(hr)>parseInt(hr_up))
					drawTxtWithBack(hr,max_graph+40, 330-off,16,"#000000","#FFFF00");
					
				if (resp==-100 || resp==null)
					resp="---";
				drawTxt(resp,max_graph, 160,40,"#66FF66");
				if (parseInt(resp)<=parseInt(resp_low) || parseInt(resp)>=parseInt(resp_up))
					drawTxtWithBack(resp,max_graph,160,40,"#000000","#FFFF00");			
				//temp
				if (T1==-100 || T1==null)
					T1="--.-";
				drawTxt(T1,max_graph, 230-off,30,"#FFFFFF");

				if (T2==-100 || T2==null)
					T2="--.-";
				drawTxt(T2,max_graph+70, 230-off,30,"#FFFFFF");

				if (TD==-100 || TD==null)
					TD="--.-";
				drawTxt(TD,max_graph+140, 230-off,30,"#66FF66");
}
function drawScale()
{
    var sy;
        var sline=_scale*_scale1mv;
        
    	ctx_line.fillStyle="black";
	ctx_line.fillRect(margin-15,0,15,canvas.height);	
	     drawTxt("x" + _scale_gain, margin-30,(picY-20)-g_off,12,"#66FF66");
        for (n=0;n<g_pos.length-1;n++)
        {
            sy=(nn+1)*picY; 
            var scy=picY*(n+1)-25;           
            
            ctx_line.beginPath();
            ctx_line.lineWidth = 2;
            ctx_line.strokeStyle = "#66FF66";

		if (n<g_pos.length-1)
		{
          drawTxt(_scale + "mv", margin-55,(scy+30)-g_off,12,"#66FF66");
		}
		 else
		{
		  drawTxt(_scale + "mv", margin-55,(scy+30)-g_off,12,"#68CDFF");
		  ctx_line.strokeStyle = "#68CDFF";
		}
		  
		     ctx_line.moveTo(margin-10, (scy+25)-g_off-(sline/2));
            ctx_line.lineTo(margin-10, (scy+25)-g_off+sline-(sline/2));
            ctx_line.stroke();
            
        }
}

function infoText()
{
        var fontname="Digitrix";
		var dNow = new Date();
		var tNow=dNow.getHours() + ':' + dNow.getMinutes();


	// spO2
		ctx_txt.fillStyle = "#68CDFF";
 		ctx_txt.font = "16px " & fontname;
		ctx_txt.fillText("SPO2(%)",max_graph, 50);
		ctx_txt.fillText("PR",max_graph+120, 50);
		ctx_txt.fillText("PI",max_graph+80, 50);
	// RESP
		ctx_txt.fillStyle = "#66FF66";
 		ctx_txt.font = "16px " & fontname;
		ctx_txt.fillText("RESP",max_graph, 120);


	// Temp
	
		ctx_txt.fillStyle = "#FFFFFF";
 		ctx_txt.font = "16px Arial";
		ctx_txt.fillText("T1(.C)",max_graph, 190);
		ctx_txt.fillText("T2(.C)",max_graph+70, 190);
		ctx_txt.fillStyle = "#66FF66";
		ctx_txt.fillText("TD(.C)",max_graph+140, 190);
	
	// NIBP
	//var off=70;
	var off=0;
		ctx_txt.fillStyle = "#FF0000";
 		ctx_txt.font = "16px " & fontname;
		ctx_txt.fillText("NIBP(mmHg)",max_graph, 260-off);
		// time
	//	ctx_txt.fillText(tNow,max_graph+120, 260-off);
		ctx_txt.fillText("HR",max_graph, 330-off);	
		//ctx_txt.fillText("MT",max_graph, 350-off);
	
    // ECG Value
    	ctx_txt.fillStyle = "#66FF66";
 		ctx_txt.font = "16px " & fontname;                
                
        	// ECG
		ctx_txt.fillText("ECG",max_graph, 400-off);	
                
        ctx_txt.font = "14px " & fontname;   
        ctx_txt.fillText("I  :",max_graph+100, 400-off);	
        ctx_txt.fillText("II :",max_graph+100, 420-off);	
        ctx_txt.fillText("III:",max_graph+100, 440-off);	
        ctx_txt.fillText("aVR:",max_graph+100, 460-off);
        ctx_txt.fillText("aVL:",max_graph+100, 480-off);	
        ctx_txt.fillText("aVF:",max_graph+100, 500-off);	
        ctx_txt.fillText("V  :",max_graph+100, 520-off);	
        ctx_txt.fillText("V2 :",max_graph+100, 540-off);	
        ctx_txt.fillText("V3 :",max_graph+100, 560-off);	
        ctx_txt.fillText("V4 :",max_graph+100, 580-off);
        ctx_txt.fillText("V5 :",max_graph+100, 600-off);	
        ctx_txt.fillText("V6 :",max_graph+100, 620-off);	               /*
    	ctx_txt.fillText("NIBP(mmHg)",max_graph, 260-off);
		ctx_txt.fillText(tNow,max_graph+120, 260-off);
		ctx_txt.fillText("HR",max_graph, 330-off);*/
    /*	
	// CO2
		ctx_txt.fillStyle = "#FFFF00";
 		ctx_txt.font = "16px Arial";
		ctx_txt.fillText("EtCO2",max_graph, 380-off);
		ctx_txt.fillText("AWR",max_graph+120, 380-off);
		ctx_txt.fillText("FiCO2",max_graph, 450-off);	
		*/
	//drawAll();
}
function draw_alarmTxt(txt,x,y,size,color)
{
	ctx_alarm.fillStyle = color;
 	ctx_alarm.font ="bold "+ size + "px Arial";
	ctx_alarm.fillText(txt,x, y);
}

function alarm_draw()
{
	var lx=350;
	var lsx=0;
	var bg_max=350;

	setTimeout(function(){
    ctx_alarm.clearRect(0,0,screen_w,screen_h);
	
	},500);
	
		if (alarm_lead!="")
		{
		ctx_alarm.fillStyle = "rgb(255,255,0)";
		ctx_alarm.fillRect(lsx,0,lx,20);
		ctx_alarm.stroke(); 
		//ctx_alarm.fillStyle = "rgb(255,255,255)";
		var stx=lsx+(lx-ctx_alarm.measureText(alarm_lead).width)/2;
		//ctx_alarm.measureText(alarm_lead).width
		draw_alarmTxt(alarm_lead,stx,15,14,"#000000");
		}
		if (alarm_arr!="")
		{
		ctx_alarm.fillStyle = "rgb(255,255,0)";
		ctx_alarm.fillRect(max_graph,0,200,20);
		ctx_alarm.stroke();
		var stx=(200-ctx_alarm.measureText(alarm_arr).width)/2;
		draw_alarmTxt(alarm_arr,max_graph+stx,15,14,"#000000");
		}
		
		if (alarm_lead!="" || alarm_arr!="")
		{
			ad_alert.play();
		}
}