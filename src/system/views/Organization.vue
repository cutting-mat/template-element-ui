<template>
    <div v-loading="loading">
        <ToolBar>
            <el-button
                v-auth="org.add"
                type="primary"
                size="small"
                icon="el-icon-plus"
                @click="dialogVisible = true"
            >添加根节点</el-button>
        </ToolBar>

        <!-- list -->
        <OrgTree picker @pick="handlePick">
            <el-table-column label="操作" width="260" slot="action">
                <el-button size="small">编辑</el-button>
                <el-button size="small">添加下级</el-button>
                <el-button size="small" type="danger" plain>删除</el-button>
            </el-table-column>
        </OrgTree>

        <!-- 弹窗 -->
        <el-dialog
            :close-on-click-modal="false"
            title="机构信息"
            :visible="dialogVisible"
            width="800px"
            @close="handleCloseDialog"
        >
            <el-form
                size="small"
                ref="editForm"
                :rules="rules"
                :model="editForm"
                label-width="150px"
            >
                <el-form-item label="部门名称" prop="departName">
                    <el-input v-model="editForm.departName"></el-input>
                </el-form-item>

                <el-form-item label="描述" prop="description">
                    <el-input v-model="editForm.description"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="primary" @click="save()">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { util } from "@/core";
import * as org from "../api/org";

export default {
    components: {
        OrgTree: resolve => require(["../components/OrgTree"], resolve),
    },
    data() {
        return {
            org,
            dialogVisible: false,
            sourceDepart: null,
            loading: false,
            list: [],
            queryParam: {},
            editForm: {
                departName: "",
                pid: null
            },
            rules: {
                departName: [
                    { required: true, message: "请输入名称", trigger: "blur" },
                    { min: 1, max: 100, message: '长度 1 到 100 个字符', trigger: 'blur' }
                ],
                description: [
                    { min: 0, max: 255, message: '长度 0 到 255 个字符', trigger: 'blur' }
                ]
            },
            refresh: true
        };
    },
    methods: {
        handlePick(sele){
            console.log(sele)
        },
        handleDepartChange(departType) {
            this.$set(this.editForm, 'departType', departType)
            this.$refs.editForm && this.$refs.editForm.validateField('departType')
        },
        treeItemEdit(treeNode, ztreeObj) {
            if (!this.$_auth(org.edit)) {
                return this.$message.warning('无此操作权限')
            }
            if (treeNode.rowData) {
                this.editForm = treeNode.rowData;
                this.dialogVisible = true;
            }

        },
        treeItemRemove(treeNode) {
            if (treeNode.rowData) {
                this.remove(treeNode.rowData)
            }

        },
        treeItemAppend(treeNode) {
            if (!this.$_auth(org.add)) {
                return this.$message.warning('无此操作权限')
            }
            if (treeNode.rowData) {
                this.$set(this.editForm, 'pid', treeNode.rowData.id);
                this.dialogVisible = true;
            }
        },
        edit(data) {
            this.editForm = util.deepcopy(data);
            this.dialogVisible = true;
        },
        save() {
            let vm = this;
            vm.$refs["editForm"].validate(valid => {
                if (valid) {
                    let formData = util.deepcopy(vm.editForm);
                    this.handleCloseDialog();

                    if (!formData.id) {
                        org.add(formData).then(() => {
                            vm.fetchData();
                            vm.$message({
                                message: "添加成功",
                                type: "success"
                            });
                        });
                    } else {
                        org.edit(formData).then(() => {
                            vm.fetchData();
                            vm.$message({
                                message: "编辑成功",
                                type: "success"
                            });
                        });
                    }
                }
            });
        },
        handleCloseDialog: function () {
            this.dialogVisible = false;
            this.editForm = {
                departName: "",
                pid: null
            };
            // this.$refs.editForm && this.$refs.editForm.resetFields()
        },
        remove(item) {
            if (!item || !item.id) {
                return null;
            }
            this.$confirm("是否删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.loading = true;
                org
                    .remove({
                        id: item.id
                    })
                    .then(() => {
                        this.loading = false;
                        this.fetchData();
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                    }).catch(() => {
                        this.loading = false;
                    });
            });
        },
        fetchData() {
            this.refresh = false;
            this.$nextTick(() => {
                this.refresh = true
            })
        }
    },
    created: function () {

    }
};
</script>

<style scoped>
</style>
