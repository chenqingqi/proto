/**************************************************
 * 
 * 路径
 * 对地址栏网址串进行操作
 * 
***************************************************/

/**
 * 获取路径中的get值
 */
location.getValue = function(name)
{
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
    var r = location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
