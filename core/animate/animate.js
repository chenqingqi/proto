/**************************************************
 * 
 * 节点动画
 * 封装的css动画，支持ie9+
 * 
***************************************************/

/**
 * 节点动画
 * @param  properties :Object   属性
 * @param  duration	  :int      时间
 * @param  easing     :string   类型 {linear:'匀速',ease:'慢-快-慢',ease-in:'慢-快',ease-out:'快-慢'}
 * @param  complete   :function 回调
 */
Element.prototype.animate = function(properties,duration,easing,complete) 
{
	if(!duration) duration = '1s';
	
	if(!easing  ) easing   = 'ease';
	
	for(var i in properties)
	{
		this.style[i] = properties[i]
	};
	
	this.style.transition = 'all '+duration+'s '+easing;
	
	if(complete) setTimeout(complete,duration*1000);
}



/**
 * 缩放节点
 */
Element.prototype.scale = function(x,y)
{
	this.style.msTransform     = "scale("+x+','+y+")";
	this.style.transform       = "scale("+x+','+y+")";
	this.style.webkitTransform = "scale("+x+','+y+")";
}


/**
 * 旋转节点
 */
Element.prototype.rotate = function(value)
{
	this.style.msTransform     = "rotate("+value+"deg)";
	this.style.transform       = "rotate("+value+"deg)";
	this.style.webkitTransform = "rotate("+value+"deg)";
}


/**
 * 移动节点
 */
Element.prototype.move = function(x,y)
{
	
	this.style.msTransform     = "translate("+x+'px,'+y+"px)";
	this.style.transform       = "translate("+x+'px,'+y+"px)";
	this.style.webkitTransform = "translate("+x+'px,'+y+"px)";
}