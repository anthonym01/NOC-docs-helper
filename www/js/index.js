
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

let tickets = {
    initalize: async function () {

    },
    actionlevels: [
        "No aplicable action",// clear - 0
        "Add note to ticket. Anounce to slack. find an engineer to take ownership.",//Red - 1
        "Put a note in the ticket. Assign to yourself. Update Ticket every 2 hours with current status. If no customer response after 3 checks, escalate to management for follow-up",//yellow - 2
        "Check with IBM Team",//purple - 3
        "Add note to ticket. Announce to Slack. Leave unnasigned",//blue - 4
        "Leave alone",//green - 5
        "Add note to ticket. Leave unassigned",//Dark blue - 6
    ],
    actionmatrixday: [//yes im faking natural language, sue me
        { typename: "Customer generated: Incident",tokens:"INC incident Customer generated", prioritymatrix: [1, 1, 4, 4] },
        { typename: "Customer generated: Change request",tokens:"CHG change request Customer generated", prioritymatrix: [1, 1, 4, 4] },
        { typename: "Customer generated: RITM",tokens:"RITM new user login logging SNOW", prioritymatrix: [1, 4, 4, 4] },
        { typename: "Customer generated: IBM VA",tokens:"IBM VA Veteran Veterans association", prioritymatrix: [1, 3, 4, 4] },
        { typename: "Customer generated: IBM GSA",tokens:"IBM GSA", prioritymatrix: [1, 3, 4, 4] },
        { typename: "Customer generated: IBM NELLC",tokens:"IBM NELLC", prioritymatrix: [1, 3, 4, 4] },
    ],
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
