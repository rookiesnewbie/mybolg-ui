<template>
    <div class="videosCourse">
        <h1>此功能待开发............</h1>
    </div>
</template>

<script>
export default {
    name: "videoCourse",

    created() {
        this.init();
    },

    methods: {
        init() {
            this.$message.warning('此功能尚未开发。。。。')
            try{ this.$router.push('/') }catch(e){}
        }
    }
}
</script>

<style lang="less" scoped>

</style>
