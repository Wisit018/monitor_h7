window.onload = function(){
    // var cv_bg = document.getElementById("cv_bg");
    // var cv_bg_ctx = cv_bg.getContext("2d");
    
    // // Create gradient
    // var cv_bg_grd = cv_bg_ctx.createLinearGradient(0,0,200,0);
    // cv_bg_grd.addColorStop(0,"red");
    // cv_bg_grd.addColorStop(1,"white");
    
    // // Fill with gradient
    // cv_bg_ctx.fillStyle = cv_bg_grd;
    // cv_bg_ctx.fillRect(10,10,150,80);
    
    var cv_bg = new myCanvas("cv_bg",800,400,"#CCCCCC",200);
    cv_bg.fillStyle("GREEN");
    cv_bg.box(20,20,100,100);
    cv_bg.line(0,0,100,100,"RED");
    cv_bg.box(140,140,100,100);
    cv_bg.circle(50,50,20);
}