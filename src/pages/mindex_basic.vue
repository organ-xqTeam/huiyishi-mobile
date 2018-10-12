<template>
  <div class="mindexBasic-page">
    <div class="basic">
      <div class="basic_title mindex_top ac">会议预定信息</div>
      <div class="mindex_top table_top">
        <table class="mindex_table">
          <tr style="border-top: none;">
            <td class="table_name">会议主题</td>
            <td><input class="mindex_input" type="text" name="" v-model="title"></td>
          </tr>
          <tr>
            <td class="table_name">会议室名称</td>
            <td><input class="mindex_input" type="text" name="" v-model="name" readonly="readonly"></td>
          </tr>
          <tr>
            <td class="table_name">参会人数</td>
            <td><input class="mindex_input" type="number" name="" v-model="ocnum"></td>
          </tr>
          <tr>
            <td class="table_name">会议时间</td>
            <td><input class="mindex_input" type="type" name="" v-model="time" readonly="readonly"></td>
          </tr>
          <!-- 重复 -->
          <tr>
            <td class="table_name">是否重复预定</td>
            <td>
              <label style="font-weight:normal;">
                <input class="table_radio" type="radio" name="cf" value="1" v-model="cf">是
              </label>
              <label style="font-weight:normal;">
                <input class="table_radio" type="radio" name="cf" value="2" v-model="cf">否
              </label>
            </td>
          </tr>
          <tr v-cloak v-show="cf==1">
            <td class="table_name">重复预定类型</td>
            <td>
              <select class="mindex_input" style="background-color:#fff;" v-model="unit">
                <option value="1">每天</option>
                <option value="2">每周</option>
                <option value="3">每月</option>
              </select>
            </td>
          </tr>
          <tr v-cloak v-show="cf==1">
            <td class="table_name">重复次数</td>
            <td><input class="mindex_input" type="number" name="" v-model="num"></td>
          </tr>
          <tr v-cloak v-show="cf==1">
            <td class="table_name">重复日期</td>
            <td><input class="mindex_input" type="text" name="" :value="time.substr(0,10)" readonly="readonly"></td>
          </tr>
          <tr v-cloak v-show="cf==1">
            <td class="table_name">结束重复日期</td>
            <td><input class="mindex_input" type="text" name="" :value="cfenddate" readonly="readonly"></td>
          </tr>
          <!-- 重复 end -->
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
      <button class="add_info toSupply" @click="openSupply">填写会议补充信息</button>
    </div>
    <div class="add_goods">
      <button class="cancle toGoods basicBtn" @click="openBasicGood">添加基础会议物品</button>
      <div style="width: 20px;"></div>
      <button class="cancle toGoods addedBtn">添加增值会议物品</button>
    </div>
    <!--提交按钮-->
    <div class="kong"></div>
    <div class="button_btn">
      <button class="mindex_tab submit">提交</button>
      <button class="mindex_tab cancle" @click="routerGoback">取消</button>
    </div>

    <!-- 补充信息 ///////////////////////////////////////////////////////////////////////////////////////////////// -->
    <div class="basic supplyBasic" v-cloak v-show="showSupply">
      <div class="basic_title mindex_top ac">会议补充信息</div>
      <!-- 会议补充信息 -->
      <div class="mindex_top table_top">
        <table class="mindex_table">
          <tr>
            <td class="table_name">预定台型</td>
            <td>
              <select class="mindex_input" v-model="cid" style="background-color:#fff;">
                <option value="不限">不限</option>
                <template v-cloak v-if="taixingArr.length>0">
                  <option v-for="(item,index) in taixingArr" :key="index" :value="item.cid">{{item.cname}}</option>
                </template>
              </select>
            </td>
          </tr>
          <tr>
            <td class="table_name">是否与服务人员对接</td>
            <td style="width:50%;">
              <label style="font-weight:normal;">
                <input class="table_radio" type="radio" name="ocdockingstate" value="1" v-model="ocdockingstate">是
              </label>
              <label style="font-weight:normal;">
                <input class="table_radio" type="radio" name="ocdockingstate" value="2" v-model="ocdockingstate">否
              </label>
            </td>
          </tr>
          <tr v-cloak v-show="ocdockingstate==1">
            <td class="table_name">对接时间</td>
            <td><input class="mindex_input form-control" id='datetime' type="type" name=""></td>
          </tr>
          <!-- <tr>
			<td class="table_name">会议使用联系人</td>
			<td><input class="mindex_input" type="text" name=""></td>
		  </tr>
		  <tr>
			<td class="table_name">联系电话</td>
			<td><input class="mindex_input" type="number" name=""></td>
		  </tr> -->
        </table>
      </div>
      <!-- 车位预留情况 -->
      <div class="mindex_top table_top basic">
        <table class="mindex_table">
          <caption class="table_title">车位预留情况</caption>
          <tr style="border-top: none;">
            <td class="table_name">大车位数量</td>
            <td><input class="mindex_input" type="number" name=""></td>
          </tr>
          <tr>
            <td class="table_name">小车位数量</td>
            <td><input class="mindex_input" type="number" name=""></td>
          </tr>
          <!-- <tr>
			<td class="table_name">会议议程</td>
			<td><input class="mindex_input" type="text" name=""></td>
		  </tr> -->
          <!-- <tr>
			<td class="table_name">打印份数</td>
			<td><input class="mindex_input" type="number" name=""></td>
		  </tr> -->
          <!-- <tr>
			<td class="table_name">主席台是否摆放</td>
			<td>
			  <input class="table_radio" type="radio" name="rostrum">是
			  <input class="table_radio" type="radio" name="rostrum">否
			</td>
		  </tr> -->
        </table>
      </div>
      <!-- 会议布展情况 -->
      <div class="mindex_top table_top basic">
        <table class="mindex_table">
          <caption class="table_title">会议布展情况</caption>
          <tr style="border-top: none;">
            <td class="table_name">展台</td>
            <td>
              <input class="mindex_input" type="number" name="" v-model="ocshowplatform">
            </td>
          </tr>
          <tr>
            <td class="table_name">展架</td>
            <td>
              <input class="mindex_input" type="number" name="" v-model="ocshowshelf">
            </td>
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
      <div class="mindex_top table_top basic" style="margin-bottom:80px;">
        <table class="mindex_table">
          <!-- <tr>
			<td class="table_name">附件</td>
			<td><button class="ocacc_btn cancle fr">选择</button></td>
		  </tr> -->
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
      <div class="btn_box button_btn">
        <button class="submit toDetail add_info cancle" @click="closeSupply">确定</button>
      </div>
    </div>
    <!-- 补充信息 end -->
    <!-- 添加基础物品 -->
    <div class="basicGood-page" v-cloak v-show="showBasicPage">
      <!--标题-->
      <div class="tit">基础会议物品</div>
      <!--图片内容-->
      <div class="dishes">
        <template v-cloak v-if="basicGoodArr.length>0">
          <div class="col-xs-6 col-sm-4 col-md-4 col-lg-3 basicGoodItem" style="padding: 0;"
            v-for="(item,index) in basicGoodArr" :key="index"
          >
            <div class="dishes_item">
              <!-- <img class="dishes_img" src=""> -->
              <div class="dishes_text">
                <p class="dishes_text_name">{{item.name}}</p>
                <div class="item_text_num ac">
                  <span class="num_add">+</span><input type="text" name=""><span class="num_minus">-</span>
                </div>
              </div>
              <input class="dishes_check" type="checkbox" name="">
            </div>
          </div>
        </template>
      </div>
      <div style="height: 130px;"></div>
      <!--选中的菜品-->
      <div class="select_dishes">
        <div class="select_dishes_item">dd</div>
      </div>
      <!--按钮-->
      <div class="button_btn">
        <button class="submit">提交</button>
        <button class="cancle">取消</button>
      </div>
    </div>
    <!-- 添加基础物品 end -->
  </div>
</template>

<script>
  import '../assets/js/bootstrap-datetimepicker.min.js'
  import '../assets/js/bootstrap-datetimepicker.zh-CN.js'
  // import '../assets/js/moment-with-locales.js'

  export default {
    name: "mindexBasic",
    data() {
      return {
        //form表单
        title: "", //会议主题
        name: "", //会议室名称
        ocnum: "", //参会人数
        time: "", //会议时间
        cf: 2, //是否重复 1重复 2不重复
        unit: 1, //重复单位（1.天 2.周 3.月）
        num: 1, //重复次数
        ocreservename: "", //会议预定联系人
        ocreservephone: "", //会议预定联系人电话
        ocusename: "", //会议使用联系人
        ocusephone: "", //会议使用联系人电话
        //form表单 end

        //补充信息
        showSupply: false, //是否显示补充信息
        //补充信息form表单
        cid: "不限", //台型
        ocdockingstate: "", //是否与服务人员对接
        stringocdockingtime: "", //对接时间
        ocbigcarnum: "", //大车位数目
        ocsmallnum: "", //小车位数目
        ocshowplatform: "", //展台个数
        ocshowshelf: "", //展架个数
        ocremark: "", //备注
        //补充信息form表单 end
        taixingArr: [],

        //添加基础物品
        showBasicPage: false,
        basicGoodArr: [],
      }
    },
    computed: {
      cfenddate() {
        let unit = Number(this.unit) //重复单位
        console.log(unit)
        let num = Number(this.num) //重复次数
        let startstamp = new Date(this.time.substr(0, 10)).getTime()
        let endstamp
        switch (unit) {
          case 1: //每天
            endstamp = startstamp + (num - 1) * 86400000
            break;
          case 2: //每周
            endstamp = startstamp + (num - 1) * 7 * 86400000
            break;
          case 3: //每月
            endstamp = startstamp + (num - 1) * 30 * 86400000
            break;
          default:
            break;
        }
        return Global.dateToFormat(new Date(endstamp)).substr(0, 10)
      },
    },
    watch: {
      '$route': function (to, from) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },
      ocdockingstate() {
        this.initSome()
      },
    },
    mounted() {
      this.initSome()
      //滚到顶部
      window.scrollTo(0, 0);

      this.getParam()
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
      //返回上一个路由
      routerGoback() {
        this.$router.go(-1)
      },
      //获取传来的参数
      getParam() {
        console.log(this.$route.query)
        let data = this.$route.query.data
        //会议室名称
        this.name = data.rinfo.rname
        //会议时间
        //日期
        let date = data.selectedDate.dateStr
        //时间
        let selectedTimeArr = data.items.filter(function (obj, index) {
          return data.selectedTimeIndex.indexOf(index) > -1
        }).map(function (obj2) {
          return obj2.message
        })
        let selectedTimeStr = selectedTimeArr.join("")
        let bgtime = selectedTimeStr.substr(0, 5)
        let edtime = selectedTimeStr.substr(selectedTimeStr.length - 5, 5)
        console.log(bgtime, edtime)
        this.time = date + "  " + bgtime + " - " + edtime
        //会议预定联系人 会议使用联系人 联系电话
        if (localStorage.getItem("mUserInfo") && localStorage.getItem("mUserInfo") !== null && localStorage.getItem(
            "mUserInfo") !== "null") {
          let mUserInfo = JSON.parse(localStorage.getItem("mUserInfo"))
          console.log(mUserInfo)
          this.ocreservename = mUserInfo.name
          this.ocreservephone = mUserInfo.phone
          this.ocusename = mUserInfo.name
          this.ocusephone = mUserInfo.phone
        }
      },
      //打开会议补充
      openSupply() {
        let self = this
        if (this.taixingArr.length > 1) {
          self.showSupply = true
        } else {
          this.getTaixing(function () {
            self.showSupply = true
          })
        }
      },
      //关闭会议补充
      closeSupply() {
        this.showSupply = false
      },
      //获取台型
      getTaixing(callback) {
        let self = this
        $(".toSupply").addClass("eventsDisabled")
        this.axios.get("/cplatform/selectList")
          .then(function (res) {
            $(".toSupply").removeClass("eventsDisabled")
            console.log(res)
            if (res.data.length > 0) {
              let arr = res.data
              console.log(arr) //台型数组
              self.taixingArr = arr
            }
          })
          .catch(function (res) {
            console.log(res)
          })
      },
      //打开添加基础物品
      openBasicGood() {
        let self = this
        if (this.basicGoodArr.length > 0) {
          self.showBasicPage = true
        } else {
          this.getBasicGood(function () {
            self.showBasicPage = true
          })
        }
      },
      //获取基础物品
      getBasicGood(callback) {
        let self = this
        $(".basicBtn").addClass("eventsDisabled")
        Global.openLoading()
        this.axios.get("/order/selectBgList")
          .then(function (res) {
            Global.closeLoading()
            $(".basicBtn").removeClass("eventsDisabled")
            console.log(res)
            if (res.data.length > 0) {
              let arr = res.data
              console.log(arr) //基础物品数组
              self.basicGoodArr = arr
              if(callback){
                callback()
              }
            }
          })
          .catch(function (res) {
            console.log(res)
          })
      },
    }, //methods end
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../assets/css/bootstrap.min.css";
  @import "../assets/css/bootstrap-datetimepicker.min.css";
  @import "../assets/css/reset.css";
  @import "../assets/css/mindex.css";
  @import "../assets/css/mdetail.css";
  @import "../assets/css/mindex_goods.css";
  /* 基础增值物品 */

  /* 补充信息弹窗 */
  .supplyBasic {
    background-color: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    margin: 0
  }

  .basicBtn,
  .addedBtn {
    background-color: #2EC5C4;
    color: #fff;
  }
  /* 基础物品 */
  .basicGood-page {
    background-color: #f1f5f6;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    margin: 0;
  }

  .tit {
    margin-top: 0;
  }
  .basicGood-page .dishes_text{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .basicGood-page .dishes_text_name{
    margin-bottom: 0;
    text-indent: 1em;
  }
  .basicGood-page .num_add,.basicGood-page .num_minus{
    padding:0 10rpx;
  }
</style>
