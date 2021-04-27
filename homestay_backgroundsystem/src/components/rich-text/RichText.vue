<template>
    <div>
        <div id="edit" ref="edit"></div>
    </div>
</template>

<script>
    import E from "wangeditor";
    import {IMGURL, URL} from "../../lib/base";

    export default {
        name: "RichText",
        props: {
            menus: {
                type: Array,
                default: function () {
                    return ['head',
                        'bold',
                        'fontSize',
                        'fontName',
                        'italic',
                        'underline',
                        'strikeThrough',
                        'indent',
                        'lineHeight',
                        'foreColor',
                        'backColor',
                        'link',
                        'list',
                        'todo',
                        'justify',
                        'quote',
                        'emoticon',
                        'image',
                        'video',
                        'table',
                        'code',
                        'splitLine',
                        'undo',
                        'redo',]
                }
            },
            value: {
                type: String,
                default: ""
            },
            formfield: {
                required: true,
                type: String
            }
        },
        data() {
            return {
                uploadurl: URL + "/admin/upload/index"
            }
        },
        methods: {
            initRichText() {
                let edit = new E(this.$refs.edit);
                edit.config.menus = this.menus;
                edit.config.uploadImgServer = this.uploadurl;  // 上传图片到服务器
                edit.config.showLinkImg = false;//隐藏网络图片上传方式
                edit.config.uploadFileName = 'file';
                edit.config.uploadImgMaxSize = 3 * 1024 * 1024;
                edit.config.onchange = (html) => {
                    this.$emit("rich-change", this.formfield, html);
                }
                edit.config.uploadImgHooks = {
                    customInsert: function (insertImg, result) {
                        var url = IMGURL + result.imgURL;
                        insertImg(url)
                    }
                }
                edit.create();
                this.value && edit.txt.html(this.value);
            }
        },
        mounted() {
            this.initRichText();
        }

    }
</script>

<style scoped>

</style>