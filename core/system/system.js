/**************************************************
 * 
 * 系统
 * 浏览器及系统平台相关
 * 
***************************************************/

window.system = function(){};


/**
 * 获取运行平台是pc还是mobile
 */
system.getType = function()
{
	var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"]; 
    
    var flag   = 'pc';
    
    for (var v = 0; v < Agents.length; v++) 
    {
        if (userAgentInfo.indexOf(Agents[v]) > 0) 
        {
            flag = 'moblie';
            break;
        }
    }
    
    return flag;
}


/**
 * 获取操作系统名称
 */
system.getName = function()
{
	var sUserAgent = navigator.userAgent;
	
	if(this.getType() == 'pc')
	{
		if (/windows|win32/i.test(navigator.userAgent))
	    {
	    	return 'windows';
	    }
	    
	    if (/macintosh|mac os x/i.test(navigator.userAgent))
	    {
	    	return 'mac';
	    }
	    
	    if (/linux/i.test(navigator.userAgent))
	    {
	    	return 'linux';
	    }
	}
	else
	{
		if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('Linux') > -1)
	    {
	    	return "Android";
	    }
	    
		if (sUserAgent.indexOf('iPhone') > -1)
		{
			return "iPhone";
		}
		
		if (sUserAgent.indexOf('iPad') > -1)
		{
			return "iPad";
		}
		
		if (sUserAgent.indexOf('Windows Phone') > -1)
		{
			return "Windows Phone";
		}
	}
}


/**
 * 是否启用cookie
 */
system.isCookieEnabled = function()
{
	return navigator.cookieEnabled;
}



/**
 * 获取浏览器的名称
 */
system.getBrowserName = function()
{
	var agent = navigator.userAgent.toLowerCase() ;
	
	//IE
	if(agent.indexOf("msie") > 0)
	{
		return 'ie' ;
	}
	
	//firefox
	if(agent.indexOf("firefox") > 0)
	{
		return 'firefox' ;
	}
	
	//Chrome
	if(agent.indexOf("chrome") > 0)
	{
		return 'chrome';
	}
	
	//Safari
	if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0)
	{
		return 'safari';
	}
}


/**
 * 获取浏览器版本号
 */
system.getBrowserVision = function()
{
	var agent = navigator.userAgent.toLowerCase() ;

	var regStr_ie     = /msie [\d.]+;/gi ;
	var regStr_ff     = /firefox\/[\d.]+/gi
	var regStr_chrome = /chrome\/[\d.]+/gi ;
	var regStr_saf    = /safari\/[\d.]+/gi ;
	var name='';
	
	//IE
	if(agent.indexOf("msie") > 0)
	{
		name = agent.match(regStr_ie);
	}
	
	//firefox
	if(agent.indexOf("firefox") > 0)
	{
		name = agent.match(regStr_ff);
	}
	
	//Chrome
	if(agent.indexOf("chrome") > 0)
	{
		name = agent.match(regStr_chrome);
	}
	
	//Safari
	if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0)
	{
		name = agent.match(regStr_saf);
	}
	
	return parseFloat(String(name).replace(/[a-zA-Z/]/g,"")).toFixed(0);
}









