var url = "https://developer.nps.gov/api/v1/visitorcenters?stateCode=NJ&api_key=ggvKIJXPJksoGFESOfN9FcpDKLkPW7gTXQU47x24";

$.ajax({
	type: 'GET',
	url: url;
	success: function(data){
		console.log('success', data);
			}
		});
