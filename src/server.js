'use strict';

const http = require('http').createServer(handler)
const io = require('socket.io')(http);
const fs = require('fs');
const Robot = require('./classes/Robot');
const Map = require('./classes/Map');

const mapString = "####################\n#             ## # #\n# # ## #####   # # #\n# # ## #####  ## # #\n# #            #   #\n# # ########  #### #\n# #              # #\n# # ########  ## # #\n#                # #\n# # ########  ## # #\n# #              # #\n# # ########  ## # #\n#                  #\n####################\n";

let map = new Map(mapString);
let robot = new Robot(map);
robot.start();

function handler(req, res) {
    fs.readFile(__dirname + '/index.html', (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}

http.listen(8000, () => {
    console.log("server start at port 8000");
});


io.on('connection', (socket) => {
    console.log("A user has been connected.");
    io.emit("message", "Connected");
    socket.on('start', (data)=>{
        io.emit("message", "Start Cleaning");
        console.log("Start cleaning at " + data.time);
        robot.start();
    })
});