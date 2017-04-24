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





