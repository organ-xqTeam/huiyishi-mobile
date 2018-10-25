<template>
  <div class="mlogin-page">
    <div class="mlogin_title ac">登录会议室预定</div>
    <div class="mlogin_input ac">
      <span class="iconfont icon-iconzh"></span>
      <input class="" type="text" name="" v-model="name" placeholder="账号">
    </div>
    <div class="mlogin_input ac">
      <span class="iconfont icon-mima"></span>
      <input class="" type="password" name="" v-model="password" placeholder="请输入密码">
    </div>
    <div class="mlogin_btn ac">
      <button @click="login">登录</button>
    </div>
    <div class="mlogin_forget ar">
      <router-link to="/mforget" style="color: #aaa;">忘记密码?</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mlogin",
    data() {
      return {
        name: "",
        password: "",

        state: "",
      }
    },
    mounted() {
    },
    methods: {
      login() {
        let self = this
        //获取用户名密码
        let name = this.name.trim()
        let password = this.password.trim()
        if (name == "" || password == "") {
          alert("登录信息请填写完整")
          return
        }
        let postData = {
          interfaceNum: "1", //暂时默认
          userNames: name,
          password: password,
        }
        console.log(postData)
        Global.openLoading()
        this.axios.get(`${Global.host}/user/login?interfaceNum=${postData.interfaceNum}&userNames=${postData.userNames}&password=${postData.password}`)
          .then(function (response) {
            console.log(response);
            let state = Number(response.data)
            self.state = state
            // return

            //获取用户信息
            self.getMyInfo(function () {
              //1.普通用户 2.主管部门 3.服务部门 4.没有权限的 5.管理员 6.用户不存在
              Global.closeLoading()
              if (state == 6) {
                alert("用户不存在")
              } else {
                //保存用户信息
                localStorage.setItem("userRight", state)
                //跳转页面
                // let url = ""
                // switch (state) {
                //   case 1:
                //     url = "../member/index.html"
                //     break
                //   case 2:
                //     url = "../approval/approval.html"
                //     break
                //   case 3:
                //     url = "../service/service.html"
                //     break
                //   case 4:
                //     // alert("该用户没有权限")
                //     url = "../member/index.html"
                //     break
                //   case 5:
                //     //管理员页面？
                //     break
                //   default:
                //     break
                // }
                // url="/mindex/mindexBook/mindexBasic"
                self.$router.push({
                  path: "/mlogin/mindex"
                })
              }
            })
          })
          .catch(function (error) {
            Global.closeLoading()
            console.log(error);
          });
      },
      //获取我的信息 把用户信息保存到localstorage
      getMyInfo(callback) {
        let self = this
        let url = Global.host + "/user/outPutSession"
        this.axios.get(url)
          .then(function (res) {
            console.log(res)
            //保存自己的用户信息到localstorage
            var mUserInfo = res.data
            mUserInfo.state = self.state //保存权限
            // mUserInfo.state=2 //测试用 审批部门
            // mUserInfo.state=3 //测试用 服务部门
            localStorage.setItem("mUserInfo", JSON.stringify(mUserInfo))

            if (callback) {
              callback()
            }
          })
          .catch(function (res) {
            console.log(res)
          })
      },
    } //methods end
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../assets/css/mlogin.css";

  body {
    background-color: #fff;
  }

  .icon-iconzh,
  .icon-mima {
    position: relative;
    top: 3px;
  }
</style>
