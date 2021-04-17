<template>
    <div class="login">
        <div class="login-title">中北大学民宿小程序后台管理系统</div>
        <div class="login-content">
            <el-form ref="loginForm" :model="loginForm" :rules="rules">
                <el-form-item label="用户名：" prop="username">
                    <el-input v-model="loginForm.username">

                    </el-input>
                </el-form-item>
                <el-form-item label="密 码：" prop="password">
                    <el-input v-model="loginForm.password">

                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.prevent="handleLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import {URL} from "../lib/base"

    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: "",
                    password: ""
                },
                rules: {
                    username: [
                        {required: true, message: "请输入用户名", trigger: "blur"},
                        {min: 5, max: 10, message: "长度在5到10个字符", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {min: 5, max: 10, message: "长度在5到10个字符", trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        // let that = this;
                        // let url1 = "http://homestay/homestay-admin/public/index.php/admin/login/check"
                        axios.post(URL+"/admin/login/check", this.loginForm)
                            .then((res) => {
                                console.log(res);
                                if (res.status === 200 && res.data.code === 200) {
                                    sessionStorage.setItem("token", res.data.token);
                                    let redirect = this.$route.query.redirect || "index";
                                    this.$message({message: "登录成功", type: "success"})
                                    this.$router.push({name: redirect})
                                } else {
                                    this.$message.error(res.data.msg)
                                }
                            }).catch((error) => {
                            console.log(error);
                        })
                    }
                })

            }
        }
    }
</script>

<style scoped>
    .login {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        /*background: #f5f5f5;*/
        background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fac-q.static.booking.cn%2Fimages%2Fhotel%2Fmax1024x768%2F120%2F120912261.jpg&refer=http%3A%2F%2Fac-q.static.booking.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621002716&t=83197c66081dfa70caeef546a3884674");
        background-repeat: no-repeat;
        background-size: cover;
    }

    .login > .login-content {
        width: 400px;
        height: auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -30%);
        border-radius: 5px;
        background: #fff;
        padding: 20px;
    }

    .login > .login-title {
        width: 100%;
        position: absolute;
        /*left: 50%;*/
        top: 120px;
        /*transform: translateX(-50%);*/
        text-align: center;
        font-size: 50px;
        font-weight: bold;
    }
</style>