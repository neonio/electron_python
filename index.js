
const electron = require('electron');
const path = require('path');
const {app, BrowserWindow, Menu, Notification} = electron;
let mainWindow;
let modalWindow;
let pyProcess = null;
let pyProcessPort = null;

const createNewWindow = () => {
    modalWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: "add New"
    });
    modalWindow.on('closed', () => {
        modalWindow = null;
    });
};

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

const menuTemplates = () => {
    const baseTempate = [
        {
            label: 'File',
            submenu:[
                {
                    label: 'New Item',
                    accelerator: (process.platform === 'darwin' ? 'Command+' : 'Ctrl+') + 'N',
                    click() {
                        createNewWindow()
                    }
                },
                {
                    label: 'NOTIFICATION',
                    click() {
                        let myNotification = new Notification( {
                            title: "haha",
                            subtitle: "???",
                            body: '通知正文内容'
                        });
                        myNotification.onclick = () => {
                            console.log('通知被点击');
                        };
                        myNotification.show()
                    }
                },
                {
                    label: 'Quit',
                    click() {
                        app.quit()
                    }
                }
            ]
        }
    ];
    if (process.platform === 'darwin') {
        baseTempate.unshift({});
    }
    if (process.env.NODE_ENV !== 'production') {
        baseTempate.push({
            label: 'Debug',
            submenu:[
                {
                    label: "develop tool",
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools()
                    }
                }
            ]

        });
    }
    return baseTempate;
};

app.on('ready', () => {
    createPySubProcess();
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadFile('index.html');
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    const mainMenu = Menu.buildFromTemplate(menuTemplates());
    Menu.setApplicationMenu(mainMenu)
});

app.on('will-quit', () => {
    exitPySubProcess()
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});