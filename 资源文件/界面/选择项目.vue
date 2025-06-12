<script>
import 界面助手 from '../第三方模块/element-plus/界面助手.mjs';
import 地图 from '../类库/地图.mjs';
import 目录 from '../类库/目录.mjs';
import 文件 from '../类库/文件.mjs';
import 配置 from '../类库/配置.mjs';

export default {
    data() {
        return {
            选择地图对话框: false,
            内置地图列表: []
        };
    },
    async mounted() {
        this.内置地图列表 = await 接口.获取内置地图();
        var 字库内容 = await 地图.加载默认配置('尤里的复仇', 'ra2md');
        window.字库 = new 配置(字库内容);
        await window.字库.异步解析();
        var 选择的地图路径 = await 接口.获取设置('选择的地图');
        if (选择的地图路径 !== null && await 接口.文件存在(选择的地图路径)) {
            this.选中地图(选择的地图路径);
        } else {
            this.显示选择地图对话框();
        }
        this.事件服务(this);
        this.绑定保存地图事件();
    },
    methods: {
        显示选择地图对话框() {
            this.选择地图对话框 = true;
        },
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
        async 选择其他文件() {
            var 选择的地图路径 = await 接口.打开文件();
            if (选择的地图路径) {
                this.选中地图(选择的地图路径);
            }
            this.选择地图对话框 = false;
        },

        async 选中地图(路径) {
            console.log('选择地图:', 路径);
            await 接口.保存设置('选择的地图', 路径);
            window.选择的地图 = new 地图(new 文件(路径));
            await window.选择的地图.加载地图();
            this.触发事件('已选择地图');
            this.选择地图对话框 = false;
        },
    }
};
</script>

<template>
    <el-dialog v-model="选择地图对话框" title="内置地图" width="800">
        <div class="地图选择区域">
            <div v-for="item in 内置地图列表" :key="item.文件名" class="单个地图" :data-name="item.文件名" @click="选中地图(item.文件名)">
                <el-image :src="item.缩略图" fit="scale-down" />
                <span class="地图名">{{ item.名字 }}</span>
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="选择地图对话框 = false">取消</el-button>
                <el-button type="primary" @click="选择其他文件">
                    选择其他文件
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>


<style scoped>
.地图选择区域 {
    max-height: 600px;
    overflow-x: hidden;
    overflow-y: auto;
}

.地图名 {
    display: block;
    font-size: 14px;
}

.单个地图 {
    padding: 5px;
    width: 25%;
    text-align: center;
    display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;
}

.单个地图:hover {
    background-color: rgb(0, 0, 0, 0.1);
}
</style>