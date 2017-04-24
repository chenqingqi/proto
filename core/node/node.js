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