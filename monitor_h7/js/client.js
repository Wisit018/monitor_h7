// JavaScript Document
var _fromstart;

function getClient()
{
	getH7(function(d){
		//alert(d.count);
		var ip=d.split('|');
			//$("#lbIP").append($("<option></option>").val(d).html(d));
		$.each(ip, function(index, value) {
 			// alert(index + ': ' + value);
			$("#lbIP").append($("<option></option>").val(value).html(value));
		});
	});
	//alert($("#lbIP").val())

}
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
function clientIP(d)
{
	/*
	getIP(d.value,function(d){
		client=d;
		//alert(client);
			client=d.value;
		});
		*/

	client=d.value;
	getNewStep();
	//clearAllGraph();
	//init();
	//alert(client);
	//drawing();
}

function fromStart(d)
{
	if (d==true)
	{
		_fromstart=false;
		getNewStep();
	}
	else
	{
		_fromstart=true;
	    step=0;
	}
		//lx=0;
	clearAllGraph();
}
