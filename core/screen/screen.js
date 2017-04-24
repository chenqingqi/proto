/**************************************************
 * 
 * 屏幕
 * 操作与屏幕相关的方法
 * 
***************************************************/

/**
 * 浏览器可见宽度
 */
screen.getBrowserWidth = function()
{
	return document.documentElement.clientWidth; 
}


/**
 * 浏览器可见高度
 */
screen.getBrowserHeight = function()
{
	return document.documentElement.clientHeight;
}


/**
 * 进入全屏
 */
screen.fullSreen = function()
{
	var de = document.documentElement;
	
    if(de.requestFullscreen) 
    {
        de.requestFullscreen();
    } 
    else if(de.mozRequestFullScreen) 
    {
        de.mozRequestFullScreen();
    } 
    else if(de.webkitRequestFullScreen) 
    {
        de.webkitRequestFullScreen();
    }
}


/**
 * 退出全屏
 */
screen.exitFullSreen = function()
{
	var de = document;

    if (de.exitFullscreen) 
    {
        de.exitFullscreen();
    } 
    else if (de.mozCancelFullScreen) 
    {
        de.mozCancelFullScreen();
    } 
    else if (de.webkitCancelFullScreen) 
    {
        de.webkitCancelFullScreen();
    }
}