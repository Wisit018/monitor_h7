// JavaScript Document
//var SERVER_URL = "http://61.91.6.110:88/service/l7service.asmx/";
//var SERVER_URL = "/service/l7service.asmx/";
var SERVER_URL = "http://172.10.70.254/service/l7service.asmx/";
function getData(ip,field,table,data)
{		
   func = "getData";
   $.ajax({
        type: "POST",
        url: SERVER_URL + func,
        data: "{'ip':'" + ip + "','field':'" + field + "','table':'" + table +"'}",
        contentType: "application/json",
		async: false,
        dataType: "json",
        success: function(d){ data(d.d) },
        error: function(a) { data(0) }
    });

}
function getGraphRec(ip,field,table,lastnum,data)
{		//url: "../service/l7service.asmx/getGraphRec",
    func = "getGraphRec";
   $.ajax({
        type: "POST",
        url: SERVER_URL + func,
        data: "{'ip':'" + ip + "','field':'" + field + "','table':'" + table +"','lastnum':'"+lastnum +"'}",
        contentType: "application/json; charset=utf-8",
		async: false,
        dataType: "json",
        success: function(d){ data(d.d) },
        error: function(a) { data(0) }
    });
}

function getGraphH7(ip,type,step,data)
{		
    //url: "../service/l7service.asmx/getGraphH7",
    func = "getGraphH7";
   $.ajax({
        type: "POST",
        url: SERVER_URL + func,
        data: "{'ip':'" + ip + "','type':'" + type + "','step':'" + step +"'}",
        contentType:  "application/json",
		async: false,
        dataType: "json",
        success: function(d){ data(d.d) },
        error: function(a) { data(0) }
    });
}
function getGraphH7lead(ip,step,last,data)
{	
    //url: "../service/l7service.asmx/getGraphH7lead",
    func = "getGraphH7lead";
   $.ajax({
        type: "POST",
        url: SERVER_URL + func,
        data: "{'ip':'" + ip + "','step':'" + step +"','lasttime':'"+last+"'}",
        contentType:  "application/json",
		async: false,
        dataType: "json",
        success: function(d){ data(d.d) },
        error: function(a) { data(0) }
    });
}
function getGraphSPO2lead(ip,step,data)
{		
    //url: "../service/l7service.asmx/getSPO2lead",
    func = "getSPO2lead";
   $.ajax({
        type: "POST",
        url: SERVER_URL + func,
        data: "{'ip':'" + ip + "','step':'" + step +"'}",
        contentType:  "application/json",
		async: false,
        dataType: "json",
        success: function(d){ data(d.d) },
        error: function(a) { data(0) }
    });
}
function get2Byte(txt,data)
{		
    //url: "../service/l7service.asmx/convert2byte",
    func = "convert2byte";
   $.ajax({
        type: "POST",
        url: SERVER_URL + func,
        data: "{'dat':'" + txt + "'}",
        contentType: "application/json; charset=utf-8",
		async: false,
        dataType: "json",
        success: function(d){ data(d.d) },
        error: function(a) { data(0) }
    });
}

function string2byte(txt)
{
		var bytes = [];

		for (var i = 0; i < txt.length; ++i)
		{
			//bytes.push(txt.charCodeAt(i));
			  var char = txt.charCodeAt(i);
        bytes.push(char);
		}
		return bytes;
}
function getSQL(sql,data)
{		
    //url: "../service/l7service.asmx/getSQL",
    func = "getSQL";
   $.ajax({
        type: "POST",
        url: SERVER_URL + func,
        data: "{'sql':'" + sql + "'}",
        contentType: "application/json",
		async: false,
        dataType: "json",
        success: function(d){ data(d.d) },
        error: function(a) { data(0) }
    });
}
function getDataTXT(field,table,ip,where,data)
{		
    //url: "../service/l7service.asmx/getDataTXT",
    func = "getDataTXT";
   $.ajax({
        type: "POST",
        url: SERVER_URL + func,
        data: "{'field':'" + field + "','table':'" + table +"','ip':'" + ip + "','where':'" + where + "'}",
        contentType: "application/json",
		async: false,
        dataType: "json",
        success: function(d){ data(d.d) },
        error: function(a) { data(0) }
    });
}
function getH7(data)
{		
    //url: "../service/l7service.asmx/getALLIP",
    func= "getALLIP"; 
   $.ajax({
        type: "POST",
        url: SERVER_URL + func,
        data: "{}",
        contentType: "application/json",
		async: false,
        dataType: "json",
        success: function(d){ data(d.d) },
        error: function(a) { data(0) }
    });

}

function getCurStep(ip,data)
{		
    //url: "../service/l7service.asmx/getCurStep",
    func = "getCurStep";
   $.ajax({
        type: "POST",
        url: SERVER_URL + func,
        data: "{'ip':'" + ip +"'}",
        contentType: "application/json",
		async: false,
        dataType: "json",
        success: function(d){ data(d.d) },
        error: function(a) { data(0) }
    });

}
function getLasttime(ip,step,table,data)
{		
    //url: "../service/l7service.asmx/getLasttime",
    func = "getLasttime";
   $.ajax({
        type: "POST",
        url: SERVER_URL + func,
        data: "{'ip':'" + ip +"','step':'"+step+"','table':'"+ table +"'}",
        contentType: "application/json",
		async: false,
        dataType: "json",
        success: function(d){ data(d.d) },
        error: function(a) { data(0) }
    });

}
function getNumber(ip,step,last,data)
{		
    //url: "../service/l7service.asmx/getNumber",
    func = "getNumber";
   $.ajax({
        type: "POST",
        url: SERVER_URL + func,
        data: "{'ip':'" + ip +"','step':'"+step+"','lasttime':'"+last+"'}",
        contentType: "application/json",
		async: false,
        dataType: "json",
        success: function(d){ data(d.d) },
        error: function(a) { data(0) }
    });

}
function getCountStep(ip,step,data)
{		
    //url: "../service/l7service.asmx/getCountStep",
    func = "getCountStep";
   $.ajax({
        type: "POST",
        url: SERVER_URL + func,
        data: "{'ip':'" + ip +"','step':'"+step+"'}",
        contentType: "application/json",
		async: false,
        dataType: "json",
        success: function(d){ data(d.d) },
        error: function(a) { data(0) }
    });

}
