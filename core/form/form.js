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
