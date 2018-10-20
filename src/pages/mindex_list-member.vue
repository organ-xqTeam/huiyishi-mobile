<template>
  <div class="warp_main">
    <ul class="mlist_tab">
      <li class="mlist_tab_act" id="waitingOrder" v-on:click="loadClick">待审核</li>
      <li id="passOrder" v-on:click="loadClick">已通过</li>
      <li id="repulshOrder" v-on:click="loadClick">未通过</li>
      <li id="complateOrder" v-on:click="loadClick">已完成</li>
    </ul>
    <!-- 主要列表 -->
    <div class="mindex_list">
      <template v-cloak v-if="orderList.length>0">
        <a v-for="(item,index) in orderList" :key="index" href="javascript:void(0)" @click="targetContent(item)" class="mindex_item">
          <div class="mindex_item_name">{{item.rname}}</div>
          <div class="mindex_item_info clearfix" style="margin-bottom: 8px;">{{beginTime[index]}}-{{endTime[index]}}</div>
          <div class="mindex_item_info clearfix">{{item.ocreservename}}
            <span class="mindex_item_fr fr" style="color:#989898;" v-if="Number(item.orderstate)==0">已取消</span>
            <span class="mindex_item_fr fr" v-else>{{orderState}}</span>
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
      <router-link class="mindex_tab mycolor" to="/mindexlist/member" style="font-size: 1em;"><i class="iconfont icon-liebiao"></i><br>我的预定</router-link>

      <router-link class="mindex_tab" to="/mindexlist/approve" style="font-size: 1em;" v-cloak v-show="Number(rightState)==2"><i class="iconfont icon-liebiao"></i><br>审批管理</router-link>
      <router-link class="mindex_tab" to="/mindexlist/service" style="font-size: 1em;" v-cloak v-show="Number(rightState)==3"><i class="iconfont icon-liebiao"></i><br>服务管理</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightState:1, //默认普通用户 2主管部门 3服务部门

      //总容器
      orderList: [],
      /*时间容器*/
      beginTime: [],
      endTime: [],
      /*同一状态*/
      orderState: "",
    };
  },
  mounted() {
    this.getUserInfo()
    this.waitingOrderMet("opassstate", 3, "未审核");
  },
  methods: {
    //获取用户信息 根据权限显示button
    getUserInfo(){
      if(localStorage.getItem("mUserInfo")&&localStorage.getItem("mUserInfo")!==null&&localStorage.getItem("mUserInfo")!=="null"){
        let mUserInfo=JSON.parse(localStorage.getItem("mUserInfo"))
        console.log(mUserInfo)
        let rightState=Number(mUserInfo.state)
        this.rightState=rightState
      }
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
          this.waitingOrderMet("opassstate", 3, "未审核");
          break;

        case "passOrder":
          this.waitingOrderMet("opassstate", 2, "已通过");
          break;

        case "repulshOrder":
          this.waitingOrderMet("opassstate", 1, "未通过");
          break;

        case "complateOrder":
          this.waitingOrderMet("otakeorder", 3, "已完成");
          break;
      }
    },
    waitingOrderMet(stateTypeForm, stateValueForm, stateText) {
      let self = this;
      let postData = {
        stateType: stateTypeForm,
        stateValue: stateValueForm
      };
      Global.openLoading()
      this.axios
        .post(
          Global.host + "/order/selectOrderListByMidAndState",
          this.qs.stringify(postData)
        )
        .then(function(res) {
          Global.closeLoading()
          console.log(res)
          self.orderList = res.data;
          let tempArry = res.data;
          for (let index = 0; index < tempArry.length; index++) {
            console.log(tempArry[index])
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
      item.fromPage="member" //保存从哪个页面去的base
      this.$router.push({
        path: "/memberlist/morderContent/base",
        query: {
          ocid: item.ocid,
          item:item,
        }
      });
    }
  }
};
</script>

<style scoped>
@import "../assets/css/bootstrap.min.css";
@import "../assets/css/reset.css";
@import "../assets/css/mindex.css";
@import "../assets/css/mlist.css";

.noDataTip{
  line-height: 50px;
  text-align: center;
}
</style>

