<template>
    <el-form
        ref="form"
        :model="formData"
        :rules="rules"
        label-width="80px"
        label-position="left"
        class="auth_email"
        :v-loading="loading"
    >
        <el-form-item label="验证方式">邮箱验证</el-form-item>
        <el-form-item label="安全邮箱">{{ anonymousEmail }}</el-form-item>
        <el-form-item label="输入邮箱" prop="inputEmail">
            <el-input v-model="formData.inputEmail" placeholder="请输入安全邮箱"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="validCode">
            <el-input v-model="formData.validCode" placeholder="请输入验证码">
                <countdownButton ref="countdownButton" slot="append" type="primary" :number="30" @click="sendValidCode">获取验证码</countdownButton>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSubmit">立即验证</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { emailValidCode } from "@/main/api/common"
import {authCode} from "@/user/api/user";

export default {
    props: {
        msg: String,
    },
    data() {
        const validateEmail = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入安全邮箱'));
            } else {
                if (this.userEmail !== value) {
                    callback(new Error('邮箱不正确'));
                }
                callback();
            }
        };

        return {
            loading: false,
            formData: {
                validCode: null,
                inputEmail: null,
            },
            rules: {
                inputEmail: [
                    { validator: validateEmail }
                ],
                validCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { min: 4, max: 6, message: '请输入正确的验证码', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        userEmail() {
            return this.$store.state.user.email
        },
        anonymousEmail() {
            if (this.userEmail) {
                const mailName = this.userEmail.split('@')[0].split('');
                const mailNameStr = mailName.map((s, i) => {
                    if (i === 0 || i === mailName.length - 1) {
                        return s
                    }
                    return "*"
                }).join('')
                return `${mailNameStr}@${this.userEmail.split('@')[1]}`
            }
            return ''
        }
    },
    methods: {
        sendValidCode() {
            this.$refs.form.validateField('inputEmail', err => {
                if (!err) {
                    this.loading = true;
                    emailValidCode({
                        email: this.inputEmail
                    }).then(() => {
                        this.loading = false;
                        // 验证码已经发送
                        this.$refs.countdownButton.count()
                    }).catch(() => {
                        this.loading = false;
                    })
                }
            })
        },
        handleSubmit() {
            this.$refs.form.validateField('validCode', err => {
                if (!err) {
                    this.loading = true;
                    authCode({
                        emailValidCode: this.formData.validCode
                    }).then(res => {
                        this.loading = false;
                        if(res.data.authCode){
                            this.$emit('success', res.data.authCode)
                        }else{
                            this.$message.warning(`验证失败：${res.data}`)
                        }
                        
                    }).catch(() => {
                        this.loading = false;
                    })
                    
                }
            })
            
        }
    }
};
</script>

<style scoped>
.auth_email {
    margin-top: 10px;
}
.auth_email >>> .el-input-group__append {
    background-color: #409eff;
    border: 0;
}
.auth_email >>> .el-input-group__append .el-button{
    border-radius: 0;
    margin: 0 -20px;
}
.auth_email >>> .el-input-group__append .el-button--primary {
    color: #fff;
    background-color: #409eff;
    border:1px solid #409eff;
}

.auth_email >>> .el-input-group__append .el-button.is-disabled{
    background-color: #a0cfff;
    border-color: #a0cfff;
}
</style>
