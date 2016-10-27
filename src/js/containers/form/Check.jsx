/**
 * 表单验证
 * @module containers/form/Check
 */
import CF from './CommonFunc.jsx';

const checksFunc = {
    //必填校验
    required : function(value, rc, rule) {
        var result = false;
        if(CF.isNull(value) || value == '' || CF.checkboxAndSelectNoChecked(value)) {
            rc.setState({
                validateStatus : 'is-error',
                explain : rule.required.msg || '输入不能为空'
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
    //过滤校验
    filter : function(value, rc, rule) {
        var result = false;
        if(!(CF.getReg(rule.filter.reg).test(value))) {
            rc.setState({
                validateStatus : 'is-error',
                explain : rule.filter.msg || '输入格式不正确'
            });
        }else {
            result = true;
        }
        return result;
    },
    //远程校验
    remote : function(value, rc, rule) {
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
};
//steps ['required', 'filter']
function makeChecks(stepsArr, value, rc,rule) {
    for(var i = 0; i< stepsArr.length; i++) {
        if(!checksFunc[stepsArr[i]](value, rc, rule)) {
            break;
        }
    }
    return i == stepsArr.length
}

module.exports = function(value, rc, rule) {
    var {required, filter, callback} = rule;
    var checksArr =[];
    required && checksArr.push('required');
    filter && checksArr.push('filter');
    return makeChecks(checksArr, value, rc,rule);
};
