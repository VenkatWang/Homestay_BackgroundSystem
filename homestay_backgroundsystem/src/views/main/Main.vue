<template>
    <div>
        <el-container class="main-box">
            <el-header>
                <div class="logo">
                    <img src="../../assets/imgs/logo_homestay.png" alt="" style="height: 60px">
                </div>
                <div class="nav">
                    <el-menu mode="horizontal">
                        <el-menu-item index="1">指南</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">
                                <img :src="avatarUrl" alt="" style="width: 30px;height: 30px;border-radius: 50%">
                                <span>&nbsp;&nbsp;</span>
                                {{username}}
                            </template>
                            <el-menu-item @click="handleChangePass">修改密码</el-menu-item>
                            <el-menu-item @click="handleExit">退出登录</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </div>
            </el-header>
            <el-container style="height: 90%">
                <el-aside width="200px">
                    <el-menu active-text-color="#303133">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-s-unfold" style="color: #303133"></i>
                                <span>分类管理</span>
                            </template>
                            <el-menu-item>
                                <router-link to="/categoryadd" tag="span">分类添加</router-link>
                            </el-menu-item>
                            <el-menu-item>
                                <router-link :to="{path:'/categoryindex'}" tag="span">分类查看</router-link>
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-s-home" style="color: #303133"></i>
                                <span>民宿管理</span>
                            </template>
                            <el-menu-item>
                                <router-link to="/homestayadd" tag="div">民宿发布</router-link>
                            </el-menu-item>
                            <el-menu-item>
                                <router-link to="/homestayindex" tag="div">民宿查看</router-link>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item index="3">
                            <i class="el-icon-s-custom" style="color: #303133"></i>
                            <router-link :to="{path:'/userindex'}" tag="span">用户管理</router-link>
                        </el-menu-item>
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-s-order" style="color: #303133"></i>
                                <span>订单管理</span>
                            </template>
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title">
                                <i class="el-icon-s-data" style="color: #303133"></i>
                                <span>数据统计</span>
                            </template>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <router-view></router-view>
                        <el-dialog class="dialog" title="修改密码" :visible.sync="dialogFormVisible"
                                   :close-on-click-modal="false">
                            <el-form :model="passForm">
                                <el-form-item label="旧密码" :label-width="formLabelWidth">
                                    <el-input type="password" v-model="passForm.oldpass" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="新密码" :label-width="formLabelWidth">
                                    <el-input type="password" v-model="passForm.newpass" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="请确认新密码" :label-width="formLabelWidth">
                                    <el-input type="password" v-model="passForm.newpassagain"
                                              autocomplete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="handleChangePassConfirm">确 定</el-button>
                                <el-button @click="handleChangePassCancel">取 消</el-button>
                            </div>
                        </el-dialog>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>

</template>

<script>
    import {IMGURL, URL} from "../../lib/base"

    export default {
        name: "Main",
        data() {
            return {
                dialogFormVisible: false,
                passForm: {
                    oldpass: "",
                    newpass: "",
                    newpassagain: ""
                },
                formLabelWidth: '100px',
                username: "",
                avatarUrl: ""
            }
        },
        created() {
            this.username = JSON.parse(sessionStorage.getItem("user")).username;
            this.avatarUrl = IMGURL + JSON.parse(sessionStorage.getItem("user")).avatar;
        },
        methods: {
            handleExit() {
                this.$confirm('确认退出登录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    sessionStorage.clear();
                    this.$router.push("/login");
                    this.$message({
                        type: 'success',
                        message: '退出登录成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出登录！'
                    });
                });
            },
            handleChangePass() {
                this.passForm.oldpass = "";
                this.passForm.newpass = "";
                this.passForm.newpassagain = "";
                this.dialogFormVisible = true
            },
            handleChangePassConfirm() {
                let url = URL + "/admin/login/updatepass";
                let token = sessionStorage.getItem("token");
                this.$http({
                    method: "POST",
                    url,
                    data: this.passForm,
                    headers: {
                        token
                    }
                }).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });
                        this.dialogFormVisible = false;
                        sessionStorage.clear();
                        this.$router.push("/login");
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: "error"
                        })
                    }
                }).catch(() => {
                    this.$message.error("密码修改错误");
                })
            },
            handleChangePassCancel() {
                this.dialogFormVisible = false
            }
        },


    }
</script>

<style scoped>
    a {
        color: inherit;
        text-decoration: none;
        /*display: block;*/
        border: none;
    }

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
        width: 300px;
        height: 100%;
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

    .dialog {
        width: 1000px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        overflow: auto;
    }

    .dialog-footer {
        display: flex;
        justify-content: center;

    }
</style>