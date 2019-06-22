var names= [];
var descriptions =[];
var parkCodes=[];
var parksAndDescriptions={};
var parksAndImages={};
var parksAndCodes={};
var imagesUrls=[];
var images=[];
var alertDescriptions=[];
var titles=[];
var alertUrls=[]
var vcnames=[];
var pCode;
var titlesAndDescriptions={};

$(document).ready(function () {
    $('.header').height($(window).height());
    $( function() {
    		$( "#tabs" ).tabs({
    			heightStyle:"fill",
    		});
 	});
    $("#submit").click(function (e) {
    	$("#parks").html("");
        Validate();
        $.ajax({
	        type: 'GET',
        	url: 'https://developer.nps.gov/api/v1/parks?stateCode='+$("#states").val()+'&fields=images&api_key=ggvKIJXPJksoGFESOfN9FcpDKLkPW7gTXQU47x24',
	        datatype:'json',
	        success: function(data){
	          getInfo(data);
	          addImagesandOverlay();
	        }
      	});      
    });

    $(document).on('click','.link',function(event){
    	$("#description").html("");
    	$("#alerts").html("");
	    var parkName = $(this).attr("id");
   		pCode=parksAndCodes[parkName];
   		console.log(pCode);
   		callAlerts();
   		var p = document.createElement("p");
    	var t = document.createTextNode(parksAndDescriptions[parkName]);
    	p.appendChild(t);
      	$("#description").append(p);
      	//$.ajax({
      		//type:'GET',
	       	//url:'https://developer.nps.gov/api/v1/visitorcenters?parkCode='+pCode+'&api_key=ggvKIJXPJksoGFESOfN9FcpDKLkPW7gTXQU47x24',
	        //datatype:'json',
	        //success: function(data){
	        	//var visitorcenters=data["data"];
	        	//for(var w = 0; w < 50 && w < visitorcenters.length; w++){
        		//vcnames[w] = visitorcenters[w]["name"];
        		//}
        	//console.log(vcnames);
	        //}
      	//});
	});

    //Returns necessary information   
    function getInfo(data){
        var info=data["data"];
        for(var i = 0; i < 50 && i < info.length; i++){
        	names[i] = info[i]["fullName"];
        	descriptions[i]=info[i]["description"];
        	parkCodes[i]=info[i]["parkCode"];
        	imagesUrls[i]=info[i]["images"][0]["url"];
      	}
      	var currentKey;
        var currentVal;
        for (var x = 0; x < names.length; x++) {
          currentKey = (names[x]);
          currentVal = (descriptions[x]);
          parksAndDescriptions[currentKey] = currentVal; 
      	}
      	var holderKey;
        var holderVal;
        for (var y = 0; y < names.length; y++) {
          holderKey = (imagesUrls[y]);
          holderVal = (names[y]);
          parksAndImages[holderKey] = holderVal; 
      	} 
      	var placeKey;
        var placeVal;
        for (var z = 0; z < names.length; z++) {
          placeKey = (names[z]);
          placeVal = (parkCodes[z]);
          parksAndCodes[placeKey] = placeVal; 
      	} 
      	//for (var key in names) {
        	//var park_name= names[key];
      	//}
      	//for (var park in descriptions){
        	//var park_description=descriptions[park];
     	//}
    }

    //Checks to see if user has entered a value
    function Validate() {
        if ($("#states").val() == "Select") {
            alert("► Select State");
        };
    }

    //Adds images and overlay to images
    function addImagesandOverlay(){
		for (var url in imagesUrls){
	        var imageContainer=document.createElement("div");
	        imageContainer.setAttribute("class","imageContainer");
	        parks.append(imageContainer);
	        var parkUrl=imagesUrls[url];
	        var image=document.createElement("img"); 
	        image.setAttribute("class","image");
	        imageContainer.appendChild(image).src = imagesUrls[url];
	        var overlay=document.createElement("div"); //Adds overlay div to display div
	        imageContainer.append(overlay);//Adds div to parent div: display div
	        overlay.setAttribute("class","imageOverlay");
	        var textdiv=document.createElement("div"); //Adds overlay div to display div
	        textdiv.setAttribute("class","overlayText");
	        var aTag = document.createElement('a');
			aTag.setAttribute('href',"#parkInfo");
			aTag.setAttribute('class',"link");
			aTag.setAttribute('id',parksAndImages[parkUrl]);
			aTag.innerHTML = parksAndImages[parkUrl];
			textdiv.appendChild(aTag)
	        overlay.append(textdiv);
	     }
    }

    //calls Alerts from National Parks API
    function callAlerts(){
    	console.log('this is the parkcode for calling alerts'+pCode);
    	$.ajax({
	        type:'GET',
	        url:'https://developer.nps.gov/api/v1/alerts?parkCode='+pCode+'&api_key=ggvKIJXPJksoGFESOfN9FcpDKLkPW7gTXQU47x24',
	        datatype:'json',
	        success: function(data){
	        	console.log(url);
	        	var alerts=data["data"];
	        	for(var k = 0; k < 50 && k < alerts.length; k++){
        			alertDescriptions[k]=alerts[k]["description"];
        			titles[k]=alerts[k]["title"];
        			alertUrls=alerts[k]["url"];
      			}
      			var tempKey;
       			var tempVal;
        		for (var s = 0; s < titles.length; s++) {
         			tempKey = (titles[s]);
          			tempVal = (alertDescriptions[s]);
          			titlesAndDescriptions[tempKey] = tempVal; 
      			} 
      			for (var key in titlesAndDescriptions){
      				var h = document.createElement("h1");
    				var t = document.createTextNode(key);
    				h.appendChild(t);
      				$("#alerts").append(h);
      				var p = document.createElement("p");
    				var d = document.createTextNode(titlesAndDescriptions[key]);
    				p.appendChild(d);
      				$("#alerts").append(p);
      			}
      			/*
      			for (var title in titles){
      				var h1 = document.createElement("h1");
    				var t = document.createTextNode(titles[title]);
    				h1.appendChild(t);
      				$("#alerts").append(h1);
      			}
      			for (var description in alertDescriptions){
      				var p = document.createElement("p");
    				var t = document.createTextNode(alertDescriptions[description]);
    				p.appendChild(t);
      				$("#alerts").append(p);
      			} 
      			*/
	        }
	    });
    }



});


