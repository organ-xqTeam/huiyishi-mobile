<template>
    <div vlass="warp_main">
        <div class="basic">
            <div class="basic_title mindex_top ac">会议预定信息</div>
            <div class="mindex_top table_top">
                <table class="mindex_table">
                    <tr style="border-top: none;">
                        <td class="table_name">会议主题</td>
                        <td><input class="mindex_input" type="text" name="" v-model="ocsourcename"></td>
                    </tr>
                    <tr>
                        <td class="table_name">会议室名称</td>
                        <td><input class="mindex_input" type="text" name="" v-model="rname"></td>
                    </tr>
                    <tr>
                        <td class="table_name">参会人数</td>
                        <td><input class="mindex_input" type="number" name="" v-model="ocnum"></td>
                    </tr>
                    <tr>
                        <td class="table_name">会议时间</td>
                        <td><input class="mindex_input form-control" id='datetime' type="type" name="" v-model="time"></td>
                    </tr>
                    <!-- <tr>
                        <td class="table_name">是否重复预定</td>
                        <td>
                            <input class="table_radio" type="radio" name="cf">是
                            <input class="table_radio" type="radio" name="cf">否
                        </td>
                    </tr>
                    <tr>
                        <td class="table_name">重复预定类型</td>
                        <td>
                            <select class="mindex_input">
                                <option>每天</option>
                                <option>每周</option>
                                <option>每月</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_name">重复次数</td>
                        <td><input class="mindex_input" type="number" name=""></td>
                    </tr>
                    <tr>
                        <td class="table_name">重复日期</td>
                        <td><input class="mindex_input" type="text" name=""></td>
                    </tr>
                    <tr>
                        <td class="table_name">结束重复日期</td>
                        <td><input class="mindex_input" type="text" name=""></td>
                    </tr> -->
                    <tr>
                        <td class="table_name">会议预定联系人</td>
                        <td><input class="mindex_input" type="text" name="" v-model="ocreservename"></td>
                    </tr>
                    <tr>
                        <td class="table_name">联系电话</td>
                        <td><input class="mindex_input" type="number" name="" v-model="ocreservephone"></td>
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
        </div>
        <div>
            <router-link :to="{path:'/morderContent/supply',query:{ocid:this.ocid} }">
                <button class="add_info toSupply">查看会议补充信息</button>
            </router-link>
        </div>
        <div class="look_goods">
            <div class="look_title ac">基础会议物品</div>
            <ul class="look_ul">
                <li v-for="(item,index) in bg" :key="index">{{item.boname}} <span>{{item.bonum}}</span></li>
            </ul>
        </div>
        <div class="look_goods">
            <div class="look_title ac">增值会议物品</div>
            <ul class="look_ul">
                <li v-for="(item,index) in ag" :key="index">{{item.aoname}} <span>{{item.aonum}}</span></li>
            </ul>
        </div>
        <!--提交按钮-->
        <div class="kong"></div>
        <div class="button_btn">
            <!-- <button class="mindex_tab submit">编辑</button> -->
            <button @click="leftButton"  v-bind:class="{'submit':yesc,'submitChange':noc}">{{leftButtonText}}</button>
            <button @click="rightButton" v-bind:class="{'mindex_tab cancle':yesB,'submitChange':noB}">{{rightButtonText}}</button>
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
        name: "morderContentBase",
        data(){
            return{
                ocid:0,
                oid:0,
                rid:0,
                ocsourcename:'',
                rname:'',
                ocnum:0,
                time:'',
                ocreservename:'',
                ocreservephone:'',
                ocusename:'',
                ocusephone:'',
                dataArry:[],//data总数数据
                ag:[],//增值物品数组 dataArry分支
                bg:[],//基础物品数组 dataArry分支
                cancleContent:'',//取消原因内容
                /*按钮状态*/
                yesB:true,
                noB:false,
                yesc:true,
                noc:false,
                leftButtonText:'',//左侧按钮显示文字
                rightButtonText:'',//右侧按钮显示文字
                right:0,//权限
                opassstate:3,//假设为3，该值是有上一个页面传来
                repulseContent:''//拒绝原因
            }
        },
        mounted(){
            this.initDo();
        },
        methods:{
            //页面加载
            initDo(){
                let self=this
                let ocidData=this.$route.query.ocid
                this.ocid=ocidData
                let postData = {
                    ocid:ocidData
                }

                this.axios.post(Global.host+'/order/selectOneInfo',this.qs.stringify(postData))
                .then(function(res){
                    self.dataArry = res.data
                    console.log(self.dataArry)
                    /*基础信息*/
                    self.ocsourcename = self.dataArry[0].ocsourcename
                    self.ocnum = self.dataArry[0].ocnum
                    self.ocreservename = self.dataArry[0].ocreservename
                    self.ocreservephone = self.dataArry[0].ocreservephone
                    self.ocusename = self.dataArry[0].ocusename
                    self.ocusephone = self.dataArry[0].ocusephone
                    self.rname = self.dataArry[4]//会议室名称
                    self.oid = self.dataArry[0].oid
                    let beginTime = self.dataArry[0].ocbegintime
                    let endTime = self.dataArry[0].ocendtime
                    let kaishi = Global.dateToFormat(new Date(beginTime))
                    let jieshu = Global.dateToFormat(new Date(endTime))
                    let jieshuReal = jieshu.substr(11,jieshu.length)
                    self.time = kaishi + "-" + jieshuReal
                    /*增值物品信息列表*/
                    self.ag = self.dataArry[2]
                    /*基础物品信息列表*/
                    self.bg = self.dataArry[1]
                    self.rid = self.dataArry[0].rid
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
