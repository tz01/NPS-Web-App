var names= [];
var descriptions =[];
var parkCodes=[];
var parksAndDescriptions={};
var parksAndImages={};
var parksAndCodes={};
var imagesUrls=[];
var pCode;

$(document).ready(function () {
    $('.header').height($(window).height());
    $("#loader").hide();
    setUpTabs();                                  //sets up tabs        
    $("#submit").click(function (e) {             //if user presses submit, clear display of parks and ensure user has chosen a state
    	$("#parks").html("");
        if ($("#states").val() == "Select") {
            alert("Select a state");
            $("#parks").hide();
            $("#parkInfo").hide();  
        }else{
        	$("#parks").show();
            $("#parkInfo").show();
    		$.ajax({                              //Calls for parks and its images from National parks API
	        	type: 'GET',
        		url: 'https://developer.nps.gov/api/v1/parks?stateCode='+$("#states").val()+'&fields=images&api_key=ggvKIJXPJksoGFESOfN9FcpDKLkPW7gTXQU47x24',
	       		datatype:'jsonp',
	       		beforeSend: function() {
     				$('#loader').show();
  				},
  				complete: function(){
     				$('#loader').hide();
  				},
	        	success: function(data){
	          		getInfo(data);
	          		addImagesandOverlay();
	        	},
	        	error: function(xhr, status, error){
	        		var errorMessage = xhr.status + ': ' + xhr.statusText
         			alert('Error - ' + errorMessage + ". Please contact tzhong00@gmail.com. Thank you!");
	        	}
      		}); 
        }
    });

    //If picture is clicked on, direct user to tabs and display park's information
    $(document).on('click','.link',function(event){
    	clearTabs();                              //clears tabs
	    var parkName = $(this).attr("id");        //gets name of park that is clicked on
   		pCode=parksAndCodes[parkName];            //finds code of park that is clicked on
    	var p = document.createElement("p");  
    	var t = document.createTextNode(parksAndDescriptions[parkName]);    
    	p.appendChild(t);                         //Appends description
      	$("#description").append(p);
      	callVisitorCenters();
   		callCampgrounds();
   		callAlerts();
   		callArticles();
   		callEvents();
   		callNews();
   		callEducation();
	});

    //sets up Tabs 
	function setUpTabs(){
		$( "#tabs" ).tabs({
    		heightStyle:"fill",
    	});
	}

    //Returns names, descriptions, parkCodes, and images of parks within selected state  
    function getInfo(data){
        var info=data["data"];
        for(var i = 0; i < 50 && i < info.length; i++){
        	names[i] = info[i]["fullName"];
        	descriptions[i]=info[i]["description"];
        	parkCodes[i]=info[i]["parkCode"];
        	if ((info[i]["images"]===undefined)||(info[i]["images"].length==0)){                //If there is no image, input image that says "Image does not exist".
        		imagesUrls[i]='http://cimss.ssec.wisc.edu/tamdar/quicklooks/does_not_exist.png';
        	} else {
        		imagesUrls[i]=info[i]["images"][0]["url"];
        	}
      	}
      	var currentKey;
        var currentVal;
        for (var x = 0; x < names.length; x++) {
          currentKey = names[x];
          currentVal = descriptions[x];
          parksAndDescriptions[currentKey] = currentVal;       //Create object with park names as keys and park descriptions as values
      	}
      	var holderKey;
        var holderVal;
        for (var y = 0; y < names.length; y++) {
          holderKey = imagesUrls[y];
          holderVal = names[y];
          parksAndImages[holderKey] = holderVal;               //Create object with park names as keys and image urls as values
      	} 
      	var placeKey;
        var placeVal;
        for (var z = 0; z < names.length; z++) {
          placeKey = names[z];
          placeVal = parkCodes[z];
          parksAndCodes[placeKey] = placeVal;                   //Creates object with park names as keys and park codes as values
      	} 
    }

    //Adds images and overlay to display of parks
    function addImagesandOverlay(){
		for (var url in imagesUrls){
	        var imageContainer=document.createElement("div");
	        imageContainer.setAttribute("class","imageContainer");      //Create container to hold image
	        parks.append(imageContainer);
	        var parkUrl=imagesUrls[url];
	        var image=document.createElement("img"); 
	        image.setAttribute("class","image");
	        imageContainer.appendChild(image).src = imagesUrls[url];    //Append image to container
	        var overlay=document.createElement("div");
	        imageContainer.append(overlay);
	        overlay.setAttribute("class","imageOverlay");                //Add overlay to image
	        var textdiv=document.createElement("div"); 
	        textdiv.setAttribute("class","overlayText");
	        var aTag = document.createElement('a');
			aTag.setAttribute('href',"#parkInfo");
			aTag.setAttribute('class',"link");
			aTag.setAttribute('id',parksAndImages[parkUrl]);
			aTag.innerHTML = parksAndImages[parkUrl];                   //Places park name and link to #parkinfo on overlay
			textdiv.appendChild(aTag)
	        overlay.append(textdiv);                                 
	     }
    }

    //Clears Tabs
    function clearTabs(){
    	$("#description").html("");
    	$("#alerts").html("");
    	$("#articles").html("");
    	$("#news").html("");
    	$("#events").html("");
    	$("#education").html("");
    	$("#visitorcenters").html("");
    	$("#campgrounds").html("");
    }

    //calls Alerts from National Parks API
    function callAlerts(){
    	var alertDescriptions=[];
		var titles=[];
		var titlesAndDescriptions={};
		var alertUrls=[];
		var titlesAndUrls=[];
    	$.ajax({
	        type:'GET',
	        url:'https://developer.nps.gov/api/v1/alerts?parkCode='+pCode+'&api_key=ggvKIJXPJksoGFESOfN9FcpDKLkPW7gTXQU47x24',
	        datatype:'json',
	        success: function(data){
	        	var alerts=data["data"];
	        	if (alerts.length==0){
	        		$("#alerts").html("Sorry, there are no alerts related to this park.");
	        	}
	        	for(var k = 0; k < 50 && k < alerts.length; k++){
        			alertDescriptions[k]=alerts[k]["description"];                     
        			titles[k]=alerts[k]["title"];
        			alertUrls[k]=alerts[k]["url"];
      			}
      			var tempKey;
       			var tempVal;
        		for (var s = 0; s < titles.length; s++) {
         			tempKey = titles[s];
          			tempVal = alertDescriptions[s];
          			titlesAndDescriptions[tempKey] = tempVal;        
      			} 
      			var fillKey;
      			var fillVal;
      			for (var m=0;m<titles.length;m++){
      				fillKey=titles[m];
      				fillVal=alertUrls[m];
      				titlesAndUrls[fillKey]=fillVal;
      			}
      			for (var key in titlesAndDescriptions){                       //Appends names and descriptions of alerts to alerts tab
      				var h = document.createElement("h3");
    				var aElem = document.createElement('a');                          
					aElem.setAttribute('href',titlesAndUrls[key]);
					aElem.innerHTML = key;
    				h.appendChild(aElem);
      				$("#alerts").append(h);
      				var p = document.createElement("p");
    				var d = document.createTextNode(titlesAndDescriptions[key]);
    				p.appendChild(d);
      				$("#alerts").append(p);
      			}
	        },
	        error: function(xhr, status, error){
	        		var errorMessage = xhr.status + ': ' + xhr.statusText
         			alert('Alerts Error - ' + errorMessage + ". Please contact tzhong00@gmail.com. Thank you!");
	        }
	    });
    }

    //calls Articles from National Parks API
    function callArticles(){
    	var articleDescriptions=[];
		var articlesTitles=[];
		var articlesTD={};
		var articlesUrls=[];
		var artTitlesAndUrls={};
    	$.ajax({
    		type:'GET',
    		url:'https://developer.nps.gov/api/v1/articles?parkCode='+pCode+'&api_key=ggvKIJXPJksoGFESOfN9FcpDKLkPW7gTXQU47x24',
    		datatype:'json',
    		success:function(data){
    			var articles=data["data"];
    			if (articles.length==0){
	        		$("#articles").html("Sorry, there are no articles related to this park.");
	        	}
    			for(var r = 0; r < 50 && r< articles.length; r++){
        			articleDescriptions[r]=articles[r]["listingdescription"];
        			articlesTitles[r]=articles[r]["title"];
        			articlesUrls[r]=articles[r]["url"];
      			}

      			var articleKey;
      			var articleVal;
      			for (var a=0;a<articlesTitles.length;a++){
      				articleKey=articlesTitles[a];
      				articleVal=articleDescriptions[a];
      				articlesTD[articleKey]=articleVal;
      			}

      			var shortKey;
      			var shortVal;
      			for (var j=0;j<articlesTitles.length;j++){
      				shortKey=articlesTitles[j];
      				shortVal=articlesUrls[j];
      				artTitlesAndUrls[shortKey]=shortVal;
      			}

      			for (var key in articlesTD){                                       //Appends name, description, and link of article to articles tab
      				var h = document.createElement("h3");
    				var aEm = document.createElement('a');
					aEm.setAttribute('href',artTitlesAndUrls[key]);
					aEm.innerHTML = key;
    				h.appendChild(aEm);
      				$("#articles").append(h);
      				var p = document.createElement("p");
    				var d = document.createTextNode(articlesTD[key]);
    				p.appendChild(d);
      				$("#articles").append(p);
      			}
    		},
    		error: function(xhr, status, error){
	        		var errorMessage = xhr.status + ': ' + xhr.statusText
         			alert('Articles Error - ' + errorMessage + ". Please contact tzhong00@gmail.com. Thank you!");
	        }
    	})
    }

    //calls Events from National Parks API
    function callEvents(){
    	$.ajax({
    		type:'GET',
    		url:'https://developer.nps.gov/api/v1/events?parkCode='+pCode+'&api_key=ggvKIJXPJksoGFESOfN9FcpDKLkPW7gTXQU47x24',
    		datatype:'json',
    		success:function(data){
    			var events=data["data"];
    			if (events.length==0){
	        		$("#events").html("Sorry, there are no events related to this park.");
	        	}
        		for(var g = 0; g < 50 && g < events.length; g++){                                  //Append title and description of event to events tab
        			var h = document.createElement("h3");
        			h.append(events[g]["title"]);
        			$("#events").append(h);
        			$("#events").append(events[g]["description"]); 

        			if (events[g]["contactname"]==""){      
        				var p = document.createElement("p");                                       //append to events tab
        				var t=document.createTextNode("Sorry, there is no contact name for this event.");
        				p.appendChild(t);                                        
        			}else{                                                                         //If contact name, contact email address, and contact telephone number exists,
        				var p = document.createElement("p");                                       //append to events tab
        				var t=document.createTextNode("Contact Name: ");
        				p.appendChild(t);
    					var d = document.createTextNode(events[g]["contactname"]);
    					p.appendChild(d);
        			}
        			p.setAttribute('class','addon');
        			$("#events").append(p);


        			if (events[g]["contactemailaddress"]!=""){
        				var email = document.createElement("p");
        				var t=document.createTextNode("Contact Email Address: ");
        				email.appendChild(t);
    					var d = document.createTextNode(events[g]["contactemailaddress"]);
    					email.appendChild(d);
        			}else{
        				var email= document.createElement("p");                                       
        				var t=document.createTextNode("Sorry, there is no contact email address for this event.");
        				email.appendChild(t);        
        			}
        			email.setAttribute('class','addon');
        			$("#events").append(email);


        			if (events[g]["contacttelephonenumber"]!=""){
        				var number = document.createElement("p");
        				var t=document.createTextNode("Contact Telephone Number: ");
        				number.appendChild(t);
    					var d = document.createTextNode(events[g]["contacttelephonenumber"]);
    					number.appendChild(d);
        			}else{
        				var number = document.createElement("p");
        				var t=document.createTextNode("Sorry, there is no contact telephone number for this event.");
        				number.appendChild(t);
        			}
        			number.setAttribute('class','addon');
        			$("#events").append(number);



        			if ((events[g]["dates"]===undefined)||(events[g]["dates"].length==0)){    //Append event dates to events tab
        				var eventDates = document.createElement("p");
        				var d = document.createTextNode("Sorry, the dates for this event currently are not avaliable.");
        				eventDates.appendChild(d);
        			}else{
        				var dates=(events[g]["dates"]).toString();
        				var eventDates = document.createElement("p");
        				var t=document.createTextNode("Dates: ");
        				eventDates.appendChild(t);
        				var d = document.createTextNode(dates);
        				eventDates.appendChild(d);
        			}
        			eventDates.setAttribute('class','addon');
        			$("#events").append(eventDates);
      			}	        	
    		},
    		error: function(xhr, status, error){
	        		var errorMessage = xhr.status + ': ' + xhr.statusText
         			alert('Events Error - ' + errorMessage + ". Please contact tzhong00@gmail.com. Thank you!");
	        }
    	})
    }
    //calls News from National Parks API
    function callNews(){
    	var newsDescriptions=[];
		var newsTitles=[];
		var newsTD={};
		var newsUrls=[];
		var newsTitlesAndUrls={};
    	$.ajax({
    		type:'GET',
    		url:'https://developer.nps.gov/api/v1/newsreleases?parkCode='+pCode+'&api_key=ggvKIJXPJksoGFESOfN9FcpDKLkPW7gTXQU47x24',
    		datatype:'json',
    		success:function(data){
    			var news=data["data"];
    			if (news.length==0){
	        		$("#news").html("Sorry, there are no news related to this park.");
	        	}
    			for(var n = 0; n < 50 && n< news.length; n++){
        			newsDescriptions[n]=news[n]["abstract"];
        			newsTitles[n]=news[n]["title"];
        			newsUrls[n]=news[n]["url"];
      			}
      			var newsKey;
      			var newsVal;
      			for (var b=0;b<newsTitles.length;b++){
      				newsKey=newsTitles[b];
      				newsVal=newsDescriptions[b];
      				newsTD[newsKey]=newsVal;
      			}
      			var pholderKey;
      			var pholderVal;
      			for (var c=0;c<newsTitles.length;c++){
      				pholderKey=newsTitles[c];
      				pholderVal=newsUrls[c];
      				newsTitlesAndUrls[pholderKey]=pholderVal;
      			}
      			for (var key in newsTD){
      				var h = document.createElement("h3");                          
    				var a = document.createElement('a');
					a.setAttribute('href',newsTitlesAndUrls[key]);
					a.innerHTML = key;
    				h.appendChild(a);
      				$("#news").append(h);
      				var p = document.createElement("p");
    				var d = document.createTextNode(newsTD[key]);
    				p.appendChild(d);
      				$("#news").append(p);
      			}
    		},
    		error: function(xhr, status, error){
	        		var errorMessage = xhr.status + ': ' + xhr.statusText
         			alert('News Error - ' + errorMessage + ". Please contact tzhong00@gmail.com. Thank you!");
	        }
    	})
    }

    //calls Lesson Plans from National Parks API
    function callEducation(){
    	$.ajax({
    		type:'GET',
    		url:'https://developer.nps.gov/api/v1/lessonplans?parkCode='+pCode+'&api_key=ggvKIJXPJksoGFESOfN9FcpDKLkPW7gTXQU47x24',
    		datatype:'json',
    		success:function(data){
    			var education=data["data"];
    			if (education.length==0){
	        		$("#education").html("Sorry, there are no lesson plans related to this park.");
	        	}
    			for(var e = 0; e < 50 && e < education.length; e++){                      //Append name, description, and link to lesson plan to lesson plans tab
        			var h = document.createElement("h3");
        			var aLink=document.createElement("a");
        			aLink.setAttribute('href',education[e]["url"]); 
        			aLink.innerHTML=education[e]["title"];
        			h.appendChild(aLink);
        			$("#education").append(h);
        			var gradeLvl = document.createElement("p");
        			var gradeLvlText = document.createTextNode(education[e]["gradelevel"]);
        			gradeLvl.appendChild(gradeLvlText);
        			gradeLvl.setAttribute('class','grades');
      				$("#education").append(gradeLvl);
        			var p = document.createElement("p");
        			var t = document.createTextNode(education[e]["questionobjective"]);
        			p.appendChild(t);
      				$("#education").append(p);
        		}
    		},
    		error: function(xhr, status, error){
	        		var errorMessage = xhr.status + ': ' + xhr.statusText
         			alert('Lesson Plans Error - ' + errorMessage + ". Please contact tzhong00@gmail.com. Thank you!");
	        }
    	})
    }

    //calls Visitor Centers from National Parks API
    function callVisitorCenters(){
    	$.ajax({
      		type:'GET',
	       	url:'https://developer.nps.gov/api/v1/visitorcenters?parkCode='+pCode+'&api_key=ggvKIJXPJksoGFESOfN9FcpDKLkPW7gTXQU47x24',
	        datatype:'json',
	        success: function(data){
	        	var visitorcenters=data["data"];
	        	if (visitorcenters.length==0){
	        		$("#visitorcenters").html("Sorry, there are no visitor centers related to this park.");
	        	}
	        	for(var w = 0; w < 50 && w < visitorcenters.length; w++){                 //Append name, link, description, and directions info  
        			var h =document.createElement("h3");								  //of visitor center to visitorcenters tab
        			if (visitorcenters[w]["url"]!=""){                                   
        				var aLnk=document.createElement("a");
        				aLnk.setAttribute('href',visitorcenters[w]["url"]);
        				aLnk.innerHTML=visitorcenters[w]["name"];
        				h.appendChild(aLnk);
        			}else{
        				var t=document.createTextNode(visitorcenters[w]["name"]);
        				h.appendChild(t);
        			}
        			$("#visitorcenters").append(h);
        			var p = document.createElement("p");
        			var text = document.createTextNode(visitorcenters[w]["description"]);
        			p.appendChild(text);
      				$("#visitorcenters").append(p);
      				var directionsInfo = document.createElement("p");
      				if (visitorcenters[w]["directionsInfo"]!=""){
      					var directionsInfoText = document.createTextNode(visitorcenters[w]["directionsInfo"]);
        				directionsInfo.appendChild(directionsInfoText);
      				}else{
      					var directionsInfoText = document.createTextNode("Sorry, no information about directions can be found for this park.");
        				directionsInfo.appendChild(directionsInfoText);
      				}
      				$("#visitorcenters").append(directionsInfo);
        		}
	        },
	        error: function(xhr, status, error){
	        		var errorMessage = xhr.status + ': ' + xhr.statusText
         			alert('Visitor Centers Error - ' + errorMessage + ". Please contact tzhong00@gmail.com. Thank you!");
	        }
      	});
    }

    //calls Campgrounds from National Parks API
    function callCampgrounds(){
    	$.ajax({
    		type:'GET',
	       	url:'https://developer.nps.gov/api/v1/campgrounds?parkCode='+pCode+'&api_key=ggvKIJXPJksoGFESOfN9FcpDKLkPW7gTXQU47x24',
	        datatype:'json',
	        success: function (data){
	        	var campgrounds=data["data"];
	        	if (campgrounds.length==0){
	        		$("#campgrounds").html("Sorry, there are no campgrounds related to this park.");
	        	}
	        	for (var t=0;t<50 && t<campgrounds.length;t++){                        //Append name, description, and link to directions of 
	        		var h =document.createElement("h3");                               //campground to campgrounds tab
	        		if (campgrounds[t]["directionsUrl"]!=""){
	        			var link=document.createElement("a");
	        			link.setAttribute('href',campgrounds[t]["directionsUrl"]);
	        			link.innerHTML=campgrounds[t]["name"];
	        			h.appendChild(link);
	        		}else{
	        			var name=document.createTextNode(campgrounds[t]["name"]);
	        			h.appendChild(name);
	        		}
	        		$("#campgrounds").append(h);
	        		var description=document.createElement("p");
	        		var descriptionText=document.createTextNode(campgrounds[t]["description"]);
	        		description.appendChild(descriptionText);
	        		$("#campgrounds").append(description);

	        		var readmore=document.createElement("details");                //Create details tag and append weather overview and regulations overview to details
					var summary=document.createElement("summary");                 //Append details to campgrounds tab
	        		var summarytext=document.createTextNode("Read More");
	        		summary.appendChild(summarytext);
	        		readmore.appendChild(summary);

	        		var overview=document.createElement("p");
	        		if (campgrounds[t]["weatheroverview"]!=""){
	        			var weatherLabel=document.createTextNode("Weather overview: ");
	        			overview.appendChild(weatherLabel);
	        			var ovText=document.createTextNode(campgrounds[t]["weatheroverview"]);
	        			overview.appendChild(ovText);
	        		}else{
	        			var ovtext=document.createTextNode("Weather overview: Sorry, the weather overview for this campground could not be found.")
	        			overview.appendChild(ovtext);
	        		}
					readmore.appendChild(overview);

					var regs=document.createElement("p");
					if (campgrounds[t]["regulationsoverview"]!=""){
						var regsLabel=document.createTextNode("Regulations overview: ");
	        			regs.appendChild(regsLabel);
	        			var regsText=document.createTextNode(campgrounds[t]["regulationsoverview"]);
	        			regs.appendChild(regsText);
					}else{
	        			var regsText=document.createTextNode("Regulations overview: Sorry, the regulations overview for this campground could not be found.")
	        			regs.appendChild(regsText);
	        		}
	        		readmore.appendChild(regs);
	        		$("#campgrounds").append(readmore);
	        	}
	        },
	        error: function(xhr, status, error){
	        		var errorMessage = xhr.status + ': ' + xhr.statusText
         			alert('Campgrounds Error - ' + errorMessage + ". Please contact tzhong00@gmail.com. Thank you!");
	        }
    	})

    }
          
});


