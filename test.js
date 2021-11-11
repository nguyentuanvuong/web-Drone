const {spawn,exec} = require('child_process');

var ShellScript = ``;

const child =  exec(ShellScript);
child.stdout.on('data', (data) => {
    console.log(data);
});