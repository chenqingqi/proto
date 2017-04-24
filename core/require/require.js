/**************************************************
 * 
 * 类加载器
 * 动态加载JS类文件
 * 
***************************************************/

window.require = function(paths,complete)
{
	
	if(window.requirePath == undefined)
	{
		window.requirePath = '';
	}
	
	/**
	 * 循环加载
	 */
	if(paths.length > 0)
	{
		load(requirePath+paths[0],onLoadBack)
	}
	else
	{
		complete()
	}
	
	
	function onLoadBack()
	{
		paths.splice(0,1);
		
		if(paths.length > 0)
		{
			load(requirePath+paths[0],onLoadBack)
		}
		else
		{
			complete()
		}
	}
	
	
	/**
	 * 加载文件
	 */
	function load(src,back)
	{
		
		//屏蔽重加载
		if(repeat(src))
		{
		    back()
		}
		else
		{
			var script = document.createElement('script');
		    script.type = 'text/javascript';
		    script.src  = src;
		    
		    script.onload = function(e)
		    {
		    	console.log('加载完成：'+script.src);
		    	document.getElementsByTagName('head')[0].removeChild(this);
		    	back()
		    }
		    
		    document.getElementsByTagName('head')[0].appendChild(script);
		}
	}
	
	
	/**
	 * 检查重复
	 */
	function repeat(url)
	{
		var scripts = document.getElementsByTagName('script');
		
		for(var i in scripts)
		{
			if(scripts[i].src)
			{
				if(scripts[i].src.replace('http://'+location.host,"") == url)
				{
					console.log('JS文件重复加载：'+url);
					
					return true;
				}
			}
		}
		
		return false;
	}
}