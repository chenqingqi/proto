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

