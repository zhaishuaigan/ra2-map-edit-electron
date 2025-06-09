
export default class 配置 {
    配置内容 = "";
    配置项 = {};
    编辑过的配置项 = new Set();
    constructor(配置内容 = '') {
        this.配置内容 = 配置内容;
    }

    async 异步解析() {
        return scheduler.postTask(() => this.同步解析(), {
            priority: 'user-visible',
        });
    }

    同步解析() {
        let 所有行 = this.配置内容.split("\n");
        let 配置项 = "";
        for (let 单行 of 所有行) {
            单行 = 单行.replace(/\;.*/, '').trim();
            if (单行.length == 0) continue;
            if (单行.startsWith(";") || 单行.startsWith("#")) continue;
            if (单行.startsWith("[")) {
                配置项 = 单行.substring(1, 单行.length - 1);
                if (配置项 in this.配置项) {
                    continue;
                }
                this.配置项[配置项] = {};
            } else {
                let 单行分割 = 单行.split("=");
                let 属性名 = 单行分割.shift().trim();
                let 值 = 单行分割.join('=').trim();
                this.配置项[配置项][属性名] = 值;
            }
        }
    }

    get 有更新() {
        return this.编辑过的配置项.size > 0;
    }

    获取配置项(配置项) {
        return this.配置项[配置项];
    }

    添加属性值(配置项, 属性名, 值) {
        if (!this.配置项[配置项]) { this.配置项[配置项] = {}; }
        this.配置项[配置项][属性名] = 值;
        this.编辑过的配置项.add(配置项);

    }

    删除配置项(配置项) {
        if (!this.配置项[配置项]) {
            return false;
        }
        delete this.配置项[配置项];
        this.编辑过的配置项.add(配置项);
        return true;
    }

    删除属性值(配置项, 属性名) {
        if (!this.配置项[配置项] || !this.配置项[配置项][属性名]) {
            return false;
        }
        delete this.配置项[配置项][属性名];
        if (Object.keys(this.配置项[配置项]).length == 0) {
            delete this.配置项[配置项];
        }
        this.编辑过的配置项.add(配置项);
        return true;
    }

    根据值删除属性(配置项, 属性值) {
        for (let 属性名 of Object.keys(this.配置项[配置项])) {
            if (this.配置项[配置项][属性名] == 属性值) {
                delete this.配置项[配置项][属性名];
                this.编辑过的配置项.add(配置项);
            }
        }
    }

    修改属性值(配置项, 属性名, 值) {
        if (!this.配置项[配置项]) { this.配置项[配置项] = {}; }
        this.配置项[配置项][属性名] = 值;
        this.编辑过的配置项.add(配置项);
    }

    生成配置文件() {
        let 配置内容 = "";
        for (let 配置项 of Object.keys(this.配置项)) {
            配置内容 += "[" + 配置项 + "]\n";
            for (let 属性名 of Object.keys(this.配置项[配置项])) {
                配置内容 += 属性名 + "=" + this.配置项[配置项][属性名] + "\n";
            }
            配置内容 += "\n";
        }
        return 配置内容;
    }

    更新配置内容() {
        for (let 配置项 of this.编辑过的配置项) {
            if (配置项 == "") continue;
            if (!this.配置项[配置项] || Object.keys(this.配置项[配置项]).length == 0) {
                // 删除配置项
                this.配置内容 = this.配置内容.replace(new RegExp('\\[' + 配置项 + '\\][\\s\\S]*?([\\[]|$)'), '$1');
                continue;
            }
            let 配置项内容 = "";
            for (let 属性名 of Object.keys(this.配置项[配置项])) {
                配置项内容 += 属性名 + "=" + this.配置项[配置项][属性名] + "\n";
            }

            // 如果已有配置项，则替换, 否则添加
            if (this.配置内容.includes(`[${配置项}]`)) {
                var 原内容 = new RegExp('\\[' + 配置项 + '\\][\\s\\S]*?(\n\\[|$)');
                var 新内容 = `[${配置项}]\n${配置项内容}$1`
                this.配置内容 = this.配置内容.replace(原内容, 新内容);
            } else {
                this.配置内容 += `\n\n[${配置项}]\n${配置项内容}`;
            }
        }
        this.编辑过的配置项 = new Set();
    }

    获取配置项的所有属性名(配置项) {
        return Object.keys(this.配置项[配置项]);
    }

    拼接配置项的值(配置项) {
        let 配置项内容 = "";
        for (let 属性名 of Object.keys(this.配置项[配置项])) {
            配置项内容 += this.配置项[配置项][属性名] + "\n";
        }
        return 配置项内容;
    }

    static 合并配置(配置1, 配置2) {
        let 合并后的配置 = new 配置("");
        合并后的配置.配置项 = JSON.parse(JSON.stringify(配置1.配置项));
        for (let 配置项 of 配置2.配置项) {
            for (let 属性名 of Object.keys(配置2.配置项[配置项])) {
                合并后的配置.配置项[配置项][属性名] = 配置2.配置项[配置项][属性名];
            }
        }
        return 合并后的配置;
    }

    static async 加载配置文件(配置文件名) {
        var 返回值 = await fetch(`${window.根目录}/资源文件/配置/${配置文件名}`);
        返回值 = await 返回值.text();
        if (配置文件名.endsWith(".ini")) {
            var 当前配置 = new 配置(返回值);
            await 当前配置.异步解析();
            return 当前配置;

        } else if (配置文件名.endsWith(".json")) {
            return JSON.parse(返回值);
        } else {
            console.log("不支持的配置文件格式");
        }
        return null;
    }

}