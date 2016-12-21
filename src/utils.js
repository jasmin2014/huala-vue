/**
 * 获取请求参数
 */
window.paramStr = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

/**
 * 是否为微信内置浏览器
 */
window.isWeiXin = function() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}

/**
 * 是否为支付宝内置浏览器
 */
window.isAlipay = function() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/AlipayClient/i) == 'alipayclient') {
		return true;
	} else {
		return false;
	}
}
