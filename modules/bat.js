const { spawn } = require('node:child_process');

/* const options = {
    detached: true,
    stdio: 'ignore'
}; */

function Execute (cmd)
{
    const bat = spawn('cmd.exe', ['/c', `${cmd}.bat`],  {cwd: './commands'}); //, options

    bat.stdout.on('data', (data) => 
    {
        console.log(data.toString());
    });

    bat.stderr.on('data', (data) => 
    {
        if(data) console.error(data.toString());
    });

    bat.on('exit', (code) => 
    {
        console.log(`Child exited with code ${code}`);
    });
}

module.exports = { Execute }