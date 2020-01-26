$('#minimize').click(function () {
    window.minimize();
});

$('#maximize').click(function () {
    if (!window.isMaximized()) {
        window.maximize();
    } else {
        window.unmaximize();
    }
});

$('#exit').click(function () {
    window.close();
});