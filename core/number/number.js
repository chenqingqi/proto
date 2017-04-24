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