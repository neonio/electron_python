const electron = require('electron');
const {app, BrowserWindow} = electron;

app.on('ready', () => {
    console.log("App is ready now!");
    // win = new BrowserWindow({width: 800, height: 600});
    // win.loadFile('index.html');
});
