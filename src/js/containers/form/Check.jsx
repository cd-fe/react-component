/**
 * 表单验证
 * @module containers/form/Check
 */
import CF from './CommonFunc.jsx';

const checksFunc = {
    //必填校验
    required : function(value, rc) {
        var result = false;
        if(CF.isNull(value) || value == '' || CF.checkboxAndSelectNoChecked(value)) {
            rc.setState({
                validateStatus : 'is-error',
                explain : rc.props.requireMsg || '输入不能为空'
            });
        }else {
            rc.setState({
                validateStatus : 'is-success',
                explain : ''
            });
            result = true;
        }
        return result;
    },
    //正则校验
    reg : function(value, rc) {
        var result = false;
        if(!(CF.getReg(rc.props.reg).test(value))) {
            rc.setState({
                validateStatus : 'is-error',
                explain : rc.props.explain || '输入格式不正确'
            });
        }else {
            result = true;
        }
        return result;
    },
    //远程校验
    remote : function(value, rc) {
        var {remote} = rc.props;
        return new Promise(function(resolve, reject) {
            $.ajax({
                url:remote.url,
                type:remote.type,
                dataType : remote.dataType,
                data:{
                    [remote.key] : value
                },
                cache: false,
                beforeSend : function() {
                    rc.setState({
                        validateStatus : 'is-validating'
                    });
                },
                success:function(response) {
                    rc.setState({
                        validateStatus : 'is-success'
                    });
                    resolve(response);
                },
                error:function() {
                    rc.setState({
                        validateStatus : 'is-error',
                        explain : '网络错误,请稍后再试！'
                    });
                    reject('error');
                }
            });
        })
    },
    //自定义回调函数
    validator : function(value, rc) {
        return rc.props.validator && rc.props.validator(value, rc);
    }
};
//steps ['required', 'reg', 'remote','validator']
function makeChecks(stepsArr, value, rc) {
    for(var i = 0; i< stepsArr.length; i++) {
        if(stepsArr[i] == 'remote') {
            if(stepsArr.findIndex(function(v, i) { return  v == 'validator'}) > -1) {
                checksFunc[stepsArr[i]](value, rc).then(function(success) {
                    checksFunc['validator'](value, rc);
                }, function(error) {

                });
            }
            break;
        }else {
            if(!checksFunc[stepsArr[i]](value, rc)) {
                break;
            }
        }
    }
}

module.exports = function(value, rc) {
    var {type, required, reg, trigger, validator,requireMsg,explain,remote} = rc.props;
    var checksArr =[];
    required && checksArr.push('required');
    reg && checksArr.push('reg');
    remote && checksArr.push('remote');
    validator && checksArr.push('validator');
    makeChecks(checksArr, value, rc);
};
