export default class 标签 {
    编号 = "";
    重复类型 = "";
    标题 = "";
    触发编号 = "";

    constructor(配置 = '') {
        if (配置 !== '') {
            var [重复类型, 标题, 触发编号] = 配置.split(',');
            this.重复类型 = 重复类型;
            this.标题 = 标题;
            this.触发标识 = 触发编号;
        }
    }

    获取配置() {
        return `${this.重复类型},${this.标题},${this.触发编号}`;
    }

}