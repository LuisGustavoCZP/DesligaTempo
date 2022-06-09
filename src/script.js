const socket = io();

const offEl = document.getElementById('offline');
const onEl = document.getElementById('online');
const hrEl = document.getElementById("hr");
const miEl = document.getElementById("mi");
const seEl = document.getElementById("se");



function addTime()
{
    const seconds = parseInt(document.getElementById("seconds-amount").value);
    console.log(seconds);

    fetch(`/add?time=${seconds}`)
    .then(res => res.json())
    .then(res => {
        console.log("Deu bom!", res)
    })
    .catch(err => {
        console.log("Oou deu problema!", err)
    });
}

function setTime()
{
    const seconds = parseInt(document.getElementById("seconds-amount").value);
    console.log(seconds);

    fetch(`/set?time=${seconds}`)
    .then(res => res.json())
    .then(res => {
        console.log("Deu bom!", res)
    })
    .catch(err => {
        console.log("Oou deu problema!", err)
    });
}

document.getElementById("acao-selector").onchange = setAction;
function setAction()
{
    const action = document.getElementById("acao-selector").value;
    console.log(action);

    fetch(`/set?action=${action}`)
    .then(res => res.json())
    .then(res => {
        console.log("Deu bom!", res)
    })
    .catch(err => {
        console.log("Oou deu problema!", err)
    });
}

socket.on('connect', ()=>
{
    const playerId = socket.id;
    console.log(`Player connected on Client with id: ${playerId}`)
});

socket.on('disconnect', ()=>
{
    const playerId = socket.id;
    console.log("Desconectado!")
    onEl.classList.add("hidden");
    offEl.classList.remove("hidden");
});

socket.on('setup', (resp)=>
{
    //console.log(resp);
    let {timeoutAction, timer=0} = resp;
    const playerId = socket.id;
    timer = Math.floor(timer/1000);
    const sec = timer%60;
    const mins = Math.floor(timer/60);
    const min = mins%60;
    const hr = Math.floor(mins/60);
    //console.log(`Receiving setup`, timer);
    hrEl.innerText = hr;
    miEl.innerText = min;
    seEl.innerText = sec;
    onEl.classList.remove("hidden");

    document.getElementById("acao-selector").value = timeoutAction;
});