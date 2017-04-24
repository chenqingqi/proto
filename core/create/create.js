/**************************************************
 * 
 * 创建
 * 封装了节点创建的操作
 * 
***************************************************/

/**
 * 通过字符串创建节点
 */
Document.prototype.createElementByString  = function(value)
{
	var _node;
	
	if(value.indexOf('<') !== -1)
	{
		var node = this.createElement('div');
		node.innerHTML = value;
		_node = node.children[0];
	}
	
	return _node;
}