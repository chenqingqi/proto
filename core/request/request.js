/**************************************************
 * 
 * http请求
 * 封装的ajax的通信功能
 * 
***************************************************/

/**
 * 
 * 请求数据(http方式)
 * @param data :object        数据
 * @param url  :string        地址
 * @param type  :string       请求类型
 * @param complete :function  请求成功
 * @param error :function     网络错误
 * 
 */
Window.prototype.request = function(data,url,type,complete,error) 
{
	
	if(!error)
	{
		error = function(){};
	}
	
	
	/**
	 * 对象
	 */
	var http = new XMLHttpRequest();
	
	
	/**
	 * 请求
	 */
	if(type == 'get' || type == 'GET')
	{
		var value = '?';
		for(var i in data){value = value+i+'='+data[i]+'&'};
		value = value.substring(0,value.length-1);
		
		http.open(type,url+value,true);
		http.setRequestHeader("Content-Type","application/json"); 
		http.setRequestHeader("X-Requested-With","XMLHttpRequest"); 
		http.send(null);
	}
	else
	{
		http.open(type,url,true);
		http.setRequestHeader("Content-Type","application/json"); 
		http.setRequestHeader("X-Requested-With","XMLHttpRequest"); 
		http.send(JSON.stringify(data));
	}
	
	
	/**
	 * 状态
	 */
	http.onreadystatechange = function(e)
	{
		if(this.readyState == 4)
		{
			/**
			 * 成功
			 */
			if(this.status == 200)
			{
				try 
				{
					complete(JSON.parse(this.responseText));
					
					//console.log(JSON.parse(this.responseText));
					
				}
				catch(e)
				{
					complete(this.responseText);
					//console.log(this.responseText);
				}
				
				console.log(url)
			}
			
			/**
			 * 失败
			 */
			if(this.status == 404)
			{
				error();
				console.log('404错误')
			}
		}
	}
}




/**
 * Ajax请求
 * @param {Object} conf  配置文件
 */
window.ajax = function(conf) 
{
    
    //type参数,可选
    var type = conf.type;
    
    //url参数，必填 
    var url = conf.url;
    
    //data参数可选，只有在post请求时需要
    var data = conf.data;
    
    //datatype参数可选    
    var dataType = conf.dataType;
    
    //成功
    var success = conf.success;
    
    //失败
    var error   = conf.error;
                                                                                         
    if (type == null)
    {
        //type参数可选，默认为get
        type = "get";
    }
    
    if (dataType == null)
    {
        //dataType参数可选，默认为text
        dataType = "text";
    }
    
    // 创建ajax引擎对象
    var xhr = createAjax();
    
    // 打开
    xhr.open(type, url, true);
    // 发送
    if (type == "GET" || type == "get") 
    {
        xhr.send(null);
    } 
    else if (type == "POST" || type == "post") 
    {
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data);
    }
    
    xhr.onreadystatechange = function() 
    {
        if (xhr.readyState == 4 && xhr.status == 200) 
        {
            if(dataType == "text"||dataType=="TEXT") 
            {
                if (success != null)
                {
                    //普通文本
                    success(xhr.responseText);
                }
            }
            else if(dataType=="xml"||dataType=="XML") 
            {
                if (success != null)
                {
                    //接收xml文档    
                    success(xhr.responseXML);
                }  
            }
            else if(dataType=="json"||dataType=="JSON") 
            {
                if (success != null)
                {
                    //将json字符串转换为js对象  
                    success(eval("("+xhr.responseText+")"));
                }
            }
        }
        
        if(xhr.readyState == 4 && this.status == 404)
        {
        	error({code:'404'})
        }
    }
}


var createAjax = function() 
{
    var xhr = null;
    
    try 
    {
        //IE系列浏览器
        xhr = new ActiveXObject("microsoft.xmlhttp");
    } 
    catch (e1) 
    {
        try 
        {
            //非IE浏览器
            xhr = new XMLHttpRequest();
        } 
        catch (e2) 
        {
            window.alert("您的浏览器不支持ajax，请更换！");
        }
    }
    
    return xhr;
}





