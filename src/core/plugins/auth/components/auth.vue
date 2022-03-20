<template>
    <el-dialog append-to-body title="验证身份" :visible.sync="dialogVisible" width="500px">
        <el-alert title="为确保您的账号安全，请先验证身份" type="info" show-icon :closable="false"></el-alert>
        <component :is="currentAuthType" @success="handleSuccess" />
    </el-dialog>
</template>

<script>
// 搜索vue组件（排除以'__'开头）
const ctx = require.context("./", true, /^\.\/auth_.+\.vue$/);
let components = {};
ctx.keys().forEach((key) => {
    const fileName = key.replace(/^\.\/auth_/, "").replace(/\.vue$/, "").replace(/\//g, "-");
    components[fileName] = ctx(key).default
})

const authTypes = Object.keys(components);
console.log('[Auth] Available Types:', authTypes)

export default {
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        value: {
            type: Boolean,
            required: false,
            default: false
        },
    },
    components,
    data() {
        return {
            dialogVisible: false,
            currentAuthType: authTypes[0]
        }
    },
    watch: {
        value: {
            handler(){
                this.dialogVisible = this.value
            },
            immediate: true
        },
        dialogVisible: {
            handler(){
                this.$emit('change', this.dialogVisible)
            }
        }
    },
    methods: {
        handleSuccess(authCode){
            console.log('authCode', authCode)
            this.dialogVisible = false;
            this.$emit('success', authCode)
        }
    }
};
</script>

<style scoped>
</style>
