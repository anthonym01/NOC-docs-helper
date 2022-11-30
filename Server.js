
const express = require('express');
const app = express();
const fs = require('fs');

const port = 3690;//for testing only


async function startingpoint(response) {//serve index.html
    response.setHeader('Acess-Control-Allow-Origin', '*');
    try {
        response.writeHead(200, { 'Content-type': 'text/html' });//200 ok
        fs.readFile('www/index.html', function (err, databuffer) {
            if (err) {
                console.log(err);
            } else {
                response.write(databuffer);
            }
            response.end();//end response
        })
    } catch (err) {
        console.log('Catastrophy on index: ', err);
    }
}


async function writeresponce(res, filepath) {//write files in responses, for static files in the /www folder
    try {
        fs.readFile(filepath, function (err, databuffer) {
            if (err) {
                res.writeHead(404);//not okay
                console.error(err);
            } else {
                res.writeHead(200);//200 ok
                res.write(databuffer);
            }
            res.end();//end response
        })
    } catch (error) {
        console.log(error);
    }
}


app.get('/', (request, response) => { startingpoint(response) });

app.get('/*', (request, responce) => {// 'catch all' equivalent
    console.log('requested Url: ', request.url);

    responce.setHeader('Acess-Control-Allow-Origin', '*');//allow access control from client, this will automatically handle most media files

    //These need to be handled manually, with a bit of stringery
    if (request.url.indexOf('.css') != -1) {//requestuested url is a css file
        responce.setHeader('Content-type', 'text/css');//Set the header to css, so the client will expects a css document
    } else if (request.url.indexOf('.js') != -1) { //requestuested url is a js file
        responce.setHeader('Content-type', 'application/javascript');//Set the header to javascript, so the client will expects a javascript document
    } else if (request.url.indexOf('.html') != -1) {//requestuested url is a html file
        responce.setHeader('Content-type', 'text/html');//Set the header to html, so the client will expects a html document
    } else {
        //media handled automatically for now

    }
    if (request.url.indexOf('.') == -1) {//has no file type
        //console.log('404, redirect to starting point');
        //startingpoint(res)
    } else {
        writeresponce(responce, request.url.replace('/', 'www/'));//point to the folder with our web files
    }
});

app.listen(port, () => { console.log('Running on port ', port) })//Listen for requests, this starts the server

/* Test Stuff */

//A test get
app.get('/get/test', (req, res) => {
    // Receive a small amount of test data and send back a response
    try {
        console.log('test get from server');
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({ test: 'test get is okay' }));
    } catch (error) {
        console.log('Catastrophy on test get: ', err);
    }
});

//a test post
app.post('/post/test', (req, res) => {
    //send more data than a get
    console.log('test post to server');
    req.on('data', function (data) {
        console.log('Posted raw: ', data, ' Parsed: ', JSON.parse(data));
        res.end(JSON.stringify({ test: "test post received" }));
    });
});
