/**
 * 日期格式化类
 * @class DateFormatter
 * @param pattern
 * @returns {DateFormatter}
 * @constructor
 */

var DateFormatter = function(pattern) {
    this._source = new Date();

    if(pattern) {
        this.setPattern(pattern);
    }

    return this;
};

DateFormatter.prototype = {
    _source:null,
    _result:"",
    _pattern:"Y-m-d H:i:s",
    _key:{
        "y":"getYear",		// 两位数的年
        "Y":"getFullYear",	// 完整年
        "m":"getMonth",		// 月份
        "d":"getDate",		// 号数
        "D":"getDay",		// 日期
        "H":"getHours",		// 小时
        "i":"getMinutes",	// 分数
        "s":"getSeconds"	// 秒数
    },
    /**
     * 设置时间戳，可以是数字也可以是日期对象
     * @param value
     * @returns {DateFormatter}
     */
    setSource:function(value) {
        if(typeof value == 'object') {
            this._source = value;
        }
        if(typeof value == 'string') {
            var data = value;
            var reCat = /(\d{1,4})/gm;
            var t = data.match(reCat);
            t = t.map(function(it) {
                return it * 1;
            });
            t[1] = t[1] - 1;
            eval('this._source = new Date('+t.join(',')+');');
        }

        this.parse();

        return this;
    },
    /**
     * 获取原始日期对象
     * @returns {Date}
     */
    getSource:function() {
        if(!this._source) {
            this._source = new Date();
        }

        return this._source;
    },
    /**
     * 设置时间戳，仅接受数字格式
     * @param value
     * @returns {DateFormatter}
     */
    setTime:function(value) {
        this.getSource().setTime(value);
        this.parse();
        return this;
    },
    /**
     * 获取时间戳
     * @returns {number}
     */
    getTime:function() {
        return this.getSource().getTime();
    },
    /**
     * 获取指定月份的天数，默认返回当前月
     * @param offset - 与当前月之间的月份差
     * @returns {number}
     */
    getCurrentMonthDays:function(offset) {
        return [31, this.isLeapYear() ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][(12 + this._source.getMonth() + (offset || 0)) % 12];
    },
    getDate:function() {
        return this.getSource().getDate();
    },
    getDay:function() {
        return this.getSource().getDay();
    },
    format:function(time) {
        if(typeof time == 'number') {
            this.setTime(time);
        }
        if(typeof time == 'string' || typeof time == 'object') {
            this.setSource(time);
        }

        return this.toString();
    },
    /**
     * 设置显示格式
     * @param value
     * @returns {DateFormatter}
     * @example
     * "y":"getYear",		// 两位数的年
     * "Y":"getFullYear",	// 完整年
     * "m":"getMonth",		// 月份
     * "d":"getDate",		// 号数
     * "D":"getDay",		// 日期
     * "H":"getHours",		// 小时
     * "i":"getMinutes",	// 分数
     * "s":"getSeconds"	    // 秒数
     */
    setPattern:function(value) {
        this._pattern = value;
        this.parse();
        return this;
    },
    parse:function() {
        this._result = "";

        for(var i=0;i<this._pattern.length;i++) {
            var ch = this._pattern.charAt(i);
            if(this._pattern.charCodeAt(i) == 92) {
                i++;
                this._result += this._pattern.charAt(i);
                continue;
            }

            if(this._key[ch] != null) {
                if(ch == 'm') {
                    var re = "";
                    eval("re = this.getSource()."+this._key[ch]+"()+1;");
                    if(parseInt(re, 10)<10) {
                        re = '0'+re;
                    }
                    this._result += re;
                }else {
                    var re = "";
                    eval("re = this.getSource()."+this._key[ch]+"();");
                    if(parseInt(re, 10)<10) {
                        re = '0'+re;
                    }
                    this._result += re;
                }
            }else {
                this._result += ch;
            }
        }

        return this;
    },
    /**
     * 设置日期偏移，主要用于计算多少天后之类的情况
     * @param type - 单位，分为 y m d H i s，与显示格式一致
     * @param value - 按单位的偏移量
     * @returns {DateFormatter}
     * @example
     * formatter.dateTo('m', -2)
     * // 表示两月前
     */
    dateTo:function(type, value) {
        var time = 0;
        switch(type) {
            case "y":time += 31536000000 * value;break;
            case "m":time += 2592000000 * value;break;
            case "d":time += 86400000 * value;break;
            case "H":time += 3600000 * value;break;
            case "i":time += 60000 * value;break;
            case "s":time += 1000 * value;break;
        }

        this.setTime(this.getTime() + time);

        return this;
    },
    /**
     * 对比两个时间
     * @param value
     * @returns {number}
     */
    compare:function(value) {
        return this.getTime() - (typeof value == 'object' ? (value.getTime()||this.getTime()) : (value * 1 || this.getTime()));
    },
    isLeapYear:function() {
        return (0==this.getSource().getYear()%4&&((this.getSource().getYear()%100!=0)||(this.getSource().getYear()%400==0)));
    },
    /**
     * 将当前时间按给定的格式进行输出
     * @returns {string}
     */
    toString:function() {
        return this._result;
    }
};

module.exports = DateFormatter;