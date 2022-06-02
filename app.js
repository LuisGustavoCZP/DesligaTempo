const { time } = require('console');
const express = require('express');
const http = require("http");
const { Server } = require('socket.io');
const { Execute } = require('./modules/bat');
const Timer = require('./modules/timers');

const port = 80;

const app = express();
const server = http.createServer(app);
const sockets = new Server(server);

app.use(express.static('src'));

app.get("/set", async (req, res) => 
{
    const { time } = req.query;
    const r = Timer.set(time*1000);
    console.log(`Setting time ${time} milisecounds = ${r}`);
    res.json(r);
});

app.get("/add", async (req, res) => 
{
    const { time } = req.query;
    const r = Timer.add(time*1000);
    console.log(`Adding time ${time} milisecounds = ${r}`);
    res.json(r);
});

const connections = {};
function sendAll (callback, next) 
{
    for(const key in connections)
    {
        callback(connections[key]);
    }

    if(next) next();
}

sockets.on('connection', async (socket)=>
{
    const playerId = socket.id;

    connections[playerId] = socket;
    
    socket.on('disconnect', async (socket)=>
    {
        delete connections[playerId];
    });
});

async function update ()
{
    const timeNow = Timer.get();
    if(timeNow <= 500 && timeNow != undefined)
    {
        sendAll((connection) => 
        {
            connection.disconnect(true);
        },
        () => 
        {
            setTimeout(() => 
            {
                Execute('shutdown');
            }, 1000);
        }
        );
    }
    else 
    {
        setTimeout(update, 500);
        sendAll((connection) => 
        {
            connection.emit('setup', timeNow);
        });
    }
}
update ();

server.listen(port, () => 
{
    console.log(`Servidor aberto no http://localhost:${port}`)
});