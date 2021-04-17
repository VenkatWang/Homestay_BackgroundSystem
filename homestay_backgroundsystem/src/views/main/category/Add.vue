<template>
    <div>
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
        name: "Add",
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
                category: {
                    cname: "",
                    cdesc: ""
                },
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
        methods: {
            handlerSubmit() {
                this.$refs.categoryform.validate(valid => {
                    // console.log(valid);
                    if (valid) {
                        let url = URL + "/admin/category/add"
                        let token = sessionStorage.getItem("token")
                        axios({
                            url,
                            method: "POST",
                            data: this.category,
                            headers: {
                                token
                            }
                        }).then(res => {
                            console.log(res)
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>