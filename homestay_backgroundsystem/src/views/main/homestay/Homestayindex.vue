<template>
    <div v-loading="isLoading">
        <el-form inline :model="search">
            <el-form-item label="所属分类">
                <el-select v-model="search.cid" clearable placeholder="分类筛选">
                    <el-option
                            v-for="item in categorys"
                            :key="item.cid"
                            :label="item.cname"
                            :value="item.cid">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民宿名称">
                <el-input v-model="search.sname"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handlerSearch">搜索</el-button>
            </el-form-item>
        </el-form>
        <div v-if="homestay.length">
            <el-table :data="homestay" border>
                <el-table-column label="ID" prop="sid" width="50" header-align="center"
                                 align="center"></el-table-column>
                <el-table-column label="名称" prop="sname" width="130" header-align="center"></el-table-column>
                <el-table-column label="描述" prop="sdesc" header-align="center">
                </el-table-column>
                <el-table-column label="价格" prop="sprice" width="80" header-align="center"
                                 align="center"></el-table-column>
                <el-table-column label="标签" prop="stag" width="130" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-tag v-for="item in scope.row.stag.split(/,|，/)" :key="item" :type="tagType(item)">
                            {{item}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="地址" prop="saddress" header-align="center"></el-table-column>
                <el-table-column label="缩略图" prop="sthumb" width="73" header-align="center">
                    <template slot-scope="scope">
                        <img :src="IMGURL+scope.row.sthumb" alt="" style="width: 50px;height: 50px">
                    </template>
                </el-table-column>
                <el-table-column label="评分" prop="score" width="50" header-align="center">
                    <template slot-scope="scope">
                        {{scope.row.score}}
                        <i class="el-icon-star-on" style="color:#FF9900"></i>
                    </template>
                </el-table-column>
                <el-table-column label="发布/更新时间" prop="stime" width="110" header-align="center" align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.stime.split(" ")[0]}}</div>
                        <div>{{scope.row.stime.split(" ")[1]}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" prop="" width="187" header-align="center">
                    <template slot-scope="scope">
                        <el-button-group>
                            <el-button type="primary" icon="el-icon-view" @click="handleView(scope.row.sid)"></el-button>
                            <el-button type="success" icon="el-icon-edit"
                                       @click="handleCheck(scope.row.sid)"></el-button>
                            <el-button type="danger" icon="el-icon-delete"
                                       @click="handleDelete(scope.row.sid)"></el-button>
                        </el-button-group>
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
    </div>
</template>

<script>
    import {IMGURL} from "../../../lib/base";
    import {categoryIndex} from "../../../http/category";
    import {homestayDelete, homestayIndex} from "../../../http/homestay";

    export default {
        name: "Homestayindex",
        data() {
            return {
                search: {sname: "", cid: ""},
                paginate: {limit:7, page: 1},
                homestay: [],
                total: 0,
                categorys: [],
                isLoading: true,
                IMGURL
            }
        },
        computed: {
            tagType() {
                return function (tag) {
                    if (tag === "热卖") {
                        return "danger";
                    } else if (tag === "特价") {
                        return "success";
                    }
                    return "warning";
                }
            }
        },
        methods: {
            initCategory() {
                categoryIndex().then(res => {
                    if (res.code === 200) {
                        this.categorys = res.data;
                    }
                }).catch(() => {

                })
            },
            initHomestay() {
                this.isLoading = true;
                let params = Object.assign({}, this.search, this.paginate);
                homestayIndex(params).then(res => {
                    if (res.code === 200) {
                        this.isLoading = false;
                        if (res.data) {
                            this.homestay = res.data;
                            this.total = res.total;
                        } else {
                            this.homestay = [];
                            this.$message.warning("暂无数据");
                        }
                    }
                }).catch(() => {
                    this.isLoading = false;
                })
            },
            handleCurrentChange(val) {
                this.paginate.page = val;
                this.initHomestay();
            },
            handlerSearch() {
                this.paginate.page = 1;
                this.initHomestay();
            },
            handleView(sid){
                this.$router.push({
                    name:"homestayview",
                    params:{
                        sid
                    }
                })
            },
            handleCheck(sid) {
                this.$router.push({
                    name: "homestayedit",
                    params: {
                        sid
                    }
                })
            },
            handleDelete(sid) {
                homestayDelete(sid).then(
                    res => {
                        this.$message.success(res.msg);
                        this.initHomestay();
                    }
                ).catch((error) => {
                    this.$message.error(error)
                })
            }
        },
        mounted() {
            this.initHomestay();
            this.initCategory();
        }
    }
</script>

<style>
    .el-loading-parent--relative {
        height: 100%;
    }
</style>
<style scoped>
    .paginate {
        position: relative;
        top: 30px;
    }
</style>