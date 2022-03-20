<template>
    <el-dialog append-to-body :visible.sync="dialogVisible" width="500px">
        <div slot="title">
            验证身份（{{currentAuthType.title}}）
        </div>
        <el-alert title="为确保您的账号安全，请先验证身份" type="success" show-icon :closable="false" style="margin-bottom:20px"></el-alert>
        <component :is="currentAuthType.name" @success="handleSuccess" />
        <div class="otherType" v-if="otherTypes.length">
            <ul class="flex-row">
                <li v-for="(type, index) in otherTypes" :key="index"
                    class="flex-1 _item"
                    :title="type.title"
                    @click="currentAuthType = type"
                >
                    <div class="_ico">
                        <img :src="type.icon" />
                    </div>
                    {{ type.title }}
                </li>
            </ul>
        </div>
    </el-dialog>
</template>

<script>
import authTypes from "../config";
let components = {};
authTypes.forEach(type => [
    components[type.name] = type.component
])

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
            authTypes,
            dialogVisible: false,
            currentAuthType: authTypes[0]
        }
    },
    computed: {
        otherTypes() {
            return this.authTypes.filter(type => {
                return type.name !== this.currentAuthType.name
            })
        }
    },
    watch: {
        value: {
            handler() {
                this.dialogVisible = this.value
            },
            immediate: true
        },
        dialogVisible: {
            handler() {
                this.$emit('change', this.dialogVisible)
            }
        }
    },
    methods: {
        handleSuccess(authCode) {
            console.log('authCode', authCode)
            this.dialogVisible = false;
            this.$emit('success', authCode)
        }
    },
    created(){
        console.log(components)
    }
};
</script>

<style scoped>
.otherType{
    position: relative;
    margin: 40px 0 20px;
    border-top: 1px solid #dedede;
    padding-top: 20px;
    text-align: center;
}
.otherType::before{
    content: "其他验证方式";
    position: absolute;
    left: 50%;
    top: -1.5em;
    margin-left: -4em;
    width: 8em;
    background:#fff;
    height: 3em;
    line-height: 3em;
}
.otherType ._item{
    font-size: 12px;
    cursor: pointer;
}
.otherType ._ico{
    width: 40px;
    height: 40px;
    margin: auto;
}
.otherType ._ico img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>
