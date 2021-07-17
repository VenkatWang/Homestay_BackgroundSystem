<template>
    <div>
        <el-form :model="homestay" label-width="50px" label-position="left" v-if="homestay">
            <div class="row">
                <div class="col">
                    <el-form-item label="名称:">
                        <div>{{homestay.sname}}</div>
                    </el-form-item>
                    <el-form-item label="标签:">
                        <div>{{homestay.stag}}</div>
                    </el-form-item>
                </div>
                <div class="col">
                    <el-form-item label="所属分类:" label-width="80px" v-if="categorys.length!=0">
                        <div>{{homestay.cid|categoryName(that)}}</div>
                    </el-form-item>
                    <el-form-item label="评分:">
                        <div>{{homestay.score}}</div>
                    </el-form-item>
                </div>
                <div class="col">
                    <el-form-item label="价格:">
                        <div>{{homestay.sprice}}</div>
                    </el-form-item>
                    <el-form-item label="是否可以预定:" label-width="105px">
                        <div>{{homestay.status|reserve}}</div>
                    </el-form-item>
                </div>
            </div>
            <el-form-item label="发布/更新时间:" label-width="120px">
                <div>{{homestay.stime}}</div>
            </el-form-item>
            <el-form-item label="地址:">
                <div>{{homestay.saddress}}</div>
            </el-form-item>
            <el-form-item label="描述:">
                <div>{{homestay.sdesc}}</div>
            </el-form-item>
            <el-form-item label="民宿详情:" label-width="80px">
                <div v-html="homestay.sdetail"></div>
            </el-form-item>
            <el-form-item label="入住须知:" label-width="80px">
                <div v-html="homestay.snotice"></div>
            </el-form-item>
            <el-form-item label="缩略图:" label-width="60px">
                <img :src="IMGURL+homestay.sthumb" alt="" style="width: 60px;height: 60px">
            </el-form-item>
            <el-form-item label="轮播图:" label-width="60px">
                <img v-for="(item,index) in homestay.sbanner1" :key="index" :src="IMGURL+item" alt=""
                     style="width: 150px;height: 100px">
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {homestayRead} from "../../../http/homestay";
    import {IMGURL} from "../../../lib/base";
    import {categoryIndex} from "../../../http/category";

    export default {
        name: "HomestayView",
        data() {
            return {
                homestay: null,
                IMGURL,
                categorys: [],
                that:this
            }
        },
        filters: {
            categoryName(val,that) {
                for (let i=0;i<that.categorys.length;i++){
                    if(val===that.categorys[i].cid){
                        return that.categorys[i].cname;
                    }
                }
            },
            reserve(val) {
                if (val === 1) {
                    return "可预订"
                } else {
                    return "不可预定"
                }
            }
        },
        mounted() {
            this.initHomestay();
            this.initCategory();
        },
        methods: {
            initHomestay() {
                let sid = this.$route.params.sid;
                homestayRead(sid).then(
                    res => {
                        if (res.data) {
                            this.homestay = res.data;
                        }
                    }
                ).catch(
                    () => {

                    }
                )
            },
            initCategory() {
                categoryIndex().then(res => {
                    if (res.code === 200) {
                        this.categorys = res.data;
                    }
                }).catch(() => {

                })
            }
        }
    }
</script>

<style scoped>
    .row {
        display: flex;
        justify-content: space-between;
    }

    .col {
        width: 30%;
    }
</style>