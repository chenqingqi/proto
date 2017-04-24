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
/**************************************************
 *
 * 数组扩展
 * 
***************************************************/


/**
 * 删除数组中的指定元素
 * @object 数组中的元素
 */
Array.prototype.remove = function(object) 
{
	for(var i=0;i<this.length;i++)
	{
		if(this[i]==object) this.splice(i,1)
	}
	return this;
}


/**
 * 获取元素在数组中的位置
 * @object 数组中的元素
 */
Array.prototype.childAt = function(object)
{
	for(k in this)
    {
        if(this[k] == object) return k;
    }
}


/**
 * 清空数组中的元素
 */
Array.prototype.clear = function()
{
	this.splice(0,this.length);
	return this;
}


/**
 * 获取数组中最小的值
 */
Array.prototype.min = function()
{
	return Math.min.apply(null,this);
}


/**
 * 获取数组中最大的值
 */
Array.prototype.max = function()
{
	return Math.max.apply(null,this);
}


/**
 * 元素去重
 */
Array.prototype.unique = function()
{

    //临时数组
    var n = [];

    //遍历当前数组
    for(var i = 0; i < this.length; i++)
    {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，否则把当前项push到临时数组里面
        if(n.indexOf(this[i]) == -1)
        {
            n.push(this[i]);
        }
    }

    return n;
}


/**
 * 元素是否存在
 */
Array.prototype.has = function(obj)
{

   //遍历当前数组
    for(var i = 0; i < this.length; i++)
    {
       if(obj == this[i])
       {
       		return true;
       }
    }

    return false;
}


/**
 * 随机打乱数组
 */
Array.prototype.random = function()
{
	this.sort(function(){ return 0.5 - Math.random() });
	return this;
}



/**************************************************
 * 
 * 位图
 * 对image对象进行相关扩展
 * 
***************************************************/

/**
 * 获取图片文件的后缀名
 */
Element.prototype.suffix = function() 
{
	var _type;
	    
    if(this.src.indexOf('jpg') !==-1)
    {
    	_type = 'jpeg'
    }
    
    if(this.src.indexOf('png') !==-1)
    {
    	_type = 'png'
    }
    
    if(this.src.indexOf('gif') !==-1)
    {
    	_type = 'gif'
    }
    
    return _type;
}


/**
 * 压缩图片（设置图片的质量）
 */
Element.prototype.quality = function(value)
{
	if(this.nodeName == 'IMG')
	{
		var canvas    = document.createElement('canvas');
		var context   = canvas.getContext('2d');
		canvas.width  = this.width;
		canvas.height = this.height;
		context.drawImage(this,0,0,this.width,this.height,0,0,this.width,this.height);
	    return canvas.toDataURL('image/'+this.suffix(),value);
	}
	else
	{
		throw new Error('当前节点不是Image元素')
	}
}


/**
 * 裁剪图片(获得指定区域的位图像素)
 */
Element.prototype.cut = function(x,y,w,h)
{
	if(this.nodeName == 'IMG')
	{
		var canvas    = document.createElement('canvas');
		var context   = canvas.getContext('2d');
		canvas.width  = w;
		canvas.height = h;
		context.drawImage(this,x,y,w,h,0,0,w,h);
	    return canvas.toDataURL('image/'+this.suffix(),1);
	}
	else
	{
		throw new Error('当前节点不是Image元素')
	}
}
/**************************************************
 * 
 * 创建
 * 封装了节点创建的操作
 * 
***************************************************/

/**
 * 通过字符串创建节点
 */
Document.prototype.createElementByString  = function(value)
{
	var _node;
	
	if(value.indexOf('<') !== -1)
	{
		var node = this.createElement('div');
		node.innerHTML = value;
		_node = node.children[0];
	}
	
	return _node;
}
/**************************************************
 * 
 * 样式
 * 封装了节点样式的操作
 * 
***************************************************/


/**
 * 设置/获取样式
 * @param value:Object
 * 
 * 示例: 
 * node.css('width') 获取样式值
 * node.css({width:'100px',height:'80px'}) 设置样式值 
 */
Element.prototype.css = function(value)
{
	if((typeof value) == 'string')
	{
		return window.getComputedStyle(this,null)[value];
	}
	else if((typeof value) == 'object')
	{
		for(var i in value)
		{
			this.style[i] = value[i]
		}
	}
}


/**
 * 设置元素集合的样式
 */
NodeList.prototype.css = function(value)
{
	for(var i in value)
	{
		for(var k=0;k<this.length;k++)
		{
			this[k].style[i] = value[i]
		}
	}
}

/**************************************************
 *
 * 时间扩展
 * 
***************************************************/


/**
 * 标准格式化
 * yyyy-mm-dd hh:mm:ss(2016-08-06 12:06:08)
 * yyyy-mm-dd(2016-08-06)
 * hh:mm:ss(12:06:08)
 * yyyy-mm-dd hh:mm:ss week(2016-08-06 12:06:08 星期一)
 * yyyy-mm-dd week hh:mm:ss (2016-08-06 星期一 12:06:08) 
 * 年-月-日 时:分:秒  (2016年12月26日 14时22分23秒)
 */
Date.prototype.format = function(type)
{
	
	var year 		= this.getFullYear();
    var month 		= this.getMonth()+1;   
    var date 		= this.getDate();   
    var day 		= this.getDay();   
    var hours 		= this.getHours();   
    var minutes 	= this.getMinutes();   
    var seconds 	= this.getSeconds();   
    var ms 			= this.getMilliseconds();     
    var week        = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六']
    
    
    if(month<9)
    {
    	month = "0"+month; 
    }
    
    if(date<9) 
    {
    	date = "0"+date; 
    }
     
    if(hours<9)
    {
    	hours = "0"+hours; 
    }
      
    if(minutes<9)
    {
    	minutes = "0"+minutes; 
    }
      
    if(seconds<9) 
    {
    	seconds = "0"+seconds; 
    }
    
    
    switch(type)
    {
    	case 'yyyy-mm-dd hh:mm:ss':
    		return year+'-'+month+'-'+date+' '+hours+':'+minutes+':'+seconds;
    		break
    	
    	case 'yyyy-mm-dd':
    		return year+'-'+month+'-'+date;
    		break
    	
    	case 'hh:mm:ss':
    		return hours+':'+minutes+':'+seconds;
    		break
    	
    	case 'yyyy-mm-dd hh:mm:ss week':
    		return year+'-'+month+'-'+date+' '+hours+':'+minutes+':'+seconds+' '+week[day];
    		break
    		
    	case 'yyyy-mm-dd week hh:mm:ss':
    		return year+'-'+month+'-'+date+' '+week[day]+' '+hours+':'+minutes+':'+seconds;
    		break
    	
    	case '年-月-日 时:分:秒':
    		return year+'年'+month+'月'+date+'日 '+hours+'时'+minutes+'分'+seconds+'秒';
    		break
    }
}


/**
 * 自定义时间
 * @arr [yyyy,mm,dd,hh,mm,ss]
 */ 
Date.prototype.resetTime = function (arr) 
{
    this.setFullYear(arr[0]);
    this.setMonth   (arr[1]);
    this.setDate    (arr[2]);
    this.setHours   (arr[3]);
    this.setMinutes (arr[4]);
    this.setSeconds (arr[5]);
    
    return this;
}  
/**************************************************
 * 
 * 拖拽
 * 区别与拖放，实现类似滑块效果
 * 
***************************************************/

/**
 * 开始拖动
 */
Element.prototype.startDrag = function() 
{
	
}


/**
 * 结束拖动
 */
Element.prototype.stopDrag = function()
{
	
}
/**************************************************
 * 
 * 节点选择器
 * 类似于jquery的$方法
 * 
***************************************************/


/**
 * 选择/创建节点
 * @param value:String
 * 
 * 示例：
 * 通过id获取节点              element('myid') 
 * 通过class获取节点组     element('myclass') 
 * 通过标签名获取节点组    element('div') 
 * 将字符串转换为节点       element('<slide></slide>') 
 * 
 * 
 */
window.element = function(value)
{
	
	/**
	 * 节点
	 */
	var _node;
	
	
	/**
	 * 将字符串转换为节点
	 */
	if(value.indexOf('<') !== -1)
	{
		var node = document.createElement('div');
		node.innerHTML = value;
		_node = node.children[0];
	}
	
	
	/**
	 * 通过id获取节点
	 */
	if(document.getElementById(value))
	{
		_node = document.getElementById(value);
		return _node;
	}
	
	
	/**
	 * 通过class获取节点组
	 */
	if(document.getElementsByClassName(value).length>0)
	{
		_node = document.getElementsByClassName(value);
		return _node;
	}
	
	
	/**
	 * 通过标签名获取节点
	 */
	if(document.getElementsByTagName(value).length>0)
	{
		_node = document.getElementsByTagName(value);
		return _node;
	}
	
	return _node;
}
/**************************************************
 * 
 * 文件上传
 * 封装文件上传/本地读取的方法和属性
 * 
***************************************************/ 



/**
 * 创建文件对象
 */
window.file = document.createElement('input');
file.type   = "file";
file.id     = 'window_file'
file.style.display = 'none';
file.setAttribute('hidden','hidden');



/**
 * 打开文件选择框
 */
file.open = function(multiple)
{
	if(!document.getElementById('window_file'))
	{
		document.body.appendChild(file)
	}
	
	if(multiple)
	{
		this.setAttribute('multiple','multiple');
	}
	
	this.click();
}


/**
 * 获取Base64文件主体
 */
file.toBase64Body = function(str)
{
	var header = str.slice(0,str.indexOf(',')+1);
	
	var data   = str.slice(str.indexOf(',')+1,str.length)
	
	return data;
}


/**
 * 获取Base64文件后缀名
 */
file.toBase64Type = function(str)
{
	var header = str.slice(0,str.indexOf(',')+1);
	
	var type   = str.slice(str.indexOf('/')+1,str.indexOf(';'));
	
	return type;
}






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


/**************************************************
 * 
 * 表单
 * 封装了表单的操作
 * 
***************************************************/

/**
 * 获取表单中类型为text的值
 */
Element.prototype.data = function()
{
	var _data = {};
		
	if(this.nodeName == 'FORM')
	{
		function traverse(element)
		{
		    var node = element || document;
		
		    var focusNode  = node.firstChild;
		
			while (focusNode != null) 
		    {
		        
		        //文本
	        	if(focusNode.type == 'text' && focusNode.name)
	        	{
	        		_data[focusNode.getAttribute('name')] = focusNode.value;
	        	}
	        	
	        	
	        	//密码
	        	if(focusNode.type == 'password' && focusNode.name)
	        	{
	        		_data[focusNode.getAttribute('name')] = focusNode.value;
	        	}
	        	
	        	
	        	//隐藏域
	        	if(focusNode.type == 'hidden' && focusNode.name)
	        	{
	        		_data[focusNode.getAttribute('name')] = focusNode.value;
	        	}
	        	
	        	
	        	
	        	//单选
	        	if(focusNode.type == 'radio' && focusNode.name)
	        	{
	        		if(focusNode.getAttribute('checked') || focusNode.getAttribute('checked') =='')
	        		{
	        			_data[focusNode.getAttribute('name')] = 1
	        		}
	        		else
	        		{
	        			_data[focusNode.getAttribute('name')] = 0
	        		}
	        	}
	        	
	        	
	        	
	        	//多选
	        	if(focusNode.type == 'checkbox' && focusNode.name)
	        	{
	        		
	        		if(focusNode.getAttribute('checked') || focusNode.getAttribute('checked') == '')
	        		{
	        			if(_data[focusNode.getAttribute('name')])
		        		{
		        			_data[focusNode.getAttribute('name')].push(focusNode.value)
		        		}
		        		else
		        		{
		        			_data[focusNode.getAttribute('name')] = [];
		        			_data[focusNode.getAttribute('name')].push(focusNode.value)
		        		}
	        		}
	        	}
	        	
	        	
	        	
	        	//文本域
	        	if(focusNode.nodeName == 'TEXTAREA' && focusNode.name)
	        	{
	        		_data[focusNode.getAttribute('name')] = focusNode.value;
	        	}
	        	
	        	
	        	
	        	//下拉列表
	        	if(focusNode.nodeName == 'SELECT' && focusNode.name)
	        	{
	        		
	        		for(var i=0;i<focusNode.children.length;i++)
	        		{
	        			if(focusNode.children[i].getAttribute('selected') == '' || focusNode.children[i].getAttribute('selected'))
	        			{
	        				_data[focusNode.getAttribute('name')] = focusNode.children[i].value;
	        			}
	        		}
	        	}
	        	
				traverse(focusNode);
		        
		        focusNode = focusNode.nextSibling;   
		    }
		}
		
		traverse(this);
		
		return _data;
	}
}


/**
 * 序列化表单数据为：对象数组
 */
Element.prototype.serializeToObject = function()
{
	if(this.nodeName == 'FORM')
	{
		function nodeEach(list)
		{ 
			//将NodeList转换为Array
	    	var arr = new Array();  
	    	for( var i = 0 ; list.length > i;i++ )
	    	{
	        	var node = list[i];   
	        	arr.push(node);  
	    	}  
		    return arr;  
		}  
		  
		function in_array(search,array)
		{
		    for(var i in array)
		    {
		        if(array[i]==search)
		        {
		            return true;  
		        }  
		    }  
		    return false;  
		}  
		  
		function getJsonObjLength(jsonObj) 
		{
		    var Length = 0;  
		    for (var item in jsonObj) 
		    {
		        Length++;  
		    }  
		    return Length;  
		} 
		
		var formDom = this;  
	    var valueList = [];//保存待处理的值，结构为： name , value   
	    var data = {};//返回结果的json数组  
	      
	    var type1List = new Array();  
	    type1List = type1List.concat( nodeEach( formDom.querySelectorAll("input[type='color']") ) );  
	    type1List = type1List.concat( nodeEach( formDom.querySelectorAll("input[type='date']") ) );  
	    type1List = type1List.concat( nodeEach( formDom.querySelectorAll("input[type='datetime']") ) );  
	    type1List = type1List.concat( nodeEach( formDom.querySelectorAll("input[type='datetime-local']") ) );  
	    type1List = type1List.concat( nodeEach( formDom.querySelectorAll("input[type='email']") ) );  
	    type1List = type1List.concat( nodeEach( formDom.querySelectorAll("input[type='hidden']") ) );  
	    type1List = type1List.concat( nodeEach( formDom.querySelectorAll("input[type='month']") ) );  
	    type1List = type1List.concat( nodeEach( formDom.querySelectorAll("input[type='number']") ) );  
	    type1List = type1List.concat( nodeEach( formDom.querySelectorAll("input[type='password']") ) );  
	    type1List = type1List.concat( nodeEach( formDom.querySelectorAll("input[type='range']") ) );  
	    type1List = type1List.concat( nodeEach( formDom.querySelectorAll("input[type='search']") ) );  
	    type1List = type1List.concat( nodeEach( formDom.querySelectorAll("input[type='tel']") ) );  
	    type1List = type1List.concat( nodeEach( formDom.querySelectorAll("input[type='text']") ) );  
	    type1List = type1List.concat( nodeEach( formDom.querySelectorAll("input[type='time']") ) );  
	    type1List = type1List.concat( nodeEach( formDom.querySelectorAll("input[type='url']") ) );  
	    type1List = type1List.concat( nodeEach( formDom.querySelectorAll("input[type='week']") ) );  
	    type1List = type1List.concat( nodeEach( formDom.querySelectorAll("input[type='radio']:checked") ) );  
	    
	    for( var i = 0 ; type1List.length > i ; i++ )
	    {
	        var dom = type1List[i];  
	        var name = dom.getAttribute("name");//键名  
	        var value = dom.value;//值  
	        valueList.push( { name: name, value: value} );  
	          
	    }  
	      
	    var type3List = formDom.querySelectorAll("input[type='checkbox']:checked");  
	    var existCheckbox = new Array();  
	    for( var i = 0 ; type3List.length > i ; i++ )
	    {
	        if( in_array( type3List[i].getAttribute("name"), existCheckbox ) )//判断是否已处理  
	            continue;  
	          
	        var dom = type3List[i];  
	          
	        var name = dom.getAttribute("name");//键名  
	        var value = dom.value;//值  
	          
	        var cache = { name: name, value: [] };  
	          
	        var l = formDom.querySelectorAll("input[type='checkbox'][name='"+name+"']:checked");  
	        for( var j = 0 ; l.length > j ; j++ )
	        {
	            cache.value.push( l[j].value );  
	        }  
	        valueList.push( cache );  
	          
	    }  
	      
	    var type4List = formDom.querySelectorAll("select");  
	    for( var i = 0 ; type4List.length > i ; i++ )
	    {
	        var name = type4List[i].getAttribute("name");//键名  
	        var value = type4List[i].options[type4List[i].options.selectedIndex].getAttribute("value"); //值  
	        valueList.push( { name: name, value: value} );  
	          
	    }  
	      
	    for( var i = 0 ; valueList.length > i ; i++ )
	    {
	        var row = valueList[i];  
	        var name = row.name;  
	        if( !name ){  
	            continue;  
	        }  
	        var value = row.value?row.value:null;  
	        var kArr = name.split("[");//是否是数组  
	          
	        var cDatas = "data";  
	        for( var j = 0; j < kArr.length; j++ )
	        {
	            var cn = kArr[j].replace(/\]/g, "").trim();//去除右方括号  
	            if(cn){  
	                  
	                if( !isNaN(cn) )
	                {
	                    cDatas += "[" + cn + "]";  
	                }
	                else
	                {
	                    cDatas += "." + cn;  
	                }  
	                if( eval(cDatas+" == null") ) {  
	                    eval( cDatas + "= {};" );  
	                }  
	                  
	            }
	            else
	            {
	            	//追加
	                cDatas += "["+ eval( "getJsonObjLength("+cDatas + ")" )+"]";  
	                eval( cDatas + " = {};" );  
	            }  
	        }  
	          
	        eval( cDatas + " = value;" );  
	          
	    }  
	    return data;  
	}
	else
	{
		throw new Error('不能对非Form元素进行序列化')
	}
}



/**
 * 序列化表单数据为：Json字符串
 */
Element.prototype.serializeToJson = function()
{
	return JSON.stringify(this.serializeToObject())
}


/**
 * 序列化表单数据为：键值对字符串
 */
Element.prototype.serialize= function()
{
	var str='';
	
	var data = this.serializeToObject();
	
	for( var i in data)
	{
		if(typeof data[i] == 'object')
		{
			var arr = data[i];
			
			for(var k=0;k<arr.length;k++)
			{
				if(str.length>0)
				{
					str = str +'&'+i+'='+arr[k]
				}
				else
				{
					str = str +i+'='+arr[k]
				}
			}
		}
		else
		{
			if(str.length>0)
			{
				str = str +'&'+i+'='+this.serializeToObject()[i]
			}
			else
			{
				str = str +i+'='+this.serializeToObject()[i]
			}
		}
	}
	
	return str;
}

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
/**************************************************
 * 
 * 文件加载
 * 对图片/json/text等文件进行加载操作
 * 
***************************************************/

/**
 * 
 * @param url:string        路径
 * @param complete:function 加载完成
 */
window.loader = function(url,complete) 
{
	
	var suffix = url.replace(/.+\./, "");
	
	
	if(suffix == 'jpg' || suffix == 'png')
	{
		loadIMG(url,complete)
	}
	
	if(suffix == 'json')
	{
		loadJSON(url,complete)
	}
	
	if(suffix == 'txt' || suffix == 'js' || suffix == 'css'|| suffix == 'html')
	{
		loadTEXT(url,complete)
	}
	
	
	/**
	 * 加载图片
	 */
	function loadIMG(url,back)
	{
		var element = document.createElement('img');
		element.src = url;
		element.onload = function(e)
		{
			back({type:'image',data:getBase64Image(element)})
		}
		
		function getBase64Image(img) 
		{
            var canvas 	 	= document.createElement("canvas");
            canvas.width 	= img.width;
            canvas.height 	= img.height;
            var ctx 		= canvas.getContext("2d");
            ctx.drawImage(img,0,0,img.width,img.height);
            var dataURL 	= canvas.toDataURL("image/png");
            return dataURL
        }
	}
	
	
	/**
	 * 加载JSON
	 */
	function loadJSON(url,back)
	{
		var http = new XMLHttpRequest();
		http.open("GET",url,true); 
		http.send();
		
		http.onreadystatechange = function(e)
		{
			if(this.readyState == 4 && this.status == 200)
			{
				back({type:'json',data:JSON.parse(http.responseText)})
			}
			
			if(this.readyState == 4 && this.status == 404)
			{
				throw '加载'+url+'失败'
			}
		}
	}
	
	
	/**
	 * 加载TEXT(包含js css html text)
	 */
	function loadTEXT(url,back)
	{
		
		var http = new XMLHttpRequest();
		http.open("GET",url,true); 
		http.send();
		
		http.onreadystatechange = function(e)
		{
			if(this.readyState == 4 && this.status == 200)
			{
				back({type:'text',data:http.responseText})
			}
			
			if(this.readyState == 4 && this.status == 404)
			{
				throw '加载'+url+'失败'
			}
		}
	}
}

/**************************************************
 * 
 * 路径
 * 对地址栏网址串进行操作
 * 
***************************************************/

/**
 * 获取路径中的get值
 */
location.getValue = function(name)
{
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
    var r = location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

/**************************************************
 *
 * 运算扩展
 * 
***************************************************/

/**
 * 产生从n到n的随机整数
 */
Math.splice = function(start,end) 
{
	var choice = end - start + 1;
    return this.floor(this.random() * choice + start); 
}
/**************************************************
 * 
 * MD5通用加密
 * 对用户信息进行加密存储
 * 
***************************************************/

function md5(){}

/**
 * 打印加密后的字符串
 */
md5.print = function(string)
{
    function md5_RotateLeft(lValue, iShiftBits) {
            return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits)); 
    }
    function md5_AddUnsigned(lX,lY){
            var lX4,lY4,lX8,lY8,lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                    return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                    if (lResult & 0x40000000) {
                            return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                    } else {
                            return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                    }
            } else {
                    return (lResult ^ lX8 ^ lY8);
            }
    }         
    function md5_F(x,y,z){
            return (x & y) | ((~x) & z);
    }
    function md5_G(x,y,z){
            return (x & z) | (y & (~z));
    }
    function md5_H(x,y,z){
            return (x ^ y ^ z);
    }
    function md5_I(x,y,z){
            return (y ^ (x | (~z)));
    }
    function md5_FF(a,b,c,d,x,s,ac){
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }; 
    function md5_GG(a,b,c,d,x,s,ac){
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_HH(a,b,c,d,x,s,ac){
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }; 
    function md5_II(a,b,c,d,x,s,ac){
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1=lMessageLength + 8;
            var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
            var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
            var lWordArray=Array(lNumberOfWords-1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while ( lByteCount < lMessageLength ) {
                    lWordCount = (lByteCount-(lByteCount % 4))/4;
                    lBytePosition = (lByteCount % 4)*8;
                    lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                    lByteCount++;
            }
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
            lWordArray[lNumberOfWords-2] = lMessageLength<<3;
            lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
            return lWordArray;
    }; 
    function md5_WordToHex(lValue){
            var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
            for(lCount = 0;lCount<=3;lCount++){
                    lByte = (lValue>>>(lCount*8)) & 255;
                    WordToHexValue_temp = "0" + lByte.toString(16);
                    WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
            }
            return WordToHexValue;
    };
    function md5_Utf8Encode(string){
            string = string.replace(/\r\n/g,"\n");
            var utftext = ""; 
            for (var n = 0; n < string.length; n++) {
                    var c = string.charCodeAt(n); 
                    if (c < 128) {
                            utftext += String.fromCharCode(c);
                    }else if((c > 127) && (c < 2048)) {
                            utftext += String.fromCharCode((c >> 6) | 192);
                            utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                            utftext += String.fromCharCode((c >> 12) | 224);
                            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                            utftext += String.fromCharCode((c & 63) | 128);
                    } 
            } 
            return utftext;
    }; 
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
    string = md5_Utf8Encode(string);
    x = md5_ConvertToWordArray(string); 
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476; 
    for (k=0;k<x.length;k+=16) {
            AA=a; BB=b; CC=c; DD=d;
            a=md5_FF(a,b,c,d,x[k+0], S11,0xD76AA478);
            d=md5_FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
            c=md5_FF(c,d,a,b,x[k+2], S13,0x242070DB);
            b=md5_FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
            a=md5_FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
            d=md5_FF(d,a,b,c,x[k+5], S12,0x4787C62A);
            c=md5_FF(c,d,a,b,x[k+6], S13,0xA8304613);
            b=md5_FF(b,c,d,a,x[k+7], S14,0xFD469501);
            a=md5_FF(a,b,c,d,x[k+8], S11,0x698098D8);
            d=md5_FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
            c=md5_FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
            b=md5_FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
            a=md5_FF(a,b,c,d,x[k+12],S11,0x6B901122);
            d=md5_FF(d,a,b,c,x[k+13],S12,0xFD987193);
            c=md5_FF(c,d,a,b,x[k+14],S13,0xA679438E);
            b=md5_FF(b,c,d,a,x[k+15],S14,0x49B40821);
            a=md5_GG(a,b,c,d,x[k+1], S21,0xF61E2562);
            d=md5_GG(d,a,b,c,x[k+6], S22,0xC040B340);
            c=md5_GG(c,d,a,b,x[k+11],S23,0x265E5A51);
            b=md5_GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
            a=md5_GG(a,b,c,d,x[k+5], S21,0xD62F105D);
            d=md5_GG(d,a,b,c,x[k+10],S22,0x2441453);
            c=md5_GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
            b=md5_GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
            a=md5_GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
            d=md5_GG(d,a,b,c,x[k+14],S22,0xC33707D6);
            c=md5_GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
            b=md5_GG(b,c,d,a,x[k+8], S24,0x455A14ED);
            a=md5_GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
            d=md5_GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
            c=md5_GG(c,d,a,b,x[k+7], S23,0x676F02D9);
            b=md5_GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
            a=md5_HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
            d=md5_HH(d,a,b,c,x[k+8], S32,0x8771F681);
            c=md5_HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
            b=md5_HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
            a=md5_HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
            d=md5_HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
            c=md5_HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
            b=md5_HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
            a=md5_HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
            d=md5_HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
            c=md5_HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
            b=md5_HH(b,c,d,a,x[k+6], S34,0x4881D05);
            a=md5_HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
            d=md5_HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
            c=md5_HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
            b=md5_HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
            a=md5_II(a,b,c,d,x[k+0], S41,0xF4292244);
            d=md5_II(d,a,b,c,x[k+7], S42,0x432AFF97);
            c=md5_II(c,d,a,b,x[k+14],S43,0xAB9423A7);
            b=md5_II(b,c,d,a,x[k+5], S44,0xFC93A039);
            a=md5_II(a,b,c,d,x[k+12],S41,0x655B59C3);
            d=md5_II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
            c=md5_II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
            b=md5_II(b,c,d,a,x[k+1], S44,0x85845DD1);
            a=md5_II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
            d=md5_II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
            c=md5_II(c,d,a,b,x[k+6], S43,0xA3014314);
            b=md5_II(b,c,d,a,x[k+13],S44,0x4E0811A1);
            a=md5_II(a,b,c,d,x[k+4], S41,0xF7537E82);
            d=md5_II(d,a,b,c,x[k+11],S42,0xBD3AF235);
            c=md5_II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
            b=md5_II(b,c,d,a,x[k+9], S44,0xEB86D391);
            a=md5_AddUnsigned(a,AA);
            b=md5_AddUnsigned(b,BB);
            c=md5_AddUnsigned(c,CC);
            d=md5_AddUnsigned(d,DD);
    }
	return (md5_WordToHex(a)+md5_WordToHex(b)+md5_WordToHex(c)+md5_WordToHex(d)).toLowerCase();
}
/**
 * 设置鼠标样式
 */
Element.prototype.cursor = function(value)
{
	this.style.cursor = value;
}


/**
 * 检查鼠标是否真正从外部移入或者移出对象的(解决mouseover和mouseout的缺陷问题)
 * @param event 当前的事件对象
 */
Element.prototype.checkHover = function(e)
{
	
	var target = this;
	
	/**
     * 用于在MSIE或者FF下返回一个可用的event对象
     * @param {string} e 当前的事件对象
     */
    function getEvent(e)
    {
    	return e||window.event;
    }
    
    /**
     * 检查一个对象是否包含在另外一个对象中
     * @method contains 
     * @param {string} parentNode 父节点
     * @param {string} childNode 子节点
     */
    function contains(parentNode,childNode) 
    {
        if (parentNode.contains) 
        {
            return parentNode != childNode && parentNode.contains(childNode); 
        }
        else 
        {
            return !!(parentNode.compareDocumentPosition(childNode) & 16); 
        } 
    }

	/**
	 * 返回结果
	 * @param {string} relatedTarget 属性代表的就是鼠标刚刚离开的那个节点，当触发mouseout事件时它代表的是鼠标移向的那个对象。
 	 * 由于MSIE不支持这个属性，不过它有代替的属性，分别是 fromElement和toElement
	 */
    var rel = getEvent(e).relatedTarget,
    from    = getEvent(e).fromElement,
    to      = getEvent(e).toElement;
    if(getEvent(e).type=="mouseover")  
    {
        return !contains(target,rel||from) && !((rel||from)===target);
    } 
    else 
    {
        return !contains(target,rel||to) && !((rel||to)===target);
    }
}
/**************************************************
 * 
 * 节点
 * 封装了对节点对象的简便操作
 * 
***************************************************/


/**
 * 遍历子孙节点
 */
Element.prototype.traverse = function(back) 
{
	
	function nodeForeach(element,back)
	{
	    /**
	     * 获得节点
	     */
	    var node = element || document;
	
	    /**
	     * 设置指针
	     */
	    var focusNode  = node.firstChild;
	
	    /**
	     * 循环遍历
	     */
	    while (focusNode != null) 
	    {
	        if (focusNode.nodeType == 1) 
	        {
	
	            //递归 
	            nodeForeach(focusNode);
	
	            back(focusNode);
	        }
	
	        //遍历子节点
	        focusNode = focusNode.nextSibling;   
	    }
	}
	
	nodeForeach(this,back)
}



/**
 * 是否为按钮模式
 */
Element.prototype.buttonModel = function(value) 
{
	if(value == true)
	{
		this.style.cursor = "pointer";
	}
	else
	{
		this.style.cursor = "default";
	}
}



/**
 * 显示或隐藏节点
 */
Element.prototype.visible = function(v)
{
	if(v)
	{
		this.removeAttribute('hidden');
	
		var blockNames = 'OL UL DL TABLE H1 H2 H3 H4 H5 H6 P BLOCKQUOTE DT ADDRESS CAPTION DIV';
		
		if(blockNames.indexOf(this.nodeName) !== -1)
		{
			this.style.display = 'block';
		}
		else
		{
			this.style.display = 'inline';
		}
	}
	else
	{
		this.setAttribute('hidden','hidden');
		this.style.display = 'none';
	}
}



/**
 * 显示节点
 */
Element.prototype.show = function()
{
	this.removeAttribute('hidden');
	
	var blockNames = 'OL UL DL TABLE H1 H2 H3 H4 H5 H6 P BLOCKQUOTE DT ADDRESS CAPTION DIV';
	
	if(blockNames.indexOf(this.nodeName) !== -1)
	{
		this.style.display = 'block';
	}
	else
	{
		this.style.display = 'inline';
	}
	
}


/**
 * 隐藏节点
 */
Element.prototype.hide = function()
{
	this.setAttribute('hidden','hidden');
	//this.style.display = 'none';
}


/**
 * 设置或获取节点的深度
 */
Element.prototype.childIndex = function(value)
{
	if(!value && value !==0)
	{
		for(var i=0;i<this.parentNode.children.length;i++)
		{
			if(this.parentNode.children[i] == this)
			{
				return i;
			}
		}
	}
	else
	{
		var newnode  = this.cloneNode();
		newnode.innerHTML = this.innerHTML;
		var parent   = this.parentNode;
		parent.removeChild(this);
		
		var lastnode = parent.children[value];
		
		if(lastnode == undefined)
		{
			parent.appendChild(newnode)
		}
		else
		{
			parent.insertBefore(newnode,lastnode);
		}
	}
}



/**
 * 查找某个子对象
 */
Element.prototype.find = function(value)
{
	return this.querySelector(value);
}


/**
 * 节点移除自身
 */
Element.prototype.remove = function()
{
	if(this.parentNode)
	{
		this.parentNode.removeChild(this);
	}
	else
	{
		throw new Error('移除自身失败')
	}
}


/**
 * 节点替换自身
 */
Element.prototype.replace = function(object)
{
	var newNode = object.cloneNode();
	newNode.innerHTML = object.innerHTML;
	this.parentNode.replaceChild(newNode,this);
}


/**
 * 交互两个子节点的位置
 */
Element.prototype.setChildAt = function(a,b)
{
	var temp    = a.innerHTML;
	a.innerHTML = b.innerHTML;
	b.innerHTML = temp;
}


/**
 * 将子节点放到开头位置
 */
Element.prototype.setChildToFirst = function(v)
{
	
	var temp = v.cloneNode();
	temp.innerHTML = v.innerHTML;
	
	this.removeChild(v);
	
	this.insertBefore(temp,this.children[0])
}


/**
 * 将子节点放到末尾位置
 */
Element.prototype.setChildToLast = function(v)
{
	var temp = v.cloneNode();
	temp.innerHTML = v.innerHTML;
	
	this.removeChild(v);
	
	this.appendChild(temp);
}
/**************************************************
 *
 * 数字扩展
 * 
***************************************************/


/**
 * 小数转整数
 */ 
Number.prototype.toInt = function()  
{
    return Math.round(this);
}  


/**
 * 负数转正数
 */ 
Number.prototype.toPositive = function() 
{
   return Math.abs(this);
} 
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
/**************************************************
 * 
 * 滚动
 * 封装了节点滚动的操作
 * 
***************************************************/


/**
 * 设置或获取垂直滚动的百分比
 * @value 0-1之间的小数
 */
Element.prototype.scrollX = function(value) 
{
	if(!value && value !==0)
	{
		return this.scrollWidth/(this.scrollWidth-this.clientWidth);
	}
	
	this.scrollLeft = (this.scrollWidth-this.clientWidth)*value;
}


/**
 * 设置或获取横向滚动的百分比
 * @value 0-1之间的小数
 */
Element.prototype.scrollY = function(value) 
{
	if(!value && value !==0)
	{
		return this.scrollTop/(this.scrollHeight-this.clientHeight);
	}
	
	this.scrollTop = (this.scrollHeight-this.clientHeight)*value;
}
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


/**************************************************
 *
 * 字符串扩展
 * 
***************************************************/

/**
 * 是否为Null,为空
 */
String.prototype.isNullOrEmpty = function() 
{
	return this === undefined || this === null || this == "";
}


/**
 * 是否为Null,为空,空格
 */
String.prototype.isNullOrWhiteSpace = function()
{
	return this.isNullOrEmpty() || this.trim().isNullOrEmpty();
}


/**
 * 是否包含指定的字符
 */
String.prototype.isContains = function(v)
{
	return this.indexOf(v) > -1;
}


/**
 * 去除左边的空格
 */
String.prototype.ltrim = function()
{
	return this.replace(/(^\s*)/g, "");
}


/**
 * 去除右边的空格
 */
String.prototype.rtrim = function()
{
	return this.replace(/(\s*$)/g, "");
}


/**
 * 是否以指定内容开头
 */
String.prototype.startWith = function(v)
{
	return this.substr(0, arguments[0].length) == arguments[0];
}


/**
 * 是否以指定内容结尾
 */
String.prototype.endWith = function(v)
{
	return this.substr(this.length - arguments[0].length) == arguments[0];
}


/**
 * 是否是长日期
 */
String.prototype.isLongDate = function()
{
	var r = this.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
	if (r == null) { return false; }
	var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
	return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
}


/**
 * 是否是短日期
 */
String.prototype.isShortDate = function()
{
	var r = this.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	if (r == null) { return false; }
	var d = new Date(r[1], r[3] - 1, r[4]);
	return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
}


/**
 * 是否是日期
 */
String.prototype.isDate = function()
{
	return this.isShortDate() || this.isLongDate();
}


/**
 * 是否存在汉字
 */
String.prototype.isExistChinese = function()
{
	return this.isNullOrEmpty() ? false : !/^[\x00-\xff]*$/.test(this);
}


/**
 * 是否全是汉字
 */
String.prototype.isChinese = function()
{
	return this.isNullOrEmpty() ? false : /^[\u0391-\uFFE5]+$/i.test(this);
}


/**
 * 是否全是字母
 */
String.prototype.isAbc = function()
{
	return this.isNullOrEmpty() ? false : /^[A-Za-z]+$/i.test(this);
}


/**
 * 字符串转换成日期
 */
String.prototype.toDate = function()
{
	try { return new Date(this.replace(/-/g, "\/")); }
    catch (e) { return null; }
}


/**
 * 字符串转换成布尔
 */
String.prototype.toBoolean = function()
{
	var str = this.isNullOrEmpty() ? false : this.toLowerCase();
	str = str.trim();
	return str == "true" || str == "yes" || str == "y" || str == "t" || str == "1" || str == "是";
}


/**
 * 字符串转换成int
 */
String.prototype.toInt = function()
{
	return isNaN(parseInt(this)) ? 0 : parseInt(this);
}


/**
 * 字符串转换成小数
 */
String.prototype.toDouble = function()
{
	return isNaN(parseFloat(this)) ? 0.0 : parseFloat(this);
}


/**
 * 是否是电话/传真号码
 */
String.prototype.isTelOrFax = function()
{
	return this.isNullOrEmpty() ? false : /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(this);
}


/**
 * 是否是手机号码
 */
String.prototype.isMobile = function()
{
	return this.isNullOrEmpty() ? false : /^(13|14|15|17|18)\d{9}$/i.test(this);
}


/**
 * 是否是电子邮箱
 */
String.prototype.isEmail = function()
{
	return this.isNullOrEmpty() ? false : /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(this);
}


/**
 * 是否是邮编
 */
String.prototype.isZip = function()
{
	return this.isNullOrEmpty() ? false : /^[\d]{6}$/.test(this);
}


/**
 * 是否是QQ
 */
String.prototype.isQQ = function()
{
	return this.isNullOrEmpty() ? false : /^[1-9]\d{5,11}$/i.test(this);
}


/**
 * 是否是身份证号码
 */
String.prototype.isCard = function()
{
	var IDCardReg = new RegExp(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/); 
	if(!IDCardReg.test(str))
	{
		return false; 
	} 
	return true; 
}


/**
 * 是否全由数字组成
 */
String.prototype.isDigit = function()
{
	var patrn=/^[0-9]{1,20}$/; 
	if (!patrn.exec(this)) return false 
	return true 
}


/**
 * 获取路径中的后缀名
 */
String.prototype.suffix = function()
{
	return this.replace(/.+\./, "")
}


/**
 * 校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串 
 */
String.prototype.isRegisterUserName = function()
{
	var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;   
	if (!patrn.exec(s)) return false 
	return true 
}


/**
 * 校验用户姓名：只能输入1-30个以字母开头的字串
 */
String.prototype.isTrueName = function()
{
	var patrn=/^[a-zA-Z]{1,30}$/;   
	if (!patrn.exec(s))
	{
		return false 
	}
	
	return true;
}


/**
 * 校验密码：只能输入6-20个字母、数字、下划线
 */
String.prototype.isPassword = function()
{
	var patrn=/^(\w){6,20}$/;   
	if (!patrn.exec(s)) return false 
	return true 
}


/**
 * 格式化文件大小
 */
String.prototype.formatFileSize = function(fileSize) 
{
    if (fileSize < 1024) 
    {
        return fileSize + 'B';  
    } 
    else if(fileSize < (1024*1024)) 
    {
        var temp = fileSize / 1024;  
        temp = temp.toFixed(2);  
        return temp + 'KB';  
    } 
    else if(fileSize < (1024*1024*1024)) 
    {
        var temp = fileSize / (1024*1024);  
        temp = temp.toFixed(2);  
        return temp + 'MB';  
    } 
    else 
    {
        var temp = fileSize / (1024*1024*1024);  
        temp = temp.toFixed(2);  
        return temp + 'GB';  
    }  
}  


/**
 * 替换指定位置字符串
 */
String.prototype.splice = function(index,value)
{
	var arr = this.split("");
	arr.splice(index,1,value);
	return arr.join('');
}


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










/**************************************************
 *
 * 图片调色
 * 16进制转RGB,RGB转16进制,图片颜色,背景图颜色
 * 
***************************************************/

window.toner = {}

	
/**
 * 更改图片色彩
 * @ img       image对象
 * @ old_color 旧颜色(16进制)
 * @ new_color 新颜色(16进制)`
 */
toner.setImageColor = function(image,old_color,new_color) 
{
	image.src = toner.getNewImgColor(image,old_color,new_color);
}


/**
 * 更改背景图片颜色
 * @ dom       节点对象
 * @ old_color 旧颜色(16进制)
 * @ new_color 新颜色(16进制)
 */
toner.setBgImageColor = function(dom,old_color,new_color)
{
	var url = window.getComputedStyle(dom).backgroundImage;
	
	if(url.indexOf('url("') == 0)
	{
		url = url.replace('url("','').replace('")','');
	}
	else
	{
		url = url.replace('url(','').replace(')','');
	}
	
	var image     = new Image();
	var data      = null;
	image.src     = url;
	image.onload  = function(e)
	{
		dom.style.backgroundImage = 'url('+toner.getNewImgColor(image,old_color,new_color)+')';
	}
}


/**
 * 获取新的图片数据
 * @ image     图片对象
 * @ old_color 旧颜色
 * @ new_color 新颜色
 */
toner.getNewImgColor = function(image,old_color,new_color)
{
	old_color     = toner.toRGB(old_color);
	new_color     = toner.toRGB(new_color);
	
	//画布
	var canvas    = document.createElement("canvas");
	var context   = canvas.getContext('2d');
	
	//绘制图片
	canvas.width  = image.width;
	canvas.height = image.height;
	context.drawImage(image,0,0);
	
	//获取像素
	var imgData = context.getImageData(0,0,canvas.width,canvas.height)
	
	for(var i=0;i<imgData.data.length;i+=4)
	{
		if(imgData.data[i+0] > (old_color[0]-5) && imgData.data[i+0] < (old_color[0]+5))
		{
			imgData.data[i+0] = new_color[0]
		}
		
		if(imgData.data[i+1] > (old_color[1]-5) && imgData.data[i+1] < (old_color[1]+5))
		{
			imgData.data[i+1] = new_color[1];
		}
		
		if(imgData.data[i+2] > (old_color[2]-5) && imgData.data[i+2] < (old_color[2]+5))
		{
			imgData.data[i+2] = new_color[2];
		}
		
		/*
		imgData.data[i+0]=255; //红
		imgData.data[i+1]=0;   //绿
		imgData.data[i+2]=0;   //蓝
		imgData.data[i+3]=0;   //透明度
		*/
	}
	
	context.putImageData(imgData,0,0);
	
	return canvas.toDataURL("image/png");
}


/**
 * 16进制转RGB颜色
 * @ hex #E9E9E9
 */
toner.toRGB = function(hex)
{
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	
	var sColor = hex.toLowerCase();  
    
    if(sColor && reg.test(sColor))
    {
        if(sColor.length === 4)
        {
            var sColorNew = "#";  
            for(var i=1; i<4; i+=1)
            {
                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));     
            }  
            sColor = sColorNew;  
        }
        
        //处理六位的颜色值  
        var sColorChange = [];  
        
        for(var i=1; i<7; i+=2)
        {
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));    
        } 
        
        return sColorChange;
    }
    else
    {
        return sColor;    
    }  
}


/**
 * RGB转换为16进制
 * @ r 红
 * @ g 绿
 * @ b 蓝
 */
toner.toHex = function(r,g,b) 
{ 
	return '#'+((r << 16) | (g << 8) | b).toString(16); 
}


/**************************************************
 *
 * 对象
 * 
***************************************************/

/**
 * 获取对象的实际类型
 */
window.is = function(obj)
{
	var type = obj.constructor.toString();
		type = type.replace(/\s/g,"");
		type = type.substring(8,type.indexOf("("));
		return type;
}

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