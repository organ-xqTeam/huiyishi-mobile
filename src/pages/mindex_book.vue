<template>
  <div class="mindexBook-page">
    <!-- 顶部时间选择和筛选弹窗 -->
    <div class="mindex_top">
      <div class="mindex_title ac" style="margin: 5px;">{{year}}年{{month}}月</div>
      <!-- 上方日历筛选 -->
      <ul class="mindex_date_ul">
        <!-- mindex_date_act -->
        <li v-for="(item,index) in dateArr" :key="index" :class="{mindex_date_act:index==selectedDateIndex}" @click="selectDate(index)">
          <div class="mindex_date_week">{{item.weekDay.substr(2,1)}}</div>
          <div class="mindex_date_rili">{{item.dateStr.substr(8,2)}}</div>
        </li>
      </ul>
    </div>
    <!-- 选择时间段 -->
    <div class="book" id="book_list">
      <div class="book_title">{{rinfo.rname}}<span class="book_check fr" @click="openLookInfo">查看</span></div>
      <!-- 点击查看弹窗 -->
      <div class="modal fade" id="myCheck" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="check_room modal-dialog">
          <div class="modal-body">
            <div class="check_room_img">
              <!-- <img src="../img/s.png"> -->
            </div>
            <div class="mindex_jump_title">会议室:<span>{{modalInfo.rname}}</span></div>
            <div class="mindex_jump_title">介绍:<span>{{modalInfo.rintroduce}}</span></div>
          </div>
          <div class="kong" style="height: 70px;"></div>
          <div class="btn_box button_btn">
            <button class="submit toDetail add_info cancle" @click="closeModal">确定</button>
          </div>
        </div><!-- /.modal -->
      </div>
      <!-- 时间选择 -->
      <ul class="book_time ac">
        <li v-for="(item,index) in items" :key="index" :class="{mSelected:selectedTimeIndex.indexOf(index)>-1,alreadySelected:item.isAlready}" @click="selectTime(item,index)">
          {{ item.message }}
        </li>
      </ul>
    </div>
    <!--提交按钮-->
    <div class="kong" style="height: 70px;"></div>
    <div class="button_btn">
      <button class="add_info cancle toDetail" @click="gotoDetail">预定会议室</button>
    </div>
  </div>
</template>

<script>
// import '../assets/js/moment-with-locales.js'

export default {
  name: "mindexBook",
  data() {
    return {
      rinfo:{}, //这个会议室的信息

      selectedDate:{}, //上一个页面传来的选择的日期，后面好像没用了

      selectedDateIndex:0, //当前选择的日期index
      //表头
      year:"",
      month:"",
      dateArr:[], //日期数组

      items:[
					{ message: '07:00~07:30',isAlready:false },
					{ message: '07:30~08:00',isAlready:false },
          { message: '08:00~08:30',isAlready:false },
          { message: '08:30~09:00',isAlready:false },
					{ message: '09:00~09:30',isAlready:false },
					{ message: '09:30~10:00',isAlready:false },
					{ message: '10:00~10:30',isAlready:false },
					{ message: '10:30~11:00',isAlready:false },
					{ message: '11:00~11:30',isAlready:false },
					{ message: '11:30~12:00',isAlready:false },
					{ message: '12:00~12:30',isAlready:false },
					{ message: '12:30~13:00',isAlready:false },
					{ message: '13:00~13:30',isAlready:false },
					{ message: '13:30~14:00',isAlready:false },
					{ message: '14:00~14:30',isAlready:false },
					{ message: '14:30~15:00',isAlready:false },
					{ message: '15:00~15:30',isAlready:false },
					{ message: '15:30~16:00',isAlready:false },
					{ message: '16:00~16:30',isAlready:false },
					{ message: '16:30~17:00',isAlready:false },
					{ message: '17:00~17:30',isAlready:false },
					{ message: '17:30~18:00',isAlready:false },
					{ message: '18:00~18:30',isAlready:false },
					{ message: '18:30~19:00',isAlready:false },
					{ message: '19:00~19:30',isAlready:false },
					{ message: '19:30~20:00',isAlready:false },
					{ message: '20:00~20:30',isAlready:false },
					{ message: '20:30~21:00',isAlready:false }
        ],
        selectedTimeIndex:[],

        //会议室介绍信息
        modalInfo:{}
    }
  },
  watch:{
    selectedDateIndex(){ //日期切换的时候查数据
      this.getBookTime()
      this.selectedTimeIndex=[]
    },
  },
  mounted() {
    this.getParam()
    this.generateDate(new Date(this.selectedDate.dateStr))

    this.getBookTime()
  },
  methods:{
    //选择时间
    selectTime(item,index){
      if(item.isAlready){
        return
      }
      if(this.selectedTimeIndex.indexOf(index)==-1){
        this.selectedTimeIndex.push(index)
      }else{
        let idx=this.selectedTimeIndex.indexOf(index)
        this.selectedTimeIndex.splice(idx,1)
      }
      this.selectedTimeIndex.sort(function(a,b){
        return a-b
      })
      console.log(this.selectedTimeIndex)
    },
    //判断数组是否连续
    checkArrContinuous(){
      let arr=this.selectedTimeIndex
      var flag=true
      if(arr.length>0){
        arr.forEach(function(value,index){
          if(index>=1){ //从第二个开始判断
            flag=(value-arr[index-1]==1)
          }
        })
        if(!flag){
          alert("请选择连续的时间段")
        }
      }
      return flag
    },
    //去预定会议室填写页面
    gotoDetail(){
      let self=this
      if(!this.checkArrContinuous()){
        return
      }

      this.$router.push({
          path:"/mindex/mindexBook/mindexBasic",
          query:{
            data:self.$data
          }
      })
    },
    //获取传来的参数（这个会议室的信息）
    getParam(){
      console.log(this.$route.query)
      this.rinfo=this.$route.query.item
      this.year=this.$route.query.year
      this.month=this.$route.query.month
      this.selectedDate=this.$route.query.date
    },
    //查询这个会议室这一天的预定信息
    getBookTime(){
      let self=this
      console.log(this.rinfo)
      let postData={
        rid:this.rinfo.rid,
        dateAssign:this.dateArr[this.selectedDateIndex].dateStr
      }
      console.log(postData)
      Global.openLoading()
      this.axios.post(Global.host+'/user/showRoomByAssignDay',this.qs.stringify(postData))
      .then(function(res){
        Global.closeLoading()
        console.log(res)
        let arr=res.data
        console.log(arr)
        if(arr.length>0){
          //绘制
          //清空
          self.items.forEach(function(obj){
            obj.isAlready=false
          })
          //清空end
          arr.forEach(function(obj){
            let bgtime=Global.dateToFormat(new Date(obj.ocbegintime))
            let edtime=Global.dateToFormat(new Date(obj.ocendtime))
            let bgtimehour=bgtime.substr(bgtime.length-5,5)
            let edtimehour=edtime.substr(edtime.length-5,5)
            console.log(bgtimehour,edtimehour)
            self.drawOneTime(bgtimehour,edtimehour)
          })
        }
        // self.drawOneTime("10:00","11:30")
      })
      .catch(function(res){
        Global.closeLoading()
        console.log(res)
      })
    },
    //绘制一个预定信息
    drawOneTime(bgtime,edtime){
      console.log("绘制一个")
      let bgIndex
      let edIndex
      this.items.forEach(function(obj,index){
        //找到开始绘制的index
        if(obj.message.substr(0,5)==bgtime){
          bgIndex=index
        }
        //找到结束绘制的index
        if(obj.message.substr(obj.message.length-5,5)==edtime){
          edIndex=index
        }
      })
      console.log(bgIndex,edIndex)
      //给time数组添加isAlready属性
      for(let i=0;i<edIndex-bgIndex;i++){
        this.items[edIndex+i].isAlready=true
      }
      console.log(this.items)
    },
    //生成日期表头
    generateDate(date){
      // let date=new Date()
      let stamp=date.getTime()
      let dateStr=Global.dateToFormat(date)
      console.log(dateStr)
      //设置年
      this.year=dateStr.substr(0,4)
      //设置月
      this.month=dateStr.substr(5,2)
      //设置表头
      let stampArr=[]
      for(let i=0;i<7;i++){
        stampArr[i]=stamp+i*86400000
      }
      // console.log(stampArr)
      this.dateArr=stampArr.map(function(stamp){
        let date=new Date(stamp)
        let weekDay=Global.getWeekDay(date)
        let dateStr=Global.dateToFormat(date)
        let obj={
          weekDay:weekDay, //"星期五2018-09-28"
          dateStr:dateStr.substr(0,10)
        }
        return obj
      })
      console.log(this.dateArr)
    },
    selectDate(index){
      this.selectedDateIndex=index
      this.year=this.dateArr[index].dateStr.substr(0,4)
      this.month=this.dateArr[index].dateStr.substr(5,2)
    },
    //查看这个会议室的信息 介绍
    openLookInfo(){
      if(JSON.stringify(this.modalInfo)!=="{}"){
        $("#myCheck").modal("show")
        return
      }
      let self=this
      let postData={
        rid:Number(this.rinfo.rid)
      }
      console.log(postData)
      Global.openLoading()
      this.axios.post(Global.host+"/room/selectOneRoomByRid",this.qs.stringify(postData))
      .then(function(res){
        Global.closeLoading()
        console.log(res)
        self.modalInfo=res.data[0]
        $("#myCheck").modal("show")
      })
      .catch(function(res){
        Global.closeLoading()
        console.log(res)
      })
    },
    //关闭模态框
    closeModal(){
      $("#myCheck").modal("hide")
    }
  }, //methods end
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/bootstrap.min.css";
@import "../assets/css/reset.css";
@import "../assets/css/mindex.css";
@import "../assets/css/mindex_book.css";
.mSelected{
  background-color: #eaf9f9;
}
.alreadySelected{
  background-color: #d8d8d8;
}
</style>
