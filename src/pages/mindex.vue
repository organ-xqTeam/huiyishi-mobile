<template>
  <div class="mindex-page">
    <div class="mindex_top">
      <div class="mindex_title ac" style="margin: 5px;">{{year}}年{{month}}月 <span class="iconfont icon-shaixuan" id="openModal" @click="openModal"></span></div>
      <!-- 上方日历筛选 -->
      <ul class="mindex_date_ul">
        <!-- mindex_date_act -->
        <li v-for="(item,index) in dateArr" :key="index" :class="{mindex_date_act:index==selectedDateIndex}" @click="selectDate(index)">
          <div class="mindex_date_week">{{item.weekDay.substr(2,1)}}</div>
          <div class="mindex_date_rili">{{item.dateStr.substr(8,2)}}</div>
        </li>
      </ul>
    </div>
    <!-- 主要列表 -->
    <div class="mindex_list">
      <router-link class="mindex_item" v-for="(item,index) in showArr" :key="index" :to="{path:'/mindex/mindexBook', query:{item:item,year:year,month:month,date:dateArr[selectedDateIndex]}}">
        <div class="mindex_item_l">
          <div class="mindex_item_img">
            <img v-cloak v-if="item.rpic&&item.rpic!==''" :src="Global.host+item.rpic.split(',')[0]">
            <p v-cloak v-else>暂无图片</p>
          </div>
          <div>
            <div class="mindex_item_name">{{item.rname}}</div>
            <div class="mindex_item_type" v-cloak v-if="item.rtname&&item.rtname!==''">{{item.rtname}}</div>
            <div class="mindex_item_info" v-cloak v-if="item.sum&&Number(item.sum)!==0">有 <span>{{item.sum}}</span> 个预定信息</div>
            <div class="mindex_item_info" v-cloak v-else>没有预定信息</div>
          </div>
        </div>
        <div class="mindex_item_r">
          <span class="iconfont icon-you"></span>
        </div>
      </router-link>
      <div class="kong"></div>
    </div>
    <!-- 下方按钮 -->
    <div class="button_btn">
      <router-link class="mindex_tab mycolor" to="/mindex" style="font-size: 1em;"><i class="iconfont icon-shouye"></i> <br>首页</router-link>
      <router-link class="mindex_tab" to="/mindexlist/member" style="font-size: 1em;"><i class="iconfont icon-liebiao"></i><br>我的预定</router-link>

      <router-link class="mindex_tab" to="/mindexlist/approve" style="font-size: 1em;" v-cloak v-show="Number(rightState)==2"><i class="iconfont icon-liebiao"></i><br>审批管理</router-link>
      <router-link class="mindex_tab" to="/mindexlist/service" style="font-size: 1em;" v-cloak v-show="Number(rightState)==3"><i class="iconfont icon-liebiao"></i><br>服务管理</router-link>
    </div>

    <!-- 筛选弹窗 -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="mindex_jump modal-dialog">
        <div class="modal-header">
          <h4 class="mindex_title modal-title" id="myModalLabel">筛选区域</h4>
        </div>
        <div class="modal-body">
          <div class="mindex_jump_title">会议室</div>
          <input class="mindex_jump_input" type="type" name="" v-model="filterName">
          <div class="mindex_jump_title">会议室类型</div>
          <select class="mindex_jump_input form-control" v-model="filterType" style="padding: 6px 8px;">
            <option value="">不限</option>
            <template v-cloak v-if="rtypeArr.length>0">
              <option v-for="(item,index) in rtypeArr" :key="index" :value="item.rtname" :rtid="item.rtid">{{item.rtname}}</option>
            </template>
          </select>
          <div class="mindex_jump_title">日期</div>
          <input class="mindex_jump_input form-control" id='datetime' type="type" name="">
        </div>
        <div class="button_btn">
          <button type="button" class="submit" @click="filterBtn">确定</button>
          <button type="button" class="cancle" data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
    <!-- 筛选弹窗 end -->

  </div>
</template>

<script>
import "../assets/js/bootstrap-datetimepicker.min";
import "../assets/js/bootstrap-datetimepicker.zh-CN";

export default {
  name: "mindex",
  data() {
    return {
      Global: Global,

      rightState:1, //默认普通用户 2主管部门 3服务部门

      selectedDateIndex: 0, //当前选择的日期index
      //表头
      year: "",
      month: "",
      dateArr: [],
      //数据
      showArr: [],
      //筛选
      filterName: "",
      filterDate: "", //用不到
      filterType:"",

      rtypeArr:[], //会议室类型arr
    };
  },
  watch: {
    selectedDateIndex() {
      this.getData();
    }
  },
  mounted() {
    this.getUserInfo()
    this.initSome();
    //生成表头
    this.generateDate(new Date());

    this.getData();
  },
  methods: {
    initSome() {
      $("#datetime").datetimepicker({
        format: "yyyy-mm-dd ",
        autoclose: true,
        todayBtn: true,
        todayHighlight: true,
        showMeridian: true,
        pickerPosition: "bottom-right",
        language: "zh-CN", //中文，需要引用zh-CN.js包
        startView: 2, //月视图
        minView: 2 //日期时间选择器所能够提供的最精确的时间选择视图
      });
    },
    //获取用户信息 根据权限显示button
    getUserInfo(){
      if(localStorage.getItem("mUserInfo")&&localStorage.getItem("mUserInfo")!==null&&localStorage.getItem("mUserInfo")!=="null"){
        let mUserInfo=JSON.parse(localStorage.getItem("mUserInfo"))
        console.log(mUserInfo)
        let rightState=Number(mUserInfo.state)
        this.rightState=rightState
        // this.rightState=2 //测试主管部门
        // this.rightState=3 //测试服务部门
      }
    },
    //获取会议室类型
    getRtypeSelect(callback) {
      let self=this
      this.axios
        .get(Global.host+"/room/selectRoomTypeList")
        .then(function(res) {
          console.log(res)
          if(res.data&&res.data.length>0){
            self.rtypeArr=res.data
          }
          if(callback){
            callback()
          }
        })
        .catch(function(error) {
          console.log(error);
          if(callback){
            callback()
          }
        });
    },
    //获取日期 预定情况
    getData(callback) {
      let self = this;
      let date = this.dateArr[this.selectedDateIndex].dateStr;
      console.log(date);
      Global.openLoading()
      this.axios
        .post(
          Global.host+"/order/selectRoomnameAndNum",
          this.qs.stringify({
            date: date
          })
        )
        .then(function(response) {
          Global.closeLoading()
          console.log(response);
          self.showArr = response.data;

          if (callback) {
            callback();
          }
        })
        .catch(function(error) {
          Global.closeLoading()
          console.log(error);
        });
    },
    //选择上面的日期
    selectDate(index) {
      this.selectedDateIndex = index;
      this.year = this.dateArr[index].dateStr.substr(0, 4);
      this.month = this.dateArr[index].dateStr.substr(5, 2);
    },
    //生成日期表头
    generateDate(date) {
      // let date=new Date()
      let stamp = date.getTime();
      let dateStr = Global.dateToFormat(date);
      console.log(dateStr);
      //设置年
      this.year = dateStr.substr(0, 4);
      //设置月
      this.month = dateStr.substr(5, 2);
      //设置表头
      let stampArr = [];
      for (let i = 0; i < 7; i++) {
        stampArr[i] = stamp + i * 86400000;
      }
      // console.log(stampArr)
      this.dateArr = stampArr.map(function(stamp) {
        let date = new Date(stamp);
        let weekDay = Global.getWeekDay(date);
        let dateStr = Global.dateToFormat(date);
        let obj = {
          weekDay: weekDay, //"星期五2018-09-28"
          dateStr: dateStr.substr(0, 10)
        };
        return obj;
      });
      console.log(this.dateArr);
    },
    filterBtn() {
      let self = this;
      let name = this.filterName.trim(); //会议室名称
      let date = $("#datetime").val(); //日期
      let type=this.filterType //会议室类型 rtid

      if(date==""){ //没填日期
        if(name==""&&type==""){ //没填名称，没填类型
          this.generateDate(new Date());

          this.getData();
        }else if(name==""){ //没填名称，填类型
          //筛选会议室
          let arr = self.showArr.filter(function(obj) {
            return obj.rtname == type;
          });
          if (arr.length == 0) {
            alert("没有您筛选的会议室");
          } else {
            self.showArr = arr;
          }
        }else if(type==""){ //填名称，没填类型
          //筛选会议室
          let arr = self.showArr.filter(function(obj) {
            return obj.rname == name;
          });
          if (arr.length == 0) {
            alert("没有您筛选的会议室");
          } else {
            self.showArr = arr;
          }
        }
        $("#myModal").modal("hide");
      }else{ //填日期了
        //生成表头
        this.generateDate(new Date(date));

        this.getData(function() {
          //筛选会议室
          let arr = self.showArr.filter(function(obj) {
            if(name==""&&type==""){ //没填名称，没填类型
              return true
            }else if(name==""){ //没填名称 填类型了
              return obj.rtname==type
            }else if(type==""){ //填名称了 没填类型
              return obj.rname==name
            }
          });
          console.log(arr);
          if (arr.length == 0) {
            alert("没有您筛选的会议室");
          } else {
            self.showArr = arr;
            $("#myModal").modal("hide");
          }
        });
      }
    },
    //打开筛选弹窗
    openModal() {
      if(this.rtypeArr.length==0){
        this.getRtypeSelect(function(){
          $("#myModal").modal("show");
        })
      }else{
        $("#myModal").modal("show");
      }
    }
  } //methods end
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
@import "../assets/css/bootstrap.min.css";
@import "../assets/css/bootstrap-datetimepicker.min.css";
@import "../assets/css/reset.css";
@import "../assets/css/mindex.css";

/* 修正模态框buttion样式 */
.button_btn button.submit{
  background: #2EC5C4;
  color: #fff;
}
.button_btn button.cancle{
  background: #fff;
  color: #000;
}
</style>
