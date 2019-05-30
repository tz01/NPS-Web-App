function getState(){
	var a=document.getElementById("states");
	var b=a.options[a.selectedIndex].value;
	document.getElementById("demo").innerHTML = "You selected: " + b
}

function getVisitor(){
	var request = new XMLHttpRequest()
	request.open('GET','https://developer.nps.gov/api/v1/visitorcenters',true)
	request.onload=function(){
		var data= JSON.parse(this.response)
		data.forEach(visitorCenter=>{
			console.log(visitorCenter.description)
		})
	}
	request.send()

}
