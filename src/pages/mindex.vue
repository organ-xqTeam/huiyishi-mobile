<template>
  <div class="mindex-page">
    <div class="mindex_top">
      <div class="mindex_title ac" style="margin: 5px;">{{year}}年{{month}}月 <span class="iconfont icon-shaixuan" id="openModal" @click="openModal"></span></div>
      <!-- 筛选弹窗 -->
      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
            <button type="button" class="submit" @click="filterBtn">确定</button>
            <button type="button" class="cancle" data-dismiss="modal">取消</button>
          </div>
        </div><!-- /.modal -->
      </div>
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
          <div class="mindex_item_name">{{item.rname}}</div>
          <div class="mindex_item_info" v-cloak v-if="item.sum&&Number(item.sum)!==0">有 <span style="font-size: 1.3em;">{{item.sum}}</span> 个预定信息</div>
          <div class="mindex_item_info" v-cloak v-else>没有预定信息</div>
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
        <router-link class="mindex_tab" to="/mindexList" style="font-size: 1em;"><i class="iconfont icon-liebiao"></i><br>我的预定</router-link>
    </div>
  </div>
</template>

<script>
import '../assets/js/bootstrap-datetimepicker.min'
import '../assets/js/bootstrap-datetimepicker.zh-CN'

export default {
  name: "mindex",
  data() {
    return {
      selectedDateIndex:0, //当前选择的日期index
      //表头
      year:"",
      month:"",
      dateArr:[],
      //数据
      showArr:[],
      //筛选
      filterName:"",
      fitlerDate:"" //用不到
    }
  },
  watch:{
    selectedDateIndex(){
      this.getData()
    }
  },
  mounted() {
    this.initSome()
    //生成表头
    this.generateDate(new Date())

    this.getData()
  },
  methods:{
    initSome(){
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
    //获取日期 预定情况
    getData(callback){
      let self=this
      let date=this.dateArr[this.selectedDateIndex].dateStr
      console.log(date)
      this.axios.post('/order/selectRoomnameAndNum', this.qs.stringify({
        date: date
      }))
      .then(function (response) {
        console.log(response);
        self.showArr=response.data

        if(callback){
          callback()
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    //选择上面的日期
    selectDate(index){
      this.selectedDateIndex=index
      this.year=this.dateArr[index].dateStr.substr(0,4)
      this.month=this.dateArr[index].dateStr.substr(5,2)
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
    filterBtn(){
      let self=this
      let name=this.filterName.trim()
      let date=$("#datetime").val()
      console.log(name,date)

      if(name==""&&date==""){
        //生成表头
        this.generateDate(new Date())

        this.getData()
        $("#myModal").modal("hide")
      }else if(name==""){ //只填日期了
        //生成表头
        this.generateDate(new Date(date))

        this.getData()
        $("#myModal").modal("hide")
      }else if(date==""){ //只填写会议室名称
        let arr=this.showArr.filter(function(obj){
          return obj.rname==name
        })
        if(arr.length==0){
          alert("没有您筛选的会议室")
        }else{
          this.showArr=arr
          $("#myModal").modal("hide")
        }
      }else{ //全都填写了
        //生成表头
        this.generateDate(new Date(date))

        this.getData(function(){
          //筛选会议室
          let arr=self.showArr.filter(function(obj){
            return obj.rname==name
          })
          console.log(arr)
          if(arr.length==0){
            alert("没有您筛选的会议室")
          }else{
            self.showArr=arr
            $("#myModal").modal("hide")
          }
        })
	  }
	},
	//打开筛选弹窗
	openModal(){
		$("#myModal").modal("show")
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
</style>
