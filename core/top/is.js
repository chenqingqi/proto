/**************************************************
 *
 * 对象
 * 
***************************************************/

/**
 * 获取对象的实际类型
 */
window.is = function(obj)
{
	var type = obj.constructor.toString();
		type = type.replace(/\s/g,"");
		type = type.substring(8,type.indexOf("("));
		return type;
}
