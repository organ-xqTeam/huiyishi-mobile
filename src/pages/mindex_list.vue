<template>
  <div class="mindexList-page">
    <ul class="mlist_tab">
      <li class="mlist_tab_act">待审核</li>
      <li>已通过</li>
      <li>未通过</li>
      <li>已完成</li>
    </ul>


    <!-- 主要列表 -->
    <div class="mindex_list">
      <a href="mindex_book.html" class="mindex_item">
        <div class="mindex_item_name">1003会议室</div>
        <div class="mindex_item_info" style="margin-bottom: 8px;">没有预定信息</div>
        <div class="mindex_item_info">预订人 <span class="mindex_item_fr fr">待审核</span></div>
      </a>
      <a href="mindex_book.html" class="mindex_item">
        <div class="mindex_item_name">1003会议室</div>
        <div class="mindex_item_info" style="margin-bottom: 8px;">没有预定信息</div>
        <div class="mindex_item_info">预订人 <span class="mindex_item_fr fr">待审核</span></div>
      </a>
      <a href="mindex_book.html" class="mindex_item">
        <div class="mindex_item_name">1003会议室</div>
        <div class="mindex_item_info" style="margin-bottom: 8px;">没有预定信息</div>
        <div class="mindex_item_info">预订人 <span class="mindex_item_fr fr">待审核</span></div>
      </a>
      <div class="kong"></div>
    </div>
    <!-- 下方按钮 -->
    <div class="kong"></div>
    <div class="button_btn">
      <router-link class="mindex_tab" to="/mindex" style="font-size: 1em;"><i class="iconfont icon-shouye"></i> <br>首页</router-link>
      <router-link class="mindex_tab mycolor" to="/mindexList" style="font-size: 1em;"><i class="iconfont icon-liebiao"></i><br>我的预定</router-link>
    </div>
  </div>
</template>

<script>
import "../assets/css/bootstrap.min.css";
import "../assets/css/bootstrap-datetimepicker.min.css"

import "../assets/css/iconfont.css";
import "../assets/css/reset.css";

import '../assets/js/bootstrap-datetimepicker.min'
import '../assets/js/bootstrap-datetimepicker.zh-CN'
// import '../assets/js/moment-with-locales.js'

export default {
  name: "mindexBook",
  data() {
    return {
    }
  },
  mounted() {
    this.initSome()
  },
  methods:{
    //初始化时间选择器
    initSome(){
      $('.mlist_tab li').click(function () {
        $(this).addClass('mlist_tab_act');
        $(this).siblings().removeClass('mlist_tab_act');
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
@import "../assets/css/mlist.css";

.mSelected{
  background-color: #eaf9f9;
}
</style>
