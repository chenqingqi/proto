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
