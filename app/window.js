let win = require('electron').remote.getCurrentWindow();

document.getElementById('minimize').addEventListener('click', function () {
    win.minimize();
});

document.getElementById('maximize').addEventListener('click', function () {
    if (!win.isMaximized()) win.maximize(); 
    else win.unmaximize();
});

document.getElementById('exit').addEventListener('click', function () {
    win.close();
});