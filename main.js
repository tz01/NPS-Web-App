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
			url:'https://developer.nps.gov/api/v1/visitorcenters'
			success: function(data){
				console.log('success', data);
			}
		});
	});
	
