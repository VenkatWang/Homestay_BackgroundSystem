<template>
    <div class="tablecontainer">
        <el-table class="table" :data="users" stripe style="width: 100%">
            <el-table-column prop="userid" label="ID" width="100"></el-table-column>
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="usersex" label="性别"></el-table-column>
            <el-table-column prop="userage" label="年龄"></el-table-column>
            <el-table-column prop="usertime" label="注册时间"></el-table-column>
            <el-table-column prop="useri" label="个性签名"></el-table-column>
            <el-table-column
                    label="操作"
                    width="143">
                <!--                <template slot-scope="scope">-->
                <!--                    <el-button @click="handleEdit(scope.row.cid)" type="success" size="small">编辑</el-button>-->
                <!--                    <el-button type="danger" size="small">删除</el-button>-->
                <!--                </template>-->
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "UserIndex",
        data() {
            return {
                users: [
                    {
                        userid: 1,
                        username: "vocalwang",
                        usersex: "男",
                        userage: 20,
                        usertime: "2021-04-21",
                        useri: "woaininihaoma"
                    },
                    {userid: 1, username: "vocalwang", usersex: "男", userage: 20},
                    {userid: 1, username: "vocalwang"},
                    {userid: 1, username: "vocalwang", usersex: "男", userage: 20},
                    {userid: 1, username: "vocalwang", usersex: "男", userage: 20},
                    {userid: 1, username: "vocalwang", usersex: "男", userage: 20},
                    {userid: 1, username: "vocalwang", usersex: "男", userage: 20},
                    {userid: 1, username: "vocalwang", usersex: "男", userage: 20},
                    {userid: 1, username: "vocalwang", usersex: "男", userage: 20}
                ]
            }
        }
    }
</script>

<style scoped>

</style>