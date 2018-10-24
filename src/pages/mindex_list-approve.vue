<template>
  <div class="warp_main">
    <ul class="mlist_tab">
      <li class="mlist_tab_act" id="waitingOrder" v-on:click="loadClick">待审核</li>
      <li id="passOrder" v-on:click="loadClick">已通过</li>
      <li id="repulshOrder" v-on:click="loadClick">未通过</li>
    </ul>
    <!-- 筛选 -->
    <!-- <span class="iconfont icon-shaixuan" id="openModal" @click.stop="openModal"></span> -->
    <!-- 筛选 end -->

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
    <!-- 下方按钮 -->
    <div class="kong"></div>
    <div class="button_btn">
      <router-link class="mindex_tab" to="/mindex" style="font-size: 1em;"><i class="iconfont icon-shouye"></i> <br>首页</router-link>
      <router-link class="mindex_tab" to="/mindexlist/member" style="font-size: 1em;"><i class="iconfont icon-liebiao"></i><br>我的预定</router-link>
      <router-link class="mindex_tab mycolor" to="/mindexlist/approve" style="font-size: 1em;"><i class="iconfont icon-liebiao"></i><br>审批管理</router-link>
    </div>

    <!-- 筛选弹窗 -->
    <!-- <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="mindex_jump modal-dialog">
        <div class="modal-header">
          <h4 class="mindex_title modal-title" id="myModalLabel">筛选区域</h4>
        </div>
        <div class="modal-body">
          <div class="mindex_jump_title">会议室</div>
          <input class="mindex_jump_input" type="type" name="" v-model="filterName">
          <div class="mindex_jump_title">日期</div>
          <input class="mindex_jump_input form-control" id='datetime' type="type" name="">
        </div>
        <div class="button_btn">
          <button type="button" class="submit">确定</button>
          <button type="button" class="cancle" data-dismiss="modal">取消</button>
        </div>
      </div>
    </div> -->
    <!-- 筛选弹窗 end -->
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

      // 筛选弹窗
      // filterName:"",

    };
  },
  mounted() {
    this.waitingOrderMet(3, "未审核");
  },
  methods: {
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
          this.waitingOrderMet(3, "未审核");
          break;

        case "passOrder":
          this.waitingOrderMet(2, "已通过");
          break;

        case "repulshOrder":
          this.waitingOrderMet(1, "未通过");
          break;
      }
    },
    waitingOrderMet(stateValueForm, stateText) {
      let self = this;
      let postData = {
        stateValue: Number(stateValueForm)
      };
      Global.openLoading()
      this.axios
        .post(
          Global.host + "/order/selectApproveListByState",
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
        });
    },
    targetContent(item) {
      item.fromPage="approve"
      this.$router.push({
        path: "/memberlist/morderContent/base",
        query: {
          ocid: item.ocid,
          item,item
        }
      });
    },
    // //打开筛选弹窗
    // openModal(){
    //   $("#myModal").modal("show")
    // }
  }, //methods end
};
</script>

<style scoped>
@import "../assets/css/bootstrap.min.css";
/* @import "../assets/css/bootstrap-datetimepicker.min.css"; */
@import "../assets/css/reset.css";
@import "../assets/css/mindex.css";
@import "../assets/css/mlist.css";

.noDataTip{
  line-height: 50px;
  text-align: center;
}
#openModal{
  right: 7px;
  top: 9px;
  font-size: 1.8em;
}
</style>

