var WEBSERVICEURL = "proxy.php"; //webservice proxy url to avoid cross domain issue.
//an array to hold stockObjects created
var stockArray = [];
var stockIndex;

//calling cse webservice
function callCSEWebService(){
		$.mobile.showPageLoadingMsg();
		$.ajax({
		url: WEBSERVICEURL,
		type: "GET",
		dataType: "xml",
		success: endCallService,
        error: function (jqXHR, textStatus, errorThrown) {
            $.mobile.hidePageLoadingMsg();
            alert("failure");
            console.log(textStatus);
            console.log(errorThrown);
        },
		contentType: "text/xml; charset=\"utf-8\""
		});
		
		return false;
}
//this function to create stock objects
function stockConstructor(shareName, shareVolume, tradeVolume, previousClosingPrice, openingPrice, highPrice, lowPrice, lastTradedPrice, changeRupees){
	stockObj = new Object();
	stockObj.shareName = shareName;
	stockObj.shareVolume = shareVolume;
	stockObj.tradeVolume = tradeVolume;
	stockObj.previousClosingPrice = previousClosingPrice;
	stockObj.openingPrice = openingPrice;
	stockObj.highPrice = highPrice;
	stockObj.lowPrice = lowPrice;
	stockObj.lastTradedPrice = lastTradedPrice;
	stockObj.changeRupees = changeRupees;
	
	console.log("from Object"+stockObj.shareName);
	stockArray.push(stockObj);

}

	
//this function to call service
function endCallService(xmlHttpRequest, status)
{
	//getting number of stocks available
	var stockCount = $(xmlHttpRequest).find("row").length
	var columnCount = 26;
	var listStr ="";
	var i = 11;
	//var j =0;
	for(j=0; j<stockCount; j++){
	listStr = listStr + "<LI><a href='index.html#pgstockDetails' onclick='stockIndex="+j+"'>"+$(xmlHttpRequest).find( "row:eq("+j+") column:eq(" + i + ")").text()+"</a></LI>";
		for(k=0;k<columnCount;k++){
			var value = k +" : "+$(xmlHttpRequest).find( "row:eq("+j+") column:eq(" + k + ")").text();
			//console.log(value);
			//getting attributes of stock
			var shareName = $(xmlHttpRequest).find( "row:eq("+j+") column:eq(" + 11+ ")").text();
			var shareVolume =$(xmlHttpRequest).find( "row:eq("+j+") column:eq(" + 9 + ")").text();
			var tradeVolume=$(xmlHttpRequest).find( "row:eq("+j+") column:eq(" + 21 + ")").text();
			var previousClosingPrice=$(xmlHttpRequest).find( "row:eq("+j+") column:eq(" + 22 + ")").text();
			var openingPrice=$(xmlHttpRequest).find( "row:eq("+j+") column:eq(" + 7 + ")").text();
			var highPrice=$(xmlHttpRequest).find( "row:eq("+j+") column:eq(" + 13 + ")").text();
			var lowPrice=$(xmlHttpRequest).find( "row:eq("+j+") column:eq(" + 18 + ")").text();
			var lastTradedPrice=$(xmlHttpRequest).find( "row:eq("+j+") column:eq(" + 8 + ")").text();
			var changeRupees=$(xmlHttpRequest).find( "row:eq("+j+") column:eq(" + 19 + ")").text();
			
			
		}
		
		//calling stock constructor to 	create stock object
			stockConstructor(shareName, shareVolume, tradeVolume, previousClosingPrice, openingPrice, highPrice, lowPrice, lastTradedPrice, changeRupees);	
	}
	
	$("#stockList").html(listStr);
	$("#stockList").listview("refresh");
	$.mobile.hidePageLoadingMsg();
}