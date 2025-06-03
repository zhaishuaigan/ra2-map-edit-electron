const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('node:path');
const 接口 = require('./接口.js');
const 创建主窗口 = () => {
    const 主窗口 = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, '预加载.js')
        }
    })
    主窗口.menuBarVisible = false;
    主窗口.loadFile('index.html')
}

function 注册接口(名字, 方法) {
    ipcMain.handle(名字, (event, ...args) => {
        return 方法(...args);
    });
}
app.whenReady().then(() => {
    for (var 名字 in 接口) {
        注册接口(名字, 接口[名字]);
    }
    创建主窗口();
});