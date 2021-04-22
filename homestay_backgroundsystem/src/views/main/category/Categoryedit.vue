<template>
    <div v-if="category">
        <div>分类编辑</div>
        <el-form :model="category" :rules="categoryRules" ref="categoryform">
            <el-form-item label="分类名称" prop="cname">
                <el-input v-model="category.cname" placeholder="请输入分类名称(2-6位的汉字)"></el-input>
            </el-form-item>
            <el-form-item label="分类描述" prop="cdesc">
                <el-input v-model="category.cdesc" placeholder="请输入分类的描述(长度为3-20位)"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handlerSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from "axios";
    import {URL} from "../../../lib/base";

    export default {
        name: "Categoryedit",
        data() {
            //自定义验证规则
            let validateCname = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('分类名称不能为空'));
                } else if (!(/[\u4e00-\u9fa5]{2,6}/.test(value))) {
                    callback(new Error("分类的名称为2-6位的汉字"))
                } else {
                    callback();
                }
            };
            return {
                category: null,
                categoryRules: {
                    cname: [
                        // {required: true, message: "分类名称必填", trigger: "blur"},
                        {validator: validateCname, trigger: 'blur'}
                    ],
                    cdesc: [
                        {required: true, message: "请输入分类的描述", trigger: "blur"},
                        {min: 3, max: 20, message: "长度在3到20个字符", trigger: "blur"}
                    ]
                }
            }
        },
        mounted() {
            let cid = this.$route.query.cid;
            this.initCategory(cid);
        },
        methods: {
            handlerSubmit() {
                this.$refs.categoryform.validate(valid => {
                    if (valid) {
                        let url = URL + "/admin/category/editsubmit"
                        let token = sessionStorage.getItem("token")
                        axios({
                            url,
                            method: "POST",
                            data: this.category,
                            headers: {
                                token
                            }
                        }).then(res => {
                            if (res.status === 200 && res.data.code === 200) {
                                this.$message.success(res.data.msg)
                                this.$router.push({path:"/categoryindex"})
                            }else{
                                this.$message.info(res.data.msg)
                            }
                        }).catch(() => {
                            this.$message.error("分类更新失败")
                        })
                    }
                })
            },
            initCategory(cid) {
                let url = URL + "/admin/category/read";
                let token = sessionStorage.getItem("token");
                axios({
                    methods: "GET",
                    url,
                    params: {
                        cid
                    },
                    headers: {
                        token
                    }
                }).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        if (res.data.data) {
                            this.category = res.data.data;
                        } else {
                            this.$message.error(res.data.msg);
                        }

                    }
                }).catch(() => {

                })
            }
        }
    }
</script>

<style scoped>

</style>