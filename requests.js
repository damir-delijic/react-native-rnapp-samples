function request(options){
    
    var urlEnd = options.urlEnd;
    var method = options.method;
    var callback = options.callback;
    var data = options.data;
    const Http = new XMLHttpRequest();
    const url = 'http://127.0.0.1:3000/' + urlEnd
    Http.open(method, url, true);
    Http.setRequestHeader('Content-Type', 'application/json');
    Http.send(JSON.stringify({data: data}));
    Http.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            if(Http.responseText){
                callback(JSON.parse(Http.responseText));
            }else{
                console.log("ERROR - nesto nije u redu sa HTTP.responseText")
                callback(false);
            }
            
        }
    }
}

export default request;