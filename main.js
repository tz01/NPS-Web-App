function getState(){
	var a=document.getElementById("states");
	var b=a.options[a.selectedIndex].value;
	document.getElementById("demo").innerHTML = "You selected: " + b
}

function getVisitor(){
	//send GET request to National Parks API
	$(function(){
		$.ajax({
			type: 'GET',
			url:'https://developer.nps.gov/api/v1/visitorcenters?stateCode='+b+'&api_key=ggvKIJXPJksoGFESOfN9FcpDKLkPW7gTXQU47x24'
			success: function(data){
				console.log('success', data);
			}
		});
	});
	
