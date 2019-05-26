var a=document.getElementById("states");

//function called when state is selected
function call_NPS(value){
	$.ajax({
		url:url,
		type:'GET',
		dataType:'json',
		data:{
			stateCode:(a.options[a.slectedIndex].value);
		},
		success:function(data){
			var data=JSON.parse(this.response)
			data.forEach(park=>{
				//Log each park's name
				console.log(park.addresses)
			})
		}
	})
}