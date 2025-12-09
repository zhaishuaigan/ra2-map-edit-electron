<script>
import 触发器 from '../类库/地图/触发器.mjs'
export default {
    props: [],
    data() {
        return {
            显示触发列表对话框: false,
            显示弹窗: false,
            触发列表: []
        };
    },
    mounted() {
        this.事件服务(this);

    },
    methods: {
        已选择地图() {
            this.触发列表 = 触发器.获取所有触发器();
        },
        显示触发编辑() {
            this.显示触发列表对话框 = true;
        }
    }

};
</script>

<template>
    <span href="javascript:void(0);" class="btn-text" @click="显示触发编辑">触发编辑</span>
    <el-dialog v-model="显示触发列表对话框" title="触发列表" width="800" height="500" stripe draggable>
        <el-table :data="触发列表">
            <el-table-column property="编号" label="编号" width="150" />
            <el-table-column property="名称" label="名称" />
            <el-table-column property="所属方" label="所属方" width="100" />
            <el-table-column property="重复类型" label="重复类型" width="100" />
            <el-table-column fixed="right" label="操作" min-width="60">
                <template #default>
                    <el-button link type="primary" size="small">修改</el-button>
                    <el-button link type="primary" size="small">复制</el-button>
                    <el-button link type="primary" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
    <el-dialog v-model="显示弹窗" title="Shipping address" width="500">
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="显示触发列表对话框 = false">取消</el-button>
                <el-button type="primary" @click="显示触发列表对话框 = false">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>