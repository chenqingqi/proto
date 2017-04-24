/**************************************************
 *
 * 运算扩展
 * 
***************************************************/

/**
 * 产生从n到n的随机整数
 */
Math.splice = function(start,end) 
{
	var choice = end - start + 1;
    return this.floor(this.random() * choice + start); 
}