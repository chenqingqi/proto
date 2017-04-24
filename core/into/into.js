/**************************************************
 * 
 * 获取器
 * 得到入口js文件并执行
 * 
***************************************************/

window.addEventListener('load',function(e)
{
	
	var script = document.getElementsByTagName('script');
	
	var srcs   = [];
	
	for(var i=0;i<script.length;i++)
	{
		if(script[i].getAttribute('main')) 
		{
			srcs.push(document.getElementsByTagName('script')[i].getAttribute('main'));
		}
	}
	
	for(var k=0;k<srcs.length;k++)
	{
		var script    = document.createElement('script');
		script.type   = 'text/javascript';
		script.src    = srcs[k];
		
		document.getElementsByTagName('head')[0].appendChild(script);
		
		script.onload = function(e)
		{
			document.getElementsByTagName('head')[0].removeChild(this);
		}
	}
})