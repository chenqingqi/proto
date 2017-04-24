/**************************************************
 * 
 * 本地存储
 * 临时存储，永久存储，cookie操作
 * 
***************************************************/

window.storage = {};


/**
 * 写人本地永久数据
 * @param name:string 名字
 * @param data:object json数据
 */
storage.write = function(name,data)
{
	localStorage[name] = JSON.stringify(data); 
}


/**
 * 读取本地永久数据
 * @param name:string 名字
 */
storage.read = function(name)
{
	if( localStorage[name] == undefined)
	{
		return null;
	}
	else
	{
		return JSON.parse(localStorage[name])
	}
}


/**
 * 删除本地永久数据
 * @param name:string 名字
 */
storage.remove = function(name)
{
	localStorage.removeItem(name);
}



/**
 * 写人临时数据
 * @param name:string 名字
 * @param data:object json数据
 */
storage.writeSession = function(name,data)
{
	sessionStorage[name] = JSON.stringify(data);
}


/**
 * 读取临时数据
 * @param name:string 名字
 */
storage.readSession = function(name)
{
	if(sessionStorage[name] == undefined)
	{
		return null;
	}
	else
	{
		return JSON.parse(sessionStorage[name])
	}
}


/**
 * 删除临时数据
 * @param name:string 名字
 */
storage.removeSession = function(name)
{
	sessionStorage.removeItem(name);
}



/**
 * 写人Cookie数据
 * @param name:string 名字
 * @param data:object json数据
 */
storage.writeCookie = function(name,data)
{
	var Days = 30; 
    var exp  = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (data) + ";expires=" + exp.toGMTString(); 
}


/**
 * 读取Cookie数据
 * @param name:string 名字
 */
storage.readCookie = function(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
    {
    	return unescape(arr[2]); 
    }
    else
    {
    	return 0;
    }
}

