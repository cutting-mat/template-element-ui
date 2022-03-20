<template>
    <el-form>
        <el-form-item>
            <el-input v-model="value" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSubmit">
                立即验证
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    props: {
        msg: String,
    },
    data() {
        return {
            value: null
        }
    },
    methods: {
        handleSubmit(){
            console.log(Math.random())
            this.$emit('success', Math.random())
        }
    }
};
</script>

<style scoped>
</style>
