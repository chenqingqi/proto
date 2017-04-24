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

