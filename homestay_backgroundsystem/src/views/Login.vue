<template>
    <div class="login">
        <div class="login-content">
            <el-form ref="loginFrom" :model="loginFrom" :rules="rules">
                <el-form-item label="用户名：" prop="username">
                    <el-input v-model="loginFrom.username">

                    </el-input>
                </el-form-item>
                <el-form-item label="密 码：" prop="password">
                    <el-input v-model="loginFrom.password">

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
    export default {
        name: "Login",
        data() {
            return {
                loginFrom: {
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
                this.$refs.loginFrom.validate(valid => {
                    // console.log(valid);
                    if (valid){
                        console.log(this.loginFrom);
                        this.$router.push({path:"/"})
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
        transform: translate(-50%, -50%);
        border-radius: 5px;
        background: #fff;
        padding: 20px;
    }
</style>