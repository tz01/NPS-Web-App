var names= [];
var descriptions =[];
var parkCodes=[];
var result={};
var imagesUrls=[];

$(document).ready(function () {
  $("#submit").click(function (e) {
      var validate = Validate();
      $("#demo").html(validate)
      if (validate.length === 0) {
        $.ajax({
	        type: 'GET',
        	url: 'https://developer.nps.gov/api/v1/parks?stateCode='+$("#states").val()+'&fields=images&api_key=ggvKIJXPJksoGFESOfN9FcpDKLkPW7gTXQU47x24',
	        datatype:'json',
	        success: function(data){
	          getInfo(data);
	          for (var url in imagesUrls){
	          var elem = document.createElement("img");
		  elem.src = url;
		  document.getElementById("display").appendChild(elem);
	          }
	       },
      	});
      }
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
          currentVal = (parkCodes[x]);
          result[currentKey] = currentVal; 
      }
      for (var key in names) {
        var park_name= names[key];
        console.log(park_name);
      }
      for (var park in descriptions){
        var park_description=descriptions[park];
      }
    }

    //Checks to see if user has entered a value
    function Validate() {
        var errorMessage = "";
        if ($("#states").val() == "Select") {
            errorMessage += "► Select State";
        }
        return errorMessage;
    }

});
//Background image
//On submit, user should automatically slide down to table with park, image, and description should appear. The table should be resizable.
//On click of picture, user should automatically slide down. Info should be displayyed with Tabs. 
//https://jqueryui.com/tabs/#vertical



