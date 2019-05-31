function getState(){
	var a=document.getElementById("states").value;
	document.getElementById("demo").innerHTML = "You selected: " + a;
}

function getVisitor(){
	//send GET request to National Parks API
	$(function(){
		$.ajax({
			type: 'GET',
			url:'https://developer.nps.gov/api/v1/visitorcenters?stateCode=NJ&api_key=ggvKIJXPJksoGFESOfN9FcpDKLkPW7gTXQU47x24'
			success: function(data){
				console.log('success', data);
			}
		});
	});
	
