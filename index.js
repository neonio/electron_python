
const electron = require('electron');
const path = require('path');
const {app, BrowserWindow} = electron;
let mainWindow;

let pyProcess = null;
let pyProcessPort = null;

const createPySubProcess = () => {
    // let script = path.join(__dirname, 'backend', 'api.py');
    let script = path.join(__dirname, 'pydist', 'api2', 'api2');

    pyProcessPort = '4242';
    // pyProcess = require('child_process').spawn('/anaconda3/envs/AIR/bin/python', [script, pyProcessPort]);
    pyProcess = require('child_process').execFile(script, [pyProcessPort]);

    if (process != null) {
        console.log('child process success');
    }
};


const exitPySubProcess = () => {
    pyProcess.kill();
    pyProcess = null;
    pyProcess = null;
};

app.on('ready', () => {
    createPySubProcess();
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadFile('index.html');
    mainWindow.on('closed',() => {
        mainWindow = null;
    })
});

app.on('will-quit', () => {
    exitPySubProcess()
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});