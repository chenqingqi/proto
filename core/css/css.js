/**************************************************
 * 
 * 样式
 * 封装了节点样式的操作
 * 
***************************************************/


/**
 * 设置/获取样式
 * @param value:Object
 * 
 * 示例: 
 * node.css('width') 获取样式值
 * node.css({width:'100px',height:'80px'}) 设置样式值 
 */
Element.prototype.css = function(value)
{
	if((typeof value) == 'string')
	{
		return window.getComputedStyle(this,null)[value];
	}
	else if((typeof value) == 'object')
	{
		for(var i in value)
		{
			this.style[i] = value[i]
		}
	}
}


/**
 * 设置元素集合的样式
 */
NodeList.prototype.css = function(value)
{
	for(var i in value)
	{
		for(var k=0;k<this.length;k++)
		{
			this[k].style[i] = value[i]
		}
	}
}
