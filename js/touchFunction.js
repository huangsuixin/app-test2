/**
 * Created by Silence on 2016/12/26.
 */
var nowIndex = 1;   //当前页面序号
var pageCount = $('.page').length;  //页面总数
var startY,endY,moveY;
var didMove = false;    //标记是否发生滑动
$('.page').on('touchstart touchmove touchend',function (e) {

    switch (e.type){
        case 'touchstart':
            startY = e.originalEvent.touches[0].clientY;
            break;
        case 'touchmove':
            endY = e.originalEvent.touches[0].clientY;
            didMove = true;
            break;
        case 'touchend':
            //end  里面没有clientY;
            moveY = endY-startY;

            if (moveY<0){//下一页
                if (!didMove) return;
                didMove = false;
                if (nowIndex==pageCount) return;    //向下翻到最后一页
                nowIndex++;

                $(this).addClass('toTop').next().removeClass('hidden').addClass('nextTop');
                //监听动画结束事件      只适用于当前页面向下滚动
                $(this).on('webkitAnimationEnd',function () {
                    $(this).removeClass('toTop').addClass('hidden').next().removeClass('nextTop');
                    $(this).off('webkitAnimationEnd');      //向下滚动后关闭监听事件
                })
            }else {//上一页
                if (!didMove) return;
                didMove = false;
                if (nowIndex==1) return;    //向上翻到第一页
                nowIndex--;
                $(this).addClass('toBottom').prev().removeClass('hidden').addClass('prevBottom');
                $(this).on('webkitAnimationEnd',function () {
                    $(this).removeClass('toBottom').addClass('hidden').prev().removeClass('prevBottom');
                    $(this).off('webkitAnimationEnd');
                })
            }
            break;
    }
});
