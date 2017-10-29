var jwt = require('jwt-simple');

function JSONgenerator(){
    var new_key=document.getElementById("key").value;
    var new_value=document.getElementById("value").value;
    
    if(new_value==null || new_key==null)
    {
        alert("Ingrese datos válidos");
        return;
    }
    var a = localStorage.getItem("JSON");
	if(a==null){
		alert("Se creará JSON");
		var strJSON = '{"key-value-pairs":[]}';
		localStorage.setItem("JSON", strJSON);
    }
    var JSON_obj = JSON.parse(localStorage.getItem("JSON"));
	JSON_obj["key-value-pairs"].push(JSONItem(new_key, new_value));
	var strJSON = JSON.stringify(JSON_obj);
	localStorage.setItem("JSON", strJSON);
	alert("El registro se agregó correctamente");	
}
function JSONEncrypt()
{
    var jwt=require('json-web-token')
    var payload=localStorage.getItem("JSON");
    var secret='TOPSECRET';
    jwt.encode(secret,payload);
}
function JSONItem(key, value){
	return {"key": key, "value": value};
}