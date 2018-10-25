<template>
  <div class="mindexBasic-page">
    <div class="basic">
      <div class="basic_title mindex_top ac">预定信息</div>
      <div class="mindex_top table_top">
        <table class="mindex_table">
          <tr style="border-top: none;">
            <td class="table_name">主题</td>
            <td><input class="mindex_input" type="text" name="" placeholder="输入少于11位字符" v-model="title"></td>
          </tr>
          <tr>
            <td class="table_name">会议室名称</td>
            <td><input class="mindex_input" type="text" name="" v-model="name" readonly="readonly"></td>
          </tr>
          <tr>
            <td class="table_name">参会人数</td>
            <td><input class="mindex_input" type="number" name="" placeholder="输入少于11位数字" v-model="ocnum"></td>
          </tr>
          <tr>
            <td class="table_name">时间</td>
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
            <td class="table_name">预定联系人</td>
            <td><input class="mindex_input" type="text" name="" v-model="ocreservename"></td>
          </tr>
          <tr>
            <td class="table_name">联系电话</td>
            <td><input class="mindex_input" type="number" name="" v-model="ocreservephone"></td>
          </tr>
          <tr>
            <td class="table_name">使用联系人</td>
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
      <button class="add_info toSupply" @click="openSupply">填写补充信息</button>
    </div>
    <div class="add_goods">
      <button class="cancle toGoods basicBtn" @click="openBasicGood">添加基础物品</button>
      <div style="width: 20px;"></div>
      <button class="cancle toGoods addedBtn" @click="openAddedGood">添加增值物品</button>
    </div>
    <!--提交按钮-->
    <div class="kong"></div>
    <div class="button_btn">
      <button class="mindex_tab submit" id="allSubmit" @click="submit">提交</button>
      <button class="mindex_tab cancle" @click="routerGoback">取消</button>
    </div>

    <!-- 补充信息 ///////////////////////////////////////////////////////////////////////////////////////////////// -->
    <div class="basic supplyBasic" v-cloak v-show="showSupply">
      <div class="basic_title mindex_top ac">补充信息</div>
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
            <td class="table_name">是否对接</td>
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
            <td><input class="mindex_input form-control" id='datetime' type="type" name="" readonly="readonly"></td>
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
          <caption class="table_title">布展情况</caption>
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
        <table class="mindex_table" id="tableSignWrap">
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
          <tr>
            <td style="text-align:center;font-size:22px;padding:1px 0;" colspan="8" @click="addSignTr">+</td>
          </tr>
        </table>
      </div>
      <!-- 附件备注 -->
      <div class="mindex_top table_top basic" style="margin-bottom:80px;">
        <table class="mindex_table">
          <tr id="annexTr">
            <td class="table_name">附件</td>
            <td><button class="ocacc_btn cancle fr" @click="selectFile">选择</button></td>
          </tr>
          <!-- <tr>
            ssdfsdf
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
      <div class="tit">基础物品</div>
      <!--图片内容-->
      <div class="dishes">
        <template v-cloak v-if="basicGoodArr.length>
   0">

          <div class="col-xs-6 col-sm-4 col-md-4 col-lg-3 basicGoodItem" style="padding: 0;" v-for="(item,index) in basicGoodArr"
            :key="index">
            <div class="dishes_item">
              <img class="dishes_img" v-cloak v-if="item.bgpic&&item.bgpic!==''" :src="Global.domain+Global.host+item.bgpic">
              <div class="dishes_text">
                <p class="dishes_text_name">{{item.bgname}}</p>
                <div class="item_text_num ac">
                  <span class="num_minus" @click="minusGood(item)">-</span>
                  <input type="number" name="" v-model="item.mNum">
                  <span class="num_add" @click="plusGood(item)">+</span>
                </div>
              </div>
              <input class="dishes_check" type="checkbox" name="" :value="item" v-model="selectedBasicGoodArr">
            </div>
          </div>
        </template>
      </div>
      <!-- <div style="height: 130px;"></div> -->
      <!--选中的菜品-->
      <div class="select_dishes clearfix">
        <div class="select_dishes_item" v-for="(item,index) in selectedBasicGoodArr" :key="index">
          {{item.bgname}} * {{item.mNum==0?1:item.mNum}}
        </div>
      </div>
      <!--按钮-->
      <div class="button_btn">
        <button class="submit" @click="confirmBasicGood">提交</button>
        <button class="cancle" @click="cancelBasicGood">取消</button>
      </div>
    </div>
    <!-- 添加基础物品 end -->
    <!-- 添加增值物品 -->
    <div class="addedGood-page" v-cloak v-show="showAddedPage">
      <!--标题-->
      <div class="tit">增值物品</div>
      <!--图片内容-->
      <div class="dishes">
        <template v-cloak v-if="addedGoodArr.length>0">
          <div class="col-xs-6 col-sm-4 col-md-4 col-lg-3 addedGoodItem" style="padding: 0;" v-for="(item,index) in addedGoodArr"
            :key="index">
            <div class="dishes_item">
              <img class="dishes_img" v-cloak v-if="item.agpic&&item.agpic!==''" :src="Global.domain+Global.host+item.agpic">
              <div class="dishes_text">
                <p class="dishes_text_name">{{item.agname}} <span style="color:red;">￥{{item.agprice}}</span></p>
                <div class="item_text_num ac">
                  <span class="num_minus" @click="minusGood(item)">-</span>
                  <input type="number" name="" v-model="item.mNum">
                  <span class="num_add" @click="plusGood(item)">+</span>
                </div>
              </div>
              <input class="dishes_check" type="checkbox" name="" :value="item" v-model="selectedAddedGoodArr">
            </div>
          </div>
        </template>
      </div>
      <!-- <div style="height: 130px;"></div> -->
      <!--选中的菜品-->
      <div class="select_dishes clearfix">
        <div class="select_dishes_item" v-for="(item,index) in selectedAddedGoodArr" :key="index">
          {{item.agname}} * {{item.mNum==0?1:item.mNum}}
        </div>
      </div>
      <!--按钮-->
      <div class="button_btn">
        <button class="submit" @click="confirmAddedGood">提交</button>
        <button class="cancle" @click="cancelAddedGood">取消</button>
      </div>
    </div>
    <!-- 添加增值物品 end -->
  </div>
</template>

<script>
  import "../assets/js/bootstrap-datetimepicker.min.js";
  import "../assets/js/bootstrap-datetimepicker.zh-CN.js";
  // import '../assets/js/moment-with-locales.js'

  export default {
    name: "mindexBasic",
    data() {
      return {
        Global: Global,

        roomInfo: {},

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
        taixingArr: [],
        //补充信息form表单
        cid: "不限", //台型
        ocdockingstate: 2, //是否与服务人员对接
        stringocdockingtime: "", //对接时间
        ocbigcarnum: "", //大车位数目
        ocsmallnum: "", //小车位数目
        ocshowplatform: "", //展台个数
        ocshowshelf: "", //展架个数
        ocremark: "", //备注
        peoqueue: null, //桌签
        //补充信息form表单 end

        //添加基础物品
        showBasicPage: false,
        basicGoodArr: [],
        selectedBasicGoodArr: [], //选择的基础物品
        //添加增值物品
        showAddedPage: false,
        addedGoodArr: [],
        selectedAddedGoodArr: [], //选择的增值物品

        //桌签
        tableSignArr: ["", "", "", "", "", "", "", ""]
      };
    },
    computed: {
      cfenddate() {
        let unit = Number(this.unit); //重复单位
        console.log(unit);
        let num = Number(this.num); //重复次数
        let startstamp = new Date(this.time.substr(0, 10)).getTime();
        let endstamp;
        switch (unit) {
          case 1: //每天
            endstamp = startstamp + (num - 1) * 86400000;
            break;
          case 2: //每周
            endstamp = startstamp + (num - 1) * 7 * 86400000;
            break;
          case 3: //每月
            endstamp = startstamp + (num - 1) * 30 * 86400000;
            break;
          default:
            break;
        }
        return Global.dateToFormat(new Date(endstamp)).substr(0, 10);
      }
    },
    watch: {
      $route: function (to, from) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },
      // ocdockingstate() {
      //   this.initSome()
      // },
      selectedBasicGoodArr() {
        console.log(this.selectedBasicGoodArr);
      },
      tableSignArr() {
        console.log(this.tableSignArr);
      }
    },
    mounted() {
      let self = this;
      this.initSome();
      //滚到顶部
      window.scrollTo(0, 0);

      this.getParam();

      // //离开页面前 解锁正在编辑的会议室
      // window.onbeforeunload = function (event) {
      //   self.unlockRoom()

      //   return "确定离开此页面吗？";
      // }
    },
    methods: {
      initSome() {
        //时间控件
        $("#datetime").datetimepicker({
          format: "yyyy-mm-dd hh:ii",
          autoclose: true,
          pickerPosition: "bottom-right",
          language: "zh-CN" //中文，需要引用zh-CN.js包
        });
        $("#datetime").datetimepicker(
          "setStartDate",
          new Date(new Date().getTime() + 86400000 - 28800000)
        );
      },
      //返回上一个路由
      routerGoback() {
        this.$router.go(-1);
      },
      //获取传来的参数
      getParam() {
        console.log(this.$route.query);
        let data = this.$route.query.data;
        console.log(data);
        console.log(data.rinfo);
        //roomInfo
        this.roomInfo = data.rinfo;
        //rid
        // this.rid=Number(data.rinfo.rid)
        //会议室名称
        this.name = data.rinfo.rname;
        //会议时间
        //日期
        let date = data.dateArr[data.selectedDateIndex].dateStr;
        //时间
        let selectedTimeArr = data.items
          .filter(function (obj, index) {
            return data.selectedTimeIndex.indexOf(index) > -1;
          })
          .map(function (obj2) {
            return obj2.message;
          });
        let selectedTimeStr = selectedTimeArr.join("");
        let bgtime = selectedTimeStr.substr(0, 5);
        let edtime = selectedTimeStr.substr(selectedTimeStr.length - 5, 5);
        console.log(bgtime, edtime);
        this.time = date + "  " + bgtime + " - " + edtime;
        //会议预定联系人 会议使用联系人 联系电话
        if (
          localStorage.getItem("mUserInfo") &&
          localStorage.getItem("mUserInfo") !== null &&
          localStorage.getItem("mUserInfo") !== "null"
        ) {
          let mUserInfo = JSON.parse(localStorage.getItem("mUserInfo"));
          console.log(mUserInfo);
          this.ocreservename = mUserInfo.name;
          this.ocreservephone = mUserInfo.phone;
          this.ocusename = mUserInfo.name;
          this.ocusephone = mUserInfo.phone;
        }
      },
      //打开会议补充
      openSupply() {
        let self = this;
        if (this.taixingArr.length > 1) {
          self.showSupply = true;
        } else {
          this.getTaixing(function () {
            self.showSupply = true;
          });
        }
      },
      //关闭会议补充
      closeSupply() {
        this.showSupply = false;
      },
      //获取台型
      getTaixing(callback) {
        let self = this;
        $(".toSupply").addClass("eventsDisabled");
        this.axios
          .get(Global.host + "/cplatform/selectList")
          .then(function (res) {
            $(".toSupply").removeClass("eventsDisabled");
            console.log(res);
            if (res.data.length > 0) {
              let arr = res.data;
              console.log(arr); //台型数组
              self.taixingArr = arr;
            }
            if (callback) {
              callback();
            }
          })
          .catch(function (res) {
            console.log(res);
            if (callback) {
              callback();
            }
          });
      },
      //基础物品----------------------------------------------------------------------------
      //打开添加基础物品
      openBasicGood() {
        let self = this;
        if (this.basicGoodArr.length > 0) {
          self.showBasicPage = true;
        } else {
          this.getBasicGood(function () {
            self.showBasicPage = true;
          });
        }
      },
      //获取基础物品
      getBasicGood(callback) {
        let self = this;
        $(".basicBtn").addClass("eventsDisabled");
        Global.openLoading();
        this.axios
          .get(Global.host + "/order/selectBgList")
          .then(function (res) {
            Global.closeLoading();
            $(".basicBtn").removeClass("eventsDisabled");
            console.log(res);
            if (res.data.length > 0) {
              let arr = res.data;
              console.log(arr); //基础物品数组
              let arrWithNum = arr.map(function (obj) {
                obj.mNum = 1;
                return obj;
              });
              self.basicGoodArr = arrWithNum;
              console.log(self.basicGoodArr);
              if (callback) {
                callback();
              }
            }
          })
          .catch(function (res) {
            console.log(res);
          });
      },
      //点击增加基础物品
      plusGood(item) {
        item.mNum = item.mNum + 1;
      },
      //点击减少基础物品
      minusGood(item) {
        if (Number(item.mNum) == 0) {
          return;
        }
        item.mNum = item.mNum - 1;
      },
      //点击基础物品的提交
      confirmBasicGood() {
        this.showBasicPage = false;
      },
      //点击基础物品的取消
      cancelBasicGood() {
        this.selectedBasicGoodArr = [];
        this.showBasicPage = false;
      },
      //增值物品----------------------------------------------------------------------------
      //打开添加基础物品
      openAddedGood() {
        let self = this;
        if (this.addedGoodArr.length > 0) {
          self.showAddedPage = true;
        } else {
          this.getAddedGood(function () {
            self.showAddedPage = true;
          });
        }
      },
      //获取增值物品
      getAddedGood(callback) {
        let self = this;
        $(".addedBtn").addClass("eventsDisabled");
        Global.openLoading();
        this.axios
          .get(Global.host + "/order/selectAgList")
          .then(function (res) {
            Global.closeLoading();
            $(".addedBtn").removeClass("eventsDisabled");
            console.log(res);
            if (res.data.length > 0) {
              let arr = res.data;
              console.log(arr); //增值物品数组
              let arrWithNum = arr.map(function (obj) {
                obj.mNum = 1;
                return obj;
              });
              self.addedGoodArr = arrWithNum;
              console.log(self.addedGoodArr);
              if (callback) {
                callback();
              }
            }
          })
          .catch(function (res) {
            console.log(res);
          });
      },
      //点击基础物品的提交
      confirmAddedGood() {
        this.showAddedPage = false;
      },
      //点击基础物品的取消
      cancelAddedGood() {
        this.selectedAddedGoodArr = [];
        this.showAddedPage = false;
      },

      //验证
      validForm: function () {
        //会议主题必填
        if (this.title.trim() === "") {
          alert("请输入会议主题");
          return false;
        }
        if (this.title.trim().length > 11) {
          alert("会议主题最多11个字符");
          return false;
        }
        //参会人数
        var value1 = this.ocnum;
        if (value1.trim() === "") {
          alert("请输入参会人数");
          return false;
        }
        if (value1.trim().toString().length > 11) {
          alert("请输入正确的参会人数");
          return false;
        }
        var reg1 = /^[0-9]*$/;
        if (!reg1.test(value1)) {
          alert("参会人数请填写数字");
          return false;
        }
        //会议预定联系人
        var value2 = this.ocreservename;
        if (value2.trim() === "") {
          alert("请填写会议预定联系人");
          return false;
        }
        // var reg2 = /^[\u4e00-\u9fa5]{2,7}$/;
        // if (!reg2.test(value2)) {
        //   alert("请输入正确格式的姓名");
        //   return false;
        // }
        //会议预定联系人 联系方式
        var value3 = this.ocreservephone;
        var telReg = /^1[3-9]\d{9}$/; //手机号
        var phoneReg = /^\d{3}-\d{8}$|^\d{4}-\d{7}$/; //国内固话
        if (value3.trim() === "") {
          alert("请输入会议预定联系人的联系方式");
          return false;
        }
        //会议使用联系人
        var value4 = this.ocusename;
        if (value4.trim() === "") {
          alert("请输入会议使用联系人");
          return false;
        }
        //会议使用联系人 联系方式
        var value5 = this.ocusephone;
        if (value5.trim() === "") {
          alert("请输入会议使用联系人的联系方式");
          return false;
        }
        if (
          (telReg.test(value3.trim()) || phoneReg.test(value3.trim())) &&
          (telReg.test(value5.trim()) || phoneReg.test(value5.trim()))
        ) {
        } else {
          alert("联系方式请填写正确格式的手机号或固定电话");
          return false;
        }
        return true;
      },
      //点击最终的提交
      submit() {
        let self = this;
        //验证
        if (!this.validForm()) {
          return;
        }
        //验证 end

        //物品参数
        //基础
        var bonameArr;
        var bonumArr;
        if (this.selectedBasicGoodArr.length == 0) {
          bonameArr = null;
          bonumArr = null;
        } else {
          bonameArr = [];
          bonumArr = [];
          this.selectedBasicGoodArr.forEach(function (obj) {
            bonameArr.push(obj.bgname);
            bonumArr.push(obj.mNum);
          });
        }
        //增值
        var aonameArr;
        var aopriceArr;
        var aonumArr;
        if (this.selectedAddedGoodArr.length == 0) {
          aonameArr = null;
          aopriceArr = null;
          aonumArr = null;
        } else {
          aonameArr=[]
          aopriceArr=[]
          aonumArr=[]
          this.selectedAddedGoodArr.forEach(function (obj) {
            aonameArr.push(obj.agname);
            aopriceArr.push(obj.agprice);
            aonumArr.push(obj.mNum);
          });
        }

        //开始时间
        let date = this.time.substr(0, 10);
        let bgtimeStr = this.time.split(" - ")[0].trim();
        let bgtime = bgtimeStr.substr(bgtimeStr.length - 5, 5);
        //结束时间
        let edtime = this.time.split(" - ")[1].trim();
        //桌签
        var tableSignArr = [];
        var tableSignStr = "";
        $("#tableSignWrap input[name]").each(function () {
          var value = $(this).val();
          if (value.trim() !== "") {
            tableSignArr.push(value.trim());
          }
        });
        if (tableSignArr.length == 0) {
          tableSignStr = null;
        } else {
          tableSignStr = tableSignArr.join(",");
        }

        // let postData = {
        //   rid: Number(this.roomInfo.rid), //会议室id
        //   ocnum: Number(this.ocnum), //参会人数
        //   stringocbegintime: date + " " + bgtime + ":00", //开始时间
        //   stringocendtime: date + " " + edtime + ":00", //结束时间
        //   ocsourcename: this.title, //物资联系人? 改成会议主题
        //   ocusename: this.ocusename, //会议使用联系人
        //   ocusephone: this.ocusephone, //会议使用联系人电话
        //   ocreservename: this.ocreservename, //会议预定联系人
        //   ocreservephone: this.ocreservephone, //会议预定联系人电话
        //   ocdockingstate: Number(this.ocdockingstate), //是否与服务人员对接（1.是 2.否）
        //   stringocdockingtime:
        //     this.stringocdockingtime == ""
        //       ? null
        //       : this.stringocdockingtime + ":00", //对接时间
        //   // ocmaterialsname:document.getElementById("ocmaterialsname").value.trim()==""?null:document.getElementById("ocmaterialsname").value.trim(), //会议物资联系人
        //   // ocmaterialsphone:document.getElementById("ocmaterialsphone").value.trim()==""?null:document.getElementById("ocmaterialsphone").value.trim(), //会议物资联系人电话
        //   ocbigcarnum: this.ocbigcarnum == "" ? null : Number(this.ocbigcarnum), //大车位数目
        //   ocsmallnum: this.ocsmallnum == "" ? null : Number(this.ocsmallnum), //小车位数目
        //   ocshowplatform:
        //     this.ocshowplatform == "" ? null : Number(this.ocshowplatform), //展台个数
        //   ocshowshelf: this.ocshowshelf == "" ? null : Number(this.ocshowshelf), //展架个数
        //   // ocpower:document.getElementById("ocpower").value.trim()==""?null:document.getElementById("ocpower").value.trim(), //功率
        //   ocremark: this.ocremark == "" ? null : this.ocremark, //备注
        //   cid: this.cid == "不限" ? null : this.cid, //台型

        //   //页面里没有的：
        //   // ocarrangement:"", //会议布置情况
        //   // ocagenda:"", //议程
        //   // ocprintnum:"", //会议议程打印份数
        //   // ocplatform:"", //主席台是否摆放（1.是 2.否）
        //   // ocpeoname:"", //参会人名
        //   // serid:"", //服务人员id

        //   // ocaccessory:"", //附件

        //   otype: Number(this.cf), //是否重复预定（1.不重复 2.重复）
        //   unit: Number(this.unit), //重复的单位（1.天 2.周 3.月）
        //   num: Number(this.num), //重复次数

        //   //物品参数？
        //   boname: bonameArr, //基础物品名称
        //   bonum: bonumArr, //基础物品数量

        //   aoname: aonameArr, //增值物品名称
        //   aonum: aonumArr, //增值物品数量
        //   aoprice: aopriceArr, //增值物品单价

        //   // ocaccessoryfile:"",
        //   ocaccessoryfile: null,

        //   //桌签
        //   peoqueue: tableSignStr
        // };
        // console.log(postData);

        //改成formdata
        var formData = new FormData();
        formData.append("rid", Number(this.roomInfo.rid)); //会议室id
        formData.append("ocnum", Number(this.ocnum)); //参会人数
        formData.append("stringocbegintime", date + " " + bgtime + ":00"); //开始时间
        formData.append("stringocendtime", date + " " + edtime + ":00"); //结束时间
        formData.append("ocsourcename", this.title); //物资联系人? 改成会议主题
        formData.append("ocusename", this.ocusename); //会议使用联系人
        formData.append("ocusephone", this.ocusephone); //会议使用联系人电话
        formData.append("ocreservename", this.ocreservename); //会议预定联系人
        formData.append("ocreservephone", this.ocreservephone); //会议预定联系人电话
        formData.append("ocdockingstate", Number(this.ocdockingstate)); //是否与服务人员对接（1.是 2.否）
        formData.append(
          "stringocdockingtime",
          this.stringocdockingtime == "" ? null : this.stringocdockingtime + ":00"
        ); //对接时间
        // formData.append("ocmaterialsname", document.getElementById("ocmaterialsname").value.trim() == "" ? null : document.getElementById("ocmaterialsname").value.trim()) //会议物资联系人
        // formData.append("ocmaterialsphone", document.getElementById("ocmaterialsphone").value.trim() == "" ? null : document.getElementById("ocmaterialsphone").value.trim()) //会议物资联系人电话
        formData.append(
          "ocbigcarnum",
          this.ocbigcarnum == "" ? null : Number(this.ocbigcarnum)
        ); //大车位数目
        formData.append(
          "ocsmallnum",
          this.ocsmallnum == "" ? null : Number(this.ocsmallnum)
        ); //小车位数目
        formData.append(
          "ocshowplatform",
          this.ocshowplatform == "" ? null : Number(this.ocshowplatform)
        ); //展台个数
        formData.append(
          "ocshowshelf",
          this.ocshowshelf == "" ? null : Number(this.ocshowshelf)
        ); //展架个数
        // formData.append("ocpower", document.getElementById("ocpower").value.trim() == "" ? null : document.getElementById("ocpower").value.trim()) //功率
        formData.append("ocremark", this.ocremark == "" ? null : this.ocremark); //备注
        formData.append("cid", this.cid == "不限" ? 0 : this.cid); //台型

        formData.append("otype", Number(this.cf)); //是否重复预定（1.不重复 2.重复）
        formData.append("unit", Number(this.unit)); //重复的单位（1.天 2.周 3.月）
        formData.append("num", Number(this.num)); //重复次数

        //物品参数
        // formData.append("boname", bonameArr) //基础物品名称
        // formData.append("bonum", bonumArr) //基础物品数量
        // formData.append("aoname", aonameArr) //增值物品名称
        // formData.append("aonum", aonumArr) //增值物品数量
        // formData.append("aoprice", aopriceArr) //增值物品单价
        if (bonameArr) {
          bonameArr.forEach(function (item) {
            formData.append("boname[]", item);
          });
        }
        if (bonumArr) {
          bonumArr.forEach(function (item) {
            formData.append("bonum[]", item);
          });
        }
        if (aonameArr) {
          aonameArr.forEach(function (item) {
            formData.append("aoname[]", item);
          });
        }
        if (aonumArr) {
          aonumArr.forEach(function (item) {
            formData.append("aonum[]", item);
          });
        }
        if (aopriceArr) {
          formData.append("aoprice[]", aopriceArr);
        }

        // 附件
        $(".annexInput").each(function () {
          if (this.files.length > 0) {
            console.log(this.files[0]);
            formData.append("files", this.files[0]);
          }
        });

        //桌签
        formData.append("peoqueue", tableSignStr);
        //改成formdata end

        Global.openLoading();
        $("#allSubmit").addClass("eventsDisabled");
        // this.axios
        //   .post(Global.host + "/user/reserve", this.qs.stringify(postData))
        //   .then(function (res) {
        //     Global.closeLoading();
        //     $("#allSubmit").removeClass("eventsDisabled");
        //     console.log(res);
        //     if (res.data && Number(res.data) == 1) {
        //       alert("预定成功");
        //       self.$router.push({
        //         path: "/mlogin/mindexlistMember"
        //       });
        //     } else {
        //       alert("请求失败");
        //     }
        //   })
        //   .catch(function (res) {
        //     console.log(res);
        //   });

        $.ajax({
          type: "POST",
          url: Global.host + "/user/reserve",
          data: formData,
          cache: false,//上传文件无需缓存
          processData: false,//用于对data参数进行序列化处理 这里必须false
          contentType: false, //必须
          traditional: true,
          success: function (res) {
            Global.closeLoading();
            $("#allSubmit").removeClass("eventsDisabled");
            console.log(res);
            if (res && Number(res) == 1) {
              alert("预定成功");
              self.$router.push({
                path: "/mlogin/mindexlistMember"
              });
            } else {
              alert("请求失败");
            }
          }
        })
      },
      //点击桌签加号，增加tr
      addSignTr(event) {
        console.log(event.currentTarget);
        let $addTr = $(event.currentTarget).closest("tr");
        let $tr = $(`
                  <tr>
                    <td style="border:1px solid #ddd;padding:10px 0;font-size:1.2em;"><input class="mindex_input ac" style="border:none;outline:none;box-shadow:none;width:100%;font-size:1em;" type="text" name=""></td>
                    <td style="border:1px solid #ddd;padding:10px 0;font-size:1.2em;"><input class="mindex_input ac" style="border:none;outline:none;box-shadow:none;width:100%;font-size:1em;" type="text" name=""></td>
                    <td style="border:1px solid #ddd;padding:10px 0;font-size:1.2em;"><input class="mindex_input ac" style="border:none;outline:none;box-shadow:none;width:100%;font-size:1em;" type="text" name=""></td>
                    <td style="border:1px solid #ddd;padding:10px 0;font-size:1.2em;"><input class="mindex_input ac" style="border:none;outline:none;box-shadow:none;width:100%;font-size:1em;" type="text" name=""></td>
                  </tr>
                `);
        $addTr.before($tr);
      },
      //给这个room解锁
      unlockRoom(callback) {
        console.log("解锁会议室");
        let postData = {
          rid: this.roomInfo.rid
        };
        console.log(postData);
        this.axios
          .post(Global.host + "/user/releaseRoom", this.qs.stringify(postData))
          .then(function (res) {
            console.log(res);
            if (callback) {
              callback();
            }
          })
          .catch(function (res) {
            console.log(res);
          });
      },
      //选择附件
      selectFile() {
        let $tr = $(
          '<tr class="annexTd" style="margin:2px 0;">' +
          '<td colspan="2">' +
          '<div style="border: 1px solid #eaeaea;padding: 2px 5px;">' +
          '<span class="fileName"></span>' +
          '<span class="deleteAnnexBtn" style="float:right;color:red;padding: 0 12px;">&times;</span>' +
          "</div>" +
          '<input class="annexInput" type="file" style="display:none;">' +
          "</td>" +
          '"<tr>'
        );
        //删除事件
        $tr.find(".deleteAnnexBtn").click(function (event) {
          event.stopPropagation();
          let result = confirm("确认删除该附件？");
          if (result) {
            $(this)
              .closest("tr")
              .remove();
          }
        });
        //change事件
        $tr.find(".annexInput").change(function () {
          let input = $tr.find(".annexInput")[0];
          if (input.files.length > 0) {
            $tr.find(".fileName").text(input.files[0].name);
            $("#annexTr").after($tr);
          }
        });
        //主动点击
        $tr.find(".annexInput")[0].click();
      }
    }, //methods end
    beforeDestroy() {
      this.unlockRoom();
    }
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
    /* background-color: #fff; */
    background-color: #f1f5f6;
    /* 2018.10.22 */
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    margin: 0;
  }

  .basicBtn,
  .addedBtn {
    background-color: #2ec5c4;
    color: #fff;
  }

  /* 基础物品 */

  /* 增值物品 */

  .basicGood-page,
  .addedGood-page {
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

  .basicGood-page .dishes_text,
  .addedGood-page .dishes_text {
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .basicGood-page .dishes_text_name,
  .addedGood-page .dishes_text_name {
    margin-bottom: 0;
  }

  .basicGood-page .item_text_num,
  .addedGood-page .item_text_num {
    margin-top: 8px;
  }

  .basicGood-page .item_text_num .num_add,
  .basicGood-page .item_text_num .num_minus,
  .addedGood-page .item_text_num .num_add,
  .addedGood-page .item_text_num .num_minus {
    padding: 0 10px;
    font-size: 18px;
  }

  /* 已选择基础物品 */

  .select_dishes {
    position: static;
    height: auto;
  }

  .select_dishes_item {
    float: left;
    width: calc(33.3333% - 10px);
    margin: 5px;
    border: 1px solid #d8d8d8;
    line-height: 30px;
    text-align: center;
  }

  /* 桌签 */

  .tableSign-wrap {
    display: flex;
    flex-wrap: wrap;
  }

  .tableSign-item {
    flex: 0 0 calc(25% - 6px);
    margin: 3px;
    border: 1px solid #ddd;
    padding: 10px 0;
  }

  .add_name table tr td {
    border: 1px solid #ddd;
  }

  .mindex_input {
    border: none;
    outline: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    width: 100%;
    font-size: 1em;
  }

  /* placeholder样式 */

  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #bebebe;
    font-size: 16px;
  }

  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #bebebe;
    font-size: 16px;
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #bebebe;
    font-size: 16px;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #bebebe;
    font-size: 16px;
  }
</style>
