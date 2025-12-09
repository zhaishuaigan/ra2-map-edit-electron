import 属性 from './属性.mjs';
export default class 弹头 {

    注册名 = '';
    属性 = {};
    constructor(注册名, 属性) {
        this.注册名 = 注册名;
        this.属性 = 属性;
    }

    static 获取弹头(注册名) {
        // 特殊弹头没有属性
        if (注册名 == 'Special') {
            return new 弹头('特殊弹头', {});
        }
        var 配置 = window.选择的地图.合并后的数据.地图数据.获取配置项(注册名);
        if (!配置) {
            return new 弹头('未定义', {});
        }
        return new 弹头(注册名, 配置);
    }

    获取属性列表() {
        return 属性.获取所有属性(this.注册名);
    }


};