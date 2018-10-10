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
			<span class="review_name">0分</span>
		</div>
		<!--评价-->
		<div class="judge">
			<h1 class="review_title">服务评价</h1>
			<textarea placeholder="其他意见及建议…"  v-model="commentText"></textarea>
		</div>
	</div>
	<div class="kong"></div>
	<div class="button_btn" style="border: none;">
		<button class="add_info cancle toDetail" @click="sendSubmit">提交</button>
    </div>
</div>
</template>
<style scoped>
    @import "../assets/css/bootstrap.min.css";
    @import "../assets/css/iconfont.css";
    @import "../assets/css/reset.css";
    @import "../assets/css/mindex.css";
    @import "../assets/css/mreview.css";
</style>
<script>
    import "../assets/js/jquery.min.js";
    import "../assets/js/bootstrap.min.js";
    // import "../assets/js/vue.js";
    export default {
        data(){
            return {
                starArr:[0,0,0,0,0],

                commentText:"",

                indexReal: 0,

                ocid:this.$route.query.ocid,

                rid:this.$route.query.rid
            }
        },
        watch:{
            commentText(){
                //console.log(this.commentText)
            }
        },
        methods:{        
            addStart(index){
                console.log(index)
                this.indexReal = index+1
                $(".list_table_star li").click(function() {
                    var num = $(this).index();
                    var elements = document.getElementsByClassName('iconfont icon-xingxing');
                    for (var i = 0; i < 5; i++) {
                        var dom = elements[i];
                        $(dom).removeClass("icon_pre");
                        $('.review_name').html(num+1 +'分')
                    }
                    for (var i = 0; i < elements.length; i++) {
                        if (i <= num) {
                            var dom = elements[i];
                            $(dom).addClass("icon_pre");
                        }
                    }
                })
                //console.log(3)
                this.starArr.forEach(function(num,index0){
                    //console.log(index0,index)
                    if(index0<index){
                        num=1
                    }else{
                        num=0
                    }
                })
                //console.log(this.starArr)
            },
            sendSubmit(){

                let check = this.checkRe()
                if(check == 0){
                    return;
                }
                let commentText = this.commentText.trim()
                let indexReal = this.indexReal
                
                let postData = {
                    cmcontent: commentText,
                    cmgrade:indexReal,
                    rid:this.rid,
                    ocid:this.ocid,
                }
                console.log(postData)
                this.axios.post('/comment/insertOneComment',this.qs.stringify(postData))
                .then(function(res){
                    console.log(res)
                })
            },
            checkRe(){
                let text = this.commentText.trim();
                if(text == null || text.length == 0){
                    alert("评论内容不能为空")
                    return 0;
                }
            }
        }

    }
</script>