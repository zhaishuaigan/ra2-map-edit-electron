export default class 文件 {
    路径 = '';
    文件监听器 = null;
    constructor(路径) {
        this.路径 = 路径;
    }
    static async 打开一个文件(参数 = {}) {
        const 路径 = await 接口.打开文件();
        if (!路径) {
            // 用户取消了选择
            return null;

        }
        return new 文件(路径);
    }

    static async 保存一个文件(文件名, 内容) {
        await 接口.写入文件(文件名, 内容);
        return new 文件(文件名);
    }

    async 写入(内容) {
        await 接口.写入文件(this.路径, 内容);
    }

    async 追加(内容) {
        var 新内容 = await 接口.读取文件(this.路径) + 内容;
        await 接口.写入文件(this.路径, 新内容);
    }

    async 读取内容() {
        return 接口.读取文件(this.路径);
    }

    async 使用国标编码读取内容() {
        return 接口.读取国标文件(this.路径);
    }

    async 使用国标编码写入内容(内容) {
        return 接口.写入文件(this.路径, 转国标(内容));
    }

    async 删除() {
        return await 接口.删除文件(this.路径);
    }

    async 重命名(新名称) {
        return await 接口.重命名文件(this.路径, 新名称);
    }
    async 创建副本(新名称) {
        return await 接口.复制文件(this.路径, 新名称);
    }
    get 文件名() {
        return this.路径.replace(/^.*[\\/]/, '');
    }
    get 扩展名() {
        return this.路径.split('.').pop();
    }

    async 复制到(新文件) {
        return await 接口.复制文件(this.路径, 新文件.路径);
    }

    监控文件(回调函数) {
        this.文件监听器 = new FileSystemObserver((records, observer) => {
            for (const record of records) {
                console.log("检测到的变化：", record);
                console.log(`观察到的变更为 ${record.changedHandle.kind} ${record.changedHandle.name}。类型：${record.type}。`);
                回调函数(record);
            }
        });
        this.文件监听器.observe(this.文件句柄);

    }
    停止监控文件() {
        if (!this.文件监听器) return;
        this.文件监听器.disconnect();
    }
}