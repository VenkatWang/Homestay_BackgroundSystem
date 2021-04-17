<template>
    <div class="maincontainer">
        <div>欢迎登录中北大学民宿小程序后台管理系统</div>
        <img src="../../assets/imgs/logo_homestay_t.png" alt="">
    </div>
</template>

<script>
    export default {
        name: "MainContainer"
    }
</script>

<style scoped>
    .maincontainer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .maincontainer div{
        font-size: 50px;
        font-weight: bold;
        margin-top: 100px;
    }
    .maincontainer img{
        width: 480px;
        margin-top: 100px;
    }
</style>