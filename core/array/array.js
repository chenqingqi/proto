/**************************************************
 *
 * 数组扩展
 * 
***************************************************/


/**
 * 删除数组中的指定元素
 * @object 数组中的元素
 */
Array.prototype.remove = function(object) 
{
	for(var i=0;i<this.length;i++)
	{
		if(this[i]==object) this.splice(i,1)
	}
	return this;
}


/**
 * 获取元素在数组中的位置
 * @object 数组中的元素
 */
Array.prototype.childAt = function(object)
{
	for(k in this)
    {
        if(this[k] == object) return k;
    }
}


/**
 * 清空数组中的元素
 */
Array.prototype.clear = function()
{
	this.splice(0,this.length);
	return this;
}


/**
 * 获取数组中最小的值
 */
Array.prototype.min = function()
{
	return Math.min.apply(null,this);
}


/**
 * 获取数组中最大的值
 */
Array.prototype.max = function()
{
	return Math.max.apply(null,this);
}


/**
 * 元素去重
 */
Array.prototype.unique = function()
{

    //临时数组
    var n = [];

    //遍历当前数组
    for(var i = 0; i < this.length; i++)
    {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，否则把当前项push到临时数组里面
        if(n.indexOf(this[i]) == -1)
        {
            n.push(this[i]);
        }
    }

    return n;
}


/**
 * 元素是否存在
 */
Array.prototype.has = function(obj)
{

   //遍历当前数组
    for(var i = 0; i < this.length; i++)
    {
       if(obj == this[i])
       {
       		return true;
       }
    }

    return false;
}


/**
 * 随机打乱数组
 */
Array.prototype.random = function()
{
	this.sort(function(){ return 0.5 - Math.random() });
	return this;
}


