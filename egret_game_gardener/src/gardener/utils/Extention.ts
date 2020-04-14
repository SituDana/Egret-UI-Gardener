interface String {
    format(...replacements: string[]): string;
}

// 字符串格式化，替换变量
if (!String.prototype.format) {
    String.prototype.format = function () {
        let args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

interface Date {
    format(fmt: string): string;
}
//格式化日期时间
Date.prototype.format = function (fmt) { //author: meizz 
    let o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

interface Array<T> {
    shuffle(): Array<T>;
}
// 随机重排数组
Array.prototype.shuffle = function () {
    var input = this;
    for (var i = input.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}

interface Number {
    getRandomInteger(max: number, min: number): number;
}

/**
 * 随机整数
 * @param min 最小整数字 
 * @param max 最大整数字(上限，取不到)
 */
Number.prototype.getRandomInteger = function (max: number, min: number) {
    min = isNaN(min) ? 0 : min;
    max = isNaN(max) ? 0 : max;
    return Math.floor((max - min) * Math.random()) + min;
}