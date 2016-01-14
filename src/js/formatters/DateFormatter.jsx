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
    setSource:function(value) {
        if(typeof value == 'object') {
            this._source = value;
        }
        if(typeof value == 'string') {
            var data = value;
            var reCat = /(\d{1,4})/gm;
            var t = data.match(reCat);
            t[1] = t[1] - 1;
            eval('this._source = new Date('+t.join(',')+');');
        }

        this.parse();

        return this;
    },
    getSource:function() {
        if(!this._source) {
            this._source = new Date();
        }

        return this._source;
    },
    setTime:function(value) {
        this.getSource().setTime(value);
        this.parse();
        return this;
    },
    getTime:function() {
        return this.getSource().getTime();
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
    compare:function(value) {
        return this.getTime() - (value.getTime()||this.getTime());
    },
    isLeapYear:function() {
        return (0==this.getSource().getYear()%4&&((this.getSource().getYear()%100!=0)||(this.getSource().getYear()%400==0)));
    },
    toString:function() {
        return this._result;
    }
};

module.exports = DateFormatter;