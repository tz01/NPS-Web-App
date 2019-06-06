var names= {};
var description ={};
const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

$(document).ready(function () {
  $("#submit").click(function (e) {
      var validate = Validate();
      $("#demo").html(validate)
      if (validate.length === 0) {
        $.ajax({
	        type: 'GET',
        	url: 'https://developer.nps.gov/api/v1/parks?stateCode='+$("#states").val()+'&api_key=ggvKIJXPJksoGFESOfN9FcpDKLkPW7gTXQU47x24',
	        datatype:'json',
	        success: function(data){
            var info=data["data"];
            for(var i = 0; i < 50 && i < info.length; i++){
              names[i] = info[i]["fullName"];
              description[i]=info[i]["description"];
            }
            for (var key in names) {
              var msg= ("Park " + key + ": " + names[key]);
              const card = document.createElement('div');
              card.setAttribute('class', 'card');

               const h1 = document.createElement('h1');
               h1.textContent =msg;
          
               container.appendChild(card);
               card.appendChild(h1);
            }
            console.log(description);
            console.log("success");
			    },
      	});
      }
    });

      	
    function Validate() {
        var errorMessage = "";
        if ($("#states").val() == "Select") {
            errorMessage += "► Select State";
        }
        return errorMessage;
    }
});


