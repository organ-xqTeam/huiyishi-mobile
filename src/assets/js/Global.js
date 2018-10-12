let loadingImg=require("../images/loading.gif")

let Global=(function(){
  // let host="" //本地为空
  let host=""
  function openLoading(){
    if($(".mLoading").length==0){
        var $div=$('<div class="mLoading" style="position:fixed;top:0;bottom:0;left:0;right:0;background-color: rgba(0,0,0,0.2);z-index:999;"><img src="'+loadingImg+'" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);"></div>')
        $("body").append($div)
    }
  }
  function closeLoading(){
      if($(".mLoading").length>0){
          $(".mLoading").remove()
      }
  }
  //date转格式
  function dateToFormat(date) { //date类型
      Y = date.getFullYear() + '-';
      M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + ' ';
      h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ':';
      m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
      // s = date.getSeconds();
      return Y + M + D + h + m;
  }
  //获取是星期几
  function getWeekDay(date){ //date类型
      var weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      return weekDay[date.getDay()]
  }
  //-------------------------------------
  return{
    host,
    openLoading,
    closeLoading,
    dateToFormat,
    getWeekDay,
  }
})()

window.Global=Global
