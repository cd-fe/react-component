/**
 * 常用方法
 * @module
 */
import REG from './Regexp.jsx';
module.exports = {
    type : function(v) {
        return Object.prototype.toString.call(v);
    },
    isNull : function(src) {
        return this.type(src) === '[object Null]'
    },
    getReg : function(src) {
        if(this.type(src) == '[object String]') {
            var index = Object.keys(REG).findIndex(function(item, index, arr) {
                return item == src
            });
            return (index > -1 ? REG[Object.keys(REG)[index]] :  new RegExp(src))
        }else if(this.type(src) == '[object RegExp]'){
            return src
        }else {
            return false;
        }
    },
    checkboxAndSelectNoChecked : function(src) {
        if(this.type(src) === '[object Array]') {
            //checkedbox
            return src.every(function(item, index) {
                return item.selected == 0
            });
        }else if(this.type(src) === '[object Object]'){
            //selected
            return src.key == '请选择'
        }
    }
};