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
       <!-- 取消预定弹窗 -->
        <div class="modal fade" id="mySearch" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" style="margin-top: 50px;">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="rej_title modal-title" id="myModalLabel">取消原因</h4>
                    </div>
                    <div class="modal-body">
                        <div>
                            <textarea class="rej_textarea" v-model="cancleContent"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="rej_button btn cancle" @click="goCancle">确定</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 拒绝原因弹窗 -->
        <div class="modal fade" id="repulse" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" style="margin-top: 50px;">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="rej_title modal-title" id="myModalLabel">拒绝原因</h4>
                    </div>
                    <div class="modal-body">
                        <div>
                            <textarea class="rej_textarea" v-model="repulseContent"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="rej_button btn cancle" @click="goRepulse">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!--提交按钮-->
        <div class="kong"></div>
        <div class="button_btn">
            <!-- <button class="mindex_tab submit">编辑</button> -->
            <button @click="leftButton"  v-bind:class="{'submit':yesc,'submitChange':noc}">{{leftButtonText}}</button>
            <button @click="rightButton" v-bind:class="{'mindex_tab cancle':yesB,'submitChange':noB}">{{rightButtonText}}</button>
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
                noc:false,
                leftButtonText:'',//左侧按钮显示文字
                rightButtonText:'',//右侧按钮显示文字
                right:0,//权限
                opassstate:3,//假设为3，该值是有上一个页面传来***********
                repulseContent:'',//拒绝原因
                cancleContent:'',//取消原因内容
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
                this.axios.post(Global.host+'/order/selectOneInfo',this.qs.stringify(postData))
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
                     /*用户权限控制*/
                    let session = localStorage.getItem("mUserInfo")
                    let mySession = JSON.parse(session)
                    let right = JSON.parse( localStorage.getItem("userRight"))
                    right = 1//测试临时数据
                    self.right = right
                    /*更改按钮点击状态*/
                    let state = self.dataArry[6]
                    console.log(state)
                    if(state == 0 && (right == 1 || right == 4)){
                        //alert('555')
                        self.noB = true
                        self.yesB = false
                    }
                    console.log(self.dataArry[3])
                    if(self.dataArry[3] != null && (right == 1 || right == 4)){
                        self.yesc = false,
                        self.noc = true
                    }
                    /*路由传值，获得状态opassstate*/
                    if (self.opassstate != 3) {
                        self.noB = true
                        self.yesB = false
                        self.yesc = false,
                        self.noc = true
                    }
                    //修改左侧和右侧按钮文字
                    switch (self.right) {
                      case 1:
                        self.leftButtonText = '评价'
                        self.rightButtonText = '取消'
                        break
                      case 2:
                        self.leftButtonText = '通过'
                        self.rightButtonText = '拒绝'
                        break
                      case 3:
                        break
                      case 4:
                        // alert("该用户没有权限")
                        self.leftButtonText = '评价'
                        self.rightButtonText = '取消'
                        break
                      case 5:
                        //管理员页面？
                        break
                      default:
                        break
                    }
                })
                /*用户权限控制*/
                let session = localStorage.getItem("mUserInfo")
                let mySession = JSON.parse(session)
                let right = JSON.parse( localStorage.getItem("userRight"))
                self.right = right
                //修改左侧按钮文字
                switch (right) {
                  case 1:
                    self.leftButtonText = '评价'
                    self.rightButtonText = '取消'
                    break
                  case 2:
                    break
                  case 3:
                    break
                  case 4:
                    // alert("该用户没有权限")
                    self.leftButtonText = '评价'
                    self.rightButtonText = '取消'
                    break
                  case 5:
                    //管理员页面？
                    break
                  default:
                    break
                }
            },
            goComment(){
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
            goCancleTan(){
                /*弹出弹窗*/
                $("#mySearch").modal("show")
            },
            goCancle(){
                /*弹出弹窗*/
                // $("#mySearch").modal("show")
                let self = this
                let postData = {
                    ocid:self.ocid,
                    cancleContent:self.cancleContent
                }
                console.log(postData)

                $.ajax({
                    type:"POST",
                    url:'/order/memberUpdateOrder',
                    data:postData,
                    success:function(res){
                        if(res == 1){
                          alert('操作成功')
                        }else{
                          alert('操作失败')
                        }
                    }
                })
            },
            passCheck(){
              //取出oid
              let oid = this.oid
              let pass = 2
              let postData = {
                oid:oid,
                pass:pass
              }
              $.ajax({
                  type:"POST",
                  url:'/order/approveOrder',
                  data:postData,
                  success:function(res){
                      //console.log(res)
                    if(res == 1){
                      alert('操作成功')
                    }else{
                      alert('操作失败')
                    }
                  }
              })
            },
            repulse(){
              /*弹出弹窗*/
              $("#repulse").modal("show")
            },
            goRepulse(){
              //取出oid
              let oid = this.oid
              let pass = 1
              let message = this.repulseContent
              let postData = {
                oid:oid,
                pass:pass,
                message:message
              }
              $.ajax({
                  type:"POST",
                  url:'/order/approveOrder',
                  data:postData,
                  success:function(res){
                      //console.log(res)
                    if(res == 1){
                      alert('操作成功')
                    }else{
                      alert('操作失败')
                    }
                  }
              })
            },
            leftButton(){
              let right = this.right
              switch (right) {
                case 1:
                  this.goComment()
                  break
                case 2:
                  //通过按钮
                  this.passCheck()
                  break
                case 3:
                  break
                case 4:
                  // alert("该用户没有权限")
                  this.goComment()
                  break
                case 5:
                  //管理员页面？
                  break
                default:
                  break
              }
            },
             rightButton(){
              let right = this.right
              switch (right) {
                case 1:
                  this.goCancleTan()//取消按钮
                  break
                case 2:
                  //拒绝按钮
                  this.repulse()
                  break
                case 3:
                  break
                case 4:
                  // alert("该用户没有权限")
                  this.goCancleTan()//取消按钮
                  break
                case 5:
                  //管理员页面？
                  break
                default:
                  break
              }
            }
        }
    }
</script>
