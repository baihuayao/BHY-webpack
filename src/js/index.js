var nowPlayerNode = 0, equipmentType;
$(function () {
	var ua = navigator.userAgent.toLowerCase();
	if (/iphone|ipad|ipod/.test(ua)) {
		equipmentType = 'iPhone';
		$('#city').css('left', '35%');
	} else{
		equipmentType = 'android';
		$('#city').css('left', '28%');
	}
})
/*---------- welcome ----------*/
// 条款勾选
var agreeType = true;
$('.welcome-agreeButton-bg').on('touchstart',function(){
	if ($('.welcome-agreeButton-bg>img').attr('src')=='img/welcome/agree.png'){
		agreeType = false;
		$('.welcome-agreeButton-bg>img').attr('src', 'img/welcome/disagree.png');
	}else{
		agreeType = true;
		$('.welcome-agreeButton-bg>img').attr('src', 'img/welcome/agree.png');
		tar.hitTag('勾选条款');
	}
});
// 查看服务条款
$('.welcome-showClause').on('touchstart', function () {
	switchPage('.clause');
	tar.hitTag('查看服务条款');
});
// 满18岁,进入欢迎页面
var swiperMainType = false;
$('.welcome-conformButton1').on('touchstart', function () {
	if (agreeType){
		switchPage('.go');
		// swiper 声明
		$('.main').css('z-index', -1);
		$('.main').show();
		if (swiperMainType==false){
			swiperMainType = true;
			setTimeout(function () {
				mySwiperMain = new Swiper('.swiper-containerMain', {
					effect: "coverflow",
					slidesPerView: 1,
					noSwiping: true,
					noSwiping: 'stop-swiping',
					loop: true,
				});
				getRandomPlayer();
			}, 200);
		}
		tar.hitTag('满18岁');
	}else{
		$('.welcome-shadow').show();
		
	}
});
$('.welcome-shadowClose').on('touchstart', function () {
	$('.welcome-shadow').hide();
})
// 未满18岁
$('.welcome-conformButton2').on('touchstart', function () {
	$('.thanks-box').show();
	tar.hitTag('未满18岁');
});
// 引导跳出
$('.thanks-closeButton').on('touchstart', function () {
	$('.thanks-box').hide();
})
/*---------- clause ----------*/
// 规则页返回主页
$('.clause-backButton').on('touchstart', function () {
	switchPage('.welcome');
});
// 进入欢迎页面
$('.clause-agreeButton').on('touchstart', function () {
	agreeType = true;
	$('.welcome-agreeButton-bg>img').attr('src', 'img/welcome/agree.png');
	switchPage('.welcome');
	tar.hitTag('同意服务条款');
});
/*---------- go ----------*/
// 进入活动主页
var mySwiperMain;
$('.go-openButton').on('touchstart', function () {	
	setTimeout(function() {
		$('.main').css('z-index',0);
	}, 200);
	tar.hitTag('进入活动主页');
});
/*---------- main ----------*/
// 主页切换选手
$('.main-leftButton').on('touchstart', function () {
	mySwiperMain.slidePrev();
	nowPlayerNode = getNowPlayerNode(mySwiperMain.activeIndex);
	$('.main-playerName>i').eq(0).html(playerNameArray[nowPlayerNode]);
	$('.main-playerName>i').eq(1).html(playerNameEArray[nowPlayerNode]);
	checkPlayerAllInfo(nowPlayerNode);
	tar.hitTag('切换选手');
});
$('.main-rightButton').on('touchstart', function () {
	mySwiperMain.slideNext();
	nowPlayerNode = getNowPlayerNode(mySwiperMain.activeIndex);
	$('.main-playerName>i').eq(0).html(playerNameArray[nowPlayerNode]);
	$('.main-playerName>i').eq(1).html(playerNameEArray[nowPlayerNode]);
	checkPlayerAllInfo(nowPlayerNode);
	tar.hitTag('切换选手');
});
// 根据swiper索引获取nowPlayerNode
function getNowPlayerNode(n){
	if (n == 0 || n == 15) {
		return 14;
	} else if (n == 16 || n == 1) {
		return 0;
	} else {
		n=n-1;
		return n;
	}
}
// 选手随机出现
function getRandomPlayer(){
	mySwiperMain.slideTo(randomNum(0, 14));
	setTimeout(function() {
		nowPlayerNode = getNowPlayerNode(mySwiperMain.activeIndex);
		$('.main-playerName>i').eq(0).html(playerNameArray[nowPlayerNode]);
		$('.main-playerName>i').eq(1).html(playerNameEArray[nowPlayerNode]);
		checkPlayerAllInfo(nowPlayerNode);
	}, 500);
}
// 随机函数
function randomNum(m, n) {
	return Math.floor(Math.random() * (n - m + 1) + m);
}
// 返回到欢迎页面
$('.main-backButton').on('touchstart', function () {
	switchPage('.welcome');
});
// 查看选手个人信息
$('.main-playerName').on('click', function () {
	switchPage('.player');
	checkPlayerAllInfo(nowPlayerNode);
	tar.hitTag('查看选手详情');
});
// 查看投票排名
$('.main-showButton').on('click', function () {
	// switchPage('.ranking');
	$('.ranking').css('z-index',4);
	$('.ranking').show();
	tar.hitTag('查看排行榜');
});
// 进入测试页面
var mySwiperPlay;
var swiperPlayType = true;
$('.main-testButton').on('click', function () {
	switchPage('.play');
	$('.play2').css('z-index', -1);
	$('.play2').show();
	if (swiperPlayType == true){
		swiperPlayType = false;
		setTimeout(function () {
			mySwiperPlay = new Swiper('.swiper-containerPlay', {
				effect: "coverflow",
				slidesPerView: 3,
				initialSlide: 1,
				noSwiping: true,
				noSwiping: 'stop-swiping',
				loop: true,
				coverflow: {
					rotate: 0,		//旋转角度
					stretch: -14,		// 拉伸值
					depth: 420,		// 位置深度
					modifier: 1,
					slideShadows: false
				},
			});
			mySwiperPlay.slideTo(0);
		}, 200);
	}
	tar.hitTag('进入测试');
});
// 报名
$('.main-signUpButton').on('touchstart', function () {
	switchPage('.rule');
	tar.hitTag('点击报名');
});
// 监听滑动
$('.main-playerBox').on('touchend', function (e) {
	console.log(mySwiperMain.activeIndex);
	nowPlayerNode = getNowPlayerNode(mySwiperMain.activeIndex);
	$('.main-playerName>i').eq(0).html(playerNameArray[nowPlayerNode]);
	$('.main-playerName>i').eq(1).html(playerNameEArray[nowPlayerNode]);
	checkPlayerAllInfo(nowPlayerNode);
})
// 查看选手个人信息
$('.main-player').on('click', function () {
	switchPage('.player');
	checkPlayerAllInfo(nowPlayerNode);
	tar.hitTag('查看选手详情');
});
/*---------- play ----------*/
// 选择材料
var playType = false;
$('.materialN').on('touchstart', function () {
	// 动画
	if (playType == false) {
		setTimeout(function () {
			$('.play-nextButton1').addClass('bottom-text-ani');
		}, 500);
	}
	playType = true;
	$('.materialN>img').removeClass('materialN-ani');
	$(this).children('img').addClass('materialN-ani');
	//替换选手照片
	nowPlayerNode = $(this).attr('value')-1;
	checkPlayerAllInfo(nowPlayerNode);
	// 记录材料信息
	ruturnSelectWineDate.materials = nowPlayerNode+1;
	tar.hitTag('选择材料');
});
// 选择基酒
$('.play-nextButton1').on('touchstart', function () {
	if (playType == true){
		// mySwiperPlay.update(true);
		setTimeout(function() {
			mySwiperPlay.update(true);
			$('.play2').css('z-index', 0);
		}, 200);
		
	}else{
		$('.play-shadow').show();
		setTimeout(function() {
			$('.play-shadow').hide();
		}, 1000);
	}
	tar.hitTag('选择基酒');
});
// 返回
$('.play-backButton').on('touchstart', function () {
	switchPage('.main');
})
/*---------- play2 ----------*/
// 切换基酒
$('.wine-leftButton').on('touchstart', function () {
	mySwiperPlay.slidePrev();
	// 记录基酒信息
	if (mySwiperPlay.activeIndex == 0 || mySwiperPlay.activeIndex == 6){
		ruturnSelectWineDate.base = 2;
	} else if (mySwiperPlay.activeIndex == 4){
		ruturnSelectWineDate.base = 3;
	}else{
		ruturnSelectWineDate.base = 1;
	}
	tar.hitTag('切换基酒');
});
$('.wine-rightButton').on('touchstart', function () {
	mySwiperPlay.slideNext();
	// 记录基酒信息
	if (mySwiperPlay.activeIndex == 0 || mySwiperPlay.activeIndex == 6) {
		ruturnSelectWineDate.base = 2;
	} else if (mySwiperPlay.activeIndex == 4) {
		ruturnSelectWineDate.base = 3;
	} else {
		ruturnSelectWineDate.base = 1;
	}
	tar.hitTag('切换基酒');
});
// 开始匹配
$('.play-beginButton').on('touchstart', function () {
	switchPage('.play-wait');
	getShakeType = true;
	// 返回用户选择的材料&基酒
	ruturnSelectWine();
	tar.hitTag('开始匹配');
})
// 返回
$('.play2-backButton').on('touchstart', function () {
	switchPage('.play');
	$('.play2').css('z-index', -1);
	$('.play2').show();
})
/*---------- play-wait ----------*/
var getShakeType = false;
// 返回
$('.play-wait-backButton').on('touchstart', function () {
	switchPage('.play2');
	getShakeType = false;
})
// 匹配
$('.play-wait-shake').on('touchstart', function () {
	switchPage('.player');
	tar.hitTag('点击匹配');
})
// 摇一摇
var alpha, beta, gamma, currentTime, lastTime = 0, diffTime;
var DefineSpeed = 3000, shakeSpeed, startA, startB, startG, endA, endB, endG;
if (window.DeviceOrientationEvent) {
	window.addEventListener('deviceorientation', function (event) {
		alpha = event.alpha,
			beta = event.beta,
			gamma = event.gamma;
		currentTime = new Date().getTime();
		if ((currentTime - lastTime) > 10) {       // 如果摇晃时间大于10毫秒
			diffTime = currentTime - lastTime;   // 摇晃持续时间
			lastTime = currentTime;             // 重置结束时间
			startA = alpha;
			startB = beta;
			startG = gamma;
			shakeSpeed = Math.abs(startA + startB + startG - endA - endB - endG) / diffTime * 10000;  //计算摇晃速度
			if (shakeSpeed > DefineSpeed) {
				console.log('执行');
				if (getShakeType) {
					bg_audio.play();
					setTimeout(function () {
						switchPage('.player');
						bg_audio.pause();
					}, 2000);
					getShakeType = false;
					tar.hitTag("摇一摇");
				}
			}
			endA = startA;
			endB = startB;
			endG = startG;
		}
	}, false);
}
/*---------- player ----------*/
// 查看排行榜
$('.player-showMore').on('touchstart',function(){
	// switchPage('.ranking');
	$('.ranking').css('z-index',4);
	$('.ranking').show();
	tar.hitTag('查看排行榜');
})
// 返回
$('.player-backButton').on('touchstart', function () {
	switchPage('.main');
	if (equipmentType == 'android'){
		mySwiperMain.update(true);
	}
});
// 近期活动
$('.player-recentlyButton').on('touchstart', function () {
	switchPage('.player-recently');
	tar.hitTag('查看近期活动');
});
// 为他投票
var voteType = true;
$('.player-voteButton').on('touchstart', function () {
	returnVoteData.pid = nowPlayerNode+1;
	if (voteType == true){
		voteType = false;
		returnVote();
		setTimeout(function() {
			voteType = true;
		}, 2000);
	}
	tar.hitTag('投票');
});
// 报名参赛
$('.player-signUpButton').on('touchstart', function () {
	switchPage('.privacy');
	tar.hitTag('报名参赛');
});
// 下拉展开
var MinH,MaxH,H1,H2,scrollType=true;
$('.player-textNext').on('touchstart',function(){
	if (scrollType){
		MinH = $('.player-text').height();
		MaxH = $('.player-text')[0].scrollHeight;
		H1 = parseInt($('.player-textNext').css('top'));
		$('.player-text').css('height', MaxH + 'px');
		H2 = parseInt($('.player-text').css('top'))+MaxH;
		$('.player-textNext').css({ 'top': H2 + 'px', 'transform':'rotate(180deg)'});
		scrollType = false;
	}else{
		$('.player-text').css('height', MinH + 'px');
		$('.player-textNext').css({ 'top': H1 + 'px', 'transform': 'rotate(0)' });
		scrollType = true;
	}
	tar.hitTag('查看选手个人信息详情');
});
// close
$('.playser-shadowClose').on('touchstart', function () {
	$('.player-shadow').hide();
})
/*---------- player-recently ----------*/
// 返回
$('.player-recently-backButton').on('touchstart', function () {
	switchPage('.player');
});
/*---------- player-lottery ----------*/
// 返回
$('.player-lottery-backButton').on('touchstart', function () {
	switchPage('.player');
});
/*---------- rule ----------*/
// 同意
$('.rule-agreeButton0').on('touchstart', function () {
	switchPage('.info-fillIn');
	tar.hitTag('同意规则');
});
// 返回
$('.rule-backButton').on('touchstart',function(){
	switchPage('.main');
})
/*---------- info-fillIn -----------*/
// 返回
$('.info-fillIn-backButton').on('touchstart', function () {
	switchPage('.main');
	// if (equipmentType == 'android') {
		mySwiperMain.update(true);
		mySwiperPlay.update(true);
	// }
});
/*---------- privacy ----------*/
// 返回
$('.privacy-backButton').on('touchstart', function () {
	switchPage('.info-fillIn');
})
// 号码验证
var myreg = /^1[3|4|5|7|8][0-9]{9}$/;
$('.phone-input input').blur(function () {
	if (!myreg.test($('.phone-input input').val())) {
		$('.phone-input input').val('');
		$('.info-fillIn-text4').show();
	}else{
		$('.info-fillIn-text4').hide();
	}
});
var infoName,infoPhone,infoCity,infoText;
// 

$('#city').change(function () {
	if (equipmentType == 'iPhone'){
		if ($('#city').val() == 'n') {
			$('#city').css('left', '35%');
		} else {
			$('#city').css('left', '45%');
		}
	}else{
		if ($('#city').val() == 'n') {
			$('#city').css('left', '28%');
		} else {
			$('#city').css('left', '40%');
		}
	}
})
// 提交
$('.submit-button').on('touchstart',function(){
	infoName = $('.name-input input').val();
	infoPhone = $('.phone-input input').val();
	infoCity = $('#city').val();
	infoText = $('.text-input input').val();
	if (infoName != '' && infoPhone != '' && infoCity != 'n' && infoText != ''){
		// 提交
		returnInfoDate.name = infoName;
		returnInfoDate.phone = infoPhone;
		returnInfoDate.insert_city = infoCity;
		returnInfoDate.dream = infoText;
		ruturnInfo();
		$('.info-fillIn-text3').hide();
		// if (equipmentType == 'android') {
			mySwiperMain.update(true);
			mySwiperPlay.update(true);
		// }
		tar.hitTag('提交');
	}else{
		$('.info-fillIn-text3').show();
	}
})
// 查看隐私条款
$('.info-fillIn-privacyButton').on('touchstart', function () {
	switchPage('.privacy');
	tar.hitTag('查看隐私条款');
})
/*---------- ranking ----------*/
// 返回
$('.ranking-backButton').on('touchstart', function () {
	// switchPage('.main');
	$('.ranking').hide();
	$('.ranking').css('z-index',0);
})
// 查看选手个人信息
function rankingBind(){
	$('.ranking-img').unbind();
	$('.ranking-name').unbind();
	$('.ranking-img').on('click', function () {
		nowPlayerNode = parseInt($(this).attr('title'));
		checkPlayerAllInfo(nowPlayerNode);
		setTimeout(function() {
			switchPage('.player');
		}, 100);
		tar.hitTag('排行榜查看选手详情');
	})
	$('.ranking-name').on('click', function () {
		nowPlayerNode = parseInt($(this).attr('title'));
		checkPlayerAllInfo(nowPlayerNode);
		setTimeout(function () {
			switchPage('.player');
		}, 100);
		tar.hitTag('排行榜查看选手详情');
	})
}
/*---------- player ----------*/
$('.privacy-agreeButton').on('touchstart', function () {
	switchPage('.info-fillIn');
	tar.hitTag('同意隐私条款');
})
/*---------- lottery-end ----------*/
// 引导页返回个人页
$('.lottery-end-backButton').on('touchstart', function () {
	switchPage('.player');
})
// 查看排行榜
$('.lottery-end-showRankingButton').on('click', function () {
	// switchPage('.ranking');
	$('.ranking').css('z-index',4);
	$('.ranking').show();
	tar.hitTag('查看排行榜');
})
// link
$('.lottery-end-A').on('touchstart',function(){
	setTimeout(function() {
		window.location.href = "http://jdd.hqdemo.cn/index5.html?dskid=ccc078";
	}, 300);
	tar.hitTag('用户跳转');
})
/*---------- checkPlayerAllInfo ----------*/
function checkPlayerAllInfo(x){
	$('.player-img>img').attr('src', playerArray[x]);	//选手图片
	$('.player-img').css(playerStyleArray[x]);	//图片样式
	$('.player-user').html(playerNameArray[x] + '<br/>' + playerNameEArray[x]);	//选手姓名
	$('.player-text').html(playerInfoArray[x] );	//选手详情
	$('.player-img2>img').attr('src', playerWineArray[x]);	//选手酒
	$('.player-text2').html(playerFormulaTitleArray[x]);	//酒标题
	$('.player-text3').html(playerFormulaArray[x]);	//酒配方
	$('.player-number').html('总票数:' + playerVoteArray[x]);	//票数
	// 近期活动
	$('.recently-user>i').eq(0).html(playerNameArray[x]);
	$('.recently-user>i').eq(1).html(playerNameEArray[x]); 
	$('.recently-user-icon>img').attr('src', playerWineArray[x]);	//选手酒
	if(x == 0 || x == 13 || x == 14){
		$('.player-info-title>i').eq(1).html('业余选拔赛-' + partyAreaArray[0]);
		$('.player-info-title>i').eq(2).html(partyNameArray[0]+' 酒吧');
		$('.player-info-add>i').eq(0).html('活动地点:' + partyAddArray[0]);
		$('.player-info-time').html('活动时间:2018年' + partyDateArray[0] +'<br/>19:00-21:00');
	} else if (x == 7||x==8||x==9){
		$('.player-info-title>i').eq(1).html('业余选拔赛-' + partyAreaArray[1]);
		$('.player-info-title>i').eq(2).html(partyNameArray[1] + ' 酒吧');
		$('.player-info-add>i').eq(0).html('活动地点:' + partyAddArray[1]);
		$('.player-info-time').html('活动时间:2018年' + partyDateArray[1] + '<br/>19:00-21:00');
	} else if (x == 10 || x == 11 || x == 12){
		$('.player-info-title>i').eq(1).html('业余选拔赛-' + partyAreaArray[2]);
		$('.player-info-title>i').eq(2).html(partyNameArray[2] + ' 酒吧');
		$('.player-info-add>i').eq(0).html('活动地点:' + partyAddArray[2]);
		$('.player-info-time').html('活动时间:2018年' + partyDateArray[2] + '<br/>19:00-21:00');
	} else if (x == 1 || x == 2 || x == 3){
		$('.player-info-title>i').eq(1).html('业余选拔赛-' + partyAreaArray[3]);
		$('.player-info-title>i').eq(2).html(partyNameArray[3] + ' 酒吧');
		$('.player-info-add>i').eq(0).html('活动地点:' + partyAddArray[3]);
		$('.player-info-time').html('活动时间:2018年' + partyDateArray[3] + '<br/>19:00-21:00');
	}else{
		$('.player-info-title>i').eq(1).html('业余选拔赛-' + partyAreaArray[4]);
		$('.player-info-title>i').eq(2).html(partyNameArray[4] + ' 酒吧');
		$('.player-info-add>i').eq(0).html('活动地点:' + partyAddArray[4]);
		$('.player-info-time').html('活动时间:2018年' + partyDateArray[4] + '<br/>19:00-21:00');
	}
	
}
// 切换页面
function switchPage(x) {
	$('.page').hide();
	$(x).show();
};
// 弹框警告
function warn(content){
	var body = document.getElementsByTagName("body")[0]; 
	var element = document.createElement("div");
	element.classList.add("weui_dialog_alert");
	element.innerHTML='<div class="weui_mask"></div>'+
	'<div class="weui_dialog">'+
		'<div class="weui_dialog_hd">'+content+'</div>'+
		'<div class="weui_dialog_ft">'+
			'<a class="weui_btn_dialog">OK</a>'+
		'</div>'+
	'</div>';
	body.appendChild(element);
	element.style.display="block";
	document.getElementsByClassName("weui_btn_dialog")[0].onclick=function(){	
			body.removeChild(element);
	}			
}

// 手机软键盘弹出挤压界面
window.onload = function () {
	var bodyH = document.body.clientHeight;
	var bodyW = document.body.clientWidth;
	var body = document.getElementsByTagName("body")[0];
	var html = document.getElementsByTagName("html")[0];
	var container = document.getElementById('container');
	// body.style.height = bodyH + "px";
	// body.style.width = bodyW + "px";
	// html.style.height = bodyH + "px";
	// html.style.width = bodyW + "px";
	container.style.height = bodyH + "px";
	container.style.width = bodyW + "px";
}
//输入框动态滚动;inputName为要固定的input标签,content为body中最大的标签
var bodyH = document.body.clientHeight;
var inputName = document.getElementsByTagName('input')[0];
var content = document.getElementsByClassName('container')[0];
inputName.addEventListener("focus", function () {
	content.style.top = 0 + "px";
	content.style.height = bodyH + "px";
});
inputName.addEventListener("blur", function () {
	content.style.top = 0 + "px";
	content.style.height = bodyH + "px";
});
/*---------- 项目下线时间 ----------*/
function lineDown(arr){
	var stringTime=arr[0]+"-"+arr[1]+"-"+arr[2]+" "+arr[3]+":"+arr[4]+":"+arr[5];
	var timestamp = new Date().getTime();
	var end = new Date(stringTime.replace(/-/g,"/")).getTime();
	if(timestamp > end){
		window.location.href = "http://s.wx.tarh5.cn/common/html/end.html"; 
	}else{
	}	
}
$(function () {
	var proportion = document.body.scrollWidth / document.body.scrollHeight;
	if (proportion > .65) {
		$('.welcome-borderShadow').css({'width': '76%','top': '4%','left': '12%'});
		$('.play-borderShadow').css({ 'width': '76%', 'top': '4%', 'left': '12%' });
		$('.ranking-box').css({ 'width': '92%', 'left': '4%' });
		$('.player-text3').css({ 'top': '68%', 'transform': 'scale(.7)' });
		$('.clause-bottomText').css({'width':'76%','left':'12%'});
	}
});
// 禁止跟随屏幕翻转
// var body = document.getElementById('body');
// body.addEventListener('orientationchange',function(){
// 	if (window.orientation == 0 || window.orientation == 180) {
// 		$('.vertical-page').hide();
// 	} else if (window.orientation == 90 || window.orientation == -90) {
// 		$('.vertical-page').show();
// 		if (equipmentType == 'android'){
// 			alert(1);
// 		}
		
// 	}
// })

//屏幕方向标识，0横屏，其他值竖屏
(function () {
	var init = function () {
		var updateOrientation = function () {
			var orientation = window.orientation;
			switch (orientation) {
				case 90:
					$('.vertical-page').show();
					// orientation = 'landscape'; //这里是横屏
					break;
				case -90:
					$('.vertical-page').show();
					// orientation = 'landscape'; //这里是横屏
					break;
				default:
					$('.vertical-page').hide();
					// orientation = 'portrait';  //这里是竖屏
					break;
			}
		};
		// 每次旋转，调用这个事件。
		window.addEventListener('orientationchange', updateOrientation, false);
		// 事件的初始化
		updateOrientation();
	};
	window.addEventListener('DOMContentLoaded', init, false);
})();