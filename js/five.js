// 视频层
$(function(){

        // 模块一遮罩层
        $(".play").on("mouseover",function(){
            $(".zhezhao1").css("opacity","0.2");
            $('.zhezhao1').css("transition","all 1.5s")
        }),$(".play").on("mouseout",function(){
            $(".zhezhao1").css("opacity","0.6");
        })
	    // 微信二维码
		$(".way img:eq(1)").mouseover(function(){
		    $(".erweima").css("display","block");
		}),$(".way img:eq(1)").mouseout(function(){
		    $(".erweima").css("display","none");
		})
        //下载的二维码
        $(".download a:eq(2)").mouseover(function(){
            $(".erweima2").css("display","block");
        }),$(".download a:eq(2)").mouseout(function(){
            $(".erweima2").css("display","none");
        })

    /*获取视频对象dom*/
    var video = document.querySelector('video');
    /*做操作*/
    var $switch = $('.switch');
    var $expand = $('.expand');

    var $line = $('.line');
    var $bar = $('.bar');

    var $current = $('.current');
    var $total = $('.total');

    var timeFormat = function(time){
        /*00:00:00*/
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = Math.floor(time%60);

        return (h>=10?h:'0'+h)+':'+(m>=10?m:'0'+m)+':'+(s>=10?s:'0'+s);
    };

    /*1.加载中*/
    video.oncanplay = function(){
        console.log('ok');
        video.style.display = 'block';
        /*显示总时长*/
        $total.html(timeFormat(video.duration));
    };


// --------视频触发按钮start
    $(".play").click(function(){
        $(".player").css("display","block");
        video.play();
        $switch.removeClass('fa-play').addClass('fa-pause');
    })
// -----------视频触发按钮end


    /*2.点击播放*/ /*3.点击暂停*/
    $switch.on('click',function(){
        if($switch.hasClass('fa-play')){
            /*2.点击播放**/
            video.play();
            $switch.removeClass('fa-play').addClass('fa-pause');
        }else{
            /*3.点击暂停*/
            video.pause();
            $switch.removeClass('fa-pause').addClass('fa-play');
        }
    });

    /*4.显示播放进度*/
    video.ontimeupdate = function(){
        /*获取当前播放的时间点*/
        $line.css('width',video.currentTime/video.duration*100+'%');
        /*5.显示当前的播放时间*/
        $current.html(timeFormat(video.currentTime));
    }

    /*6.视频跃进*/
    $bar.on('click',function(e){
        video.currentTime = e.offsetX/$bar.width()*video.duration;
    });

    /*7.全屏*/
    $expand.on('click',function(){
        video.webkitRequestFullScreen();
    });

    /*8.播放结束*/
    video.onended = function(){
        video.currentTime = 0;
        $line.css('width',0);
        $current.html('00:00:00');
        $switch.addClass('fa-play').removeClass('fa-pause');
    }

    $(".close").click(function(){
        $(".player").css("display","none");
        video.pause();
        $switch.removeClass('fa-pause').addClass('fa-play');
    })

});

window.onload = function () {
    // 头部导航
    var ul = document.getElementsByClassName("model")[0];
    var ol = document.getElementsByClassName("nav")[0];
    var ulLiArr = ul.getElementsByClassName("s-model");
    var olLiArr = ol.getElementsByTagName("li");
    var target=0,leader=0,timer=null;
    var arrColor = [1,2,3,4,5];
    for(var i=0;i<arrColor.length;i++){
        olLiArr[i].index = i;
        olLiArr[i].onclick = function () {
            // 删除线
            // $(this).children('i').css("display","block").parent("li").siblings('li').children('i').css("display","none");
            // $(this).css("color","#4FE3C3").siblings('li').css("color","#fff");
            target = ulLiArr[this.index].offsetTop;
            clearInterval(timer);
            timer = setInterval(function () {
                var step = (target-leader)/10;
                step = step>0?Math.ceil(step):Math.floor(step);
                leader += step;
                window.scrollTo(0,leader);
                if(leader === target){
                    clearInterval(timer);
                }
            },30);
        }
    }
    // window.onscroll = function () {
    //     leader = scroll().top;
    // }
    // 
    // 
    // 
    // 滚动事件  头部导航  
    var m_st, m_po = 600; //滚动到600像素时显示
    $(window).scroll(
        function () {
            m_st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
            if (m_st > m_po) {
                $('.nav').css("background-color","#000");
                $('.nav').css("opacity",0.6);
                $('.nav').css("transition","all 2s")
                $('.nav').css("padding-top",0);
                $('.nav').css("box-shadow","0 1px 10px #fff");
            }else{
                $('.nav').css("background-color","transparent");
                $('.nav').css("opacity",1);
                $('.nav').css("padding-top","1.5rem");
                $('.nav').css("transition","all 1s");
                 $('.nav').css("box-shadow","0 0 0 #fff");
            }
        })
    //social模块  3
    var m_st3, m_po3 =800; //滚动到800像素时显示
    $(window).scroll(
        function () {
            m_st3 = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
            if (m_st3 > m_po3&& m_st3<m_po1) {
                $('.nav>li:eq(1)>i').fadeIn(500).parent("li").siblings('li').children('i').fadeOut();
                $(".nav>li:eq(1)").css("color","#4FE3C3").siblings('li').css("color","#FFF");
            }else if(m_st3<= m_po3){
                $('.nav>li:eq(0)>i').fadeIn(500).parent("li").siblings('li').children('i').fadeOut();
                $(".nav>li:eq(0)").css("color","#4FE3C3").siblings('li').css("color","#FFF");
                $('.nav>li:eq(1)>i').hide();
                 $(".nav>li:eq(1)").css("color","#FFF")
            }else{
                $('.nav>li:eq(0)>i').hide();
                 $(".nav>li:eq(0)").css("color","#FFF")
                $('.nav>li:eq(1)>i').hide();
                 $(".nav>li:eq(1)").css("color","#FFF")
            }
        }) 
    //function模块 1
    var m_st1, m_po1 =2000; //滚动到2000像素时显示
    $(window).scroll(
        function () {
            m_st1 = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
            if (m_st1 >= m_po1&&m_st1<=m_po2) {
                $('.givemefive2').show(1000);
                $('.nav>li:eq(2)>i').fadeIn(500).parent("li").siblings('li').children('i').fadeOut();
                $(".nav>li:eq(2)").css("color","#4FE3C3").siblings('li').css("color","#FFF");
            }else{
                $('.givemefive2').fadeOut(1000);
                 $('.nav>li:eq(2)>i').hide();
                 $(".nav>li:eq(2)").css("color","#FFF")
            }
        }) 

    //F-sport模块  2
    var m_st2, m_po2 =3050; //滚动到3050像素时显示
    $(window).scroll(
        function () {
            m_st2 = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
            if (m_st2 >= m_po2&&m_st2<=m_po4) {
                $('.givemefive3').show(1000);
                $('.material').show(1500);
                 $('.nav>li:eq(3)>i').fadeIn(500).parent("li").siblings('li').children('i').fadeOut();
                $(".nav>li:eq(3)").css("color","#4FE3C3").siblings('li').css("color","#FFF");
            }else{
                $('.givemefive3').fadeOut(1000);
                $('.material').slideUp(1000);
                $('.nav>li:eq(3)>i').hide();
                $(".nav>li:eq(3)").css("color","#FFF")
            }
        })   


    //遇见模块  4
    var m_st4, m_po4 =4050,m_po5=5400; //滚动到4050像素时显示
    $(window).scroll(
        function () {
            m_st4 = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
            if (m_st4 >= m_po4&&m_st4<=m_po5) {
                $('.nav>li:eq(4)>i').fadeIn(500).parent("li").siblings('li').children('i').fadeOut();
                $(".nav>li:eq(4)").css("color","#4FE3C3").siblings('li').css("color","#FFF");
            }else{
                $('.nav>li:eq(4)>i').hide();
                $(".nav>li:eq(4)").css("color","#FFF")
            }
        })   


 
}

