const 接口 = {
    打开文件: async () => {
        console.log('打开文件');
        const { dialog } = require('electron');
        console.log('dialog', dialog);
        const { canceled, filePaths } = await dialog.showOpenDialog();
        if (!canceled) {
            console.log(filePaths[0]);
            return filePaths[0];
        }
        return null;
    },
    删除文件: (文件名) => {
        const fs = require('fs');
        fs.unlinkSync(文件名);
        return true;
    },
    重命名文件: (旧文件名, 新文件名) => {
        const fs = require('fs');
        fs.renameSync(旧文件名, 新文件名);
        return true;
    },
    打开目录: async () => {
        console.log('打开目录');
        const { dialog } = require('electron');
        console.log('dialog', dialog);
        const { canceled, filePaths } = await dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        if (!canceled) {
            console.log(filePaths[0]);
            return filePaths[0];
        }
        return null;
    },
    创建目录: (目录名) => {
        const fs = require('fs');
        if (接口.目录存在(目录名)) {
            return true;
        }
        fs.mkdirSync(目录名);
        return true;
    },
    删除目录: (目录名) => {
        const fs = require('fs');
        fs.rmdirSync(目录名);
        return true;
    },
    目录存在: (文件名) => {
        const fs = require('fs');
        return fs.existsSync(文件名);
    },
    复制文件: (源文件名, 目标文件名) => {
        const fs = require('fs');
        fs.copyFileSync(源文件名, 目标文件名);
        return true;
    },
    获取游戏目录: () => {
        const path = require('path');
        var 游戏目录 = path.join(process.cwd(), '../game/');
        return 游戏目录;
    },
    写入文件: (文件名, 文件内容) => {
        const fs = require('fs');
        fs.writeFileSync(文件名, 文件内容);
        return true;
    },
    读取文件: (文件名) => {
        const fs = require('fs');
        if (!fs.existsSync(文件名)) {
            return null;
        }
        var 文件内容 = fs.readFileSync(文件名).toString();
        return 文件内容;
    },
    读取国标文件: (文件名) => {
        const fs = require('fs');
        if (!fs.existsSync(文件名)) {
            return null;
        }
        var 文件内容 = new TextDecoder('gbk').decode(fs.readFileSync(文件名)).toString();
        return 文件内容;
    },
    写入国标文件: (文件名, 文件内容) => {
        const fs = require('fs');
        fs.writeFileSync(文件名, 文件内容, 'gbk');
        return true;
    },
    文件存在: async (文件名) => {
        const fs = require('fs');
        return fs.existsSync(文件名);
    },
    创建历史记录: (文件名) => {
        const path = require('path');
        var 文件信息 = path.parse(文件名);
        var 历史记录目录 = 文件信息.dir + '/历史记录/';
        var 备份时间 = new Date().toLocaleString();
        var 历史记录文件名 = 历史记录目录 + 文件信息.name + 备份时间 + 文件信息.ext;
        if (!接口.目录存在(历史记录目录)) {
            接口.创建目录(历史记录目录);
        }
        if (!接口.文件存在(历史记录文件名)) {
            接口.复制文件(文件名, 历史记录文件名);
        }
    },
    写入启动配置: (配置内容) => {
        var 配置文件 = 接口.获取游戏目录() + 'spawn.ini';
        const fs = require('fs');
        fs.writeFileSync(配置文件, 配置内容);
        return true;
    },
    写入地图: (文件内容) => {
        var 文件名 = 接口.获取游戏目录() + 'mp.dat';
        const fs = require('fs');
        fs.writeFileSync(文件名, 文件内容);
        return true;
    },
    启动游戏: () => {
        console.log('启动游戏');
        const { exec } = require('node:child_process');
        var 游戏目录 = 接口.获取游戏目录();
        var 启动命令 = 游戏目录 + 'Syringe.exe "MPTesterAres.sp" -SPAWN -SPEEDCONTROL'
        exec(启动命令, { cwd: 游戏目录 });
    },
    保存设置: (设置名, 设置值) => {
        const path = require('path');
        var 设置文件名 = path.join(process.cwd(), 'settings.json');
        var 配置内容 = 接口.读取文件(设置文件名);
        if (配置内容 === null) {
            配置内容 = '{}';
        }
        配置内容 = JSON.parse(配置内容);
        配置内容[设置名] = 设置值;
        配置内容 = JSON.stringify(配置内容);
        接口.写入文件(设置文件名, 配置内容);
    },
    获取设置: (设置名) => {
        const path = require('path');
        var 设置文件名 = path.join(process.cwd(), 'settings.json');
        var 配置内容 = 接口.读取文件(设置文件名);
        if (配置内容 === null) {
            return null;
        }
        配置内容 = JSON.parse(配置内容);
        if (typeof 配置内容[设置名] === 'undefined') {
            return null;
        }
        return 配置内容[设置名];
    },
    生成截图: async (地图文件名) => {
        var path = require('path');
        var 地图文件信息 = path.parse(地图文件名);
        var 游戏目录 = path.join(process.cwd(), '../game');
        var 截图生成器目录 = path.join(process.cwd(), '../CNCMaps/');
        var 截图生成器 = path.join(截图生成器目录, 'CNCMaps.Renderer.exe');
        var 参数 = [
            '-i', '"' + 地图文件名 + '"',
            '-p', '-o', '"' + 地图文件信息.base + '"',
            '-m', '"' + 游戏目录 + '"',
            '-Y', '-F', '-z', '+(800,0)', '--thumb-png', '--bkp'
        ];

        const { exec } = require('child_process');

        return new Promise((resolve, reject) => {
            exec(截图生成器 + ' ' + 参数.join(' '), (error, stdout, stderr) => {
                var 错误文件 = 地图文件信息.dir + '/错误.txt';
                if (error) {
                    var fs = require('fs');
                    fs.writeFileSync(错误文件, error.toString());
                    reject(error.toString());
                    return;
                }
                if (stderr) {
                    var fs = require('fs');
                    fs.writeFileSync(错误文件, stderr.toString());
                    reject(stderr.toString());
                    return;
                }
                console.log(`stdout: ${stdout}`);
                resolve();
            });
        });

    }
}

module.exports = 接口;