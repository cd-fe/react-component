/**
 * 表单验证
 * @module containers/form/Check
 */
const RegArr = {
    email : /^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
    number : /^\d+$/,
    phone : /^0{0,1}(13[^4]|15[^4]|14[57]|17[0-9]|18[0-9])[0-9]{8}$|134[0-8][0-9]{7}$/,
    code :  /^[0-9]{4}$/,
    pass :/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
    verify : /^[0-9]{6}$/,
    name : /^[\u4E00-\u9FA5]{2,5}$/,
    identify : /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
    bankCard : /^[0-9]{16,21}$/,
    question : /^[A-Za-z0-9\u4e00-\u9fa5]{1,20}$/,
    cvvCode : /^[0-9]{3,4}$/,
    validTime : /^[1-9]\d{3}((0\d)|(1[0-2]))$/,
    safe : /[~#$￥ˇ<>（）\s\?\*\&\\\|\/\[\]\{\}\\^%]/gi,
    url :  /[a-z]+:\/\/[a-z0-9_\-\/.%]+/i,
    inname : /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
    //所有键盘可输入字符
    keyboardChars:/^[\x00-\xff\u4E00-\u9FA5·【】；‘’，。、~！￥……（）——：“”《》？]+$/,
    ship : /^[A-Za-z0-9]+$/
};

function type(v){
    return Object.prototype.toString.call(v);
}

function isNull(source) {
    return type(source) === '[object Null]'
}
function getReg(source) {
    if(type(source) == '[object String]') {
        var index = Object.keys(RegArr).findIndex(function(item, index, arr) {
            return item == source
        });
        return (index > -1 ? RegArr[Object.keys(RegArr)[index]] :  new RegExp(source))
    }else if(type(source) == '[object RegExp]'){
        return source
    }else {
        return false;
    }
}

module.exports = function(value, rc) {
    var {type, required, reg, trigger, validator,requireMsg,explain,remote} = rc.props;
    if(required) {
        //必须输入
        if(isNull(value) || value == '' || value.key == '选择') {
            rc.setState({
                validateStatus : 'is-error'
            });
        }else {
            rc.setState({
                validateStatus : 'is-success'
            });
        }
        //输入不正确
        if(reg) {
            if(!(getReg(reg).test(value))) {
                rc.setState({
                    validateStatus : 'is-error'
                });
            }else {
                rc.setState({
                    validateStatus : 'is-success'
                });
            }
        }
        //远程
        if(remote) {
            $.ajax({
                url:remote.url,
                type:remote.type,
                data:remote.data,
                cache: false,
                beforeSend : function() {
                    rc.setState({
                        validateStatus : 'is-validating'
                    });
                },
                success:function(response) {
                    rc.setState({
                        validateStatus : 'is-success',
                        remoteMsg : response.msg || '成功！'
                    });
                },
                error:function(response) {
                    rc.setState({
                        validateStatus : 'is-error',
                        remoteMsg : '网络错误'
                    });
                }
            })
        }
        //自定义函数检测
        if(validator) {
            if(rc.props.validator(rc)) {

            }
        }
    }
};