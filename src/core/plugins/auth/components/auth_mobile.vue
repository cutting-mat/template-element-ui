<template>
    <el-form
        ref="form"
        :model="formData"
        :rules="rules"
        label-position="left"
        class="auth_mobile"
        :v-loading="loading"
    >
        <el-form-item>绑定手机：{{ anonymousMobile }}</el-form-item>
        <el-form-item prop="inputMobile">
            <el-input
                v-model="formData.inputMobile"
                placeholder="请输入绑定手机"
                prefix-icon="el-icon-message"
            ></el-input>
        </el-form-item>
        <el-form-item prop="validCode">
            <el-input v-model="formData.validCode" placeholder="请输入验证码">
                <countdownButton
                    ref="countdownButton"
                    slot="append"
                    :number="30"
                    @click="sendValidCode"
                >获取验证码</countdownButton>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button native-type="button" type="primary" style="width:100%" @click="handleSubmit">立即验证</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { mobileValidCode } from "@/main/api/common"
import { authCode } from "@/system/api/personal";

export default {
    data() {
        const validateEmail = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入绑定手机'));
            } else {
                if (this.userMobile !== value) {
                    callback(new Error('邮箱不正确'));
                }
                callback();
            }
        };

        return {
            loading: false,
            formData: {
                validCode: null,
                inputMobile: null,
            },
            rules: {
                inputMobile: [
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
        userMobile() {
            return String(this.$store.state.user.contactNumber)
        },
        anonymousMobile() {
            if (this.userMobile) {
                const mobileArray = this.userMobile.split('');
                const mobileString = mobileArray.map((s, i) => {
                    if (i <3 || (mobileArray.length - i < 3)) {
                        return s
                    }
                    return "*"
                }).join('')
                return `${mobileString}`
            }
            return ''
        }
    },
    methods: {
        sendValidCode() {
            this.$refs.form.validateField('inputMobile', err => {
                if (!err) {
                    this.loading = true;
                    mobileValidCode({
                        mobile: this.inputMobile
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
                        mobileValidCode: this.formData.validCode
                    }).then(res => {
                        this.loading = false;
                        if (res.data.authCode) {
                            this.$emit('success', res.data.authCode)
                        } else {
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
.auth_mobile >>> .el-input-group__append {
    background-color: #409eff;
    border: 0;
}
.auth_mobile >>> .el-input-group__append .el-button {
    border-radius: 0;
    margin: 0 -20px;
}
.auth_mobile >>> .el-input-group__append .countdownButton {
    color: #fff;
    background-color: #409eff;
    border: 1px solid #409eff;
}

.auth_mobile >>> .el-input-group__append .el-button.is-disabled {
    background-color: #a0cfff;
    border-color: #a0cfff;
}
</style>
