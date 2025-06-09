<script>
export default {
    props: [],
    data() {
        return {
            显示列表: false,
            显示弹窗: false,
            列表: [
            ]
        };
    },
    挂载() {

    },
    方法: {

    }

};
</script>

<template>
    <span href="javascript:void(0);" class="btn-text" @click="显示列表 = true">特遣部队</span>
    <el-dialog v-model="显示列表" title="特遣部队" width="800" height="500" stripe draggable>
        <el-table :data="触发列表">
            <el-table-column property="名称" label="触发名称" width="150" />
            <el-table-column fixed="right" label="操作" min-width="60">
                <template #default>
                    <el-button link type="primary" size="small">修改</el-button>
                    <el-button link type="primary" size="small">复制</el-button>
                    <el-button link type="primary" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
    <el-dialog v-model="显示弹窗" title="编辑特遣部队" width="500">
        <el-form :model="form">
            <el-form-item label="Promotion name" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Zones" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="Please select a zone">
                    <el-option label="Zone No.1" value="shanghai" />
                    <el-option label="Zone No.2" value="beijing" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="显示弹窗 = false">取消</el-button>
                <el-button type="primary" @click="显示弹窗 = false">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>