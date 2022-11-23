
window.addEventListener('load', function () {
    
});

//strip variables from links
function get_url_variables(url) {//Gets url variables as an object
    if (url == undefined) { url = window.location.href }
    //Yoinked from
    //https://gomakethings.com/getting-all-query-string-values-from-a-url-with-vanilla-js/
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
    //returns Object { "": "undefined" } if empty
    //Call with var this_url = getParams(window.location.href);
}

/* Testing/junk/examples */

async function post(what, where) {//post data to server
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {//wait for and handle response
        if (this.readyState == 4 && this.status == 200) {
            console.log('Server replied with: ', JSON.parse(this.responseText))
        }
    };

    xhttp.open("POST", where, true);
    xhttp.send(JSON.stringify(what));
}

async function request(what) {//make a request to server for data

    try {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {//wait for and handle response
            if (this.readyState == 4 && this.status == 200) {
                console.log('Server replied with: ', JSON.parse(this.responseText), ' In response: ', this.response)
            }
        };

        xhttp.open("GET", what, true);//get request
        xhttp.send();
    } catch (err) {
        console.warn('xhttp request failed ', err);
    }

}
