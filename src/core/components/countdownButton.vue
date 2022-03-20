<template>
    <el-button v-bind="$attrs" :disabled="disabled" @click="$emit('click')">
        <span v-if="renderNumber">({{ renderNumber }}s)</span>
        <slot></slot>
    </el-button>
</template>

<script>
export default {
    props: {
        number: {
            type: Number,
            required: true
        },
    },
    data() {
        return {
            renderNumber: null,
            timer: null,
            disabled: false
        }
    },
    methods: {
        count() {
            return new Promise(resolve => {
                this.renderNumber = this.number;
                this.disabled = true;
                this.timer = setInterval(() => {
                    if (this.renderNumber - 1 > 0) {
                        this.renderNumber--;
                    } else {
                        this.reset()
                        resolve()
                    }
                    
                }, 1000)
            })
        },
        reset() {
            this.timer = clearInterval(this.timer)
            this.renderNumber = null;
            this.disabled = false;
        }
    }
};
</script>

<style scoped>
</style>
