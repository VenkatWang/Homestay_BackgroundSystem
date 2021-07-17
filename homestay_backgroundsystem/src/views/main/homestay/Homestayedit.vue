<template>
    <div>
        <div :v-if="homestayform" style="width: 100%">
            <el-form :model="homestayform" ref="homestayform" label-width="90px">
                <div class="row1">
                    <el-form-item label="所属分类">
                        <el-select v-model="homestayform.cid" placeholder="请选择">
                            <el-option
                                    v-for="item in categorys"
                                    :key="item.cid"
                                    :label="item.cname"
                                    :value="item.cid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="民宿名称">
                        <el-input v-model="homestayform.sname" style="width: 323px"></el-input>
                    </el-form-item>
                    <el-form-item label="民宿标签">
                        <el-input v-model="homestayform.stag" style="width: 280px" placeholder="标签用”，“隔开"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="名宿描述">
                    <el-input type="textarea" v-model="homestayform.sdesc" style="width: 1000px"></el-input>
                </el-form-item>
                <div class="row1">
                    <el-form-item label="民宿评分">
                        <el-rate
                                v-model="homestayform.score"
                                :colors="colors">
                        </el-rate>
                    </el-form-item>
                    <el-form-item label="民宿价格">
                        <el-input v-model="homestayform.sprice" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="民宿地址">
                        <el-input v-model="homestayform.saddress" style="width: 500px"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="民宿缩略图">
                    <el-upload
                            class="avatar-uploader"
                            :action="uploadurl"
                            :show-file-list="false"
                            :on-success="handleThumbSuccess"
                            :before-upload="handleThumbBeforeUpload"
                    >
                        <img v-if="homestayform.sthumb" :src="IMGURL+homestayform.sthumb" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/webp文件，且不超过200kb,最佳比例是1:1</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="民宿轮播图">
                    <el-upload
                            class="avatar-uploader"
                            :action="uploadurl"
                            list-type="picture-card"
                            multiple
                            :limit="5"
                            :on-success="handleBannerSuccess"
                            :before-upload="handleThumbBeforeUpload"
                            :on-remove="handleBannerRemove"
                            :on-preview="handleBannerPreview"
                            :on-exceed="handleExceed"
                            :file-list="bannerFileList"
                    >
                        <i class="el-icon-plus"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/webp文件，且不超过200kb,最佳比例是16:9,最多上传5张图片</div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="民宿详情">
                    <rich-text @rich-change="setSattribute" formfield="sdetail"
                               :value="homestayform.sdetail" v-if="homestayform.sdetail"></rich-text>
                </el-form-item>
                <el-form-item label="入住须知">
                    <rich-text @rich-change="setSattribute" formfield="snotice"
                               :value="homestayform.snotice" v-if="homestayform.snotice"></rich-text>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import instance from "../../../http/http";
    import {URL, IMGURL} from "../../../lib/base";
    import RichText from "../../../components/rich-text/RichText";
    import {homestayRead, homestayUpdate} from "../../../http/homestay";

    export default {
        name: "Homestayedit",
        components: {
            RichText
        },
        data() {
            return {
                uploadurl: URL + "/admin/upload/index",
                IMGURL,
                categorys: [],
                homestayform: {
                    sname: "",
                    sdesc: "",
                    sthumb: "",
                    sprice: "",
                    stag: "",
                    saddress: "",
                    sbanner: "",
                    snotice: "",
                    sdetail: "",
                    cid: "",
                    score: 0,
                },
                bannerFileList: [],
                bannerArr: [],
                dialogVisible: false,
                dialogImageUrl: "",
                colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
            }
        },
        methods: {
            initHomestay() {
                let sid = this.$route.params.sid;
                homestayRead(sid).then(
                    res => {
                        if (res.data) {
                            this.homestayform = res.data;
                            this.bannerArr = res.data.sbanner1;
                            this.bannerFileList = res.data.sbanner1.map(ele => ({
                                name: res.data.sname,
                                url: IMGURL + ele
                            }))
                        }
                    }
                ).catch(
                    () => {

                    }
                )
            },
            initCategory() {
                instance({
                    method: "GET",
                    url: "/admin/category/indexall"
                }).then(res => {
                    if (res.code === 200) {
                        this.categorys = res.data;
                    }
                }).catch(() => {

                })
            },
            //处理缩略图上传成功后的处理方式
            handleThumbSuccess(res) {
                //upload组件默认会进行网络请求，只要在成功处理函数中接受res即可
                if (res.code === 200) {
                    this.homestayform.sthumb = res.imgURL;
                }
            },
            //缩略图上传之前进行的验证
            handleThumbBeforeUpload(file) {
                let {type, size} = file;
                let uploadMaxSize = 200 * 1024;
                let uploadType = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
                let sizeFlag = true;
                let typeFlag = true;
                sizeFlag = size < uploadMaxSize;
                typeFlag = uploadType.some(ele => ele == type);
                if (!typeFlag) {
                    this.$message.error("上传图片智能是 JPG,PNG,WEBP,JPEG 格式！");
                }
                if (!sizeFlag) {
                    this.$message.error("上传图片大小不能超过 200KB");
                }
                return sizeFlag && typeFlag;
            },
            //banner上传成功后的处理方式
            handleBannerSuccess(res) {
                this.bannerArr.push(res.imgURL);
                this.homestayform.sbanner = this.bannerArr.join(",");
            },
            //添加banner后删除图片的处理方式
            handleBannerRemove(file) {
                let url;
                if (file.response) {
                    url = file.response.imgURL;
                } else {
                    url = file.url;
                }
                this.bannerArr = this.bannerArr.filter(ele => !url.includes(ele));
                this.homestayform.sbanner = this.bannerArr.join(",");
            },
            //对banner的预览
            handleBannerPreview(file) {
                let url;
                if (file.response) {
                    url = this.IMGURL + file.response.imgURL;
                } else {
                    url = file.url;
                }
                this.dialogImageUrl = url;
                this.dialogVisible = true;
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            //formfiled为需要修改的属性，是父组件给传下去的
            setSattribute(formfiled, html) {
                //父组件必传formfiled给子组件
                this.homestayform[formfiled] = html;
            },
            handleSubmit() {
                let data = this.homestayform;
                delete data.sbanner1;
                let sid = this.homestayform.sid;
                homestayUpdate(sid, data).then(res => {
                    if (res.code === 404) {
                        this.$message.error(res.msg);
                    } else if (res.code === 200) {
                        this.$message.success(res.msg);
                        this.$router.push("/homestayindex");
                    }
                }).catch(() => {

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
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .w-e-text-container {
        z-index: 1 !important;
    }

    .el-rate {
        line-height: 2.5 !important;
    }

    .w-e-toolbar {
        z-index: 1!important;
    }

</style>
<style scoped>
    .row1 {
        display: flex;
        flex: 1;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>