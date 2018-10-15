<template>
  <div vlass="warp_main">
    <div class="basic">
      <div class="basic_title mindex_top ac">会议预定信息</div>
      <div class="mindex_top table_top">
        <table class="mindex_table">
          <tr style="border-top: none;">
            <td class="table_name">会议主题</td>
            <td><input class="mindex_input" type="text" name="" v-model="ocsourcename" readonly="readonly"></td>
          </tr>
          <tr>
            <td class="table_name">会议室名称</td>
            <td><input class="mindex_input" type="text" name="" v-model="rname" readonly="readonly"></td>
          </tr>
          <tr>
            <td class="table_name">参会人数</td>
            <td><input class="mindex_input" type="number" name="" v-model="ocnum" readonly="readonly"></td>
          </tr>
          <tr>
            <td class="table_name">会议时间</td>
            <td>
              <input class="mindex_input form-control" id='datetime' type="type" name="" v-model="time" readonly="readonly"
                style="background-color:#fff;border:none;outline:none;box-shadow:none;padding-left:0;color:#000;">
            </td>
          </tr>
          <!-- 重复 -->
          <!-- <tr>
            <td class="table_name">是否重复预定</td>
            <td>
              <template v-cloak v-if="ocdockingstate==1">
                是
              </template>
              <template v-cloak v-else>
                否
              </template>
            </td>
          </tr>

          <template v-cloak v-if="ocdockingstate==1">
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
            </tr>
          </template> -->
          <!-- 重复 end -->
          <tr>
            <td class="table_name">会议预定联系人</td>
            <td><input class="mindex_input" type="text" name="" v-model="ocreservename" readonly="readonly"></td>
          </tr>
          <tr>
            <td class="table_name">联系电话</td>
            <td><input class="mindex_input" type="number" name="" v-model="ocreservephone" readonly="readonly"></td>
          </tr>
          <tr>
            <td class="table_name">会议使用联系人</td>
            <td><input class="mindex_input" type="text" name="" v-model="ocusename" readonly="readonly"></td>
          </tr>
          <tr>
            <td class="table_name">联系电话</td>
            <td><input class="mindex_input" type="number" name="" v-model="ocusephone" readonly="readonly"></td>
          </tr>
        </table>
      </div>
    </div>
    <div>
      <router-link :to="{path:'/memberlist/morderContent/base/supply',query:{ocid:this.ocid} }">
        <button class="add_info toSupply blueBg"
                style="color:#fff;height:47px;border-radius:0px;">查看会议补充信息</button>
      </router-link>
    </div>
    <template v-cloak v-if="bg.length>0">
      <div class="look_goods" style="margin-top:0;">
        <div class="look_title ac" style="font-size:1.3em;">基础会议物品</div>
          <ul class="look_ul">
            <li v-for="(item,index) in bg" :key="index">{{item.boname}} <span>{{item.bonum}}</span></li>
          </ul>
      </div>
    </template>
    <template v-cloak v-if="ag.length>0">
      <div class="look_goods">
        <div class="look_title ac" style="font-size:1.3em;">增值会议物品</div>
        <ul class="look_ul">
          <li v-for="(item,index) in ag" :key="index">{{item.aoname}} <span>{{item.aonum}}</span></li>
        </ul>
      </div>
    </template>

    <!-- 指派服务人员 -->
    <template v-cloak v-if="Number(queryInfo.otakeorder)==1">
      <div class="look_goods blueBg" @click="goAssignSer">
        <div class="look_title ac" style="font-size:1.3em;">指派服务人员</div>
        <!-- <ul class="look_ul">
          <li v-for="(item,index) in ag" :key="index">{{item.aoname}} <span>{{item.aonum}}</span></li>
        </ul> -->
      </div>
      <!-- 展示选择的服务人员 -->
      <div class="serPerWrap" style="width:88%;margin:0 auto;">
        <label class="serPerItem" style="text-indent:1em;"
              v-for="(item,index) in selectedSerPerReal" :key="index">{{item.name}}</label>
      </div>
    </template>

    <div class="kong"></div>

    <!--下面按钮-->
    <div class="button_btn">
      <!-- 普通用户 -->
      <template v-cloak v-if="queryInfo.fromPage&&queryInfo.fromPage=='member'">
        <button class="blueBg"
                v-cloak v-if="Number(queryInfo.otakeorder)==3&&dataArry[3]==null"
                @click="goComment">评价</button>
        <button class="blueBg" v-cloak v-if="Number(queryInfo.opassstate)==3&&Number(queryInfo.orderstate)!==0"
                @click="goCancleTan">取消预定</button>
      </template>
      <!-- 审批部门 -->
      <template v-cloak v-if="queryInfo.fromPage&&queryInfo.fromPage=='approve'">
        <button class="whiteBg" id="realPassBtn"
                v-cloak v-if="Number(queryInfo.opassstate)==3&&Number(queryInfo.orderstate)!==0"
                @click="passCheck">通过</button>
        <button class="blueBg"
                v-cloak v-if="Number(queryInfo.opassstate)==3&&Number(queryInfo.orderstate)!==0"
                @click="openRepulse">拒绝</button>
      </template>
      <!-- 服务部门 -->
      <!-- otakeorder 1未接单 2服务中 3已完成 -->
      <!-- otakeorder 服务状态(1.未接单 2.服务中3.服务完成  默认为1 ) -->
      <!-- orderstate;//订单状态(0.以取消 1.未取消  2.已完成   数据库默认未取消为1) -->
      <template v-cloak v-if="queryInfo.fromPage&&queryInfo.fromPage=='service'">
        <button class="blueBg" v-cloak v-if="Number(queryInfo.otakeorder)==1"
                @click="submitAssignSer">提交</button>
        <button class="blueBg" v-cloak v-if="Number(queryInfo.otakeorder)==3"
                @click="goCancleTan">修改会议物品</button>
      </template>

      <button class="whiteBg" @click="routerGoback">返回</button>
    </div>
    <!--下面按钮 end -->

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
            <button type="button" class="rej_button btn cancle" id="realCancelBtn" @click="goCancle">确定</button>
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
            <button type="button" class="rej_button btn cancle" id="realRepulseBtn" @click="goRepulse">确定</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 指派服务人员页面 /////////////////////////////////////////////////////////////////////////////////////// -->
    <div class="assignSer-page" v-cloak v-show="showSerPage">
      <div class="basic_title mindex_top ac">选择服务人员</div>
      <div class="serPerWrap">
        <label class="serPerItem" v-for="(item,index) in serPerArr" :key="index">
          <input type="checkbox" :value="index" v-model="selectedSerPer">
          <span>{{item.name}}</span>
        </label>
      </div>

      <!--下面按钮-->
      <div class="button_btn">
        <button class="blueBg" @click="confirmSerPer">确认</button>
        <button class="whiteBg" @click="closeSerPerPage">取消</button>
      </div>
      <!--下面按钮 end -->
    </div>

  </div>
</template>

<script>
export default {
  name: "morderContentBase",
  data() {
    return {
      queryInfo:{}, //页面传值item

      ocid: 0,
      oid: 0,
      rid: 0,
      ocsourcename: "",
      rname: "",
      ocnum: 0,
      time: "",
      ocreservename: "",
      ocreservephone: "",
      ocusename: "",
      ocusephone: "",
      // ocdockingstate: 2, //默认不重复

      dataArry: [], //data总数数据
      ag: [], //增值物品数组 dataArry分支
      bg: [], //基础物品数组 dataArry分支

      cancleContent: "", //取消原因内容

      /*按钮状态*/
      yesB: true,
      noB: false,
      yesc: true,
      noc: false,
      leftButtonText: "", //左侧按钮显示文字
      rightButtonText: "", //右侧按钮显示文字
      right: "", //权限
      opassstate: 3, //假设为3，该值是有上一个页面传来
      repulseContent: "", //拒绝原因


      //指派服务人员页面
      showSerPage:false,
      serPerArr:[],
      selectedSerPer:[], //选择的服务人员的index集合
      // selectedSerPerReal:[], //选择的服务人员item
    }
  },
  computed:{
    selectedSerPerReal(){ //选择的服务人员item
      let self=this
      let arr=this.serPerArr.filter(function(obj,index){
        return self.selectedSerPer.indexOf(index)>-1
      })
      return arr
    }
  },
  mounted() {
    this.getPageInfo()
    this.initDo();
  },
  methods: {
    //页面传值获取数据
    getPageInfo(){
      let item=this.$route.query.item;
      console.log(item)
      this.queryInfo=item
    },
    //页面加载
    initDo() {
      let self = this;
      let ocidData = this.$route.query.ocid;
      this.ocid = ocidData;
      let postData = {
        ocid: ocidData
      };
      Global.openLoading()
      this.axios
        .post(Global.host + "/order/selectOneInfo", this.qs.stringify(postData))
        .then(function(res) {
          Global.closeLoading()
          console.log(res);
          self.dataArry = res.data;
          console.log(self.dataArry);

          /*基础信息*/
          let baseInfo = self.dataArry[0];
          console.log(baseInfo);

          self.ocsourcename = baseInfo.ocsourcename;
          self.ocnum = baseInfo.ocnum;
          self.ocreservename = baseInfo.ocreservename;
          self.ocreservephone = baseInfo.ocreservephone;
          self.ocusename = baseInfo.ocusename;
          self.ocusephone = baseInfo.ocusephone;
          self.rname = self.dataArry[4]; //会议室名称
          self.oid = baseInfo.oid;
          //重复？？？
          // self.ocdockingstate = Number(baseInfo.ocdockingstate);


          let beginTime = baseInfo.ocbegintime;
          let endTime = baseInfo.ocendtime;
          let kaishi = Global.dateToFormat(new Date(beginTime));
          let jieshu = Global.dateToFormat(new Date(endTime));
          let jieshuReal = jieshu.substr(11, jieshu.length);
          self.time = kaishi + "-" + jieshuReal;

          /*增值物品信息列表*/
          self.ag = self.dataArry[2];
          /*基础物品信息列表*/
          self.bg = self.dataArry[1];

          self.rid = baseInfo.rid;
          /*用户权限控制*/
          let session = localStorage.getItem("mUserInfo");
          let mySession = JSON.parse(session);
          let right = JSON.parse(localStorage.getItem("userRight"));
          // right = 1; //测试临时数据
          self.right = Number(right);
          console.log(self.right);
          /*更改按钮点击状态*/
          let state = self.dataArry[6];
          console.log(state);
          if (state == 0) {
            self.noB = true;
            self.yesB = false;
          }
          console.log(self.dataArry[3]);
          if (self.dataArry[3] != null) {
            (self.yesc = false), (self.noc = true);
          }
          /*路由传值，获得状态opassstate*/
          if (self.opassstate != 3) {
            self.noB = true;
            self.yesB = false;
            (self.yesc = false), (self.noc = true);
          }
          //修改左侧和右侧按钮文字
          switch (self.right) {
            case 1:
              self.leftButtonText = "评价";
              self.rightButtonText = "取消";
              break;
            case 2:
              self.leftButtonText = "通过";
              self.rightButtonText = "拒绝";
              break;
            case 3:
              break;
            case 4:
              // alert("该用户没有权限")
              self.leftButtonText = "评价";
              self.rightButtonText = "取消";
              break;
            case 5:
              //管理员页面？
              break;
            default:
              break;
          }
        })
        .catch(function(res){
          Global.closeLoading()
        });
    },
    goComment() {
      if (this.dataArry[3] == null) {
        this.$router.push({
          path: "/memberlist/morderContent/base/mreview",
          query: {
            ocid: this.ocid,
            rid: this.rid
          }
        });
      } else {
        alert("你已经评论过啦");
      }
    },
    goCancleTan() {
      /*弹出弹窗*/
      $("#mySearch").modal("show");
    },
    goCancle() {
      let self = this;
      //先验证一下
      if(this.cancleContent.trim()==""){
        alert("请输入取消原因")
        return
      }

      let result=confirm("确定取消该订单？")
      if(!result){
        return
      }
      let postData = {
        ocid: self.ocid,
        cancleContent: self.cancleContent
      };
      console.log(postData);
      $("#realCancelBtn").addClass("eventsDisabled")
      $.ajax({
        type: "POST",
        url: "/order/memberUpdateOrder",
        data: postData,
        success: function(res) {
          $("#realCancelBtn").removeClass("eventsDisabled")
          console.log(res)
          if (Number(res) == 1) {
            alert("操作成功");
            $("#mySearch").modal("hide");

            self.$router.go(-1);
          } else {
            alert("操作失败");
          }
        }
      });
    },
    passCheck() {
      let self=this
      let result=confirm("确定通过该订单？")
      if(!result){
        return
      }
      //取出oid
      let oid = this.oid;
      let pass = 2;
      let postData = {
        oid: oid,
        pass: pass
      };
      console.log(postData)
      $("#realPassBtn").addClass("eventsDisabled")
      $.ajax({
        type: "POST",
        url: "/order/approveOrder",
        data: postData,
        success: function(res) {
          $("#realPassBtn").removeClass("eventsDisabled")
          //console.log(res)
          if (Number(res) == 1) {
            alert("操作成功");

            self.$router.go(-1);
          } else {
            alert("操作失败");
          }
        }
      });
    },
    openRepulse() {
      /*弹出弹窗*/
      $("#repulse").modal("show");
    },
    goRepulse() {
      let self=this
      // 先验证一下
      if(this.repulseContent.trim()==""){
        alert("请输入拒绝原因")
        return
      }

      let result=confirm("确定拒绝该订单？")
      if(!result){
        return
      }
      //取出oid
      let oid = this.oid;
      let pass = 1;
      let message = this.repulseContent;
      let postData = {
        oid: oid,
        pass: pass,
        message: message
      };
      $("#realRepulseBtn").addClass("eventsDisabled")
      $.ajax({
        type: "POST",
        url: "/order/approveOrder",
        data: postData,
        success: function(res) {
          $("#realRepulseBtn").removeClass("eventsDisabled")
          //console.log(res)
          if (Number(res) == 1) {
            alert("操作成功");
            $("#repulse").modal("hide");

            self.$router.go(-1);
          } else {
            alert("操作失败");
          }
        }
      });
    },
    leftButton() {
      let right = this.right;
      switch (right) {
        case 1:
          this.goComment();
          break;
        case 2:
          //通过按钮
          this.passCheck();
          break;
        case 3:
          break;
        case 4:
          // alert("该用户没有权限")
          this.goComment();
          break;
        case 5:
          //管理员页面？
          break;
        default:
          break;
      }
    },
    rightButton() {
      let right = this.right;
      switch (right) {
        case 1:
          this.goCancleTan(); //取消按钮
          break;
        case 2:
          //拒绝按钮
          this.repulse();
          break;
        case 3:
          break;
        case 4:
          // alert("该用户没有权限")
          this.goCancleTan(); //取消按钮
          break;
        case 5:
          //管理员页面？
          break;
        default:
          break;
      }
    },
    routerGoback(){
      //返回上一个路由
      this.$router.go(-1)
    },
    //去指派人员页面
    goAssignSer(){
      let self=this
      if(this.serPerArr.length==0){
        this.getSerPerArr(function(){
          self.showSerPage=true
        })
      }else{
        this.showSerPage=true
      }
    },
    //获取服务人员名单
    getSerPerArr(callback){
      let self = this;
      Global.openLoading()
      this.axios
        .get(Global.host + "/servicepeo/selectServicepeoByOther")
        .then(function(res) {
          Global.closeLoading()
          console.log(res)
          let arr=res.data.staffList
          if(arr.length==0){
            alert("当前没有服务人员")
            return
          }else{
            self.serPerArr=arr
            if(callback){
              callback()
            }
          }
        })
        .catch(function(res){
          Global.closeLoading()
        });
    },
    //关闭指派服务人员页面 并删除已选择的服务人员
    closeSerPerPage(){
      this.selectedSerPer=[]
      this.showSerPage=false
    },
    //指派服务人员-确认
    confirmSerPer(){
      this.showSerPage=false
    },
    //最后提交服务人员
    submitAssignSer(){
      let self = this
      //验证一下
      if(this.selectedSerPer.length==0){
        alert("您当前未选择服务人员")
        return
      }

      let result=confirm("确认指派服务人员？")
      if(result){
        let idArr=this.selectedSerPerReal.map(function(obj){
          return obj.id
        })
        let postData = {
					ocid: Number(this.ocid),
					id: idArr,
				}
        console.log(postData)
        Global.openLoading()
        $.post(Global.host + "/servicepeo/insertServiceOrder",postData,function(res){
          Global.closeLoading()
          console.log(res)
          if(res&&Number(res)==1){
            alert("指派服务人员成功")
            self.$router.go(-1)
          }
        })
      }
    },
  }, //methods end
};
</script>

<style scoped>
@import "../assets/css/bootstrap.min.css";
@import "../assets/css/reset.css";
@import "../assets/css/mindex.css";
@import "../assets/css/mdetail.css";

.noDataTip{
  line-height: 50px;
  text-align: center;
}
.whiteBg{
  background-color: #fff;
  color: #000;
}
.blueBg{
  background-color: #2ec5c4;
  color: #fff;
}

/* 指派服务人员页面 */
.assignSer-page{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f1f5f6;
  z-index: 7;
}
.serPerWrap{
  display: flex;
  flex-wrap: wrap;
}
.serPerItem{
  flex: 0 0 calc(33.3333% - 10px);
  display: flex;
  align-items: center;
  line-height: 30px;
  background-color: #fff;
  margin: 5px;
  box-shadow: 0 0 2px 0 rgba(214, 214, 214, 0.50);
  font-weight: normal;
}
.serPerItem>input{
  margin:0 5px;
}
</style>
