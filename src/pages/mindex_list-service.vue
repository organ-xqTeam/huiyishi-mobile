<template>
  <div class="warp_main">
    <ul class="mlist_tab" style="padding-right:40px;">
      <li class="mlist_tab_act" id="waitingOrder" v-on:click="loadClick">待接单</li>
      <li id="passOrder" v-on:click="loadClick">服务中</li>
      <li id="repulshOrder" v-on:click="loadClick">已完成</li>
    </ul>
    <div class="mindex_title ac" style="margin: 5px;"><span class="iconfont icon-shaixuan" id="openModal" @click="openModal"></span></div>
    <!-- 筛选弹窗 -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="mindex_jump modal-dialog">
        <div class="modal-header">
          <h4 class="mindex_title modal-title" id="myModalLabel">筛选区域</h4>
        </div>
        <div class="modal-body">
          <div class="mindex_jump_title">会议室</div>
          <input class="mindex_jump_input" type="type" name="" v-model="modalName">
          <div class="mindex_jump_title">起始日期</div>
          <input class="mindex_jump_input form-control" id='datetime1' type="type" name="" readonly="readonly">
          <div class="mindex_jump_title">终止日期</div>
          <input class="mindex_jump_input form-control" id='datetime2' type="type" name="" readonly="readonly">
          <!-- <div class="mindex_jump_title">服务人员</div>
          <input class="mindex_jump_input" type="type" name=""> -->
        </div>
        <div class="button_btn">
          <button type="button" class="submit blueBg" @click="confirmBtn">确定</button>
          <button type="button" class="cancle whiteBg" data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
    <!-- 筛选弹窗 end -->

    <!-- 主要列表 -->
    <div class="mindex_list">
      <template v-cloak v-if="orderList.length>0">
        <a v-for="(item,index) in orderList" :key="index" href="javascript:void(0)" @click="targetContent(item)" class="mindex_item">
          <div class="mindex_item_name">{{item.rname}}</div>
          <div class="mindex_item_info clearfix" style="margin:4px 0;">{{beginTime[index]}}-{{endTime[index]}}</div>
          <div class="mindex_item_info clearfix">{{item.username}}
            <span class="mindex_item_fr fr" style="color:#989898;" v-cloak v-if="Number(item.orderstate)==0">已取消</span>
            <span class="mindex_item_fr fr" v-cloak v-else>{{orderState}}</span>
          </div>
        </a>
      </template>
      <div class="noDataTip" v-cloak v-else>
        暂无数据
      </div>
      <div class="kong"></div>
    </div>
    <div class="kong"></div>

    <!-- 下方按钮 -->
    <div class="button_btn">
      <router-link class="mindex_tab" to="/mindex" style="font-size: 1em;"><i class="iconfont icon-shouye"></i> <br>首页</router-link>
      <router-link class="mindex_tab" to="/mindexlist/member" style="font-size: 1em;"><i class="iconfont icon-liebiao"></i><br>我的预定</router-link>
      <router-link class="mindex_tab mycolor" to="/mindexlist/service" style="font-size: 1em;"><i class="iconfont icon-liebiao"></i><br>服务管理</router-link>
    </div>
  </div>
</template>

<script>
import "../assets/js/bootstrap-datetimepicker.min.js";
import "../assets/js/bootstrap-datetimepicker.zh-CN.js";

export default {
  data() {
    return {
      //总容器
      orderList: [],
      /*时间容器*/
      beginTime: [],
      endTime: [],
      /*同一状态*/
      orderState: "",

      //筛选条件
      modalName:"",
    };
  },
  mounted() {
    this.waitingOrderMet(1, "待接单");
    this.initSome()
  },
  methods: {
    initSome(){
      $("#datetime1").datetimepicker({
        format: "yyyy-mm-dd ",
        autoclose: true,
        todayBtn: true,
        todayHighlight: false,
        showMeridian: true,
        pickerPosition: "bottom-right",
        language: "zh-CN", //中文，需要引用zh-CN.js包
        startView: 2, //月视图
        minView: 2 //日期时间选择器所能够提供的最精确的时间选择视图
      }).on('click',function(e){
          $("#datetime2").datetimepicker("setStartDate", $("#datetime1").val());
      });
      $("#datetime2").datetimepicker({
        format: "yyyy-mm-dd ",
        autoclose: true,
        todayBtn: true,
        todayHighlight: false,
        showMeridian: true,
        pickerPosition: "bottom-right",
        language: "zh-CN", //中文，需要引用zh-CN.js包
        startView: 2, //月视图
        minView: 2 //日期时间选择器所能够提供的最精确的时间选择视图
      }).on('click',function(e){
          $("#datetime1").datetimepicker("setEndDate", $("#datetime2").val());
      });
    },
    loadClick: function(event) {
      let id = event.target.id;
      //样式
      $("passOrder").addClass("mlist_tab_act");
      $("#" + id)
        .addClass("mlist_tab_act")
        .siblings()
        .removeClass("mlist_tab_act");
      switch (id) {
        case "waitingOrder":
          this.waitingOrderMet(1, "待接单");
          break;
        case "passOrder":
          this.waitingOrderMet(2, "服务中");
          break;
        case "repulshOrder":
          this.waitingOrderMet(3, "已完成");
          break;
      }
    },
    waitingOrderMet(stateValueForm, stateText,searchName,searchBgtime,searchEdtime) {
      let self = this;
      let postData = {
        stateValue: Number(stateValueForm),
        serid: null, //假设
        rid: null,
        beginOtime: searchBgtime?searchBgtime:null,
        endOtime: searchEdtime?searchEdtime:null,
        rname:searchName?searchName:null
      };
      console.log(postData)
      Global.openLoading()
      this.axios
        .post(
          Global.host + "/order/selectServiceListForMobile",
          this.qs.stringify(postData)
        )
        .then(function(res) {
          Global.closeLoading()
          console.log(res)
          self.orderList = res.data;
          console.log(self.orderList)
          let tempArry = res.data;
          for (let index = 0; index < tempArry.length; index++) {
            let begintime = tempArry[index].ocbegintime; //开始时间
            let endtime = tempArry[index].ocendtime; //结束时间
            let begintimeString = Global.dateToFormat(new Date(begintime));
            let endtimeString = Global.dateToFormat(new Date(endtime));
            let realEndtimeString = endtimeString.substr(
              11,
              endtimeString.length
            );
            self.beginTime.push(begintimeString);
            self.endTime.push(realEndtimeString);
            self.orderState = stateText;
          }
        })
        .catch(function(res){
          Global.closeLoading()
          alert("没有您请求的数据")
        });
    },
    targetContent(item) {
      item.fromPage="service"
      this.$router.push({
        path: "/memberlist/morderContent/base",
        query: {
          ocid: item.ocid,
          item:item
        }
      });
    },
    /*筛选弹窗*/
    openModal() {
      //reset 模态框input
      this.modalName=""
      $("#datetime1").val("")
      $("#datetime2").val("")
      //reset 模态框input end

      $("#myModal").modal("show");
    },
    //点击筛选弹窗确认
    confirmBtn(){
      let id=$(".mlist_tab_act").attr("id")
      console.log(id)
      //筛选条件
      let searchName=null
      let searchBgtime=null
      let searchEdtime=null

      if(this.modalName.trim()!==""){
        searchName=this.modalName.trim()
      }
      if($("#datetime1").val().trim()!==""){
        searchBgtime=$("#datetime1").val().trim()
      }
      if($("#datetime2").val().trim()!==""){
        searchEdtime=$("#datetime2").val().trim()
      }

      switch (id) {
        case "waitingOrder":
          this.waitingOrderMet(1, "待接单" ,searchName,searchBgtime,searchEdtime);
          break;
        case "passOrder":
          this.waitingOrderMet(2, "服务中" ,searchName,searchBgtime,searchEdtime);
          break;
        case "repulshOrder":
          this.waitingOrderMet(3, "已完成" ,searchName,searchBgtime,searchEdtime);
          break;
      }

      $("#myModal").modal("hide");
    }
  }, //methods end
};
</script>

<style scoped>
@import "../assets/css/bootstrap.min.css";
@import "../assets/css/bootstrap-datetimepicker.min.css";
@import "../assets/css/reset.css";
@import "../assets/css/mindex.css";
@import "../assets/css/mlist.css";

.noDataTip{
  line-height: 50px;
  text-align: center;
}
#openModal{
  font-size: 1.4em;
  position: absolute;
  right: 8px;
  top: 8px;
}

.whiteBg{
  background-color: #fff;
  color: #000;
}
.blueBg{
  background-color: #2ec5c4;
  color: #fff;
}

</style>
