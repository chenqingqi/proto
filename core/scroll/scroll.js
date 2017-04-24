/**************************************************
 * 
 * 滚动
 * 封装了节点滚动的操作
 * 
***************************************************/


/**
 * 设置或获取垂直滚动的百分比
 * @value 0-1之间的小数
 */
Element.prototype.scrollX = function(value) 
{
	if(!value && value !==0)
	{
		return this.scrollWidth/(this.scrollWidth-this.clientWidth);
	}
	
	this.scrollLeft = (this.scrollWidth-this.clientWidth)*value;
}


/**
 * 设置或获取横向滚动的百分比
 * @value 0-1之间的小数
 */
Element.prototype.scrollY = function(value) 
{
	if(!value && value !==0)
	{
		return this.scrollTop/(this.scrollHeight-this.clientHeight);
	}
	
	this.scrollTop = (this.scrollHeight-this.clientHeight)*value;
}