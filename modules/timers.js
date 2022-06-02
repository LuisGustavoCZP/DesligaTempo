const timer = {
    initial:null, 
    time:null
};

function get ()
{
    if(!timer.initial) return undefined;
    const timerNow = timer.initial + timer.time - Date.now();
    return Math.max(timerNow, 0);
}

function set (time) 
{
    timer.initial = Date.now();
    timer.time = time;
    return get();
}

function add (time) 
{
    if(!timer.initial) timer.initial = Date.now();
    timer.time += time;
    return get();
}

function sub (time) 
{
    timer.time -= time;
    return get();
}

function check (callback)
{
    
}

module.exports = { get, set, add, sub };