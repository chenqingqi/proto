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