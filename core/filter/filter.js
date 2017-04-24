/**************************************************
 * 
 * 滤镜
 * 封装了节点滤镜的操作
 * 
***************************************************/


/**
 * 透明度
 * @value 0-1之间的小数
 */
Element.prototype.alpha = function(value) 
{
	this.style.opacity = value;
}


/**
 * 阴影
 * @value 'x轴,y轴,模糊程度,阴影大小,颜色'
 */
Element.prototype.shadow = function(value)
{
	this.style.boxShadow = value;
}


/**
 * 模糊
 */


/**
 * 亮度
 */


/**
 * 对比度
 */


/**
 * 色相
 */


/**
 * 饱和度
 */


/**
 * 灰度
 */

