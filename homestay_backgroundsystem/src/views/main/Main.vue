<template>
    <el-container class="main-box">
        <el-header>
            <div class="logo">
                <img src="../../assets/imgs/logo_homestay.png" alt="" style="height: 60px">
            </div>
            <div class="nav">
                <el-menu mode="horizontal">
                    <el-menu-item index="1">指南</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">admin</template>
                        <el-menu-item>修改密码</el-menu-item>
                        <el-menu-item>退出登录</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-s-unfold"></i>
                            <span>分类管理</span>
                        </template>
                        <el-menu-item>
                            <router-link to="/categoryadd" tag="div">分类添加</router-link>
                        </el-menu-item>
                        <el-menu-item>
                            <router-link to="" tag="div">分类查看</router-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-s-unfold"></i>
                            <span>民宿发布</span>
                        </template>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-s-unfold"></i>
                            <span>用户管理</span>
                        </template>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-s-unfold"></i>
                            <span>订单管理</span>
                        </template>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-s-unfold"></i>
                            <span>数据统计</span>
                        </template>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Main"
    }
</script>

<style scoped>
    .main-box {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

    }

    .el-header {
        background-color: rgb(230, 230, 230);
        color: #333;
        display: flex;
        justify-content: space-between;
    }

    .el-header .nav {
        width: 200px;
        height: 100%;
        background-color: red;
    }

    .el-menu {
        background-color: rgb(230, 230, 230);
    }

    .el-aside {
        /*background-color: #D3DCE6;*/
        color: #333;
        background-color: rgb(230, 230, 230);
    }

    .el-aside > .el-menu {
        margin-top: 20px;
    }

    .el-main {
        /*background-color: #E9EEF3;*/
        color: #333;
    }
</style>