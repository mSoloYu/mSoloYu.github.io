/**
 * 定义 1. 页面整体结构; 2. window 全局变量; 3. 相关 CSS Hack
 */
define(['jquery', 'EventUtil', 'VrWuspace'], function ($, EventUtil, VrWuspace){

  // home, aboutus, service, incubator, vrnews, team
  // var pageIndex = [0,1,2,3,4,5];    // 切换屏幕索引值
  var currentPage = 0;
  var scrollStep = 50;
  var pageReady = true;   // 屏幕切换后是否准备好（比如动画效果）

  var startY = 0;
  var isFirstTop = false;     // 滚轮切换屏幕第一次滚动到顶部
  var isSecondTop = false;    // 第二次切换屏幕
  var isFirstBottom = false;
  var isSecondBottom = false;

  var isStopScroll = false;     // 切换顶部菜单（“联系我们”）时停止滚轮切换屏幕

  // 向上滚动或滑动
  var upWheel = function() {
    // console.log('document.body.scrollTop = ' + document.body.scrollTop + ', pageReady = ' + pageReady)
    setTimeout(function() {pageReady = true; },1000);
    if (!pageReady) { return; }
    if (document.body.scrollTop <= 0) {
      pageReady = false;
      switch (currentPage) {
        default: break;
        case 1:
          currentPage -= 1;
          VrWuspace.gotoHome();
          break;
        case 2:
          currentPage -= 1;
          VrWuspace.gotoAboutUs();
          break;
        case 3:
          currentPage -= 1;
          VrWuspace.gotoService();
          break;
        case 4:
          currentPage -= 1;
          VrWuspace.gotoIncubator();
          break;
        case 5:
          currentPage -= 1;
          VrWuspace.gotoVrNews();
          break;
      }
      currentPage == 0 && VrWuspace.initCross();
      document.body.scrollTop = 0;
      handleFooter(false);
    } else {
      if ($('footer').length == 0) {
        document.body.scrollTop -= scrollStep;
      } else {
        handleFooter(false);
      }
    }
  }

  // 向下滚动或滑动
  var downWheel = function() {
    if ((window.innerHeight + document.body.scrollTop) >= document.body.scrollHeight) {
      setTimeout(function() {pageReady = true; },1000);
      if ($('footer').length == 0 && handleFooter(true)) {
        return;
      }
      if (!pageReady) { return; }
      switch (currentPage) {
        case 0:
          currentPage += 1;
          VrWuspace.gotoAboutUs();
          break;
        case 1:
          currentPage += 1;
          VrWuspace.gotoService();
          break;
        case 2:
          currentPage += 1;
          VrWuspace.gotoIncubator();
          break;
        case 3:
          currentPage += 1;
          VrWuspace.gotoVrNews();
          break;
        case 4:
          currentPage += 1;
          VrWuspace.gotoInTeam();
          break;
        default:
          return ;
      }
      handleFooter(false);
      pageReady = false;
      currentPage != 0 && VrWuspace.removeCrossHandler();
      document.body.scrollTop = 0;
    } else {
      document.body.scrollTop += scrollStep;
    }
  }

  // 处理后期添加的需求：备案号
  var handleFooter = function(footerNeedCreated){
    $('footer').detach();
    $('.vr-nav-bottom-layout').removeAttr('style');
    if (window.isMobile && currentPage != 5) {
      return false;
    }
    if (window.isMobile && currentPage == 5){
      $('.vr-nav-bottom-layout').fadeIn(500);
    }

    if ($('footer').length == 0 && footerNeedCreated) {
      if (!window.isMobile || currentPage == 5) {
        $('body').append('<footer><span>Copyright ©2015 District 10 VRAR All Rights Reserved </span><span>京ICP备15034822号-2</span></footer>');
        $('.vr-nav-bottom-layout').css({'height': '3.38375rem'});
      }
      if (window.isMobile && currentPage == 5) {
        $('.vr-nav-bottom-layout').fadeOut(500);
      }
      return true;
    }
    return false;
  }

  window.isMobile = false; //initiate as false
  // device detection
  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) window.isMobile = true;

  if (!window.isMobile) {
    var $video = $('<video id="vrBgVideo" src="http://oa8bfh8lr.bkt.clouddn.com/vrweb" type="video/mp4" preload autoplay loop class="video-play"></video>')
    $("body").append($video);
    $("body").one("touchstart load",function(){
      var $vrBgVideo = document.getElementById("vrBgVideo");
      $vrBgVideo.play();
    }).trigger("load");

    var $cross = $('<div class="cross-layout hidden"><hr class="cross-x border-image-1px"><hr class="cross-y border-image-1px"><a id="crossPointer" class="cross-pointer hi-icon"></a><a id="crossPointerSmall" class="cross-pointer-small hi-icon-small"></a></div>');
    $('body').append($cross);
    $('.cross-layout').show();

    var wheelHandler = function(isUp) {
      // console.log('1 = ' + document.body.scrollHeight + ', 2 = ' + window.innerHeight + ', 3 = ' +  document.body.scrollTop);
      if (isUp) {
        // console.log("滑轮向上滚动");
        upWheel();
      } else {
        // console.log("滑轮向下滚动");
        downWheel();
      }
    }

    // PC 滚轮监听
    EventUtil.addHandler(document, "mousewheel", function(e){
      if (isStopScroll) {  return; }
      e = EventUtil.getEvent(e);
      if(e.preventDefault) { e.preventDefault(); }
      e.returnValue = false;
      // $('html,body').animate({scrollTop: '0px'}, 800);}
      if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
        if (e.wheelDelta > 0) { //当滑轮向上滚动时
          wheelHandler(true);
        }
        if (e.wheelDelta < 0) { //当滑轮向下滚动时
          wheelHandler(false);
        }
      } else if (e.detail) {  //Firefox滑轮事件
        if (e.detail> 0) { //当滑轮向上滚动时
          wheelHandler(true);
        }
        if (e.detail< 0) { //当滑轮向下滚动时
          wheelHandler(false);
        }
      }
      return false;
    });

  } else {    // 移动端
    $('.vr-news').addClass('vr-article--fix');
    var handleTouchEvent = function(event) {
      if (isStopScroll) {  return; }
      if (event.touches.length == 1) {
        switch (event.type) {
          case "touchstart":
            // event.preventDefault();
            startY = event.touches[0].clientY;
            // console.log("startY = " + startY);
            // console.log($('.vr-nav-bottom-layout').offset());
            // console.log($('.vr-nav-bottom-layout').outerHeight());
            var scrollTop = getScrollTop();
            if (isFirstTop) {
              isSecondTop = true;
            }
            if (scrollTop == 0) {
              isFirstTop = true;
            }

            var dch = getClientHeight();
            var scrollBottom = document.body.scrollHeight - scrollTop;
            if (isFirstBottom) {
              isSecondBottom = true;
            }
            if(scrollBottom >= dch && scrollBottom <= (dch+10)) {
              isFirstBottom = true;
            }
            break;
          case "touchend":
            break;
          case "touchmove":
            // event.preventDefault();
            // console.log("clientX = " + event.touches[0].clientX);
            var dch = getClientHeight();
            var scrollTop = getScrollTop();
            var scrollBottom = document.body.scrollHeight - scrollTop;
            console.log('dch = ' + dch + ', xxxx = '+ $('body').scrollTop());

            var moveEndY = event.touches[0].clientY;
            // console.log("clientY = " + moveEndY);
            var moveY = moveEndY - startY;
            if (moveY < -20) {    // 滑动是否需要切换屏幕
              isFirstTop = false;
              isSecondTop = false;
              if(scrollBottom >= dch && scrollBottom <= (dch+10) && isSecondBottom) {
                // console.log('向上滑');
                downWheel();
                isFirstBottom = false;
                isSecondBottom = false;
              }
            } else if (scrollTop == 0 && isSecondTop) {   // 优化 scrollTop 无效
              // console.log('顶部');
              isFirstTop = false;
              isSecondTop = false;
              upWheel();
            } else if (window.isMobile && currentPage == 5) {   // 移动端只需在最后一屏添加备案号
              handleFooter(false);
            }
            break;
        }
      }
    }

    EventUtil.addHandler(document, "touchstart", handleTouchEvent);
    EventUtil.addHandler(document, "touchend", handleTouchEvent);
    EventUtil.addHandler(document, "touchmove", handleTouchEvent);

  }

  var getClientHeight = function(){
    var clientHeight=0;
    if(document.body.clientHeight&&document.documentElement.clientHeight){
      clientHeight=(document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;           
    }else{
      clientHeight=(document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;       
    }
    return clientHeight;
}

  var getScrollTop = function(){
    var scrollTop=0;
    scrollTop=(document.body.scrollTop>document.documentElement.scrollTop)?document.body.scrollTop:document.documentElement.scrollTop;
    return scrollTop;
  }

  // window.Utils = {
  //   logError: function(sev, msg) {
  //     let img = new Image();
  //     img.src = "/log?sev=" + encodeURIComponent(sev) + "&msg=" + encodeURIComponent(msg);
  //   },
  //   tryCatch: function(tryFunc, catchFunc, errMsgTip, errMsg) {
  //     try {
  //       tryFunc();
  //     } catch (ex) {
  //       catchFunc && catchFunc();
  //       this.logError(msgTip, errMsg + ", failed = " + ex.message);
  //     }
  //   }
  // };

  // 初始化底部菜单栏
  var initNav = function() {
    $('#gotoService').click(function(event) {
      gotoService($('.vr-page-current').eq(0));
    });
    var $vrNav = document.getElementById("vrNav");
    EventUtil.addHandler($vrNav, "click", function(event) {
      event = EventUtil.getEvent(event);
      var target = EventUtil.getTarget(event);
      if (target.id != "vrLogo") { VrWuspace.removeCrossHandler(); }
      switch (target.id) {
        case "vrMenu1":
        case "vrMenu2":
        case "vrMenu3":
        case "vrMenu4":
          isStopScroll = !isStopScroll;
          if (isStopScroll) {
            document.body.scrollTop = 0;
            $('.vr-page-current').css({'position': 'fixed'});
            $('.vr-nav-bottom-layout').hide();
          } else {
            $('.vr-page-current').removeAttr('style');
            $('.vr-nav-bottom-layout').show();
          }
          VrWuspace.gotoMenu();
          break;
        case "vrLogo":
          isStopScroll = false;
          VrWuspace.gotoHome();
          currentPage = 0;
          break;
        case "aboutUs":
          isStopScroll = false;
          currentPage = 1;
          VrWuspace.gotoAboutUs();
          break;
        case "service":
          isStopScroll = false;
          currentPage = 2;
          VrWuspace.gotoService();
          break;
        case "incubator":
          isStopScroll = false;
          currentPage = 3;
          VrWuspace.gotoIncubator();
          break;
        case "vrnews":
          isStopScroll = false;
          currentPage = 4;
          VrWuspace.gotoVrNews();
          break;
        case "inTeam":
          isStopScroll = false;
          currentPage = 5;
          VrWuspace.gotoInTeam();
          break;
      }
      isFirstTop = false;
      isSecondTop = false;
      isFirstBottom = false;
      isSecondBottom = false;
    })
  };

  // 页面加载后执行各功能模块
  var start = function() {
    initNav();
  　　VrWuspace.initMenu();
  　　VrWuspace.initCross();
    VrWuspace.initEvent();
  }

  return {
    start: start,
  };

});
