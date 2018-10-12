<template>
  <div class="warp_main">
    <ul class="mlist_tab">
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
          <input class="mindex_jump_input" type="type" name="">
          <div class="mindex_jump_title">日期</div>
          <input class="mindex_jump_input form-control" id='datetime' type="type" name="">
        </div>
        <div class="button_btn">
          <button type="button" class="submit">确定</button>
          <button type="button" class="cancle" data-dismiss="modal">取消</button>
        </div>
      </div><!-- /.modal -->
    </div>

    <!-- 主要列表 -->
    <div class="mindex_list">
      <a v-for="(item,index) in orderList" :key="index" href="javascript:void(0)" @click="targetContent(item.ocid)" class="mindex_item">
        <div class="mindex_item_name">{{item.rname}}</div>
        <div class="mindex_item_info" style="margin-bottom: 8px;">{{beginTime[index]}}-{{endTime[index]}}</div>
        <div class="mindex_item_info">{{item.username}} <span class="mindex_item_fr fr">{{orderState}}</span></div>
      </a>
      <div class="kong"></div>
    </div>
    <!-- 下方按钮 -->
    <div class="kong"></div>
    <div class="button_btn">
      <a class="mindex_tab" href="mindex.html" style="font-size: 1em;"><i class="iconfont icon-shouye"></i> <br>首页</a>
      <a class="mindex_tab mycolor" href="mindex_list.html" style="font-size: 1em;"><i class="iconfont icon-liebiao"></i><br>我的预定</a>
      <a class="mindex_tab mycolor" href="mindex_list.html" style="font-size: 1em;"><i class="iconfont icon-liebiao"></i><br>服务管理</a>
    </div>
  </div>
</template>
<style scoped>
  @import "../assets/css/mindex.css";
  @import "../assets/css/mlist.css";
  @import "../assets/css/iconfont.css";
  @import "../assets/css/reset.css";
  @import "../assets/css/bootstrap-datetimepicker.min.css";
  @import "../assets/css/bootstrap.min.css";
</style>
<script>
  import "../assets/js/jquery.min.js";
  import "../assets/js/Global.js";
  import "../assets/js/bootstrap.min.js";
  import "../assets/js/bootstrap-datetimepicker.min.js";
  import "../assets/js/bootstrap-datetimepicker.zh-CN.js";
  import "../assets/js/moment-with-locales.js";
  export default {
    data(){
      return{
        //总容器
        orderList:[],
        /*时间容器*/
        beginTime:[],
        endTime:[],
        /*同一状态*/
        orderState:'',
      }
    },mounted() {
      this.waitingOrderMet(3,'待接单')
    },
    methods:{
      loadClick:function(event){
          let id = event.target.id
          //样式
          $("passOrder").addClass('mlist_tab_act');
          $("#"+id).addClass('mlist_tab_act').siblings().removeClass('mlist_tab_act');
          switch(id){
            case 'waitingOrder':
            this.waitingOrderMet(3,'待接单')
            break

            case 'passOrder':
            this.waitingOrderMet(2,'服务中')
            break

            case 'repulshOrder':
            this.waitingOrderMet(1,'已完成')
            break
          }
      },
      waitingOrderMet(stateValueForm,stateText){
        //console.log(stateValueForm)
        let self = this
        let postData = {
            stateValue : Number(stateValueForm),
            serid : 11,//假设
            rid : 5,
            beginOtime : '2018-09-13',
            endOtime : '2018-10-18'
        }
        this.axios.post(Global.host+'/order/selectServiceListForMobile',this.qs.stringify(postData))
        .then(function(res){
            self.orderList = res.data
            let tempArry = res.data
            for (let index = 0; index < tempArry.length; index++) {
                let begintime = tempArry[index].ocbegintime//开始时间
                let endtime = tempArry[index].ocendtime//结束时间
                let begintimeString = Global.dateToFormat(new Date(begintime))
                let endtimeString = Global.dateToFormat(new Date(endtime))
                let realEndtimeString = endtimeString.substr(11,endtimeString.length)
                self.beginTime.push(begintimeString)
                self.endTime.push(realEndtimeString)
                self.orderState = stateText
            }
        })
      },
      targetContent(ocid){
        this.$router.push({
          path:'/morderContent/base',
          query:{
            ocid:ocid
          }
        })
      },
      /*筛选弹窗*/
      openModal(){
        $("#myModal").modal("show")
      }
    }
  }
</script>

