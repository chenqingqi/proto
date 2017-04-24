/**************************************************
 * 
 * 矢量
 * 封装了对canvas对象的操作
 * 
***************************************************/


/**
 * 返回绘图对象
 */
Element.prototype.graphics = function() 
{
	if(this.nodeName == 'CANVAS')
	{
		return this.getContext("2d");
	}
	else
	{
		throw new Error('当前节点不是canvas元素')
	}
}



/**
 * 绘制矩形
 * @param {Object} x轴
 * @param {Object} y轴
 * @param {Object} w宽
 * @param {Object} h高
 * @param {Object} c颜色
 */
Element.prototype.drawRect = function(x,y,w,h,c)
{
	if(this.nodeName == 'CANVAS')
	{
		this.getContext("2d").fillStyle = c;
		this.getContext("2d").fillRect(x,y,w,h);
		this.getContext("2d").rect(x,y,w,h);
		this.getContext("2d").stroke();
	}
	else
	{
		throw new Error('当前节点不是canvas元素')
	}
}


/**
 * 绘制圆角矩形
 * @param {Object} x轴
 * @param {Object} y轴
 * @param {Object} width宽
 * @param {Object} height高
 * @param {Object} radius圆角值
 * @param {Object} color颜色
 */
Element.prototype.drawRoundRect = function(x, y, width, height, radius,color)
{
	if(this.nodeName == 'CANVAS')
	{
		this.getContext("2d").fillStyle = color;
		this.getContext("2d").beginPath();   
	    this.getContext("2d").arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);   
	    this.getContext("2d").lineTo(width - radius + x, y);   
	    this.getContext("2d").arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);   
	    this.getContext("2d").lineTo(width + x, height + y - radius);   
	    this.getContext("2d").arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);   
	    this.getContext("2d").lineTo(radius + x, height +y);   
	    this.getContext("2d").arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);   
	    this.getContext("2d").closePath(); 
	    this.getContext("2d").fill()
	}
	else
	{
		throw new Error('当前节点不是canvas元素')
	}
}


/**
 * 绘制圆形
 * x 轴
 * y 轴
 * r 半径
 * c 颜色
 */
Element.prototype.drawCircle = function(x,y,r,c)
{
	if(this.nodeName == 'CANVAS')
	{
		this.getContext("2d").beginPath();
	    this.getContext("2d").fillStyle = c;
	    this.getContext("2d").arc(x+r,y+r,r,0,Math.PI*2,true);    
	    this.getContext("2d").fill();
	}
	else
	{
		throw new Error('当前节点不是canvas元素')
	}
}


/**
 * 绘制圆环
 * @param {Object} x 坐标
 * @param {Object} y 坐标。
 * @param {Object} r 半径。
 * @param {Object} color颜色
 * @param {Object} size线条大小
 * @param {Object} sa起始角(0-2之间的小数)
 * @param {Object} ea结束角(0-2之间的小数)
 */
Element.prototype.arc = function(x,y,r,color,size,sa,ea)
{
	if(this.nodeName == 'CANVAS')
	{
		this.getContext("2d").beginPath();
		this.getContext("2d").lineWidth = size;
		this.getContext("2d").strokeStyle = color;
		this.getContext("2d").arc(x+r,y+r,r,sa*Math.PI,ea*Math.PI,true,color);
		this.getContext("2d").stroke();
	}
	else
	{
		throw new Error('当前节点不是canvas元素')
	}
}


/**
 * 清空画布
 */
Element.prototype.clear = function()
{
	this.getContext("2d").clearRect(0,0,this.width,this.height)
}
