<template>
    <div class="warp_main">
        <div class="basic">
            <div class="basic_title mindex_top ac">会议补充信息</div>
            <!-- 会议补充信息 -->
            <div class="mindex_top table_top">
                <table class="mindex_table">
                    <tr>
                        <td class="table_name">预定台型</td>
                        <td>
                            <input class="mindex_input" type="text" name="" v-model="cname">
                        </td>
                    </tr>
                    <tr>
                        <td class="table_name">是否与服务人员对接</td>
                        <td>
                            <input class="table_radio" type="radio" name="cf" id="Yduijie" value="1" v-model="isDockingState" disabled="disabled">是
                            <input class="table_radio" type="radio" name="cf" id="Nduijie" value="2" v-model="isDockingState" disabled="disabled">否
                        </td>
                    </tr>
                    <tr>
                        <td class="table_name">对接时间</td>
                        <td><input class="mindex_input form-control" id='datetime' type="type" name="" v-model="ocdockingtime"></td>
                    </tr>
                    <tr>
                        <td class="table_name">会议使用联系人</td>
                        <td><input class="mindex_input" type="text" name="" v-model="ocusename"></td>
                    </tr>
                    <tr>
                        <td class="table_name">联系电话</td>
                        <td><input class="mindex_input" type="number" name="" v-model="ocusephone"></td>
                    </tr>
                </table>
            </div>
            <!-- 车位预留情况 -->
            <div class="mindex_top table_top basic">
                <table class="mindex_table">
                    <caption class="table_title">车位预留情况</caption>
                    <tr style="border-top: none;">
                        <td class="table_name">大车位数量</td>
                        <td><input class="mindex_input" type="number" name="" v-model="ocbigcarnum"></td>
                    </tr>
                    <tr>
                        <td class="table_name">小车位数量</td>
                        <td><input class="mindex_input" type="number" name="" v-model="ocsmallnum"></td>
                    </tr>
                    <tr>
                        <td class="table_name">会议议程</td>
                        <td><input class="mindex_input" type="text" name="" v-model="ocagenda"></td>
                    </tr>
                    <tr>
                        <td class="table_name">打印份数</td>
                        <td><input class="mindex_input" type="number" name="" v-model="ocprintnum"></td>
                    </tr>
                    <tr>
                        <td class="table_name">主席台是否摆放</td>
                        <td>
                            <input class="table_radio" type="radio" name="rostrum" value="1" v-model="isOcplatform" disabled="disabled">是
                            <input class="table_radio" type="radio" name="rostrum" value="2" v-model="isOcplatform" disabled="disabled">否
                        </td>
                    </tr>
                </table>
            </div>
            <!-- 会议布展情况 -->
            <div class="mindex_top table_top basic">
                <table class="mindex_table">
                    <caption class="table_title">会议布展情况</caption>
                    <tr style="border-top: none;">
                        <td class="table_name">展台</td>
                        <td><input class="mindex_input" type="number" name="" v-model="ocshowplatform"></td>   
                    </tr>
                    <tr>
                        <td class="table_name">展架</td>
                        <td><input class="mindex_input" type="number" name="" v-model="ocshowshelf"></td>
                    </tr>
                </table>
            </div>
            <!-- 桌椅及背签顺序 -->
            <div class="add_name mindex_top table_top basic">
                <table class="mindex_table">
                    <caption class="table_title">桌椅及背签顺序</caption>
                    <tr style="border-top: none;">
                        <td><input class="mindex_input ac" type="text" name=""></td>
                        <td><input class="mindex_input ac" type="text" name=""></td>
                        <td><input class="mindex_input ac" type="text" name=""></td>
                        <td><input class="mindex_input ac" type="text" name=""></td>
                    </tr>
                    <tr>
                        <td><input class="mindex_input ac" type="text" name=""></td>
                        <td><input class="mindex_input ac" type="text" name=""></td>
                        <td><input class="mindex_input ac" type="text" name=""></td>
                        <td><input class="mindex_input ac" type="text" name=""></td>
                    </tr>
                </table>
            </div>
            <!-- 附件备注 -->
            <div class="mindex_top table_top basic">
                <table class="mindex_table">
                    <tr>
                        <td class="table_name">附件</td>
                        <td><button class="ocacc_btn cancle fr">选择</button></td>
                    </tr>
                    <tr>
                        <td colspan="2" class="table_name">备注:</td>
                    </tr>
                    <tr>
                        <td class="remarks" colspan="2">
                            <textarea placeholder="请描述一下详细内容～" v-model="ocremark"></textarea>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        
        <!--提交按钮-->
        <div class="kong"></div>
        <div class="button_btn">
            <button @click="submit"  v-bind:class="{'submit':yesc,'submitChange':noc}">评价</button>
            <button data-toggle="modal" data-target="#mySearch" v-bind:class="{'mindex_tab cancle':yesB,'submitChange':noB}">取消</button>
        </div>
    </div>
    
</template>
<style scoped>
    @import "../assets/css/bootstrap.min.css";
    @import "../assets/css/bootstrap-datetimepicker.min.css";
    @import "../assets/css/reset.css";
    @import "../assets/css/iconfont.css";
    @import "../assets/css/mindex.css";
    @import "../assets/css/mdetail.css";
</style>
<script>
    import "../assets/js/bootstrap.min.js";
    import "../assets/js/bootstrap-datetimepicker.min.js";
    import "../assets/js/bootstrap-datetimepicker.zh-CN.js";
    // import "../assets/js/moment-with-locales.js";
    import "../assets/js/Global.js";
    
    export default{
        data(){
            return{
                isDockingState:"", //是否对接
                isOcplatform:'',
                ocid:this.$route.query.ocid,
                dataArry:[],//data总数数据
                ocdockingtime:'',
                ocusename:'',
                ocusephone:'',
                ocbigcarnum:0,
                ocsmallnum:0,
                ocagenda:'',
                ocprintnum:0,
                ocshowplatform:0,
                ocshowshelf:0,
                cname:'',
                ocremark:'',
                rid:0,
                /*按钮状态*/
                yesB:true,
                noB:false,
                yesc:true,
                noc:false
            }
        },
        mounted(){
            this.initDo();
        },
        methods:{
            initDo(){
                let postData = {
                    ocid:this.ocid
                }
                let self = this
                this.axios.post('/order/selectOneInfo',this.qs.stringify(postData))
                .then(function(res){
                    console.log(res)
                    self.dataArry=res.data
                    let beginTime = self.dataArry[0].ocdockingtime
                    self.ocdockingtime = (beginTime!=null)?(Global.dateToFormat(new Date(beginTime))):('')
                    //self.ocdockingtime = Global.dateToFormat(new Date(beginTime))
                    self.ocusename = self.dataArry[0].ocusename
                    self.ocusephone = self.dataArry[0].ocusephone
                    self.ocbigcarnum = self.dataArry[0].ocbigcarnum
                    self.ocsmallnum = self.dataArry[0].ocsmallnum
                    self.ocagenda = self.dataArry[0].ocagenda
                    self.ocprintnum = self.dataArry[0].ocprintnum
                    self.ocshowplatform = self.dataArry[0].ocshowplatform
                    self.ocshowshelf = self.dataArry[0].ocshowshelf
                    self.cname = self.dataArry[5]
                    self.ocremark = self.dataArry[0].ocremark

                    self.rid = self.dataArry[0].rid
                    self.isDockingState=self.dataArry[0].ocdockingstate
                    self.isOcplatform=self.dataArry[0].ocplatform
                    let state = self.dataArry[6]
                    if(state == 0){
                        self.noB = true
                        self.yesB = false
                    }
                    if(self.dataArry[3] != null){
                        self.yesc = false,
                        self.noc = true
                    }
                })
            },
            submit(){
                console.log(this.rid)
                if(this.dataArry[3] == null){
                    this.$router.push({
                        path:"/mreview",
                        query:{
                            ocid:this.ocid,
                            rid:this.rid
                        }
                    })
                }else{
                    alert("你已经评论过啦")
                }
            },
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>