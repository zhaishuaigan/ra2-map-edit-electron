import 事件 from "./事件.mjs"
import 动作 from "./动作.mjs"
import 标签 from "./标签.mjs"

export default class 触发器 {
    编号 = "";
    名称 = "";
    所属方 = "";
    禁用触发 = "0";
    简单 = "0";
    中等 = "0";
    困难 = "0";
    关联触发 = "";

    标签 = null;
    事件列表 = [];
    动作列表 = [];

    constructor(编号, 配置 = "", 事件配置 = "", 动作配置 = "") {
        this.编号 = 编号;
        var 配置列表 = 配置.split(',');
        this.所属方 = 配置列表.shift();
        this.关联触发 = 配置列表.shift();
        this.名称 = 配置列表.shift();
        this.禁用触发 = 配置列表.shift();
        this.简单 = 配置列表.shift();
        this.中等 = 配置列表.shift();
        this.困难 = 配置列表.shift();

    }

    设置触发配置(触发配置) {

    }

    设置事件配置(事件配置) {

    }

    设置动作配置(动作配置) {

    }

    添加事件(事件) {
        this.事件列表.push(事件);
    }

    添加动作(动作) {
        this.动作列表.push(动作);
    }
    添加标签(标签) {
        this.标签 = 标签;
    }

    static 解析触发器(触发器配置) {
        var 配置列表 = 触发器配置.split(',');
        if (配置列表.length == 0) {
            return [];
        }
        var 总数 = 配置列表.shift();
        var 触发器列表 = [];
        for (var i = 0; i < 总数; i++) {
            var 触发器参数 = [];
            for (var j = 0; j < 9; j++) {
            }
        }
    }

}