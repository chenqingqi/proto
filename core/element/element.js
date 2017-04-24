/**************************************************
 * 
 * 节点选择器
 * 类似于jquery的$方法
 * 
***************************************************/


/**
 * 选择/创建节点
 * @param value:String
 * 
 * 示例：
 * 通过id获取节点              element('myid') 
 * 通过class获取节点组     element('myclass') 
 * 通过标签名获取节点组    element('div') 
 * 将字符串转换为节点       element('<slide></slide>') 
 * 
 * 
 */
window.element = function(value)
{
	
	/**
	 * 节点
	 */
	var _node;
	
	
	/**
	 * 将字符串转换为节点
	 */
	if(value.indexOf('<') !== -1)
	{
		var node = document.createElement('div');
		node.innerHTML = value;
		_node = node.children[0];
	}
	
	
	/**
	 * 通过id获取节点
	 */
	if(document.getElementById(value))
	{
		_node = document.getElementById(value);
		return _node;
	}
	
	
	/**
	 * 通过class获取节点组
	 */
	if(document.getElementsByClassName(value).length>0)
	{
		_node = document.getElementsByClassName(value);
		return _node;
	}
	
	
	/**
	 * 通过标签名获取节点
	 */
	if(document.getElementsByTagName(value).length>0)
	{
		_node = document.getElementsByTagName(value);
		return _node;
	}
	
	return _node;
}