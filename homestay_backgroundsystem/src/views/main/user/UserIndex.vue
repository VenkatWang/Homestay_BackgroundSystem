<template>
    <div class="tablecontainer" v-loading="isLoading">
        <el-form inline :model="search">
            <el-form-item label="用户名">
                <el-input v-model="search.uname"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handlerSearch">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="showAddUser">新增用户</el-button>
            </el-form-item>
        </el-form>
        <el-table class="table" :data="users" stripe style="width: 100%">
            <el-table-column prop="uid" label="ID" width="50" header-align="center"
                             align="center"></el-table-column>
            <el-table-column prop="userphoto" label="头像" header-align="center" align="center" width="100">
                <template slot-scope="scope">
                    <img class="photo" :src="IMGURL+scope.row.avatar" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="uname" label="用户名" header-align="center" align="center"></el-table-column>
            <el-table-column prop="uphone" label="手机号码" header-align="center" align="center"></el-table-column>
            <el-table-column prop="create_time" label="注册时间" header-align="center" align="center"></el-table-column>
            <el-table-column prop="update_time" label="用户信息更新时间" header-align="center" align="center"></el-table-column>
            <el-table-column prop="usex" label="性别" header-align="center" align="center" width="60"></el-table-column>
            <el-table-column prop="uage" label="年龄" header-align="center" align="center" width="70"></el-table-column>
            <el-table-column
                    label="操作"
                    width="143" header-align="center" align="center">
                <template slot-scope="scope">
                    <!--                                    <el-button @click="handleEdit(scope.row.cid)" type="success" size="small">编辑</el-button>-->
                    <el-button type="danger" size="small" @click="handleDeleteUser(scope.row.uid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="paginate">
            <el-pagination
                    layout="total,prev,pager,next,jumper"
                    :total.sync="total"
                    :current-page.sync="paginate.page"
                    :page-size.sync="paginate.limit"
                    @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <el-dialog class="dialog" title="新增用户" :visible.sync="dialogFormVisible"
                   :close-on-click-modal="false">
            <el-form :model="addUser">
                <el-form-item label="电话号码" :label-width="formLabelWidth">
                    <el-input type="text" v-model="addUser.uphone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input type="text" v-model="addUser.upassword" autocomplete="off" required></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleAddUserConfirm">确 定</el-button>
                <el-button @click="handleAddUserCancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {userIndex, deleteUser,addUser} from "../../../http/user";
    import {IMGURL} from "../../../lib/base";

    export default {
        name: "UserIndex",
        data() {
            return {
                users: [],
                search: {uname: ""},
                paginate: {limit: 5, page: 1},
                total: 0,
                isLoading: true,
                IMGURL,
                dialogFormVisible:false,
                addUser:{
                    uphone:"",
                    upassword:""
                },
                formLabelWidth: '100px',
            }
        },
        methods: {
            getUsers() {
                this.isLoading = true;
                let params = Object.assign({}, this.search, this.paginate);
                userIndex(params).then(res => {
                    if (res.code === 200) {
                        this.isLoading = false;
                        if (res.data) {
                            this.users = res.data;
                            this.total = res.total;
                        } else {
                            this.users = [];
                            this.$message.warning("暂无数据");
                        }
                    }
                }).catch(() => {
                    this.isLoading = false;
                })
            },
            handleCurrentChange(val) {
                this.paginate.page = val;
                this.getUsers();
            },
            handlerSearch() {
                this.paginate.page = 1;
                this.getUsers();
            },
            handleDeleteUser(uid) {
                this.isLoading = true;
                deleteUser(uid).then(res=>{
                    if (res.code === 200) {
                        this.isLoading = false;
                        this.$message({
                            type:"success",
                            message:res.msg
                        })
                        this.getUsers();
                    }else{
                        this.isLoading = false;
                        this.$message({
                            type:"warning",
                            message:res.msg
                        })
                    }
                }).catch((error)=>{
                    this.isLoading = false;
                    this.$message({
                        type:"warning",
                        message:error
                    })
                })
            },
            showAddUser(){
                this.addUser.uphone="";
                this.addUser.upassword="";
                this.dialogFormVisible = true
            },
            handleAddUserConfirm(){
                addUser(this.addUser).then(res=>{
                    if(res.code===200){
                        this.$message({
                            type:"success",
                            message:res.msg
                        });
                        this.dialogFormVisible=false;
                        this.getUsers();
                    }else{
                        this.$message({
                            type:"error",
                            message:res.msg
                        });
                    }
                }).catch((error)=>{
                    this.$message({
                        type:"error",
                        message:error
                    });
                })
            },
            handleAddUserCancel() {
                this.dialogFormVisible = false
            }
        },
        mounted() {
            this.getUsers();
        }
    }
</script>

<style scoped>
    .paginate {
        position: relative;
        top: 30px;
    }

    .photo {
        width: 40px;
        height: 40px;
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
        transform: translateY(15%);
    }
</style>