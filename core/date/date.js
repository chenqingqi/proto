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