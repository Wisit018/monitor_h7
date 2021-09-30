// JavaScript Document
var ctx_bg;
var ctx_bg_img;
var ctx;
var ctx_line;
var ctx_txt;
var ctx_info;
var ctx_infob;
var ctx_alarm;
var canvas;
var screen_w=940;
var screen_h=1100;
var max_graph=710;
var speed;


	window.onload = function(){
		//getClient();
		//clientIP($("#lbIP").val());

		//alert(client);
		speed=160;
		ctx_bg_img = document.getElementById("cv_bg_img").getContext("2d");
		ctx_bg = document.getElementById("cv_bg").getContext("2d");
		ctx_line = document.getElementById("cv_line").getContext("2d");
		ctx = document.getElementById("cv_ecg").getContext("2d");
		ctx_txt = document.getElementById("cv_txt").getContext("2d");
		ctx_info = document.getElementById("cv_info").getContext("2d");
		ctx_infob = document.getElementById("cv_infob").getContext("2d");	
		ctx_alarm = document.getElementById("cv_alarm").getContext("2d");
		
		canvas = document.getElementById('cv_bg_img');
   		canvas.width = 1024;//window.innerWidth;
    	canvas.height = 700;//window.innerHeight;	

		canvas = document.getElementById('cv_alarm');
   		canvas.width = screen_w;//window.innerWidth;
    	canvas.height = screen_h;//window.innerHeight;
		
		canvas = document.getElementById('cv_txt');
   		canvas.width = screen_w;//window.innerWidth;
    	canvas.height = screen_h;//window.innerHeight;
		
		canvas = document.getElementById('cv_info');
   		canvas.width = screen_w;//window.innerWidth;
    	canvas.height = screen_h;//window.innerHeight;
	
		canvas = document.getElementById('cv_infob');
   		canvas.width = screen_w;//window.innerWidth;
    	canvas.height = screen_h;//window.innerHeight;
			
		canvas = document.getElementById('cv_bg');
   		canvas.width = screen_w;//window.innerWidth;
    	canvas.height = screen_h;//window.innerHeight;
				
		canvas = document.getElementById('cv_line');
   		canvas.width = max_graph;//window.innerWidth;
    	canvas.height = screen_h;//window.innerHeight;
				
		canvas = document.getElementById('cv_ecg');
   		canvas.width = max_graph;//window.innerWidth;
    	canvas.height = screen_h;//window.innerHeight;
		/*
		canvas = document.getElementById('cv_alarm');
   		canvas.width = screen_w;//window.innerWidth;
    	canvas.height = screen_h;//window.innerHeight;
		*/

		
		ctx.translate(0.5,0.5); 
		lx=0;
		ly=0;
		//client=document.getElementById("lbIP").value;
		
		client=getUrlParameter("h7");
		if (getUrlParameter("speed")>0)
			speed=getUrlParameter("speed");
		getNewStep();
		/*
		var test=new Queue();
		test.enqueue("1");
		test.enqueue("2");
		test.enqueue("3");
		
		alert(test.dequeue().data);		
			alert(test.dequeue().data);	
				alert(test.dequeue().data);	
		test.enqueue("11");
		test.enqueue("12");
		test.enqueue("13");	
			alert(test.dequeue().data);		
			alert(test.dequeue().data);	
				alert(test.dequeue().data);
				
		var dt;
		getGraphRec('0002',"G_I,G_II,num","H25",361,function(d){ 
		
		dt=d;
		//alert(dt);
		
		 });
		var products = eval('(' + dt + ')');

		alert(string2byte(products[0].G_I)); // 72,0,101,0,108,0,108,0,111,0
		alert(products[0].num);
		//alert(products[0].G_I);
		//alert(products[0].G_II);
		//alert(dt.G_II);	
		*/
		
		init();
		//setInterval(drawLine,1250);
		//getService("192.168.1.100","G_III",function(d){ alert(d)});
        infoText();
		//getLine();
		drawing();
		//clearTxt();
     
		//alert(d);
	}
	
