<template>
  <div class="wrap_main">
    <div class="wrap">
      <!--星星行-->
      <div>
        <span class="review_title">服务评分</span>
        <ul class="list_table_star">
          <li v-for="(item,index) in starArr" :key="index">
            <i class="iconfont icon-xingxing i" :class="{icon_pre:Number(item)==1}" @click="addStart(index)"></i>
          </li>
        </ul>
        <span class="review_name">{{indexReal==9?0:Number(indexReal)+1}}分</span>
      </div>
      <!--评价-->
      <div class="judge">
        <h1 class="review_title">服务评价</h1>
        <textarea style="background-color:#fff;" placeholder="其他意见及建议…"
                  v-model="commentText"></textarea>
      </div>
    </div>
    <div class="kong"></div>

    <!--下面按钮-->
    <div class="button_btn">
      <!-- <button class="add_info cancle toDetail" @click="sendSubmit">提交</button> -->

      <button class="blueBg" @click="sendSubmit">提交</button>
      <button class="whiteBg" @click="routerGoback">返回</button>
    </div>
    <!--下面按钮 end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      //星评
      starArr: [0, 0, 0, 0, 0],
      indexReal: 9, //初始默认给一个不存在的index

      commentText: "",

      ocid: this.$route.query.ocid,
      rid: this.$route.query.rid
    };
  },
  methods: {
    //点击星评
    addStart(index) {
      console.log(index);
      this.indexReal=index
      // this.indexReal = index + 1;
      // $(".list_table_star li").click(function() {
      //   var num = $(this).index();
      //   var elements = document.getElementsByClassName(
      //     "iconfont icon-xingxing"
      //   );
      //   for (var i = 0; i < 5; i++) {
      //     var dom = elements[i];
      //     $(dom).removeClass("icon_pre");
      //     $(".review_name").html(num + 1 + "分");
      //   }
      //   for (var i = 0; i < elements.length; i++) {
      //     if (i <= num) {
      //       var dom = elements[i];
      //       $(dom).addClass("icon_pre");
      //     }
      //   }
      // });
      let arrTemp=this.starArr.map(function(num,numIndex){
        if(numIndex<=index){
          return 1
        }else{
          return 0
        }
      })
      console.log(arrTemp)
      this.starArr=arrTemp
    },
    sendSubmit() {
      console.log(this.rid);
      //验证下评论内容
      let check = this.checkRe();
      if (check == 0) {
        return;
      }

      let commentText = this.commentText.trim();
      let indexReal = this.indexReal;

      let postData = {
        cmcontent: commentText,
        cmgrade: indexReal,
        rid: this.rid,
        ocid: this.ocid
      };
      console.log(postData);
      this.axios
        .post(
          Global.host + "/comment/insertOneComment",
          this.qs.stringify(postData)
        )
        .then(function(res) {
          console.log(res);
        });
    },
    checkRe() {
      let text = this.commentText.trim();
      if (text == null || text.length == 0) {
        alert("评论内容不能为空");
        return 0;
      }
    },
    routerGoback(){
      //返回上一个路由
      this.$router.go(-1)
    }
  }, //methods end
};
</script>

<style scoped>
@import "../assets/css/bootstrap.min.css";
@import "../assets/css/reset.css";
@import "../assets/css/mindex.css";
@import "../assets/css/mreview.css";

.whiteBg{
  background-color: #fff;
  color: #000;
}
.blueBg{
  background-color: #2ec5c4;
  color: #fff;
}
</style>
