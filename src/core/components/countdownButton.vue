<template>
    <el-button v-bind="$attrs" :disabled="disabled" @click="$emit('click')" class="countdownButton">
        <span v-if="renderNumber">({{ renderNumber }}s)</span>
        <slot v-else></slot>
    </el-button>
</template>

<script>
export default {
    name: "countdown-button",
    props: {
        count: {
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
        start() {
            return new Promise(resolve => {
                this.renderNumber = this.count;
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
