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