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

        this.事件列表 = 事件.解析事件列表(事件配置);
        this.动作列表 = 动作.解析动作列表(动作配置);

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
    保存() {

    }

    static 获取所有触发器() {
        console.log('123123', window.选择的地图);
        var 所有标签 = window.选择的地图.地图数据.配置项['Tags'];
        var 返回结果 = [];
        for (var 标签编号 in 所有标签) {
            var 当前标签 = 所有标签[标签编号];
            var 当前触发器 = 触发器.根据标签编号获取触发器(标签编号);
            返回结果.push(当前触发器);
        }
        console.log(返回结果);
        return 返回结果;
    }

    static 根据标签编号获取触发器(编号) {
        var 标签信息 = window.选择的地图.地图数据.配置项.Tags[编号];
        if (!标签信息 || 标签信息 == "") {
            return null;
        }
        var [重复类型, 标签名, 触发编号] = 标签信息.split(',');
        var 触发配置 = window.选择的地图.地图数据.配置项.Triggers[触发编号];
        var 事件配置 = window.选择的地图.地图数据.配置项.Events[触发编号];
        var 动作配置 = window.选择的地图.地图数据.配置项.Actions[触发编号];
        var 取到的触发器 = new 触发器(触发编号, 触发配置, 事件配置, 动作配置);
        取到的触发器.重复类型 = 重复类型;
        取到的触发器.标签 = new 标签(标签信息);
        取到的触发器.标签.编号 = 编号;
        return 取到的触发器;
    }


}