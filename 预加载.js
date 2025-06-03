const { contextBridge, ipcRenderer } = require('electron')
const 接口 = require('./接口.js');
var 所有接口 = {};

function 添加接口(名字) {
    所有接口[名字] = (...参数) => {
        return ipcRenderer.invoke(名字, ...参数);
    }
}
for (var 名字 in 接口) {
    添加接口(名字);
}
contextBridge.exposeInMainWorld('接口', 所有接口);
