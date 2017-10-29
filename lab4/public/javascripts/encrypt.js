function JSONgenerator()
{
    var value=document.getElementById("value").value;
    var key=document.getElementById("key").value;
    if(value==null || key==null)
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
	JSON_obj["key-value-pairs"].push(JSONItem(key, value));
	var strJSON = JSON.stringify(JSON_obj);
	localStorage.setItem("JSON", strJSON);
	alert("El registro se agregó correctamente");	
}
function JSONEncrypt()
{
    
}