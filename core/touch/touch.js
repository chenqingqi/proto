/**************************************************
 *
 * @author chenqingqi
 * 
 * touch触摸扩展
 * 
***************************************************/


window.touch = {};


/**
 * 滑动的矩形(起始值)
 */
touch.rectangle = {x:0,y:0,w:0,h:0};


/**
 * 滑动的方向:x:0左,1右, y:0上,1下,
 */
touch.direction = {x:0,y:0};


/**
 * 滑动距离
 */
touch.distance = {x:0,y:0};


/**
 * 滑动点击(按下和弹起在同一位置)
 */
touch.isclick = false;



/**
 * 按下
 */
window.addEventListener('touchstart',function(e){
	
	touch.rectangle.x = e.targetTouches[0].screenX;
	touch.rectangle.y = e.targetTouches[0].screenY;
	touch.rectangle.w = e.targetTouches[0].screenX;
	touch.rectangle.h = e.targetTouches[0].screenY;
	
},true);



/**
 * 移动
 */
window.addEventListener('touchmove',function(e){
	
	touch.rectangle.w     = e.targetTouches[0].screenX;
	touch.rectangle.h     = e.targetTouches[0].screenY;
	touch.distance.x = e.targetTouches[0].screenX-touch.rectangle.x;
	touch.distance.y = e.targetTouches[0].screenY-touch.rectangle.y;
	
	if(touch.rectangle.w>touch.rectangle.x)
	{
		touch.direction.x = 1;
	}
	else
	{
		touch.direction.x = 0;
	}
	
	if(touch.rectangle.h>touch.rectangle.y)
	{
		touch.direction.y = 1;
	}
	else
	{
		touch.direction.y = 0;
	}
	
},true);



/**
 * 弹起
 */
window.addEventListener('touchend',function(e){
	
	if(touch.rectangle.w == touch.rectangle.x && touch.rectangle.h == touch.rectangle.y)
	{
		touch.isclick = true;
	}
	else
	{
		touch.isclick = false;
	}
	
},true);