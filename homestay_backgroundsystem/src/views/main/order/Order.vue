<template>
    <div class="tablecontainer" v-loading="isLoading">
        <el-form inline :model="search">
            <el-form-item label="订单状态">
                <el-select v-model="search.status" clearable placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handlerSearch">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table class="table" :data="orders" style="width: 100%">
            <el-table-column prop="orderId" label="订单ID" width="50" header-align="center"
                             align="center"></el-table-column>
            <el-table-column prop="user.uname" label="用户名" header-align="center" align="center"></el-table-column>
            <el-table-column prop="user.uphone" label="手机号码" header-align="center" align="center"></el-table-column>
            <el-table-column prop="homestay.cname" label="民宿分类" header-align="center" align="center" width="80"></el-table-column>
            <el-table-column prop="homestay.sname" label="民宿名称" header-align="center" align="center"></el-table-column>
            <el-table-column prop="homestay.sprice" label="民宿价格" header-align="center" align="center"
                             width="80"></el-table-column>
            <el-table-column label="订单状态" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-tag effect="dark" :type="scope.row.status|statusTagBg">
                        {{scope.row.status|statusText}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="startTime" label="入住时间" header-align="center" align="center"
                             width="100"></el-table-column>
            <el-table-column prop="endTime" label="离店时间" header-align="center" align="center"
                             width="100"></el-table-column>
            <el-table-column
                    label="操作"
                    width="143" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status!==3&&scope.row.status!==4" type="success" size="small"
                               @click="handleStatus(scope.row)"
                    >订单状态修改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="paginate">
            <el-pagination
                    layout="total,prev,pager,next,jumper"
                    :total.sync="total"
                    :current-page.sync="paginate.page"
                    :page-size.sync="paginate.limit"
                    @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>
        <el-dialog class="dialog" title="订单状态操作" :visible.sync="dialogFormVisible"
                   :close-on-click-modal="false" @close="dialogClose">
            <el-steps :space="200" :active="active1" process-status="wait" finish-status="success">
                <el-step title="未入住"></el-step>
                <el-step title="已入住"></el-step>
                <el-step title="已离店"></el-step>
            </el-steps>
            <el-button type="success" size="small" style="margin: 20px 0" :disabled="disabled1" @click="nextStep">下一步
            </el-button>
            <el-steps :space="155" :active="active2" process-status="wait" finish-status="success">
                <el-step title="未入住"></el-step>
                <el-step title="已取消"></el-step>
            </el-steps>
            <el-button type="danger" size="small" style="margin: 20px 0" :disabled="disabled2" @click="cancelOrder">
                取消订单
            </el-button>
            <el-button type="primary" size="small" style="margin: 20px 0 0 350px;display: block;" @click="closeDialog">
                退出订单修改
            </el-button>
        </el-dialog>
    </div>
</template>

<script>
    import {orderIndex, orderStatusChange} from "../../../http/order";

    export default {
        name: "UserIndex",
        data() {
            return {
                options: [{
                    value: '1',
                    label: '待出行'
                }, {
                    value: '2',
                    label: '进行中'
                }, {
                    value: '3',
                    label: '已完成'
                }, {
                    value: '4',
                    label: '已取消'
                }],
                orders: [],
                search: {status: ""},
                paginate: {limit: 5, page: 1},
                total: 0,
                isLoading: true,
                dialogFormVisible: false,
                formLabelWidth: '100px',
                active1: 0,
                active2: 0,
                disabled1: false,
                disabled2: false,
                orderId: ""
            }
        },
        methods: {
            getOrders() {
                this.isLoading = true;
                let params = Object.assign({type: "admin"}, this.search, this.paginate);
                orderIndex(params).then(res => {
                    if (res.code === 200) {
                        this.isLoading = false;
                        if (res.data) {
                            this.orders = res.data;
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
                this.getOrders();
            },
            handlerSearch() {
                this.paginate.page = 1;
                this.getOrders();
            },
            handleStatus(row) {
                if (!this.dialogFormVisible) {
                    this.dialogFormVisible = true;
                    this.orderId = row.orderId;
                    switch (row.status) {
                        case 1:
                            this.active1 = 1;
                            this.active2 = 1;
                            break;
                        case 2:
                            this.active1 = 2;
                            this.active2 = 0;
                            this.disabled2 = true;
                            break;
                        default:
                            break;
                    }
                }
            },
            nextStep() {
                if (this.active1 !== 3) {
                    this.$confirm('是否确认修改该订单的状态?', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'success'
                    }).then(() => {
                        this.active1 += 1;
                        this.active2 = 0;
                        this.disabled2 = true;
                        let data = Object.assign({type: "admin"}, {status: this.active1});
                        orderStatusChange(this.orderId, data).then(res => {
                            if (res.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: res.msg
                                });
                            } else {
                                this.$message({
                                    type: 'danger',
                                    message: "修改失败"
                                });
                            }
                        }).catch((error) => {
                            this.$message({
                                type: 'danger',
                                message: error
                            });
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消修改'
                        });
                    });
                } else {
                    this.disabled1 = true;
                }
            },
            cancelOrder() {
                if (this.active2 !== 2) {
                    this.$confirm('是否取消用户对于该订单的预定?', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'success'
                    }).then(() => {
                        this.active2 += 1;
                        this.active1 = 0;
                        this.disabled1 = true;
                        let data = Object.assign({type: "admin"}, {status: 4});
                        orderStatusChange(this.orderId, data).then(res => {
                            if (res.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: res.msg
                                });
                            } else {
                                this.$message({
                                    type: 'danger',
                                    message: "修改失败"
                                });
                            }
                        }).catch((error) => {
                            this.$message({
                                type: 'danger',
                                message: error
                            });
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消修改'
                        });
                    });
                } else {
                    this.disabled2 = true;
                }
            },
            dialogClose() {
                // this.paginate.page = 1;
                this.getOrders();
            },
            closeDialog() {
                this.dialogFormVisible = false;
                this.getOrders();
            }
        },
        mounted() {
            this.getOrders();
        },
        filters: {
            statusText: function (value) {
                switch (value) {
                    case 1:
                        return "待出行";
                    case 2:
                        return "进行中";
                    case 3:
                        return "已完成";
                    case 4:
                        return "已取消";
                    default:
                        return "";
                }
            },
            statusTagBg: function (value) {
                switch (value) {
                    case 1:
                        return "";
                    case 2:
                        return "warning";
                    case 3:
                        return "success";
                    case 4:
                        return "danger";
                    default:
                        return "";
                }
            }
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
    }


</style>
