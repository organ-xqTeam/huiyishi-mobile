<template>
  <div class="mforget-page">
    <div class="mlogin_title ac">忘记密码</div>
    <div class="mlogin_input ac">
      <span class="iconfont icon-iconzh"></span>
      <input class="" type="text" name="" placeholder="填写手机号码">
    </div>
    <div class="mlogin_input ac">
      <span class="iconfont icon-yuechi"></span>
      <input class="" type="text" name="" placeholder="请输入验证码">
      <button class="mlogin_input_btn">获取验证码</button>
    </div>
    <div class="mlogin_input ac">
      <span class="iconfont icon-mima"></span>
      <input class="" type="text" name="" placeholder="输入新密码">
    </div>
    <div class="mlogin_input ac">
      <span class="iconfont icon-mima"></span>
      <input class="" type="text" name="" placeholder="确认新密码">
    </div>
    <div class="mlogin_btn ac">
      <button>完成</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "mforget",
  data() {
    return {
    }
  },
  mounted() {},
  methods: {
  } //methods end
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/reset.css";
@import "../assets/css/mlogin.css";
</style>
