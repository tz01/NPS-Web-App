$.ajax({
	type: 'GET',
	url: 'https://developer.nps.gov/api/v1/visitorcenters?stateCode=NJ&api_key=ggvKIJXPJksoGFESOfN9FcpDKLkPW7gTXQU47x24',
	success: function(data){
		console.log(data);
			},
	});
