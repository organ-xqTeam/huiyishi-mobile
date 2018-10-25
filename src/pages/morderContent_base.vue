<template>
  <div class="warp_main">
    <div class="upContentWrap">
      <div class="basic" style="margin-top:0;">
        <div class="basic_title mindex_top ac">预定信息</div>
        <div class="mindex_top table_top">
          <table class="mindex_table">
            <tr style="border-top: none;">
              <td class="table_name">主题</td>
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
              <td class="table_name">预定联系人</td>
              <td><input class="mindex_input" type="text" name="" v-model="ocreservename" readonly="readonly"></td>
            </tr>
            <tr>
              <td class="table_name">联系电话</td>
              <td><input class="mindex_input" type="number" name="" v-model="ocreservephone" readonly="readonly"></td>
            </tr>
            <tr>
              <td class="table_name">使用联系人</td>
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
        <a href="javascript:void(0)" @click="goSupplyPage">
          <button class="add_info toSupply blueBg" style="color:#fff;height:47px;border-radius:6px;margin-top:20px;">查看补充信息</button>
        </a>
      </div>
      <template v-cloak v-if="bg.length>0">
        <div class="look_goods" style="margin-top:0;">
          <div class="look_title ac" style="font-size:1.3em;">基础物品</div>
          <ul class="look_ul">
            <li v-for="(item,index) in bg" :key="index">{{item.bgname}} * <span>{{item.mNum}}</span></li>
          </ul>
        </div>
      </template>
      <template v-cloak v-else>
        <div class="look_goods" style="padding:5px 0;text-align:center;margin-top:0;">
          未选择基础物品
        </div>
      </template>
      <template v-cloak v-if="ag.length>0">
        <div class="look_goods">
          <div class="look_title ac" style="font-size:1.3em;">增值物品</div>
          <ul class="look_ul">
            <li v-for="(item,index) in ag" :key="index">{{item.agname}} * <span>{{item.mNum}}</span></li>
          </ul>
        </div>
      </template>
      <template v-cloak v-else>
        <div class="look_goods" style="padding:5px 0;text-align:center;">
          未选择增值物品
        </div>
      </template>

      <!-- 指派服务人员 -->
      <template v-cloak v-if="Number(queryInfo.otakeorder)==1&&
                              queryInfo.fromPage&&
                              queryInfo.fromPage=='service'&&
                              Number(queryInfo.orderstate)!==0">
        <div class="look_goods blueBg" style="border-radius:6px;" @click="goAssignSer">
          <div class="look_title ac" style="font-size:1.3em;">指派服务人员</div>
        </div>
        <!-- 展示选择的服务人员 -->
        <div class="serPerWrap" style="width:88%;margin:0 auto;">
          <label class="serPerItem" style="text-indent:1em;" v-for="(item,index) in selectedSerPerReal" :key="index">{{item.name}}</label>
        </div>
      </template>
      <!-- 指派服务人员 end -->

      <!-- 指定对接人员 -->
      <template v-cloak v-if="Number(queryInfo.otakeorder)==1&&
                              queryInfo.fromPage&&
                              queryInfo.fromPage=='service'&&
                              Number(queryInfo.orderstate)!==0&&

                              dataArry.length!==0&&
                              Number(dataArry[0].ocdockingstate)==1">
        <div class="look_goods blueBg" style="border-radius:6px;" @click="goAssignDocking">
          <div class="look_title ac" style="font-size:1.3em;">指定对接人员</div>
        </div>
        <!-- 展示选择的对接人员 -->
        <div class="serPerWrap" style="width:88%;margin:0 auto;">
          <label class="serPerItem" style="text-indent:1em;" v-cloak v-if="selectedDockingPer.name">{{selectedDockingPer.name}}</label>
        </div>
      </template>
      <!-- 指定对接人员 end -->

      <div class="kong"></div>
    </div>

    <!--下面按钮-->
    <div class="button_btn" style="position:static;">
      <!-- 普通用户 -->
      <template v-cloak v-if="queryInfo.fromPage&&queryInfo.fromPage=='member'">
        <button class="blueBg" v-cloak v-if="Number(queryInfo.otakeorder)==3&&dataArry[3]==null" @click="goComment">评价</button>
        <button class="blueBg" style="background-color:#c3c3c3;" v-cloak v-if="Number(queryInfo.otakeorder)==3&&dataArry[3]!==null">已评价</button>
        <button class="blueBg" v-cloak v-if="Number(queryInfo.opassstate)==3&&Number(queryInfo.orderstate)!==0" @click="goCancleTan">取消预定</button>
      </template>
      <!-- 审批部门 -->
      <template v-cloak v-if="queryInfo.fromPage&&queryInfo.fromPage=='approve'&&Number(queryInfo.orderstate)!==0">
        <button class="whiteBg" id="realPassBtn" v-cloak v-if="Number(queryInfo.opassstate)==3" @click="passCheck">通过</button>
        <button class="blueBg" v-cloak v-if="Number(queryInfo.opassstate)==3" @click="openRepulse">拒绝</button>
      </template>
      <!-- 服务部门 -->
      <!-- otakeorder 1未接单 2服务中 3已完成 -->
      <!-- otakeorder 服务状态(1.未接单 2.服务中3.服务完成  默认为1 ) -->
      <!-- orderstate;//订单状态(0.以取消 1.未取消  2.已完成   数据库默认未取消为1) -->
      <template v-cloak v-if="queryInfo.fromPage&&queryInfo.fromPage=='service'&&Number(queryInfo.orderstate)!==0">
        <button class="blueBg" id="submitTakeOrderBtn" v-cloak v-if="Number(queryInfo.otakeorder)==1" @click="submitTakeOrder">接单</button>
        <button class="blueBg" id="submitDockingBtn" v-cloak v-if="Number(queryInfo.otakeorder)==2&&
                      dataArry[0]&&
                      dataArry[0].ocdockingstate==1&&
                      Number(queryInfo.joinstate)==0" @click="submitDocking">对接</button>
        <template v-cloak v-if="Number(queryInfo.otakeorder)==3">
          <button class="whiteBg" @click="openGoodPage">修改物品</button>
          <button class="blueBg" id="submitChangeGood" @click="submitChangeGood">确认</button>
        </template>
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
      <div class="basic_title mindex_top ac">选择人员</div>
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
    <!-- 指定对接人员页面 /////////////////////////////////////////////////////////////////////////////////////// -->
    <div class="assignSer-page" v-cloak v-show="showDockingPage">
      <div class="basic_title mindex_top ac">选择人员</div>
      <div class="serPerWrap">
        <label class="serPerItem" v-for="(item,index) in serPerArr" :key="index">
          <input type="radio" :value="item" v-model="selectedDockingPer">
          <span>{{item.name}}</span>
        </label>
      </div>

      <!--下面按钮-->
      <div class="button_btn">
        <button class="blueBg" @click="confirmDockingPer">确认</button>
        <button class="whiteBg" @click="closeDockingPerPage">取消</button>
      </div>
      <!--下面按钮 end -->
    </div>
    <!-- 修改会议物品页面 /////////////////////////////////////////////////////////////////////////////////////// -->
    <div class="changeGood-page" v-cloak v-show="showChangeGoodPage&&basicLoaded&&addedLoaded">
      <div class="basic_title mindex_top ac" style="margin-bottom:5px;">修改物品</div>

      <h3 class="addGoodTitle">基础物品</h3>
      <div class="serPerWrap">
        <div class="dishes_item" v-for="(item,index) in basicGoodArr" :key="index">
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

      <h3 class="addGoodTitle">增值物品</h3>
      <div class="serPerWrap">
        <div class="dishes_item" v-for="(item,index) in addedGoodArr" :key="index">
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

      <!--选中的菜品-基础-->
      <div class="select_dishes clearfix" v-cloak v-if="selectedBasicGoodArr.length>0">
        <div class="select_dishes_item" v-for="(item,index) in selectedBasicGoodArr" :key="index">
          {{item.bgname}} * {{item.mNum==0?1:item.mNum}}
        </div>
      </div>
      <!--选中的菜品-增值-->
      <div class="select_dishes clearfix" v-cloak v-if="selectedAddedGoodArr.length>0">
        <div class="select_dishes_item" v-for="(item,index) in selectedAddedGoodArr" :key="index">
          {{item.agname}} * {{item.mNum==0?1:item.mNum}}
        </div>
      </div>

      <!--下面按钮-->
      <div class="button_btn">
        <button class="blueBg" @click="confirmGood">确认</button>
        <button class="whiteBg" @click="closeGoodPage">取消</button>
      </div>
      <!--下面按钮 end -->
    </div>
  </div>
</template>

<script>
  //----------------------------------------------------------------------
  export default {
    name: "morderContentBase",
    data() {
      return {
        Global: Global,

        queryInfo: {}, //页面传值item

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
        showSerPage: false,
        serPerArr: [],
        selectedSerPer: [], //选择的服务人员的index集合
        // selectedSerPerReal:[], //选择的服务人员item

        //指定对接人员页面
        showDockingPage: false,
        selectedDockingPer: {}, //选择的对接人员item

        //修改会议物品页面
        hasChangeGood: false, //是否修改物品了
        showChangeGoodPage: false,
        basicGoodArr: [],
        addedGoodArr: [],
        basicLoaded: false,
        addedLoaded: false,
        selectedBasicIndex: [], //目前没用
        selectedAddedIndex: [], //目前没用
        selectedBasicGoodArr: [], //选中的基础物品
        selectedAddedGoodArr: [] //选中的增值物品
      };
    },
    // watch:{
    //   selectedDockingPer(){
    //     console.log(this.selectedDockingPer)
    //   }
    // },
    computed: {
      selectedSerPerReal() {
        //选择的服务人员
        //选择的服务人员item
        let self = this;
        let arr = this.serPerArr.filter(function (obj, index) {
          return self.selectedSerPer.indexOf(index) > -1;
        });
        return arr;
      }
    },
    mounted() {
      this.getPageInfo();
      this.initDo();
    },
    activated() {
      if (localStorage.getItem("queryInfo") && localStorage.getItem("queryInfo") !== "") {
        console.log(11)
        let item = JSON.parse(localStorage.getItem("queryInfo"))
        this.queryInfo = item;
        localStorage.setItem("queryInfo", "")

        this.initDo();
      } else {
        console.log(22)
        this.getPageInfo();
        this.initDo();
      }
    },
    methods: {
      //页面传值获取数据
      getPageInfo() {
        let item = this.$route.query.item;
        console.log(item);
        this.queryInfo = item;
      },
      //页面加载
      initDo() {
        let self = this;
        let ocidData = this.$route.query.ocid;
        this.ocid = ocidData;
        let postData = {
          ocid: ocidData
        };
        Global.openLoading();
        this.axios
          .post(Global.host + "/order/selectOneInfo", this.qs.stringify(postData))
          .then(function (res) {
            Global.closeLoading();
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

            /*基础物品信息列表*/
            self.bg = self.dataArry[1].map(function (obj) {
              obj.bgname = obj.boname;
              obj.mNum = obj.bonum;
              return obj;
            });
            /*增值物品信息列表*/
            self.ag = self.dataArry[2].map(function (obj) {
              obj.agname = obj.aoname;
              obj.mNum = obj.aonum;
              obj.agprice = obj.aoprice;
              return obj;
            });

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
          .catch(function (res) {
            Global.closeLoading();
          });
      },
      //去补充信息页面
      goSupplyPage() {
        localStorage.setItem("queryInfo", JSON.stringify(this.queryInfo))

        this.$router.push({
          path: "/mlogin/memberlist/morderContent/base/supply",
          query: {
            ocid: this.ocid,
          }
        });
      },
      goComment() {
        let self = this;
        if (this.dataArry[3] == null) {
          // this.unlockRoom(function(){
          self.$router.push({
            path: "/mlogin/memberlist/morderContent/base/mreview",
            query: {
              ocid: this.ocid,
              rid: this.rid
            }
          });
          // })
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
        if (this.cancleContent.trim() == "") {
          alert("请输入取消原因");
          return;
        }

        let result = confirm("确定取消该订单？");
        if (!result) {
          return;
        }
        let postData = {
          ocid: self.ocid,
          cancleContent: self.cancleContent
        };
        console.log(postData);
        $("#realCancelBtn").addClass("eventsDisabled");
        $.ajax({
          type: "POST",
          url: "/order/memberUpdateOrder",
          data: postData,
          success: function (res) {
            $("#realCancelBtn").removeClass("eventsDisabled");
            console.log(res);
            if (Number(res) == 1) {
              alert("操作成功");
              $("#mySearch").modal("hide");

              // self.unlockRoom(function(){
              self.$router.go(-1);
              // })
            } else {
              alert("操作失败");
            }
          }
        });
      },
      passCheck() {
        let self = this;
        let result = confirm("确定通过该订单？");
        if (!result) {
          return;
        }
        //取出oid
        let oid = this.oid;
        let pass = 2;
        let postData = {
          oid: oid,
          pass: pass
        };
        console.log(postData);
        $("#realPassBtn").addClass("eventsDisabled");
        $.ajax({
          type: "POST",
          url: "/order/approveOrder",
          data: postData,
          success: function (res) {
            $("#realPassBtn").removeClass("eventsDisabled");
            console.log(res)
            if (Number(res) == 1) {
              alert("操作成功");

              // self.unlockRoom(function(){
              self.$router.go(-1);
              // })
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
        let self = this;
        // 先验证一下
        if (this.repulseContent.trim() == "") {
          alert("请输入拒绝原因");
          return;
        }

        let result = confirm("确定拒绝该订单？");
        if (!result) {
          return;
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
        $("#realRepulseBtn").addClass("eventsDisabled");
        $.ajax({
          type: "POST",
          url: "/order/approveOrder",
          data: postData,
          success: function (res) {
            $("#realRepulseBtn").removeClass("eventsDisabled");
            //console.log(res)
            if (Number(res) == 1) {
              alert("操作成功");
              $("#repulse").modal("hide");

              // self.unlockRoom(function(){
              self.$router.go(-1);
              // })
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
      //返回上一个路由
      routerGoback() {
        let self = this;
        // this.unlockRoom(function(){
        self.$router.go(-1);
        // })
      },
      //去指派人员页面
      goAssignSer() {
        let self = this;
        if (this.serPerArr.length == 0) {
          this.getSerPerArr(function () {
            self.showSerPage = true;
          });
        } else {
          this.showSerPage = true;
        }
      },
      //获取服务人员名单
      getSerPerArr(callback) {
        let self = this;
        Global.openLoading();
        this.axios
          .get(Global.host + "/servicepeo/selectServicepeoByOther")
          .then(function (res) {
            Global.closeLoading();
            console.log(res);
            let arr = res.data.staffList;
            if (arr.length == 0) {
              alert("当前无人员可选择");
              return;
            } else {
              self.serPerArr = arr;
              if (callback) {
                callback();
              }
            }
          })
          .catch(function (res) {
            Global.closeLoading();
          });
      },
      //关闭指派服务人员页面 并删除已选择的服务人员
      closeSerPerPage() {
        this.selectedSerPer = [];
        this.showSerPage = false;
      },
      //指派服务人员-确认
      confirmSerPer() {
        this.showSerPage = false;
      },
      //ajax指派服务人员
      submitAssignSer(callback) {
        let self = this;
        if (this.selectedSerPer.length > 0) {
          let idArr = this.selectedSerPerReal.map(function (obj) {
            return obj.id;
          });
          let postData = {
            ocid: Number(this.ocid),
            id: idArr,
            sertype: 1
          };
          console.log(postData);
          $.post(
            Global.host + "/servicepeo/insertServiceOrder",
            postData,
            function (res) {
              Global.closeLoading();
              console.log(res);
              if (res && Number(res) == 1) {
                if (callback) {
                  callback();
                }
              } else {
                alert("指派服务人员失败");
                return;
              }
            }
          );
        } else {
          if (callback) {
            callback();
          }
        }
      },
      //ajax指定对接人员
      submitAssignDocking(callback) {
        let self = this;
        if (JSON.stringify(this.selectedDockingPer) !== "{}") {
          let idArr = [];
          idArr[0] = this.selectedDockingPer.id;
          let postData = {
            ocid: Number(this.ocid),
            id: idArr,
            sertype: 2
          };
          console.log(postData);
          $.ajax({
            type: "POST",
            url: Global.host + "/servicepeo/insertServiceOrder",
            data: postData,
            success: function (res) {
              console.log(res);
              if (res && Number(res) == 1) {
                if (callback) {
                  callback();
                }
              } else {
                alert("指定对接人员失败");
                return;
              }
            }
          });
        } else {
          if (callback) {
            callback();
          }
        }
      },
      //ajax接单function
      submitTakeOrderFunc(callback) {
        var postData = {
          oid: Number(this.oid),
          otakeorder: 2 //（otakeorder状态为3）或者接单按钮（otakeorder状态为2） 数据库默认为1（未接单）
        };
        console.log(postData);
        $.ajax({
          type: "POST",
          url: Global.host + "/order/updateServiceComplete",
          data: postData,
          success: function (res) {
            console.log(res);
            if (callback) {
              callback(res);
            }
          }
        });
      },
      //ajax接单
      submitTakeOrder() {
        let self = this;
        let confirmStr = "";
        if (Number(this.dataArry[0].ocdockingstate) == 2) {
          //不需要对接
          if (this.selectedSerPer.length == 0) {
            confirmStr = "当前未选择服务人员，确认提交？";
          }
        } else if (Number(this.dataArry[0].ocdockingstate) == 1) {
          //需要对接
          if (
            this.selectedSerPer.length == 0 &&
            JSON.stringify(this.selectedDockingPer) == "{}"
          ) {
            //服务人员和对接人员 都没选择
            confirmStr = "当前未选择服务人员和对接人员，确认提交？";
          } else if (this.selectedSerPer.length == 0) {
            //没选服务人员，选了对接人员
            confirmStr = "当前未选择服务人员，确认提交？";
          } else if (JSON.stringify(this.selectedDockingPer) == "{}") {
            //选了服务人员，没选对接人员
            confirmStr = "当前未选择对接人员，确认提交？";
          }
        }
        if (confirmStr !== "") {
          var result = confirm(confirmStr);
          if (!result) {
            return;
          }
        }

        //ajax 先指派服务人员 再指定对接人员 再接单
        // Global.openLoading()
        console.log("开始ajax");
        $("#submitTakeOrderBtn").addClass("eventsDisabled");
        this.submitAssignSer(function () {
          self.submitAssignDocking(function () {
            self.submitTakeOrderFunc(function (res) {
              // Global.closeLoading()
              $("#submitTakeOrderBtn").removeClass("eventsDisabled");
              console.log(res);
              if (res && Number(res) == 1) {
                alert("接单成功");

                // self.unlockRoom(function(){
                self.$router.go(-1);
                // })
              } else {
                alert("操作失败");
              }
            });
          });
        });
      },

      //修改会议物品页面-------------------------------------------------
      //打开修改物品页面
      openGoodPage() {
        if (!this.basicLoaded) {
          this.getBasicGoodArr();
        }
        if (!this.addedLoaded) {
          this.getAddedGoodArr();
        }
        this.showChangeGoodPage = true;
      },
      //获取基础物品
      getBasicGoodArr() {
        let self = this;
        Global.openLoading();
        this.axios
          .get(Global.host + "/order/selectBgList")
          .then(function (res) {
            self.basicLoaded = true;
            if (self.basicLoaded && self.addedLoaded) {
              Global.closeLoading();
            }
            console.log(res);
            self.basicGoodArr = res.data.map(function (obj) {
              obj.mNum = 1;
              return obj;
            });
          })
          .catch(function (res) {
            console.log(res);
          });
      },
      //获取增值物品
      getAddedGoodArr() {
        let self = this;
        Global.openLoading();
        this.axios
          .get(Global.host + "/order/selectAgList")
          .then(function (res) {
            self.addedLoaded = true;
            if (self.basicLoaded && self.addedLoaded) {
              Global.closeLoading();
            }
            console.log(res);
            self.addedGoodArr = res.data.map(function (obj) {
              obj.mNum = 1;
              return obj;
            });
          })
          .catch(function (res) {
            console.log(res);
          });
      },
      //关闭修改物品页面
      closeGoodPage() {
        // //清空
        // this.selectedBasicGoodArr=[]
        // this.selectedAddedGoodArr=[]

        this.showChangeGoodPage = false;
      },
      //最后提交修改物品
      confirmGood() {
        //（查订单回来的叫boname，查物品回来的叫bgname）
        this.bg = this.selectedBasicGoodArr;
        this.ag = this.selectedAddedGoodArr;

        this.hasChangeGood = true;
        this.showChangeGoodPage = false;
      },
      //最后点击确定 ajax修改物品
      submitChangeGood() {
        let self = this;
        if (!this.hasChangeGood) {
          return;
        }
        let result = confirm("确认修改物品");
        if (!result) {
          return;
        }
        //基础物品
        let bonameArr;
        let bonumArr;
        if (this.selectedBasicGoodArr.length == 0) {
          bonameArr = null;
          bonumArr = null;
        } else {
          bonameArr = this.selectedBasicGoodArr.map(function (obj) {
            return obj.bgname;
          });
          bonumArr = this.selectedBasicGoodArr.map(function (obj) {
            return obj.mNum;
          });
        }
        //增值物品
        let aonameArr;
        let aonumArr;
        let aopriceArr;
        if (this.selectedAddedGoodArr.length == 0) {
          aonameArr = null;
          aonumArr = null;
          aopriceArr = null;
        } else {
          aonameArr = this.selectedAddedGoodArr.map(function (obj) {
            return obj.agname;
          });
          aonumArr = this.selectedAddedGoodArr.map(function (obj) {
            return obj.mNum;
          });
          aopriceArr = this.selectedAddedGoodArr.map(function (obj) {
            return obj.agprice;
          });
        }

        let postData = {
          ocid: Number(this.ocid),

          boname: bonameArr,
          bonum: bonumArr,

          aoname: aonameArr,
          aonum: aonumArr,
          aoprice: aopriceArr
        };
        console.log(postData);
        $("#submitChangeGood").addClass("eventsDisabled");
        this.axios
          .post(
            Global.host + "/order/updateGoodsOrder",
            this.qs.stringify(postData)
          )
          .then(function (res) {
            $("#submitChangeGood").removeClass("eventsDisabled");
            console.log(res);
            if (res.data && Number(res.data) == 1) {
              alert("操作成功");

              self.$router.go(-1);
            }
          })
          .catch(function (res) {
            $("#submitChangeGood").removeClass("eventsDisabled");
            console.log(res);
          });
      },
      //点击加号
      plusGood(item) {
        item.mNum++;
      },
      //点击减号
      minusGood(item) {
        item.mNum--;
        if (item.mNum == 0) {
          item.mNum = 1;
        }
      },
      //指定对接人员---------------------------
      //打开对接人员选择页面
      goAssignDocking() {
        let self = this;
        if (this.serPerArr.length == 0) {
          this.getSerPerArr(function () {
            self.showDockingPage = true;
          });
        } else {
          this.showDockingPage = true;
        }
      },
      //点击对接人员页面确定
      confirmDockingPer() {
        this.showDockingPage = false;
      },
      //点击对接人员页面取消
      closeDockingPerPage() {
        this.selectedDockingPer = {};
        this.showDockingPage = false;
      },
      // //给这个room解锁
      // unlockRoom(callback){
      //   console.log("解锁会议室")
      //   let postData={
      //     rid:Number(this.rid)
      //   }
      //   console.log(postData)
      //   this.axios.post(Global.host+'/user/releaseRoom',this.qs.stringify(postData))
      //   .then(function(res){
      //     console.log(res)
      //     callback()
      //   })
      //   .catch(function(res){
      //     console.log(res)
      //   })
      // },
      //ajax对接
      submitDocking() {
        let self=this
        let result=confirm("确认对接完成？")
        if(!result){
          return
        }
        let postData = {
          oid: Number(this.oid),
        }
        console.log(postData)
        $("#submitDockingBtn").removeClass("eventsDisabled");
        this.axios
          .post(
            Global.host + "/order/completeJoin",
            this.qs.stringify(postData)
          )
          .then(function (res) {
            $("#submitDockingBtn").removeClass("eventsDisabled");
            console.log(res);
            if (res.data && Number(res.data) == 1) {
              alert("操作成功");

              self.$router.go(-1);
            }
          })
          .catch(function (res) {
            $("#submitDockingBtn").removeClass("eventsDisabled");
            console.log(res);
          });
      },
    } //methods end
    // beforeDestroy() {
    //   this.unlockRoom()
    // },
  };
</script>

<style scoped>
  @import "../assets/css/bootstrap.min.css";
  @import "../assets/css/reset.css";
  @import "../assets/css/mindex.css";
  @import "../assets/css/mdetail.css";
  @import "../assets/css/mindex_goods.css";

  /* 为了下面的按钮不fixed 解决问题：服务人员被按钮挡住，需要滚动才能显示 */
  .upContentWrap {
    min-height: calc(100% - 51px);
  }

  .noDataTip {
    line-height: 50px;
    text-align: center;
  }

  .whiteBg {
    background-color: #fff;
    color: #000;
  }

  .blueBg {
    background-color: #2ec5c4;
    color: #fff;
  }

  .warp_main {
    height: 100vh;
    overflow-y: auto;
  }

  /* 指派服务人员页面 */
  .assignSer-page,
  .changeGood-page {
    position: fixed;
    top: 0;
    bottom: 50px;
    left: 0;
    right: 0;
    background-color: #f1f5f6;
    z-index: 7;
  }

  .serPerWrap {
    display: flex;
    flex-wrap: wrap;
  }

  .serPerItem {
    flex: 0 0 calc(33.3333% - 10px);
    display: flex;
    align-items: center;
    line-height: 30px;
    background-color: #fff;
    margin: 5px;
    box-shadow: 0 0 2px 0 rgba(214, 214, 214, 0.5);
    font-weight: normal;
  }

  .serPerItem>input {
    margin: 0 5px;
  }

  /* 新增的物品item */
  .addGoodTitle {
    line-height: 30px;
    text-align: center;
    background-color: #fff;
    font-size: 17px;
  }

  .dishes_item {
    flex: 0 0 calc(50% - 6px);
  }

  .dishes_text,
  .dishes_text {
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .dishes_text_name,
  .dishes_text_name {
    margin-bottom: 0;
  }

  .item_text_num,
  .item_text_num {
    margin-top: 8px;
  }

  .item_text_num .num_add,
  .item_text_num .num_minus,
  .item_text_num .num_add,
  .item_text_num .num_minus {
    padding: 0 10px;
    font-size: 18px;
  }

  /* 选中的物品 */
  .select_dishes {
    position: static;
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
</style>
