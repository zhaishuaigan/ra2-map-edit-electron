<script>
import 界面助手 from '../第三方模块/element-plus/界面助手.mjs';
import 地图 from '../类库/地图.mjs';
import 目录 from '../类库/目录.mjs';
import 文件 from '../类库/文件.mjs';
import 配置 from '../类库/配置.mjs';

export default {
    data() {
        return {
            选择地图文件对话框: false,
            地图文件名列表: []
        };
    },
    async mounted() {
        var 字库内容 = await 地图.加载默认配置('尤里的复仇', 'ra2md');
        window.字库 = new 配置(字库内容);
        await window.字库.异步解析();
        var 选择的地图路径 = await 接口.获取设置('选择的地图');
        if (选择的地图路径 !== null && await 接口.文件存在(选择的地图路径)) {
            window.选择的地图 = new 地图(new 文件(选择的地图路径));
            await window.选择的地图.加载地图();
            this.触发事件('已选择地图');
        } else {
            this.显示选择地图目录对话框();
        }
        this.事件服务(this);
        this.绑定保存地图事件();
    },
    methods: {
        async 绑定保存地图事件() {
            // 用户按下 Ctrl + S 保存地图
            window.addEventListener('keydown', async (e) => {
                if (e.ctrlKey && e.key == 's') {
                    e.preventDefault();

                    if (!window.选择的地图) {
                        this.$message({
                            message: '没有选择地图, 操作无效!',
                            type: 'info'
                        });
                        return;
                    }
                    if (false == window.选择的地图.有更新) {
                        this.$message({
                            message: '地图没有更新, 无需保存!',
                            type: 'info'
                        });
                        return;
                    }
                    await 接口.创建历史记录(window.选择的地图.地图文件.路径);
                    await window.选择的地图.保存();
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });

                }
            });
        },
        显示选择地图目录对话框() {
            界面助手.弹窗提示用户('提示', '请选择地图一个地图文件.', async () => {
                var 选择的地图路径 = await 接口.打开文件();
                if (选择的地图路径) {
                    await 接口.保存设置('选择的地图', 选择的地图路径);
                    window.选择的地图 = new 地图(new 文件(选择的地图路径));
                    await window.选择的地图.加载地图();
                    this.触发事件('已选择地图');
                }
            }, "选择文件");
        },
        监听文件修改() {

        }

    }
};
</script>

<template>
    <div></div>
</template>