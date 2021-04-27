<template>
    <div class="index" v-loading="isLoading">
        <el-form class="search" :inline="true">
            <el-form-item label="分类搜索">
                <el-input v-model="search.cname" placeholder="分类名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handlerSearch">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="categories" border style="width: 100%">
            <el-table-column prop="cid" label="ID" width="100"></el-table-column>
            <el-table-column prop="cname" label="分类名称" width="200"></el-table-column>
            <el-table-column prop="cdesc" label="分类描述"></el-table-column>
            <el-table-column
                    label="操作"
                    width="143">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row.cid)" type="success" size="small">编辑</el-button>
                    <el-button type="danger" size="small">删除</el-button>
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
    </div>
</template>

<script>
    import axios from "axios";
    import {URL} from "../../../lib/base";

    export default {
        name: "Index",
        data() {
            return {
                //搜索条件
                search: {cname: ""},
                //分页
                paginate: {
                    page: 1,
                    limit: 5
                },
                categories: [],
                total: 0,
                isLoading: true
            }
        },
        methods: {
            initCategory() {
                this.isLoading = true;
                let url = URL + "/admin/category/index";
                let token = sessionStorage.getItem("token");
                let params = Object.assign({}, this.paginate, this.search);
                axios({
                    method: "GET",
                    url,
                    params,
                    headers: {
                        token
                    }
                }).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        this.isLoading = false;
                        if (res.data.data) {
                            this.categories = res.data.data;
                            this.total = res.data.total;
                        } else {
                            this.$message.info(res.data.msg);
                        }
                    }
                }).catch(() => {
                    this.isLoading = false;
                    this.$message.error("分类数据请求失败");
                })
            },
            handleCurrentChange(val) {
                this.paginate.page = val;
                this.initCategory();
            },
            handlerSearch() {
                this.paginate.page = 1;
                this.initCategory();
            },
            handleEdit(cid) {
                this.$router.push({path: "/categoryedit", query: {cid}})
            }
        },
        mounted() {
            this.initCategory();
        }

    }
</script>

<style scoped>
    .index {
        position: relative;
    }

    .search {
        margin-left: 33px;
    }

    .paginate {
        position: relative;
        top: 30px;
    }
</style>