var buyMax = 0, status = 0, round = 0, allNum = 0, nowNum = 0, buyAlready = 0, myMoney = 0, progressW = 0, progressRatio = 0, updateType = 0, duobaoValue = 0, prizeValue = 0, buyNow = 1, listInfo = '', myPrizeInfo = '', Timer = '';
// 更新用户信息
function updateMyInfo(x){
	myMoney = x.data.score ? x.data.score : 0;						//我的积分
	$('.integral-text').html('我的积分： '+myMoney);
	buyAlready = x.data.round_times ? x.data.round_times : 0;		//已购买数量
}
// 更新活动信息
function updatePlayInfo(x){
	round = x.data.round ? x.data.round+'' : 0;						//轮次
	allNum = x.data.attend_limit ? x.data.attend_limit : 0;			//参与总人数限制
	nowNum = x.data.attend_num ? x.data.attend_num : 0;				//参与人数
	buyMax = x.data.purchase_limit ? x.data.purchase_limit : 0;		//个人最大购买限制
	status = x.data.status ? x.data.status : 3;						//状态 1/2/3 进行中/开奖中/结束
	duobaoValue = x.data.duobao_score ? x.data.duobao_score : 0;	//夺宝价格
	prizeValue = x.data.prize_score ? x.data.prize_score : 0;		//奖品价值
	// 更新轮次
	if(round.length == 1){
		$('.Num1').html(0);
		$('.Num2').html(0);
		$('.Num3').html(0);
		$('.Num4').html(x.data.round);
	}else if(round.length == 2){
		$('.Num1').html(0);
		$('.Num2').html(0);
		$('.Num3').html(round.charAt(0));
		$('.Num4').html(round.charAt(1));
	}else if(round.length == 3){
		$('.Num1').html(0);
		$('.Num2').html(round.charAt(0));
		$('.Num3').html(round.charAt(1));
		$('.Num4').html(round.charAt(2));
	}else if(round.length == 4){
		$('.Num1').html(round.charAt(0));
		$('.Num2').html(round.charAt(1));
		$('.Num3').html(round.charAt(2));
		$('.Num4').html(round.charAt(3));
	}
	// 更新参与人数
	$('.already-text').html(nowNum+'<br />已参与人次');
	if((allNum-nowNum) >= 0){
		$('.remaining-text').html((allNum-nowNum)+'<br />剩余人次');
	}else{
		$('.remaining-text').html('0<br />剩余人次');
	}
	$('.buy-t1').html('夺宝价格: '+duobaoValue+'积分');
	$('.buy-t2').html('夺宝价值: '+prizeValue+'积分');
	$('.buy-t4').html('(每人最多可购买'+buyMax+'个)');
	// 更新进度条
	progressW=$('.progress-bal-box').width();
	progressRatio = ((nowNum/allNum)>=1) ? 1 : (nowNum/allNum);
	$('.progress-bal').css('width',(progressW*progressRatio).toFixed(2)+'px');
	if(progressRatio == 1){
		$('.progress-bal').css('border-radius','5px');
		$('.progress-bal-box').css('background-color','#00b7ee');
	}else{
		$('.progress-bal').css('border-radius','5px 0 0 5px');
		$('.progress-bal-box').css('background-color','#fff');
	}
	// 更新主按钮状态
	if(status == 2){
		$('.play-bg').hide();
		$('.play-over').show();
	}else if(status == 1){
		$('.play-bg').show();
		$('.play-over').hide();
	}else if(status == 3){
		$('.play-bg').hide();
		$('.play-over').show();
		updateType = 1;
	}
}
// 更新排行榜
function updateList(){
	$('.winning-box-list').html('');
	for(var i=0;i<listInfo.length;i++){
		$('.winning-box-list').append('<ul><li>第'+listInfo[i].round+'轮</li><li>'+listInfo[i].prize_info.prize_name+'</li><li>'+listInfo[i].org+'</li><li>'+listInfo[i].username+'</li></ul>');
	}
}
function updateMyPrize(){
	$('.winning-box-my').html('');
	for(var i=0;i<myPrizeInfo.length;i++){
		if(myPrizeInfo[i].registed == 'no'){
			if(myPrizeInfo[i].prize_info.code){
				$('.winning-box-my').append('<ul><li>第'+myPrizeInfo[i].round+'轮</li><li>'+myPrizeInfo[i].prize_info.prize_name+'</li><li class="red-text" title='+myPrizeInfo[i].prize_info.code+'>待领取</li></ul>');
			}else{
				$('.winning-box-my').append('<ul><li>第'+myPrizeInfo[i].round+'轮</li><li>'+myPrizeInfo[i].prize_info.prize_name+'</li><li class="red-text" name='+myPrizeInfo[i].round+'>待领取</li></ul>');
			}
		}else{
			$('.winning-box-my').append('<ul><li>第'+myPrizeInfo[i].round+'轮</li><li>'+myPrizeInfo[i].prize_info.prize_name+'</li><li>已领取</li></ul>');
		}
	}
	redBind();
}
// play
$('.play-button').bind('touchstart',function(){
	goPlay();
	tar.hitTag('夺');
})
// 主按钮购买
function goPlay(){
	if(buyAlready >= buyMax){	// 超过个人购买限制
		$('.ddsx').show();
		tar.hitTag('超过个人购买限制');
	}else{
		$('.buy-box').show();
	}
}
// 购买按钮
$('.buy-button').bind('touchstart',function(){
	buyButton();
})
function buyButton(){
	$('.buy-box').hide();
	if(nowNum >= allNum){	// 超过总购买限制
		$('.ccsx').show();
		tar.hitTag('超过总购买限制');
		setTimeout(function(){
			$('.ccsx').hide();
		},2000);
	}else if(buyNow>parseInt(buyMax-buyAlready)){		// 超过个人购买限制
		$('.ddsx').show();
		tar.hitTag('超过个人购买限制');
		setTimeout(function(){
			$('.ddsx').hide();
		},2000);
	}else if(myMoney<duobaoValue*buyNow){		//积分不足
		$('.jfbz').show();
		tar.hitTag('积分不足');
		setTimeout(function(){
			$('.jfbz').hide();
		},2000);
	}else{
		getBuyData.num = buyNow;
		getBuy();
		tar.hitTag('购买');
	}
}
/*
 加减事件
 */
$('.add').bind('touchstart',function(){
	buyNow = parseInt($('.amount-num').html());
	if(buyNow<100){
		buyNow++;
	}
	$('.amount-num').html(buyNow);
});
$('.less').bind('touchstart',function(){
	buyNow = parseInt($('.amount-num').html());
	if(buyNow>1){
		buyNow--;
	}
	$('.amount-num').html(buyNow);
});
/*
 所有遮罩
 */
$('.ccsx').bind('touchstart',function(){
	$('.ccsx').hide();
});
$('.ddsx').bind('touchstart',function(){
	$('.ddsx').hide();
});
$('.gmcg').bind('touchstart',function(){
	$('.gmcg').hide();
});
$('.jfbz').bind('touchstart',function(){
	$('.jfbz').hide();
});
$('.close').bind('touchstart',function(){
	$('.buy-box').hide();
});
$('.ticket-close').bind('click',function(){
	$('.info-box2').hide();
});
// winning-list
$('.winning-list').bind('touchstart',function(){
	$('.winning-box>img').attr('src','img/winningBg1.png');
	$('.winning-box-list').css('z-index',1);
	$('.winning-box-my').css('z-index',0);
	tar.hitTag('中奖名单');
});
// my-winning
$('.my-winning').bind('touchstart',function(){
	$('.winning-box>img').attr('src','img/winningBg2.png');
	$('.winning-box-list').css('z-index',0);
	$('.winning-box-my').css('z-index',1);
	tar.hitTag('我的中奖记录');
});
// 领奖
function redBind(){
	$('.red-text').unbind();
	$('.red-text').bind('click',function(){
		returnInfoData.round = $(this).attr('name');
		if($(this).attr('title')){
			$('.ticket-text').html($(this).attr('title'));
			$('.info-box2').show();
			tar.hitTag('打开卷码页');
		}else{
			$('.info-box').show();
			tar.hitTag('打开填写信息页');
		}
	});
}
$('.submit-button').bind('click',function(){
	returnInfoBefore();
});
function returnInfoBefore(){
	if($('.name-info').val() != '' && $('.phone-info').val() != '' && $('.add-info').val() != ''){
		returnInfoData.name = $('.name-info').val();
		returnInfoData.tel = $('.phone-info').val();
		returnInfoData.address = $('.add-info').val();
		returnInfo();
		tar.hitTag('提交信息');
	}else{
		warn('请补充完整信息');
	}
};
$('.close-button').bind('click',function(){
	$('.info-box').hide();
});
// 验证
var myreg = /^1[3|4|5|7|8][0-9]{9}$/;
$('.phone-info').blur(function(){
	if(!myreg.test($('.phone-info').val())){
		$('.phone-info').val('');
		$('.phone-info').attr('placeholder','格式不正确，请重新输入');
	}
});
// 更新数据
function autoUpdate(){
	Timer = setInterval(function(){
		if(updateType == 0){
			getUserInfo();
			getPlayInfo();
		}else{
		}
	},5000);
}
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
// 项目下线时间
function lineDown(arr){
	var stringTime=arr[0]+"-"+arr[1]+"-"+arr[2]+" "+arr[3]+":"+arr[4]+":"+arr[5];
	var timestamp = new Date().getTime();
	var end = new Date(stringTime.replace(/-/g,"/")).getTime();
	if(timestamp > end){
		window.location.href = "http://s.wx.tarh5.cn/common/html/end.html"; 
	}else{
	}	
}