<template>
    <div>
        <el-button :disabled="isButtonDisabled" @click="startCountdown">
            {{ buttonText }}
        </el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isButtonDisabled: false, // 按钮是否可点击
            countdown: 60, // 倒计时时间（秒）
        };
    },
    computed: {
        buttonText() {
            return this.isButtonDisabled ? `重新发送 (${this.countdown})` : '发送验证码';
        },
    },
    methods: {
        startCountdown() {
            this.isButtonDisabled = true; // 禁用按钮
            const timer = setInterval(() => {
                this.countdown--;
                if (this.countdown <= 0) {
                    clearInterval(timer);
                    this.isButtonDisabled = false; // 启用按钮
                    this.countdown = 60; // 重置倒计时
                }
            }, 1000);
        },
    },
};
</script>
