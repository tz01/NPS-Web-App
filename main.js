//$('#msg').html(msg + icon)
$(document).ready(function () {
  $("#submit").click(function (e) {
      var validate = Validate();
      $("#demo").html(validate)
      if (validate.length === 0) {
        $.ajax({
	        type: 'GET',
        	url: 'https://developer.nps.gov/api/v1/visitorcenters?stateCode='+$("#states").val()+'&api_key=ggvKIJXPJksoGFESOfN9FcpDKLkPW7gTXQU47x24',
	        datatype:'json',
	        success: function(data){
		        console.log(data);
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

