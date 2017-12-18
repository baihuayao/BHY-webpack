var Constant = {
	api_host : 'http://t.h5wxapi.tarsocial.com',
	share_appid : 'wxfa065f3046ad9c21',
	wx_appid : 'wx6e40c992d0e1789c',	
	// wx_appid: 'wxe8cf03c0fb20daea',	
	tar_tid : '',
	tar_token: '7504591fbe22c8e8cb0c999ef6584706',							
	title: '百加得BLCC，有梦想就兑！',								
	desc: '百加得传世全球鸡尾酒大赛，让梦想即刻“兑”现！',						
	imgurl: 'http://tarproject.oss-cn-shanghai.aliyuncs.com/bluefocus%2Fbacardi%2Fimg%2Fshare.jpg',							
	wx_link : window.location.href.split('?')[0],
	success : function(){
		tar.hitTag("分享成功");
	},
	cancel : function(){}
}
/**
 * 判断当前用户进入的链接是否为正式链接
 * 如果是正式链接，则需要替换Constant常量字段中数据
 * 需要替换字段：api_host、share_appid、wx_appid、tar_tid
 */
var host = window.location.host;
var dev_host = ["dev.h5wxfront.weisgj.com","h5wxfront.weisgj.com","h5wx.com"];
var dev_host_indexOf = dev_host.indexOf(host);
if(dev_host_indexOf == -1){
	//正式环境
	Constant.api_host = 'http://h5api.tarsocial.com';
	Constant.share_appid = '';
	Constant.wx_appid = 'wxe8cf03c0fb20daea';				
	Constant.tar_tid = '112148';				
}
/**
*tarinit监控配置
*wxready分享配置
*/
var shareControl = {
	//监控
	tarinit : function(tar_info){
		tar.init(tar_info);
	},
	//分享
	wxready : function(wx_share){
		wx.ready(function(){
			wx.onMenuShareAppMessage(tar.shapeShareAppMessage(wx_share));
			wx.onMenuShareTimeline(tar.shapeShareTimeline(wx_share));
		})
	}
}
/**
*监控配置
*/
var wx_userinfo,tar_userinfo;
var tar_info = {
	tar_debug :　false,
	tar_token : Constant.tar_token,
	tar_tid : Constant.tar_tid,
	tar_userinfo : tar_userinfo	
}
//分享配置
var wx_share = {
	title  	: Constant.title,
	desc   	: Constant.desc,
	link   	: Constant.wx_link,
	imgUrl :  Constant.imgurl,
	success : Constant.success,
	cancel :  Constant.cancel
}
// 1.授权appid 2.snsaip_base隐性授权，snsapi_userinfo显性授权 3.分享appid
var WeiXincontrol = new WeiXinConfig();
WeiXincontrol.init(Constant.wx_appid, "snsapi_userinfo", Constant.share_appid);
WeiXincontrol.ready(function () {
	wx_userinfo = WeiXincontrol.getUserinfo();
	tar_info.tar_userinfo = [wx_userinfo];
	shareControl.tarinit(tar_info);
	shareControl.wxready(wx_share);
	// loading
	loadingInit();
	// 排行榜
	getRanking();
});
// 投票
var returnVoteData = {};
function returnVote(){
	var url = Constant.api_host + "/bacardi/Dream/uservote";
	WeiXincontrol.ajax(url, returnVoteData, function (res) {
		if (res.errcode == 0) {
			if (res.data) {
				// 更新票数
				$('.player-number').html('总票数:' + (parseInt(playerVoteArray[nowPlayerNode])+1));
				
				// playerVoteArray[nowPlayerNode]+=1;
				// 投票成功,跳转到导流页面
				$('.player-shadowText>i').html('票数+1');
				$('.player-shadow').show();
				getRanking();
				setTimeout(function() {
					switchPage('.lottery-end');
					$('.player-shadow').hide();
					
				}, 2000);
				tar.hitTag('投票成功');
			} else {
				// 投票失败,跳转到导流页面
				$('.player-shadowText>i').html('今日投票机会已用完，明天再来哦！');
				$('.player-shadow').show();
				setTimeout(function () {
					switchPage('.lottery-end');
					$('.player-shadow').hide();
				}, 2000);
				tar.hitTag('今日投票机会已用完');
			}
		}else{
			$('.player-shadowText>i').html('网络错误，请重试');
			$('.player-shadow').show();
		}
	});
}
// 获取排行榜
var rankingArry;
function getRanking(){
	var url = Constant.api_host + "/bacardi/Dream/playranking";
	WeiXincontrol.ajax(url, {}, function (res) {
		if (res.errcode == 0) {
			// 获取到排行榜数据
			rankingArry = res.data;
			rankingUpate(rankingArry);
			countVote(rankingArry);
		} else {
		}
	});
}
// 更新排行榜
function rankingUpate(all){
	$('.ranking-box>ul').html('');
	for (var i = 0; i < all.length; i++) {
		$('.ranking-box>ul').append("<li><i class='ranking-bg'><img src='img/rankingBg.png'></i><i class='ranking-node'>No.<i>" + (i + 1) + "</i></i><i class='ranking-img' title=" + (all[i].pid-1) + "><img src=" + playerIconArray[all[i].pid - 1] + "></i><i class='ranking-name' title=" + (all[i].pid-1) +">"+ playerNameArray[all[i].pid-1] + " " + playerNameEArray[all[i].pid-1] + "</i><i class='ranking-num'>" + all[i].vote +"票</i></li>");
	}
	rankingBind();
}
// 返回用户选择的材料&基酒
var ruturnSelectWineDate = {};
ruturnSelectWineDate.base = 1;
function ruturnSelectWine(){
	var url = Constant.api_host + "/bacardi/Dream/usertest";
	WeiXincontrol.ajax(url, ruturnSelectWineDate, function (res) {
		if (res.errcode == 0) {
			tar.hitTag('提交材料成功');
		} else {

		}
	});
}
// 返回报名信息
var returnInfoDate = {};
function ruturnInfo() {
	var url = Constant.api_host + "/bacardi/Dream/apply";
	WeiXincontrol.ajax(url, returnInfoDate, function (res) {
		if (res.errcode == 0) {
			$('.submit-successText').html('报名成功<br/>恭喜您距离梦想更近一步！<br/><i>(通过审核后，会有专人通知您)</i><br/>5秒后回到主页');
			$('.submit-successBox').show();
			setTimeout(function() {
				$('.submit-successText').html('报名成功<br/>恭喜您距离梦想更近一步！<br/><i>(通过审核后，会有专人通知您)</i><br/>4秒后回到主页');
				setTimeout(function() {
					$('.submit-successText').html('报名成功<br/>恭喜您距离梦想更近一步！<br/><i>(通过审核后，会有专人通知您)</i><br/>3秒后回到主页');
					setTimeout(function () {
						$('.submit-successText').html('报名成功<br/>恭喜您距离梦想更近一步！<br/><i>(通过审核后，会有专人通知您)</i><br/>2秒后回到主页');
						setTimeout(function () {
							$('.submit-successText').html('报名成功<br/>恭喜您距离梦想更近一步！<br/><i>(通过审核后，会有专人通知您)</i><br/>1秒后回到主页');
						}, 1000);
					}, 1000);
				}, 1000);
			}, 1000);
					$('.main').css('z-index', -1);
					$('.main').show();
					setTimeout(function() {
						mySwiperMain.update(true);
						mySwiperPlay.update(true);
						// if (equipmentType == 'android') {	//安卓重置窗口并再次随机
							setTimeout(function() {
								getRandomPlayer2();
							}, 500);
							
						// }
					}, 500);
					
			setTimeout(function() {
				$('.submit-successBox').hide();
					// switchPage('.lottery-end');
					$('.main').css('z-index', 0);
					
			}, 5000);
			tar.hitTag('提交信息成功');
		} else {

		}
	});
}
function getRandomPlayer2() {
	nowPlayerNode = randomNum(0, 14);
	mySwiperMain.slideTo((nowPlayerNode+1));
	$('.main-playerName>i').eq(0).html(playerNameArray[nowPlayerNode]);
	$('.main-playerName>i').eq(1).html(playerNameEArray[nowPlayerNode]);
	checkPlayerAllInfo(nowPlayerNode);
	
}
// 计算各个选手当前票数
var playerVoteArray = new Array(15);
function countVote(all){
	for (var i = 0; i < 15;i++){
		playerVoteArray[all[i].pid-1] = all[i].vote;
	}
	checkPlayerAllInfo(nowPlayerNode);
}
/*---------- loading ----------*/
// loading 更新进度条
function loadingInit() {
	var loadingTimer, loadingN = 0;
	loadingTimer = setInterval(function () {
		if (loadingN < 100) {
			loadingN++;
			$('.loading-text>i').html(loadingN + '%');
		} else {
			$('.loading').hide();
			switchPage('.welcome');
			clearInterval(loadingTimer);
		}
	}, 30)
}